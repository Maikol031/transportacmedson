<template>
    <ModalScrollBody v-model:open="open" :title="method === 'add' ? 'Novo Registro' : 'Editar'" :is-show-footer="true" size-modal="md:max-w-[800px]">
        <template #body>
            <form id="mainForm" @submit.prevent="submitForm()" class="form">

                <div class="grid grid-cols-2 gap-x-4">

                    <LabelValidation label="Número Contrato" class="w-full">
                        <InputTextDefault 
                            v-model:model="contratoInstance.nroContrato" 
                            :disabled="disabled" 
                        />
                    </LabelValidation>

                    <LabelValidation label="Cliente" class="w-full"
                        :message="(v$?.cliente?.id.$errors[0]?.$message) as string || ''">
                        <InputSearch 
                            v-model="contratoInstance.cliente.id" 
                            :disabled="disabled"
                        />
                    </LabelValidation>

                </div>

                <div class="grid grid-cols-4 gap-x-4">

                    <LabelValidation label="Data Emissão"
                        :message="(v$?.dtEmiss?.$errors[0]?.$message) as string || ''">
                        <DatePicker 
                            v-model="contratoInstance.dtEmiss" 
                            :disabled="disabled" 
                        />
                    </LabelValidation>

                    <LabelValidation label="Data Saída"
                        :message="(v$?.dtSaida?.$errors[0]?.$message) as string || ''">
                        <DatePicker 
                            v-model="contratoInstance.dtSaida" 
                            :disabled="disabled" 
                        />
                    </LabelValidation>

                    <LabelValidation label="Origem" class="col-span-2"
                        :message="(v$?.origem?.id?.$errors[0]?.$message) as string || ''">
                        <InputSearch 
                            v-model="contratoInstance.origem.id" 
                            :disabled="disabled"
                        />
                    </LabelValidation>
 
                </div>

                <div class="grid grid-cols-4 gap-x-4">

                    <LabelValidation label="Destino" class="col-span-2"
                        :message="(v$?.destino?.id?.$errors[0]?.$message) as string || ''">
                        <InputSearch 
                            v-model="contratoInstance.destino.id" 
                            class="w-full" :disabled="disabled"
                        />
                    </LabelValidation>

                    <LabelValidation 
                        label="Placa" 
                        :message="(v$?.placa?.$errors[0]?.$message) as string || ''"
                    >
                        <SelectScroll  
                            v-model:model="contratoInstance.statusViagem" 
                            customize-class="bg-white" :disabled="disabled"
                            :options="[{ label: 'Placa', 
                                items: 
                                [
                                    { value: '0', label: 'CPI-2140' }, 
                                    { value: '1', label: 'GHJ-L541' }
                                ] 
                            }]" 
                        />
                    </LabelValidation>

                    <LabelValidation 
                        label="Peso(T)"
                        :message="(v$?.pesoT?.$errors[0]?.$message) as string || ''"
                    >
                        <Input
                            type="number" 
                            v-model="contratoInstance.pesoT" 
                            :is-disabled="disabled" 
                            :max-chars="3"
                        />
                    </LabelValidation>

                </div>
                <div class="grid grid-cols-4 gap-x-4">

                    <LabelValidation label="Valor Unitário Tonelada"
                        :message="(v$?.valorUnit?.$errors[0]?.$message) as string || ''">
                        <InputCurrency 
                            v-model="contratoInstance.valorUnit" 
                            :is-disabled="disabled" 
                        />
                    </LabelValidation>

                    <LabelValidation label="Valor Total"
                        :message="(v$?.valorTotal?.$errors[0]?.$message) as string || ''">
                        <InputCurrency 
                            v-model="contratoInstance.valorTotal" 
                            :is-disabled="disabled" 
                        />
                    </LabelValidation>

                    <LabelValidation label="Valor Pago">
                        <InputCurrency 
                            v-model="contratoInstance.valorPago" 
                            :is-disabled="disabled" 
                        />
                    </LabelValidation>

                    <LabelValidation label="Valor a Receber">
                        <InputCurrency 
                            v-model="contratoInstance.valorReceb" 
                            :is-disabled="disabled" 
                        />
                    </LabelValidation>

                </div>
                <div class="grid grid-cols-2 gap-x-4">

                    <LabelValidation 
                        label="Status Vigem"
                        :message="(v$?.statusViagem?.$errors[0]?.$message) as string || ''"
                    >
                        <SelectScroll  
                            v-model:model="contratoInstance.statusViagem" 
                            customize-class="bg-white" :disabled="disabled"
                            :options="[{ label: 'Status Vigem', 
                                items: 
                                [
                                    { value: '0', label: 'Em Andamento' }, 
                                    { value: '1', label: 'Finalizado' }
                                ] 
                            }]" 
                        />
                    </LabelValidation>

                    <LabelValidation 
                        label="Status Contrato"
                        :message="(v$?.statusContrato?.$errors[0]?.$message) as string || ''"
                    >
                        <SelectScroll 
                            v-model:model="contratoInstance.statusContrato" 
                            customize-class="bg-white" 
                            :disabled="disabled"
                            :options="[{ label: 'Status Contrato', 
                                items: 
                                [
                                    { value: '0', label: 'Aberto' }, 
                                    { value: '1', label: 'Concluído' }
                                ] 
                            }]" 
                        />
                    </LabelValidation>

                </div>

            </form>

        </template>
        <template #actions>
            <CommonButtonsFooterModal 
                :method="method" 
                :disabled="disabled" 
                form-id="mainForm"
                @edit-action="editForm"
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
import SelectScroll from '@/components/SelectScroll.vue';
import DatePicker from '@/components/DatePicker.vue';
import { useVuelidate } from '@vuelidate/core';

