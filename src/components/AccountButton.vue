<template>
  <at-dropdown placement="bottom-end" :width="300" trigger="click">
    <template #trigger>
      <div
        class="relative flex h-10 rounded-lg transition text-sm font-bold text-gray-400  cursor-pointer select-none hover:bg-gray-50 lg:text-lg "
        :class="handlerClass"
      > 
          <slot>
              <Address avatar :size="4"/>
          </slot>
      </div>
    </template>

    <template #content>
      <div class="py-3 text-sm text-left user-button">
        <div
          class="flex items-center justify-between px-3 text-xs font-bold text-center text-gray-400"
        >
          <div>
            Address: 
          </div>
         <Address :size="4" title="copy" /> 
        </div>
        <div class="py-3 text-sm text-left user-button" v-for="(option, groupName) in options" :key="groupName">
        <div
          class="flex items-center justify-between px-3 pb-2 text-xs font-bold text-center text-gray-400"
        >
          <div>{{ option.label }}</div>
        </div>
        <div class="flex flex-col text-gray-600">
          <template v-for="section in option.sections">
              <RouterLink
                v-if="isSectionLink(section)"
                :as="section[3]"
                :to="section[1]"
                class="border-none cursor-pointer block w-full px-3 py-2 text-left hover:bg-gray-100"
              >
                {{ section[0] }}
              </RouterLink>

              <button 
                v-else-if="isSectionAction(section) && !section[1].hide" 
                :class="getClasses(section)"
                @click="$emit(section[1].emit)" class="block w-full px-3 py-2 text-left hover:bg-gray-100"
              >
                {{ section[0] }}
              </button>

              <div v-else-if="!section[0]" class="w-full h-0 border" />
          </template>
        </div>
      </div>
      </div>
    </template>
  </at-dropdown>
</template>

<script setup lang="ts">
import AtDropdown  from "./AtDropdown.vue";
import Address from "./Address.vue";

defineProps({
  handlerClass: {
    type: String,
    default: "",
  },
  options: {
      type: Object,
      default() {
          return {}
      }
  },
})
const isSectionLink = (section) => {
  return Array.isArray(section) && typeof section[1] == 'string'; 
}

const isSectionAction = (section) => {
  return Array.isArray(section) && typeof section[1] == 'object'; 
}

const hasClasses = (section) => {
  return !!section[1].class;
}

const getClasses = (section) => {
  return {'border-t': section[1].separator, [section[1].class]: hasClasses(section)}
}
</script>

<style>
.user-button {
  min-width: 192px;
}
</style>
