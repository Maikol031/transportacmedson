<template>
  <Dialog v-model:open="open">
    <DialogContent :key="open ? 'open' : 'closed'"
      :class="['sm:max-w-[425px] md:max-w-[600px] grid grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]', sizeModal ? sizeModal : 'md:max-w-[600px]']">
      <DialogHeader class="py-2 px-4 border-b border-gray-300">

        <DialogTitle v-if="title" class="flex text-center items-center max-w-[200px] md:max-w-[600px] break-words gap-x-3"
          :title="title">
          <span class="text-2xl font-semibold">
            {{ title }} 
          </span>
          <span v-if="subTitle">
            -
          </span>
          <span v-if="subTitle" :title="subTitle ? subTitle : ''"
            :class="['flex flex-col text-[12px]  p-1 px-2 rounded-md w-30', customizeClass ?  customizeClass : '' ]">
            <p class="break-words">
              {{ subTitle }}
            </p>
          </span>
        </DialogTitle>
        <slot v-if="isShowTitleModify" name="titleModify" />
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
  title?: string
  isShowFooter?: boolean
  isShowTitleModify?: boolean
  sizeModal?: string
  subTitle?: string
  customizeClass?: string
}
const open = defineModel<boolean>('open')
defineProps<Props>()
</script>
