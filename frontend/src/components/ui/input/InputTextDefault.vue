<template>
  <input 
    v-model="model"
    :disabled="disabled" 
    :type="type" 
    :class="['w-full rounded-sm px-2 h-10 border border-gray-300 disabled:bg-gray-100 disabled:border-none disabled:text-gray-400', customizeClass]"
  >
</template>

<script setup lang="ts">
import { withDefaults } from 'vue';

interface Props {
  type?: string
  customizeClass?: string
  disabled?: boolean
}

const model = defineModel<string>('model')

withDefaults(defineProps<Props>(), {
  type: "text"
})
</script>
