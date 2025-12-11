<template>

    <div class="flex justify-end w-full gap-x-2">

        <button
            @click="$emit('clearForm')"
            class="flex gap-x-3 items-center bg-gray-400 text-white p-2 rounded-sm cursor-pointer hover:bg-gray-500 duration-300 disabled:opacity-35 disabled:hover:bg-gray-400 disabled:cursor-not-allowed" :disabled="disabled">
            <Eraser class="text-white w-5 h-5" />
            Limpar
        </button>

        <button v-if="method === 'add' || (method === 'edit' && disabled === false)"
            type="submit" 
            :form="formId"
            class="flex gap-x-3 items-center bg-green-600 text-white p-2 rounded-sm cursor-pointer hover:bg-green-700 duration-300">
            <Save class="text-white w-5 h-5" />
            Salvar
        </button>

        <button v-if="method === 'edit' && disabled === true" @click="$emit('editAction')"
            class="flex gap-x-3 items-center bg-blue-600 text-white p-2 rounded-sm cursor-pointer hover:bg-blue-700 duration-300">
            <Edit class="text-white w-5 h-5" />
            Editar
        </button>

        <button v-if="method === 'filter'" @click="$emit('filterAction')"
            type="submit" 
            :form="formId"
            class="flex gap-x-3 items-center bg-blue-600 text-white p-2 rounded-sm cursor-pointer hover:bg-blue-700 duration-300">
            <Edit class="text-white w-5 h-5" />
            Filtrar
        </button>

    </div>


</template>
<script setup lang="ts">
import { Save, Eraser, Edit } from "lucide-vue-next";

interface Props {
    method: "add" | "edit" | "filter"
    disabled?: boolean
    formId: string
}

defineEmits(["editAction", "clearForm", "filterAction"])
defineProps<Props>()



</script>