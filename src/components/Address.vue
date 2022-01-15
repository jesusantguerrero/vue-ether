<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { formatMaskedAddress } from '../utils';
import * as blockies from 'blockies-ts';
import CopyHandle from './CopyHandle.vue';
 
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
    },
    address: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(['copied']);

const globalAddress = inject('address', ref());
const visibleAddress = computed(() => {
    return props.address.length ? props.address : globalAddress.value;
});
const maskedWallet = computed(() => {
    return props.size ? formatMaskedAddress(visibleAddress.value || "", props.size) : visibleAddress.value;
});

const avatarUrl = computed(() => {
    return props.avatar ? blockies.create({ seed: visibleAddress.value }).toDataURL() : '';
});
</script>

<template>
<div class="flex items-center justify-center px-5 rounded-md cursor-pointer">
    <span>
        {{ maskedWallet }}
    </span>
    <slot>
        <img :src="avatarUrl" class="ml-2 rounded-full" />
    </slot>
    <CopyHandle @copied="emit('copied', $event)" :text="visibleAddress"  v-if="copyable" class="text-gray-500 cursor-pointer" />
</div>
</template>