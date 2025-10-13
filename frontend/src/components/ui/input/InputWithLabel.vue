<template>

    <div>

        <label class="block text-sm font-medium text-gray-600">
            {{ label }}
        </label>

        <input
            v-model="model" 
            :type="type" 
            :placeholder="placeHolder" 
            :class="[
            'mt-1 block w-full rounded-sm px-2 h-10 border-gray-300 shadow-sm focus:border-main focus:ring-main',
            customizeClass
            ]"
        />

    </div>


</template>
<script setup lang="ts">

interface IProps {
    type?: string
    placeHolder?: string
    customizeClass?: string
    label: string
}


withDefaults(defineProps<IProps>(), {
    type: "text"
})

const model = defineModel<string | number>()


</script>