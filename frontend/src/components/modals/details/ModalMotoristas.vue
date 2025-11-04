<template>
    <ModalScrollBody v-model:open="open" :title="method === 'add' ? 'Novo Registro' : 'Editar'" :is-show-footer="true">
        <template #body>
            <form id="mainForm" @submit.prevent="submitForm()" class="form">

                <div class="columns">

                    <LabelValidation label="Nome do Motorista" class="w-full"
                        :message="(v$?.nome?.$errors[0]?.$message) as string || ''">
                        <InputTextDefault v-model:model="motoristasInstance.nome" :disabled="disabled" />
                    </LabelValidation>

                    <LabelValidation label="CPF" class="w-full md:w-90"
                        :message="(v$?.cpf?.$errors[0]?.$message) as string || ''">
                        <InputTextDefault v-model:model="motoristasInstance.cpf" :disabled="disabled" mask="cpf"
                            :max-length="14" />
                    </LabelValidation>

                </div>

                <div class="columns">

                    <LabelValidation label="Telefone / WhatsApp" class="w-full"
                        :message="(v$?.telefone?.$errors[0]?.$message) as string || ''">
                        <InputTextDefault v-model:model="motoristasInstance.telefone" :disabled="disabled"
                            mask="telefone" :max-length="15" />
                    </LabelValidation>

                    <LabelValidation label="CNPJ" class="w-full"
                        :message="(v$?.cnpj?.$errors[0]?.$message) as string || ''">
                        <InputTextDefault v-model:model="motoristasInstance.cnpj" :disabled="disabled" mask="cnpj"
                            :max-length="18" />
                    </LabelValidation>

                </div>

                <div class="columns">

                    <LabelValidation label="CNH" class="w-full"
                        :message="(v$?.cnh?.$errors[0]?.$message) as string || ''">
                        <InputTextDefault v-model:model="motoristasInstance.cnh" :disabled="disabled" mask="cnh" />
                    </LabelValidation>

                    <LabelValidation label="Validade CNH" class="w-full"
                        :message="(v$?.validadeCnh?.$errors[0]?.$message) as string || ''">
                        <DatePicker v-model="motoristasInstance.validadeCnh" :disabled="disabled" />
                    </LabelValidation>


                </div>

                <div class="columns">
                    <LabelValidation label="Placa do Veículo" class="w-full"
                        :message="(v$?.placaVeiculo?.$errors[0]?.$message) as string || ''">
                        <InputTextDefault v-model:model="motoristasInstance.placaVeiculo" :disabled="disabled" />
                    </LabelValidation>

                    <LabelValidation label="Categoria CNH" class="w-full"
                        :message="(v$?.categoriaCnh?.$errors[0]?.$message) as string || ''">
                        <InputTextDefault v-model:model="motoristasInstance.categoriaCnh" :disabled="disabled" />
                    </LabelValidation>



                </div>
                <div class="columns">

                    <LabelValidation label="Tipo de Vínculo" class="w-full"
                        :message="(v$?.tipoVinculo?.$errors[0]?.$message) as string || ''">
                        <InputTextDefault v-model:model="motoristasInstance.tipoVinculo" :disabled="disabled" />
                    </LabelValidation>


                    <LabelValidation label="Status" class="w-full"
                        :message="(v$?.status?.$errors[0]?.$message) as string || ''">
                        <SelectScroll v-model="motoristasInstance.status"
                            :options="[{ label: 'Status', items: [{ value: 'Ativo', label: 'Ativo' }, { value: 'Inativo', label: 'Inativo' }] }]"
                            :disabled="disabled" />
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
import InputTextDefault from '@/components/ui/input/InputTextDefault.vue';
import ModalScrollBody from '@/components/ModalScrollBody.vue';
import LabelValidation from '@/components/LabelValidation.vue';
import type { ICaminhoes } from '@/interfaces/ICaminhoes';
import DatePicker from '@/components/DatePicker.vue';
import { useVuelidate } from '@vuelidate/core';
import Motoristas from '@/entities/Motoristas';
import { ref, watch } from 'vue';
import { computed } from 'vue';
import SelectScroll from '@/components/SelectScroll.vue';

interface Props {
    open: boolean
    items?: ICaminhoes | {}
    method: "add" | "edit"
}

const props = defineProps<Props>()
const open = defineModel<boolean>('open')
const emit = defineEmits(["close"])
const fieldsLocked = ref<boolean>(true);
const disabled = computed(() => props.method === 'edit' && fieldsLocked.value)

const motoristasInstance = ref<Motoristas>(new Motoristas())

const v$ = useVuelidate(motoristasInstance.value.rules, motoristasInstance.value)

const submitForm = async () => {
    const valid = await v$.value.$validate()
    motoristasInstance.value.create(motoristasInstance.value.toJSON())
    if (!valid) {
        return
    }
    fieldsLocked.value = true
}

const clearForm = () => {
    motoristasInstance.value.clear(props.method === "edit")
    v$.value.$reset()
}

const editForm = () => {
    fieldsLocked.value = !fieldsLocked.value
}

watch(() => props.open, (value: boolean) => {
    if (!value) {
        Object.assign(motoristasInstance.value, new Motoristas())
        v$.value.$reset()
        return
    }
    if (props.method === "edit") {
        console.log(props.items)
        Object.assign(motoristasInstance.value, props.items)
        fieldsLocked.value = true;
        return
    }
    Object.assign(motoristasInstance.value, new Motoristas())
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