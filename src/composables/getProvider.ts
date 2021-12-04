/* eslint-disable node/no-extraneous-import */
/* eslint-disable node/no-missing-import */
import { ethers } from "ethers";
import { Web3Config } from "./useWeb3Provider";

export const getProvider = () => {
  return new ethers.providers.JsonRpcProvider(Web3Config.config.rpcURL, "any");
};
