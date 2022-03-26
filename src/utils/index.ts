import { ethers } from "ethers";

export const formatMaskedAddress = (account: string, size: number): string => {
  const first = account.slice(0, size);
  const last = account.slice(-size);
  return `${first}***${last}`;
};

const networks: Record<number, string> = {
  1: "Mainnet",
  3: "Ropsten",
  4: "Rinkeby",
  42: "Kovan",
  137: "Polygon",
  80001: "Mumbai",
  1337: "Localhost",
  5777: "Ganache",
};

export const getChainName = (chainId: number | string) => {
  return networks[Number(chainId)] || "Unknown";
};

export const formatEther = (value: string | number): string => {
  return Number(ethers.utils.formatEther(value)).toFixed(4);
}

export const useSecureString = (
  envInstance: Record<string | number | symbol, string> | any
) => {
  const getEnv = (key: string, defaultValue = ""): string => {
    const value = envInstance[key];
    return typeof value === "string" ? value : defaultValue;
  };

  return {
    getEnv,
  };
};
