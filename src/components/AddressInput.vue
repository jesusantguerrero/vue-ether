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
        default: 'text-purple-500 hover:text-purple-400',
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
<div class="flex items-center justify-between py-2 px-5 rounded-md cursor-pointer border ">
    <input :value="modelValue" @input="emitValue" class="w-full focus:outline-transparent" placeholder="0xxxxxxxxxxxxxxxxxxxxxxxxxxx" />
    <button class=" font-bold" :class="pastingClass" @click="paste()">
        {{ pastingText }}
    </button>
</div>
</template>