<template>
    <ModalScrollBody v-model:open="open" :title="method === 'add' ? 'Novo Registro' : 'Editar'" :is-show-footer="true">
        <template #body>
            <form id="mainForm" @submit.prevent="submitForm()" class="form">

                <div class="columns">

                    <LabelValidation label="Placa" class="w-full md:w-90"
                        :message="(v$?.placa?.$errors[0]?.$message) as string || ''">
                        <InputTextDefault v-model:model="caminhoesInstance.placa" :disabled="disabled" />
                    </LabelValidation>

                    <LabelValidation label="Modelo" class="w-full"
                        :message="(v$?.modelo?.$errors[0]?.$message) as string || ''">
                        <InputTextDefault v-model:model="caminhoesInstance.modelo" :disabled="disabled" />
                    </LabelValidation>

                </div>

                <div class="columns">

                    <LabelValidation label="Data Venc. Tacografo" class="w-full md:w-90"
                        :message="(v$?.dataVencTacografo?.$errors[0]?.$message) as string || ''">
                        <DatePicker v-model="caminhoesInstance.dataVencTacografo" :disabled="disabled" />
                    </LabelValidation>

                    <LabelValidation label="Kilometragem" class="w-full"
                        :message="(v$?.kilometragem?.$errors[0]?.$message) as string || ''">
                        <InputTextDefault v-model:model="caminhoesInstance.kilometragem" :disabled="disabled" />
                    </LabelValidation>

                </div>

                <div class="columns">

                    <LabelValidation label="Emissão AET" class="w-full md:w-90"
                        :message="(v$?.emissaoAet?.$errors[0]?.$message) as string || ''">
                        <DatePicker v-model="caminhoesInstance.emissaoAet" :disabled="disabled" />
                    </LabelValidation>

                    <LabelValidation label="Número AET" class="w-full"
                        :message="(v$?.numeroAet?.$errors[0]?.$message) as string || ''">
                        <InputTextDefault v-model:model="caminhoesInstance.numeroAet" :disabled="disabled" />
                    </LabelValidation>

                </div>

                <div class="columns">

                    <LabelValidation label="Validade AET" class="w-full md:w-90"
                        :message="(v$?.validadeAet?.$errors[0]?.$message) as string || ''">
                        <DatePicker v-model="caminhoesInstance.validadeAet" :disabled="disabled" />
                    </LabelValidation>

                    <LabelValidation label="Situação AET" class="w-full"
                        :message="(v$?.situacaoAet?.$errors[0]?.$message) as string || ''">
                        <InputTextDefault v-model:model="caminhoesInstance.situacaoAet" :disabled="disabled" />
                    </LabelValidation>

                </div>

            </form>

        </template>
        <template #actions>
            <CommonButtonsFooterModal 
                :method="method" 
                :disabled="disabled" 
                form-id="mainForm" @edit-action="editForm"
                @clear-form="clearForm" />
        </template>
    </ModalScrollBody>
</template>
<script setup lang="ts">
import CommonButtonsFooterModal from '@/components/CommonButtonsFooterModal.vue';
import InputTextDefault from '@/components/ui/input/InputTextDefault.vue';
import ModalScrollBody from '@/components/ModalScrollBody.vue';
import LabelValidation from '@/components/LabelValidation.vue';
import DatePicker from '@/components/DatePicker.vue';
import type { ICaminhoes } from '@/interfaces/ICaminhoes';
import { useVuelidate } from '@vuelidate/core';
import Caminhoes from '@/entities/Caminhoes';
import { ref, watch } from 'vue';
import { computed } from 'vue';

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

const caminhoesInstance = ref<Caminhoes>(new Caminhoes())

const v$ = useVuelidate(caminhoesInstance.value.rules, caminhoesInstance.value)

const submitForm = async () => {
    const valid = await v$.value.$validate()
    caminhoesInstance.value.create(caminhoesInstance.value.toJSON())
    if (!valid) {
        return
    }
    fieldsLocked.value = true
}

const clearForm = () => {
    caminhoesInstance.value.clear(props.method === "edit")
    v$.value.$reset()
}

const editForm = () => {
    fieldsLocked.value = !fieldsLocked.value
}

watch(() => props.open, (value: boolean) => {
    if (!value) return
    v$.value.$reset()
    if (props.method === "edit") {
        console.log(props.items)
        Object.assign(caminhoesInstance.value, props.items)
        fieldsLocked.value = true;
        return
    }
    Object.assign(caminhoesInstance.value, new Caminhoes())
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