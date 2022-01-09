import { provide } from 'vue';
import AccountButton from '../components/AccountButton.vue';

export default {
  title: 'Organisms/AccountButton',
  component: AccountButton,
};

const Template = (args) => ({
  components: { AccountButton},
  setup() {
    provide('address', '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC');
    return { args };
  },
  template: `
    <div class="flex justify-end">
      <AccountButton
        v-bind="args"
      />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
    options: {
      account: {
        label: "General options",
        sections: [
          ["Profile", "/settings/profile"],
          ["Favorites", "/favorites"],
          ["My Collection", "/my-items"],
          ["Favorites", "/settings"],
          ["Logout", { emit: 'logout', separator: true }],
        ]
      }
    }
};

export const HiddenOption = Template.bind({});
HiddenOption.args = {
    options: {
      account: {
        label: "General options",
        sections: [
          ["Profile", "/settings/profile"],
          ["Favorites", "/favorites"],
          ["My Collection", "/my-items"],
          ["Favorites", "/settings"],
          ["Logout", { emit: 'logout', hide: true }],
        ]
      }
    }
};


