import { provide } from 'vue';
import Address from '../components/Address.vue';

export default {
    title: 'Address',
    component: Address,
};

const Template = (args) => ({
    components: { Address },
    setup() {
      provide('address', '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');
      return { args };
    },
    template: '<Address v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {}

export const WithAvatar = Template.bind({});
WithAvatar.args = {
    avatar: true,
}

export const Copyable = Template.bind({});
Copyable.args = {
    copyable: true,
}

export const WithSize = Template.bind({});
WithSize.args = {
    size: 4,
}