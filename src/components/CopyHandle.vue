<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
    text: {
        type: String,
        default: '',
    }
});

const emit = defineEmits(['copied']);
const isCopying = ref(false);
const hiddenText = ref();
const copy = async () => {
    const text = props.text;
    try {
        hiddenText.value.select();
        document.execCommand && document.execCommand('copy');
        isCopying.value = true;
        emit('copied', text);
    } catch (err) {
        console.error('Unable to copy', err);
    }
    setTimeout(() => {
        isCopying.value = false;
    }, 1000);
};
</script>

<template>
<button @click="copy()">
    <svg
        v-if="isCopying"
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
    <!-- copy svg -->
    <svg xmlns="http://www.w3.org/2000/svg" v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
    <input type="text" hidden :value="text" ref="hiddenText">
</button>
</template>