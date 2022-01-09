<script setup lang="ts">
import { provide } from "vue";
import { AuthState, useEthAuth } from "../composables/useEthAuth";
import { useWeb3Provider, ProviderState } from "../composables/useWeb3Provider";

const props = defineProps({
  provider: {
    type: Object,
    required: true
  },
  config: {
    type: Object,
    required: true,
  },
  contracts: {
    type: Object,
    required: true
  }
})

const { login, logout, initAuth } = useEthAuth(props.provider);
useWeb3Provider(initAuth, null, props.config, props.contracts);

provide("address", ProviderState.account);
provide("provider", props.provider);
provide("auth", {
  login,
  logout,
  AuthState
})
</script>

<script lang="ts">
export default {
  name: 'DappProvider',
};
</script>

<template>
  <div>
    <slot/>
  </div>
</template>