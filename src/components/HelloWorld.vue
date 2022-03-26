<script setup lang="ts">
import { MoralisProvider, DappProvider, AuthState } from '../index';
import { useSecureString } from "../utils/index"
import ExampleHeader from './ExampleHeader.vue'

// @ts-ignore
import { contracts } from "../../contracts.json";
const { getEnv } = useSecureString(import.meta.env);
const config = {
    moralisServerUrl: getEnv("VITE_MORALIS_SERVER_URL"),
    moralisKey: getEnv("VITE_MORALIS_API_KEY"),  
    moralisAppId: getEnv("VITE_MORALIS_APP_ID"), 
    chainId: getEnv("VITE_CHAIN_ID"), 
};

const provider = MoralisProvider(AuthState, config);
</script>

<template>
  <DappProvider :provider="provider" :config="config" :contracts="contracts">
    <div class="hello">
      <h1>Welcome to Vue-Ethers</h1>
      <ExampleHeader class="mt-5" />
      <p v-if="AuthState.user" class="mt-5">
        You can use <b>vue-ethers</b> to build your DApps with Vue!
      </p>
    </div>
  </DappProvider>
</template>