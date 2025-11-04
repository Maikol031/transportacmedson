<template>
    <div class="flex flex-col">
        <label :for="label" class="flex items-center gap-x-1">
            <span :class="['text-md font-normal', customClassLabel]">
                {{ label }}
            </span>
            <span v-if="tooltip">
                <InfoIcon class="size-4"/>
            </span>
        </label>
        <slot :id="label"/>
        <span v-if="message" :class="['flex items-start gap-x-1 mt-1', type === 'error' ? 'text-red-600' : 'text-green-500']">
            <CircleX v-if="type === 'error'" class="size-2 flex-shrink-0 mt-[4px]"/> 
            <CircleCheck v-if="type === 'success'" class="size-2 flex-shrink-0 mt-[4px]"/>
            <span class="break-words leading-snug text-xs">{{ message }}</span>
        </span>
    </div>
</template>
<script setup lang="ts">
import { withDefaults } from 'vue'
import { CircleX, CircleCheck, InfoIcon } from 'lucide-vue-next'

interface Props {
    label?: string
    message?: string
    type?: "success" | "error"
    customClassLabel?: string
    tooltip?: string
}

withDefaults(defineProps<Props>(),{
    type: "error"
})


</script>
