import { provide } from 'vue';
import NetworkBadge from '../components/NetworkBadge.vue';

export default {
    title: 'NetworkBadge',
    component: NetworkBadge,
};

const Template = (args) => ({
    components: { NetworkBadge },
    setup() {
      provide('address', '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');
      return { args };
    },
    template: '<NetworkBadge v-bind="args" />',
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