<template>
  <Dialog v-model:open="open" >
    <DialogContent :key="open ? 'open' : 'closed'"
      class="sm:max-w-[425px] md:max-w-[600px] grid grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]"
    >
      <DialogHeader class="pt-2 px-4 pb-2 border-b border-gray-300">

        <DialogTitle
          class="truncate text-start max-w-[200px] md:max-w-[300px] text-2xl font-semibold"
          :title="title"
        >
          {{ title }}
        </DialogTitle>
      </DialogHeader>

      <div class="overflow-y-auto px-4 py-4">
        <slot name="body" />
      </div>

      <DialogFooter v-if="isShowFooter" class="w-full px-4 pb-2">
        <slot name="actions" />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

interface Props {
  title: string
  isShowFooter?: boolean
}
const open = defineModel<boolean>('open')
defineProps<Props>()
</script>