import { ref, watch, watchEffect } from 'vue';
import { computed } from 'vue';
import InputSearch from '@/components/ui/input/InputSearch.vue';

import Contrato from '@/entities/Contrato';
import type { IContrato } from '@/interfaces/IContrato';
import Input from '@/components/ui/input/Input.vue';
import InputCurrency from '@/components/ui/input/InputCurrency.vue';


interface Props {
    open: boolean
    items?: IContrato | {}
    method: "add" | "edit"
}

const props = defineProps<Props>()
const open = defineModel<boolean>('open')
const emit = defineEmits(["close"])
const fieldsLocked = ref<boolean>(true);
const disabled = computed(() => props.method === 'edit' && fieldsLocked.value)

const contratoInstance = ref<Contrato>(new Contrato())

const v$ = useVuelidate(contratoInstance.value.rules, contratoInstance.value)

const submitForm = async () => {
    const valid = await v$.value.$validate()
    if (!valid) {
        return
    }
    contratoInstance.value.post(contratoInstance.value.toJSON())
    fieldsLocked.value = true
}

const clearForm = () => {
    contratoInstance.value.clear(props.method === "edit")
    v$.value.$reset()
}

const editForm = () => {
    fieldsLocked.value = !fieldsLocked.value
}

watch(
  () => [contratoInstance.value.valorUnit, contratoInstance.value.pesoT],
  ([valorUnit, pesoT]) => {
    const unit = Number(valorUnit);
    const peso = Number(pesoT);

    if (isNaN(unit) || isNaN(peso)) {

      return;
    }

    contratoInstance.value.valorTotal = unit * peso;
  }
);


watch(() => props.open, (value: boolean) => {
    if (!value) {
        Object.assign(contratoInstance.value, new Contrato())
        v$.value.$reset()
        return
    }
    if (props.method === "edit") {
        console.log(props.items)
        Object.assign(contratoInstance.value, props.items)
        fieldsLocked.value = true;
        return
    }
    Object.assign(contratoInstance.value, new Contrato())
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