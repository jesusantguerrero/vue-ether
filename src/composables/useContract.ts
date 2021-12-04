/* eslint-disable node/no-unpublished-import */
/* eslint-disable node/no-missing-import */
/* eslint-disable node/no-extraneous-import */
import { ethers } from "ethers";
import { IContractDefinition } from "../types";
import { Web3Config } from "./useWeb3Provider";


export const useContract = (
  contractName: string,
  provider: ethers.providers.Provider | ethers.Signer
) => {
  const contracts = Web3Config.contracts;
  if (contracts && contracts[contractName]) {
    const contract: IContractDefinition = contracts[contractName];
    return new ethers.Contract(contract.address, contract.abi, provider);
  }
  return null;
};

