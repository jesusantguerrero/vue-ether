import { reactive, computed, onMounted, watch, ref, inject, Ref } from "vue";
import { ethers } from "ethers";
import { IContractDefinition, ICustomProvider, IWeb3Config } from "../types";

export const ProviderState = reactive<ICustomProvider>({
  web3: null,
  account: undefined,
  accounts: [],
  networkId: undefined,
  balance: 0,
  error: null,
  loading: true,
  connected: false,
  chainId: "0",
  validChainId: 0,
  signer: null,
  isConnectedToValidNetwork: computed(() => {
    const decimalChain = parseInt(ProviderState.chainId, 16);
    const isValid =
      ProviderState.chainId && decimalChain === ProviderState.validChainId;
    return Boolean(isValid);
  }),
  currency: "ETH",
});

export const Web3Config = reactive<IWeb3Config>({
  config: {},
  contracts: {},
});

const onChangeAccountDefault = async (startApp: Ref<Function>) => {
  ProviderState.web3 = new ethers.providers.Web3Provider(
    window.ethereum,
    "any"
  );
  const user = ProviderState.web3.getSigner();
  startApp.value && (await startApp.value());
  ProviderState.signer = user;
};

export const useWeb3Provider = (
  initAuth: Function,
  onChangeAccount: null | Function,
  config: Record<string, any>,
  contracts: Record<string, IContractDefinition>
) => {
  const startApp = ref(initAuth);

  const getBalance = async (address: string) => {
    ProviderState.balance = await ProviderState.web3.getBalance(address);
  };

  const getAccounts = async () => {
    ProviderState.accounts = await ProviderState.web3.listAccounts();
  };

  watch(
    () => ProviderState.account,
    async (current, previous) => {
      if (current && current !== previous) {
        await onChangeAccountDefault(startApp);
        await getBalance(current);
        await getAccounts();
      } else if (!current) {
        await resetProviderState();
      }
    }
  );

  const resetProviderState = async () => {
    ProviderState.signer = null;
    ProviderState.web3 = null;
    ProviderState.account = undefined;
    ProviderState.accounts = [];
    ProviderState.networkId = undefined;
    ProviderState.balance = 0;
    ProviderState.error = null;
    ProviderState.loading = true;
    ProviderState.connected = false;
    startApp.value && (await startApp.value());
  };

  onMounted(async () => {
    startApp.value && (await startApp.value());
    if (window.ethereum) {
      ProviderState.chainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      window.ethereum.on("chainChanged", async () => {
        !onChangeAccount
          ? await onChangeAccountDefault(startApp)
          : await onChangeAccount();
      });
      window.ethereum.on("accountsChanged", async (accounts: string[]) => {
        !onChangeAccount
          ? await onChangeAccountDefault(startApp)
          : await onChangeAccount();
      });
    }
  });

  Web3Config.config = config;
  Web3Config.contracts = contracts;
  ProviderState.validChainId = Number(config.chainId);

  return {
    startApp,
    getAccounts,
    resetProviderState,
    ProviderState
  };
};

export const useWeb3 = () => {
  return {
    ProviderState,
    ethers,

  }

};
