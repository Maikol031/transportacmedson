<template>
  <Select>
    <SelectTrigger :class="['w-full !h-10 rounded-sm disabled:bg-gray-200', customizeClass ? customizeClass : '']" :disabled="disabled">
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <template v-for="(group, index) in options" :key="index">
        <SelectGroup>
          <SelectLabel>{{ group.label }}</SelectLabel>
          <SelectItem
            v-for="option in group.items"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </SelectItem>
        </SelectGroup>
      </template>
    </SelectContent>
  </Select>
</template>

<script lang="ts" setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const props = defineProps<{
  options: {
    label: string
    items: { value: string; label: string }[]
  }[]
  placeholder?: string
  disabled?: boolean
  customizeClass?: string
}>()

const placeholder = props.placeholder ?? 'Selecione uma opção'

</script>
