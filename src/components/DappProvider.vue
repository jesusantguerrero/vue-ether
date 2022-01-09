<script setup lang="ts">
import { provide } from "vue";
import { AuthState, useEthAuth } from "../composables/useEthAuth";
import { useWeb3Provider } from "../composables/useWeb3Provider";

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

provide("provider", props.provider);
provide("auth", {
  login,
  logout,
  AuthState
})
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>