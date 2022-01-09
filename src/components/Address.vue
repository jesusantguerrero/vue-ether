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
<div class="flex items-center justify-center px-5 rounded-md cursor-pointer">
    <span>
        {{ maskedWallet }}
    </span>
    <slot>
        <img :src="avatarUrl" class="rounded-full ml-2" />
    </slot>
    <span v-if="copyable" class="cursor-pointer">
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
            <path stroke="none" d="M0 0h24v24H0z" fill="currentcolor" />
            <path d="M5 12l5 5l10 -10" />
            <title id="copied-address">Copied!</title>
        </svg>
    </span>
</div>
</template>