<script lang="ts" setup>
import { computed, inject } from 'vue';
import { formatMaskedAddress } from '../utils';
import * as blockies from 'blockies-ts';
 
const props = defineProps({
    avatar: {
        type: Boolean,
        default: false,
    },
    copyable: {
        type: Boolean,
        default: false,
    },
    size: {
        type: Number,
        default: 0,
    }
});
const address = inject('address', '');
const maskedWallet = computed(() => {
    return props.size ? formatMaskedAddress(address, props.size) : address;
});

const avatarUrl= computed(() => {
    return props.avatar ? blockies.create({ seed: address }).toDataURL() : '';
});
</script>

<template>
<div>
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="3"
        stroke="#21BF96"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="current" />
        <path d="M5 12l5 5l10 -10" />
        <title id="copied-address">Copied!</title>
    </svg>
</div>
</template>