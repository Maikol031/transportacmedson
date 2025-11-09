<template>
    <ModalScrollBody v-model:open="open" :title="'Filtros'" :is-show-footer="true">
        <template #body>
            <form id="mainForm" @submit.prevent="submitForm()" class="form">

                <div class="columns">

                    <LabelValidation label="Nome do Motorista" class="w-full">
                        <InputTextDefault v-model:model="motoristasInstance.nome"/>
                    </LabelValidation>

                    <LabelValidation label="CPF" class="w-full md:w-90">
                        <InputTextDefault v-model:model="motoristasInstance.cpf" mask="cpf"
                            :max-length="14" />
                    </LabelValidation>

                </div>

                <div class="columns">

                    <LabelValidation label="Telefone / WhatsApp" class="w-full">
                        <InputTextDefault v-model:model="motoristasInstance.telefone" mask="telefone" :max-length="15" />
                    </LabelValidation>

                    <LabelValidation label="CNH" class="w-full">
                        <InputTextDefault v-model:model="motoristasInstance.cnh" mask="cnh" />
                    </LabelValidation>

                </div>

                <div class="columns">

                    <LabelValidation label="Validade CNH" class="w-full">
                        <DatePicker v-model="motoristasInstance.validadeCnh"/>
                    </LabelValidation>

                    <LabelValidation label="Categoria CNH" class="w-full">
                        <InputTextDefault v-model:model="motoristasInstance.categoriaCnh"/>
                    </LabelValidation>

                    <LabelValidation label="Status" class="w-full">
                        <SelectScroll v-model="motoristasInstance.status"
                            :options="[{ label: 'Status', items: [{ value: 'Ativo', label: 'Ativo' }, { value: 'Inativo', label: 'Inativo' }] }]"
                        />
                    </LabelValidation>

                </div>

            </form>

        </template>
        <template #actions>
            <CommonButtonsFooterModal 
                :method="'filter'" 
                form-id="mainForm" 
                @clear-form="clearForm" 
            />
        </template>
    </ModalScrollBody>
</template>
<script setup lang="ts">
import CommonButtonsFooterModal from '@/components/CommonButtonsFooterModal.vue';
import InputTextDefault from '@/components/ui/input/InputTextDefault.vue';
import ModalScrollBody from '@/components/ModalScrollBody.vue';
import LabelValidation from '@/components/LabelValidation.vue';
import type { ICaminhoes } from '@/interfaces/ICaminhoes';
import SelectScroll from '@/components/SelectScroll.vue';
import DatePicker from '@/components/DatePicker.vue';
import Motoristas from '@/entities/Motoristas';
import { ref, watch } from 'vue';

interface Props {
    open: boolean
    items?: ICaminhoes | {}
}

const props = defineProps<Props>()
const open = defineModel<boolean>('open')
const emit = defineEmits(["close", "filterValues"])

const motoristasInstance = ref<Motoristas>(new Motoristas())

const submitForm = async () => {
    emit('filterValues', motoristasInstance.value.toJSON())
    emit('close', false)
}

const clearForm = () => {
    motoristasInstance.value.clear()
}

watch(() => props.open, (value: boolean) => {
    if (!value) {
        Object.assign(motoristasInstance.value, new Motoristas())
        return
    }
    if (props.items) {
        Object.assign(motoristasInstance.value, props.items)
    }
})


</script>
<style scoped>
@reference "@/index.css";

.columns {
    @apply flex flex-col md:flex md:flex-row justify-between gap-x-3 gap-y-4;
}

.form {
    @apply flex flex-col space-y-4;
}
</style>