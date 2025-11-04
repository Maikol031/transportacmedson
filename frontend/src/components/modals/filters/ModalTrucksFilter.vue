<template>
    <ModalScrollBody 
        v-model:open="open" 
        :title="'Filtros'" 
        :is-show-footer="true"
    >
        <template #body>
            <form id="mainForm" ref="mainForm" @submit.prevent="submitForm($event)" class="flex flex-col gap-y-4">

            </form>
    
        </template>
        <template #actions>

            <div class="flex justify-end w-full">
                <button
                    class="flex gap-x-3 items-center bg-blue-600 text-white p-2 rounded-sm cursor-pointer hover:bg-blue-700 duration-300"
                >
                    <Edit class="text-white w-5 h-5" />
                    Editar
                </button>
                <button
                    type="submit"
                    form="mainForm"
                    class="flex gap-x-3 items-center bg-green-600 text-white p-2 rounded-sm cursor-pointer hover:bg-green-700 duration-300"
                >
                    <Save class="text-white w-5 h-5" />
                    Salvar
                </button>
            </div>

        </template>
    </ModalScrollBody>
</template>
<script setup lang="ts">
import ModalScrollBody from '@/components/ModalScrollBody.vue'
import { ref } from 'vue'

interface Props {
    open: boolean
    items?: any
}

const open = defineModel<boolean>('open')
const emit = defineEmits(["close"])

const mainForm = ref(null)
defineProps<Props>()

const submitForm = (method: any) => {
    console.log("teste", method)
}

</script>