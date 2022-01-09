/* eslint-disable node/no-extraneous-import */
/* eslint-disable node/no-missing-import */
import { Moralis } from "moralis/dist/moralis";
import Web3 from "web3/dist/web3.min";
import { ProviderState } from "../useWeb3Provider";


export const MoralisProvider = (AppState: any, config: Record<string, string>) => {
  window.Web3 = Web3;
  Moralis.initialize(config.moralisKey);
  Moralis.serverURL = config.moralisServerUrl;

  const login = async () => {
    let user: Moralis.User|null = null;
    let error: Error|null = null;

    if (!ProviderState.isConnectedToValidNetwork) {
      new Error("Please connect to the correct network");
      return;
    }

    user = await Moralis.Web3.authenticate({
      provider: window.ethereum,
      chainId: Number(config.chainId),
    });

    if (user) {
      initUser(user);
    }

    return {user, error};
  };

  const logout = async () => {
    await Moralis.User?.logOut();
    ProviderState.account = "";
    AppState.user = Moralis.User.current();
  };
  
  const initAuth = () => {
      if (window.ethereum) {
        const currentUser = Moralis.User.current();
        if (currentUser) {
          initUser(currentUser);
        }
      }
  };

  const setUser = (user: Moralis.User) => {
    AppState.user = user;
  };
  
  const initUser = async (user: Moralis.User) => {
    setUser(user);
    ProviderState.account = user.attributes.accounts[0];
  };

  return {
    login,
    logout,
    initAuth,
    getUser: () => {
      return Moralis.User.current();
    }
  }
}
