<template>
    <ModalScrollBody v-model:open="open" :title="'Filtros'" :is-show-footer="true">
               <template #body>
            <form id="mainForm" @submit.prevent="submitForm()" class="form">

                <div class="columns">

                    <LabelValidation label="Placa" class="w-full md:w-90">
                        <InputTextDefault v-model:model="caminhoesInstance.placa"/>
                    </LabelValidation>

                    <LabelValidation label="Marca" class="w-full">
                        <InputTextDefault v-model:model="caminhoesInstance.modelo"/>
                    </LabelValidation>

                </div>

                <div class="columns">

                    <LabelValidation label="Modelo" class="w-full">
                        <InputTextDefault v-model:model="caminhoesInstance.modelo"/>
                    </LabelValidation>

                    <LabelValidation label="Data Venc. Tacografo" class="w-full md:w-90">
                        <DatePicker v-model="caminhoesInstance.dataVencTacografo"/>
                    </LabelValidation>

                </div>

                <div class="columns">
                    <LabelValidation label="Kilometragem" class="w-full">
                        <InputTextDefault v-model:model="caminhoesInstance.kilometragem"/>
                    </LabelValidation>

                    <LabelValidation label="Validade AET" class="w-full md:w-90">
                        <DatePicker v-model="caminhoesInstance.dh_inc"/>
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
import Caminhoes from '@/entities/Caminhoes';
import { ref, watch } from 'vue';

interface Props {
    open: boolean
    items?: ICaminhoes | {}
}

const props = defineProps<Props>()
const open = defineModel<boolean>('open')
const emit = defineEmits(["close", "filterValues"])

const caminhoesInstance = ref<Caminhoes>(new Caminhoes())

const submitForm = async () => {
    emit('filterValues', caminhoesInstance.value.toJSON())
    emit('close', false)
}

const clearForm = () => {
    caminhoesInstance.value.clear()
}

watch(() => props.open, (value: boolean) => {
    if (!value) {
        Object.assign(caminhoesInstance.value, new Caminhoes())
        return
    }
    if (props.items) {
        Object.assign(caminhoesInstance.value, props.items)
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