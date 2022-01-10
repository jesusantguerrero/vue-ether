import { provide, ref } from 'vue';
import AddressInput from '../components/AddressInput.vue';

export default {
    title: 'AddressInput',
    component: AddressInput,
};

const Template = (args) => ({
    components: { AddressInput },
    setup() {
      provide('AddressInput', '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');
      const value = ref("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC")
      return { args, value };
    },
    template: '<AddressInput v-bind="args" v-model="value" />',
});

export const Default = Template.bind({});
Default.args = {}
