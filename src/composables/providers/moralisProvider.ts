/* eslint-disable node/no-extraneous-import */
/* eslint-disable node/no-missing-import */
import { Moralis } from "moralis";
import Web3 from "web3/dist/web3.min";
import { ProviderState } from "../useWeb3Provider";


export const MoralisProvider = (AppState: any, config: Record<string, string>) => {
  window.Web3 = Web3;
  Moralis.start({serverUrl: config.moralisServerUrl, appId: config.moralisKey });

  const login = async () => {
    let user: Moralis.User|null = null;
    let error: Error|null = null;
    if (!ProviderState.isConnectedToValidNetwork) {
      new Error("Please connect to the correct network");
      console.error("DEBUG:: Please connect to the correct network or set the correct network in the config");
      return;
    }
    

    user = await Moralis.authenticate({
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
