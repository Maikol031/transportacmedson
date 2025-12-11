<template>
    <ModalScrollBody v-model:open="open" :title="'Filtros'" :is-show-footer="true" size-modal="md:max-w-[800px]">
        <template #body>
            <form id="mainForm" @submit.prevent="submitForm()" class="form">

                <div class="grid grid-cols-2 gap-x-4">

                    <LabelValidation label="Número Contrato" class="w-full">
                        <InputTextDefault v-model:model="contratoInstance.nroContrato"/>
                    </LabelValidation>

                    <LabelValidation label="Cliente" class="w-full">
                        <InputSearch v-model="contratoInstance.cliente.id"/>
                    </LabelValidation>

                </div>

                <div class="grid grid-cols-4 gap-x-4">

                    <LabelValidation label="Data Emissão">
                        <DatePicker v-model="contratoInstance.dtEmiss"/>
                    </LabelValidation>

                    <LabelValidation label="Data Saída">
                        <DatePicker v-model="contratoInstance.dtSaida"/>
                    </LabelValidation>

                    <LabelValidation label="Origem" class="col-span-2">
                        <InputSearch v-model="contratoInstance.origem.id"/>
                    </LabelValidation>

                </div>

                <div class="grid grid-cols-4 gap-x-4">

                    <LabelValidation label="Destino" class="col-span-2">
                        <InputSearch v-model="contratoInstance.destino.id" class="w-full"/>
                    </LabelValidation>

                    <LabelValidation label="Placa">
                        <SelectScroll v-model:model="contratoInstance.statusViagem" customize-class="bg-white"
                            :options="[{
                                label: 'Placa',
                                items:
                                    [
                                        { value: '0', label: 'CPI-2140' },
                                        { value: '1', label: 'GHJ-L541' }
                                    ]
                            }]" />
                    </LabelValidation>

                    <LabelValidation label="Peso(T)">
                        <Input type="number" v-model="contratoInstance.pesoT" :max-chars="3" />
                    </LabelValidation>

                </div>
                <div class="grid grid-cols-4 gap-x-4">

                    <LabelValidation label="Valor Unitário Tonelada">
                        <InputCurrency v-model="contratoInstance.valorUnit"/>
                    </LabelValidation>

                    <LabelValidation label="Valor Total">
                        <InputCurrency v-model="contratoInstance.valorTotal"/>
                    </LabelValidation>

                    <LabelValidation label="Valor Pago">
                        <InputCurrency v-model="contratoInstance.valorPago"/>
                    </LabelValidation>

                    <LabelValidation label="Valor a Receber">
                        <InputCurrency v-model="contratoInstance.valorReceb"/>
                    </LabelValidation>

                </div>
                <div class="grid grid-cols-2 gap-x-4">

                    <LabelValidation label="Status Vigem">
                        <SelectScroll v-model:model="contratoInstance.statusViagem" customize-class="bg-white"
                            :options="[{
                                label: 'Status Vigem',
                                items:
                                    [
                                        { value: '0', label: 'Em Andamento' },
                                        { value: '1', label: 'Finalizado' }
                                    ]
                            }]" />
                    </LabelValidation>

                    <LabelValidation label="Status Contrato">
                        <SelectScroll v-model:model="contratoInstance.statusContrato" customize-class="bg-white"
                            :options="[{
                                label: 'Status Contrato',
                                items:
                                    [
                                        { value: '0', label: 'Aberto' },
                                        { value: '1', label: 'Concluído' }
                                    ]
                            }]" />
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
import InputCurrency from '@/components/ui/input/InputCurrency.vue';
import InputSearch from '@/components/ui/input/InputSearch.vue';
import ModalScrollBody from '@/components/ModalScrollBody.vue';
import LabelValidation from '@/components/LabelValidation.vue';
import type { ICaminhoes } from '@/interfaces/ICaminhoes';
import SelectScroll from '@/components/SelectScroll.vue';
import DatePicker from '@/components/DatePicker.vue';
import Input from '@/components/ui/input/Input.vue';
import Contrato from '@/entities/Contrato';
import { ref, watch } from 'vue';

interface Props {
    open: boolean
    items?: ICaminhoes | {}
}

const props = defineProps<Props>()
const open = defineModel<boolean>('open')
const emit = defineEmits(["close", "filterValues"])

const contratoInstance = ref<Contrato>(new Contrato())

const submitForm = async () => {
    emit('filterValues', contratoInstance.value.toJSON())
    emit('close', false)
}

const clearForm = () => {
    contratoInstance.value.clear()
}

watch(() => props.open, (value: boolean) => {
    if (!value) {
        Object.assign(contratoInstance.value, new Contrato())
        return
    }
    if (props.items) {
        Object.assign(contratoInstance.value, props.items)
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