<template>

    <div>

        <label class="block text-sm font-medium text-gray-600">
            {{ label }}
        </label>
        <slot/>

    </div>

</template>
<script setup lang="ts">

interface IProps {
    label: string
}

defineProps<IProps>()

</script>