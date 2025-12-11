<template>
    <ModalScrollBody v-model:open="open" :title="method === 'add' ? 'Novo Registro' : 'Editar'" :is-show-footer="true"
        size-modal="md:max-w-[900px]">
        <template #body>
            <form id="mainForm" @submit.prevent="submitForm()" class="form">

                <div class="columns">

                    <LabelValidation label="Tipo de Despesa" class="w-full"
                        :message="(v$?.tipoDespesa?.$errors[0]?.$message) as string || ''">
                        <SelectScroll 
                            v-model="pagamentosInstance.tipoDespesa" 
                            customize-class="bg-white"
                            :disabled="disabled"
                            :options="[{ 
                                label: 'Tipo', 
                                items: [{ value: '0', label: 'Abastecimento' }, { value: '1', label: 'Avaria' }, { value: '2', label: 'Nenhuma' }] }]" 
                            />
                    </LabelValidation>

                    <LabelValidation :message="(v$?.valor?.$errors[0]?.$message) as string || ''"
                        v-model="pagamentosInstance.valor" label="Valor" class="w-full">
                        <InputCurrency
                            :is-disabled="disabled" 
                            :show-prefix="true" 
                            :max-digits="3" 
                            class="bg-white" 
                        />
                    </LabelValidation>

                </div>

                <div class="columns">

                    <LabelValidation label="Placa" class="w-full md:max-w-60 md:min-w-60">
                        <SelectScroll
                            v-model="pagamentosInstance.placa" customize-class="bg-white" 
                            :disabled="!fieldsLocked && (pagamentosInstance.tipoDespesa === '0' || pagamentosInstance.tipoDespesa === '1') ? false : true"
                            :options="[{ label: 'Placa', items: [{ value: '0', label: 'NHDJ-5522' }, { value: '1', label: 'kHYJ-3582' }] }]" />
                    </LabelValidation>

                    <LabelValidation label="Posto" class="w-full">
                        <SelectScroll v-model="pagamentosInstance.posto" customize-class="bg-white" 
                        :disabled="!fieldsLocked && pagamentosInstance.tipoDespesa === '0' ? false : true "
                            :options="[{ label: 'Posto', items: [{ value: '0', label: 'Morada do Sol' }, { value: '1', label: 'Posto Decio' }] }]" />
                    </LabelValidation>

                    <LabelValidation label="Data Pagamento" class="w-full md:w-100"
                        :message="(v$?.dtPagamento?.$errors[0]?.$message) as string || ''">
                        <DatePicker v-model="pagamentosInstance.dtPagamento" :disabled="disabled" />
                    </LabelValidation>
                </div>

                <div>
                    <LabelValidation v-model="pagamentosInstance.observacao" label="Observação"
                        class="w-full md:w-full">
                        <textarea 
                            :disabled="disabled"
                            maxlength="1000"
                            class="w-full border border-gray-300 rounded-md p-2 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:bg-gray-100 disabled:border-none"></textarea>
                    </LabelValidation>

                </div>

            </form>

        </template>
        <template #actions>
            <CommonButtonsFooterModal :method="method" :disabled="disabled" form-id="mainForm" @edit-action="editForm"
                @clear-form="clearForm" />
        </template>
    </ModalScrollBody>
</template>
<script setup lang="ts">
import CommonButtonsFooterModal from '@/components/CommonButtonsFooterModal.vue';
import InputCurrency from '@/components/ui/input/InputCurrency.vue';
import ModalScrollBody from '@/components/ModalScrollBody.vue';
import LabelValidation from '@/components/LabelValidation.vue';
import { type IPagamentos } from '@/interfaces/IPagamentos';
import SelectScroll from '@/components/SelectScroll.vue';
import DatePicker from '@/components/DatePicker.vue';
import { useVuelidate } from '@vuelidate/core';
import Pagamentos from '@/entities/Pagamentos';
import { ref, watch } from 'vue';
import { computed } from 'vue';

interface Props {
    open: boolean
    items?: IPagamentos | {}
    method: "add" | "edit"
}

const props = defineProps<Props>()
const open = defineModel<boolean>('open')
const emit = defineEmits(["close"])
const fieldsLocked = ref<boolean>(false);
const disabled = computed(() => props.method === 'edit' && fieldsLocked.value)

const pagamentosInstance = ref<Pagamentos>(new Pagamentos())

const v$ = useVuelidate(pagamentosInstance.value.rules, pagamentosInstance.value)

const submitForm = async () => {
    const valid = await v$.value.$validate()
    if (!valid) {
        return
    }
    pagamentosInstance.value.post(pagamentosInstance.value.toJSON())
    fieldsLocked.value = true
}

const clearForm = () => {
    pagamentosInstance.value.clear(props.method === "edit")
    v$.value.$reset()
}

const editForm = () => {
    fieldsLocked.value = !fieldsLocked.value
}

watch(() => props.open, (value: boolean) => {
    if (!value) {
        Object.assign(pagamentosInstance.value, new Pagamentos())
        v$.value.$reset()
        return
    }
    if (props.method === "edit") {
        console.log(props.items)
        Object.assign(pagamentosInstance.value, new Pagamentos(props.items))
        console.log(pagamentosInstance.value)
        fieldsLocked.value = true;
        return
    }
    Object.assign(pagamentosInstance.value, new Pagamentos())
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