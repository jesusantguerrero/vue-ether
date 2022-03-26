<script setup lang="ts">
import { useEthAuth, AccountButton } from '../index';

const { AuthState, login, logout } = useEthAuth();


</script>

<template>  
  <p v-if="!AuthState.user">
    <button to="/about" @click="login" class="px-5 py-2 text-white bg-green-500 rounded-md">Connect to Meta</button>
  </p>
  <p v-else class="flex flex-col items-center justify-center mt-4 space-y-2">
    <AccountButton :account="AuthState.user.account" />
    <button to="/about" @click="logout" class="px-5 py-2 text-white bg-red-500 rounded-md">Disconnect from Meta</button>
  </p>
</template>