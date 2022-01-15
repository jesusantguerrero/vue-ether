<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { formatMaskedAddress } from '../utils';
import * as blockies from 'blockies-ts';
 
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    pastingText: {
        type: String,
        default: 'Paste',
    },
    pastingClass: {
        type: String,
        default: 'text-gray-500 hover:text-gray-400',
    },
});

const emit = defineEmits([
    'update:modelValue',
]);

const paste = async () => {
    const value = await navigator.clipboard.readText();
    emit('update:modelValue', value);
};

const emitValue = (evt: InputEvent) => {
    const target: HTMLInputElement = evt.target as HTMLInputElement;
    emit('update:modelValue', target.value);
};
</script>

<template>
<div class="flex items-center justify-between px-5 py-2 border rounded-md cursor-pointer ">
    <input :value="modelValue" @input="emitValue" class="w-full focus:outline-transparent" placeholder="0xxxxxxxxxxxxxxxxxxxxxxxxxxx" />
    <button class="font-bold " :class="pastingClass" @click="paste()">
        {{ pastingText }}
    </button>
</div>
</template>