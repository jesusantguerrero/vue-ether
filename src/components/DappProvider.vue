<script setup lang="ts">
import { computed, provide, reactive } from "vue";
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
const { ProviderState } = useWeb3Provider(initAuth, null, props.config, props.contracts);

provide("address", computed(() => ProviderState.account));
provide("provider", computed(() => props.provider));
provide("auth", computed(() => ({
  login,
  logout,
  AuthState
})))
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