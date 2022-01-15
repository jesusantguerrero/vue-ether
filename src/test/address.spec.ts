import { describe, it, expect } from 'vitest'
import { mount } from "@vue/test-utils";
import Address from "../components/Address.vue";
import { nextTick, ref } from 'vue';

describe("Address component", () => {
    it("should render the main address", () => {
        const addressStr = '0x1234567890123456789012345678901234567890';
        const wrapper = mount(Address, {
            global: {
                provide: {
                    address: ref(addressStr),
                }
            }
        });
        expect(wrapper.text()).toBe("0x1234567890123456789012345678901234567890");
    });
    it("should render the address", () => {
        const wrapper = mount(Address, {
            props: {
                address: "0x1234567890123456789012345678901234567890",
            },
        });
        expect(wrapper.text()).toBe("0x1234567890123456789012345678901234567890");
    });
    
    it("should render the address with size", () => {
        const wrapper = mount(Address, {
            props: {
                address: "0x1234567890123456789012345678901234567890",
                size: 4,
            },
        });
        expect(wrapper.text()).toBe("0x12***7890");
    });
    it("should allow to copy the address", async () => {
        const wrapper = mount(Address, {
            props: {
                copyable: true,
                address: "0x1234567890123456789012345678901234567890",
                size: 4,
            },
        });


        await wrapper.find('button').trigger('click');
        await nextTick();
        expect(wrapper.emitted().copied[0]).toContain("0x1234567890123456789012345678901234567890");
      
    });
})