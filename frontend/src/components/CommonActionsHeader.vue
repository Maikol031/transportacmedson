<template>
    <div class=" flex items-end justify-end gap-x-2">
        <Button v-if="isFilterBtn" @click="$emit('filter')" class="default-btn">
            <span class="flex items-center gap-x-2 text-md">
                <ListFilter class="size-5" /> Filtros
            </span>
        </Button>
        <Button v-if="isNewRegisterBtn" @click="$emit('newRegister')" class="new-register-btn">
            <span class="flex items-center gap-x-2">
                <PlusIcon class="size-5" /> Novo Registro
            </span>
        </Button>
    </div>

</template>
<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { ListFilter, PlusIcon } from "lucide-vue-next";
import { defineProps, defineEmits } from 'vue';

interface Props {
    isFilterBtn?: boolean
    isNewRegisterBtn?: boolean
}


defineEmits(["filter", "newRegister"])
defineProps<Props>();

</script>
<style>
@reference "../index.css";

.default-btn {
    @apply bg-white border border-gray-200 h-10 rounded-sm justify-end hover:bg-stone-50 text-black cursor-pointer transition duration-300;
}

.new-register-btn {
    @apply bg-main border border-gray-200 h-10 rounded-sm justify-end hover:bg-main-hover text-white cursor-pointer transition duration-300;
}

</style>