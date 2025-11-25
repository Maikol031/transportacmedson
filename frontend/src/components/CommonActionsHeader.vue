<template>
    <div class="flex items-end justify-end gap-x-2">
       
        <Button v-if="isDeleteBtn" @click="countItems ? $emit('delete') : ''" :class="['hidden md:block', countItems ? 'delete-btn' : 'disable-delete-btn']">
            <span class="flex items-center gap-x-2 text-md">
                <Trash2Icon class="size-5" /> Excluir ({{countItems}})
            </span>
        </Button>
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
import { ListFilter, PlusIcon, Trash2Icon } from "lucide-vue-next";
import Button from '@/components/ui/button/Button.vue';
import { defineProps, defineEmits } from 'vue';

interface Props {
    isFilterBtn?: boolean
    isNewRegisterBtn?: boolean
    isDeleteBtn?: boolean
    countItems?: number
}


defineEmits(["filter", "newRegister", "delete"])
defineProps<Props>();

</script>
<style>
@reference "../index.css";

.default-btn {
    @apply bg-white border border-gray-200 h-10 rounded-sm justify-end hover:bg-stone-50 text-black cursor-pointer transition duration-300;
}

.delete-btn {
    @apply bg-red-500/95 border border-red-400 h-10 rounded-sm justify-end hover:bg-red-600 text-white cursor-pointer transition duration-300 min-w-[129.89px];
}

.disable-delete-btn {
    @apply bg-gray-800/50 border h-10 rounded-sm justify-end text-white cursor-not-allowed transition duration-300 blur-[0.8px] min-w-[129.89px];
}

.new-register-btn {
    @apply bg-main border border-gray-200 h-10 rounded-sm justify-end hover:bg-main-hover text-white cursor-pointer transition duration-300;
}

</style>