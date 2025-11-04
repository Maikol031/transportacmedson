<template>
    <ModalScrollBody v-model:open="open" :title="method === 'add' ? 'Novo Registro' : 'Editar'" :is-show-footer="true">
        <template #body>
            <form id="mainForm" ref="mainForm" @submit.prevent="submitForm()" class="flex flex-col space-y-4">
                <div class="flex flex-col md:flex md:flex-row justify-between gap-x-1 gap-y-4">

                    <LabelValidation label="Placa" class="w-full md:w-90" :message="(v$?.placa?.$errors[0]?.$message) as string || ''">
                        <input v-model="user.placa" type="text" class="w-full rounded-sm px-2 h-10 border border-gray-300 focus:border-main focus:ring-main" />
                    </LabelValidation>

                    <LabelValidation label="Modelo" class="w-full" :message="(v$?.modelo?.$errors[0]?.$message) as string || ''">
                        <input v-model="user.modelo" type="text" class="w-full rounded-sm px-2 h-10 border border-gray-300 focus:border-main focus:ring-main" />
                    </LabelValidation>

                </div>
                <div class="flex flex-col md:flex md:flex-row justify-between gap-x-1 gap-y-4">

                    <LabelValidation label="Data Venc. Tacografo" :message="(v$?.placa?.$errors[0]?.$message) as string || ''" class="w-full md:w-90"> 
                        <DatePicker />
                    </LabelValidation>

                    <LabelValidation  label="Kilometragem" :message="(v$?.modelo?.$errors[0]?.$message) as string || ''" class="w-full">
                        <input v-model="user.modelo" type="text" class="w-full rounded-sm px-2 h-10 border border-gray-300 focus:border-main focus:ring-main" />
                    </LabelValidation>

                </div>
            </form> 

        </template>
        <template #actions>

            <div class="flex justify-end w-full gap-x-1">
                <button
                    class="flex gap-x-3 items-center bg-gray-400 text-white p-2 rounded-sm cursor-pointer hover:bg-gray-500 duration-300">
                    <Eraser class="text-white w-5 h-5" />
                    Limpar
                </button>
                <button type="submit" form="mainForm"
                    class="flex gap-x-3 items-center bg-green-600 text-white p-2 rounded-sm cursor-pointer hover:bg-green-700 duration-300">
                    <Save class="text-white w-5 h-5" />
                    Salvar
                </button>
            </div>

        </template>
    </ModalScrollBody>
</template>
<script setup lang="ts">
import { required, helpers, minLength } from '@vuelidate/validators';
import ModalScrollBody from '@/components/ModalScrollBody.vue';
import LabelValidation from '@/components/LabelValidation.vue';
import DatePicker from '@/components/DatePicker.vue';
import { useVuelidate } from '@vuelidate/core';
import { Save, Eraser } from "lucide-vue-next";
import { reactive, ref, watch } from 'vue';

const user = reactive({
    placa: '',
    modelo: ''
})

const rules = {
    placa: {
        required: helpers.withMessage('Campo Obrigatório', required),
        minLength: helpers.withMessage('O campo deve possuir no minímo 4 caracteres', minLength(4)),
    },
    modelo: {
        required: helpers.withMessage('Campo Obrigatório', required),
    }
}

const v$ = useVuelidate(rules, user, { $lazy: true })


const submitForm = async () => {
    const valid = await v$.value.$validate()
    if (!valid) {
        return
    }
    console.log('Formulário válido', user)
}

interface Props {
    open: boolean
    items?: any
    method: "add" | "edit"
}

const open = defineModel<boolean>('open')
const emit = defineEmits(["close"])

const mainForm = ref(null)
const props = defineProps<Props>()


watch(() => props.open, () => {
    // v$.value.email?.$touch()
})


</script>