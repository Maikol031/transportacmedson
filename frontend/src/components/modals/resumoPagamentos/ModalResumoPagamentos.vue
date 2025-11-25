<template>
    <ModalScrollBody v-model:open="open" :title="method === 'add' ? 'Resumo de Pagamentos' : 'Editar'"
        :subTitle="'Contrato 484554 Pendente'" :is-show-footer="false" size-modal="md:max-w-[1000px]"
        customize-class="bg-green-500 text-white"
        >
        <template #body>

            <div class="border border-x-0 rounded overflow-hidden">

                <div class="hidden sm:block max-h-48 overflow-y-auto" ref="scrollArea">
                    <table class="w-full table-fixed border-collapse text-sm">

                        <thead class="bg-white sticky top-0 z-10">
                            <tr class="border-b h-10">
                                <th class="w-10"></th>
                                <th class="text-left px-3 w-full">Tipo de Despesa</th>
                                <th class="text-left px-3 w-full">Valor</th>
                                <th class="text-left px-3 w-full">Placa</th> <!-- Tipo de Despesa 0- abastecimento || 1- avaria -->
                                <th class="text-left px-3 w-full">Posto</th> <!-- Tipo de Despesa 0- abastecimento -->
                                <th class="text-left px-3 w-full">Data Pagamento</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr v-for="item in items" :key="item.id" class="border-b h-10 hover:bg-gray-50 transition">
                                <td class="px-3 w-16 text-center">
                                    <input class="size-4" type="checkbox" v-model="item.selected" />
                                </td>
                                <td class="px-3 w-40" :title="item.tpPgto">{{ item.tpPgto }}</td>
                                <td class="px-3 w-28" :title="formatMoney(item.vlPgto)">{{ formatMoney(item.vlPgto) }}</td>
                                <td class="px-3 w-28" :title="'NS6-15151'">NS6-15151</td>
                                <td class="px-3 w-64 truncate" :title="'TONINHO FORMIGASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS'">TONINHO FORMIGASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS</td>
                                <td class="px-3 w-32">{{ formattIsoToDate(item.dtPgto) }}</td>

                            </tr>

                            <tr v-if="isCreating" class="border-b bg-gray-50">
                                <th class="w-10"></th>

                                <td class="px-3">
                                    <SelectScroll customize-class="bg-white"
                                        :options="[{ label: 'Tipo', items: [{ value: 'Pix', label: 'Pix' }, { value: 'Cheque', label: 'Cheque' }] }]" />
                                </td>
                                <td class="px-3">
                                    <InputCurrency :show-prefix="true" :max-digits="3" class="bg-white" />
                                </td>
                                <td class="px-3">
                                    <SelectScroll customize-class="bg-white"
                                        :options="[{ label: 'Tipo', items: [{ value: 'Pix', label: 'Pix' }, { value: 'Cheque', label: 'Cheque' }] }]" />
                                </td>
                                <td class="px-3">
                                    <SelectScroll customize-class="bg-white"
                                        :options="[{ label: 'Tipo', items: [{ value: 'Pix', label: 'Pix' }, { value: 'Cheque', label: 'Cheque' }] }]" />
                                </td>
                                <td class="px-3">
                                    <DatePicker v-model="newItem.dtPgto" :disabled="disabled" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="sm:hidden max-h-64 overflow-y-auto space-y-2 p-2">

                    <div v-for="item in items" :key="item.id" class="border rounded p-3 bg-white shadow-sm">
                        <p><span class="font-semibold">Valor:</span> R$ {{ item.vlPgto }}</p>
                        <p><span class="font-semibold">Tipo:</span> {{ item.tpPgto }}</p>
                        <p><span class="font-semibold">Data:</span> {{ item.dtPgto }}</p>
                    </div>

                    <div v-if="isCreating" class="border rounded p-3 bg-gray-50 space-y-2">
                        <div>
                            <p class="font-semibold">Valor</p>
                            <InputCurrency :show-prefix="true" :max-digits="3" />
                        </div>

                        <div>
                            <p class="font-semibold">Tipo de Pagamento</p>
                            <SelectScroll
                                :options="[{ label: 'Tipo', items: [{ value: 'Pix', label: 'Pix' }, { value: 'Cheque', label: 'Cheque' }] }]" />
                        </div>

                        <div>
                            <p class="font-semibold">Data de Pagamento</p>
                            <DatePicker v-model="newItem.dtPgto" :disabled="disabled" />
                        </div>
                    </div>

                </div>

                <div v-if="!isCreating" @click="handleCreateClick"
                    class="cursor-pointer h-10 flex items-center gap-2 px-3 text-gray-600 hover:bg-gray-100 border-t">
                    <Plus class="text-main" :size="14" />
                    <span class="text-main">Criar Novo Pagamento</span>
                </div>

                <div v-if="isCreating" @click="isCreating = false"
                    class="cursor-pointer h-10 flex items-center gap-2 px-3 text-gray-600 hover:bg-gray-100 border-t">
                    <Check class="text-green-500" :size="14" />
                    <span class="text-green-500">Salvar</span>
                </div>

            </div>

            <div class="flex flex-col sm:flex-row my-8 border border-x-0 p-4 rounded justify-between">
                <div class="flex flex-col">
                    <p class="whitespace-nowrap">Valor total do contrato</p>
                    <p class="font-light mt-1 sm:mt-0">R$ {{ 1000000 }}</p>
                </div>

                <div class="flex flex-col">
                    <p class="whitespace-nowrap">Valor pago até o momento</p>
                    <p class="font-light  mt-1 sm:mt-0">R$ {{ 100 }}</p>
                </div>

                <div class="flex flex-col">
                    <p class="whitespace-nowrap">Valor total a receber</p>
                    <p class="font-light mt-1 sm:mt-0">R$ {{ 100 }}</p>
                </div>
            </div>
            <div class="flex mb-4 justify-end items-end w-full">
                <Button :class="['hidden md:block', countItems ? 'delete-btn' : 'disable-delete-btn']">
                    <span class="flex items-center gap-x-2 text-md">
                        <Trash2Icon class="size-5" /> Excluir ({{ countItems }})
                    </span>
                </Button>
            </div>

        </template>
        <template #actions>
            <CommonButtonsFooterModal :method="method" :disabled="disabled" form-id="mainForm" @edit-action="editForm"
                @clear-form="clearForm" />
        </template>
    </ModalScrollBody>
</template>
<script setup lang="ts">
import CommonButtonsFooterModal from '@/components/CommonButtonsFooterModal.vue';
import ModalScrollBody from '@/components/ModalScrollBody.vue';
import SelectScroll from '@/components/SelectScroll.vue';
import DatePicker from '@/components/DatePicker.vue';
import { useVuelidate } from '@vuelidate/core';
import Motoristas from '@/entities/Motoristas';
import { Plus, Check, Trash2Icon } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import { computed } from 'vue';
import Button from '@/components/ui/button/Button.vue';
import InputCurrency from '@/components/ui/input/InputCurrency.vue';
import { formatMoney, formattIsoToDate } from '@/utils/utils';

interface Props {
    open: boolean
    method: "add" | "edit"
}

const scrollArea = ref<HTMLElement | null>(null)

const items = ref([
    { id: 1, vlPgto: '200', tpPgto: 'PIX', dtPgto: '2024-01-10', selected: false },
    { id: 1, vlPgto: '200', tpPgto: 'PIX', dtPgto: '2024-01-10', selected: false },
    { id: 1, vlPgto: '200', tpPgto: 'PIX', dtPgto: '2024-01-10', selected: false },
    { id: 1, vlPgto: '200', tpPgto: 'PIX', dtPgto: '2024-01-10', selected: false },
    { id: 1, vlPgto: '200', tpPgto: 'PIX', dtPgto: '2024-01-10', selected: false },
    { id: 1, vlPgto: '200', tpPgto: 'PIX', dtPgto: '2024-01-10', selected: false },
    { id: 1, vlPgto: '200', tpPgto: 'PIX', dtPgto: '2024-01-10', selected: false },
    { id: 2, vlPgto: '350', tpPgto: 'Dinheiro', dtPgto: '2024-01-08', selected: false }
])

const countItems = computed(() =>
    items.value.filter(i => i.selected).length
)


// controla se está criando
const isCreating = ref(false)

// novo item
const newItem = ref({
    vlPgto: "",
    tpPgto: "",
    dtPgto: ""
})

function handleCreateClick() {
    isCreating.value = true

    // espera o DOM atualizar antes de rolar
    requestAnimationFrame(() => {
        if (scrollArea.value) {
            scrollArea.value.scrollTo({
                top: scrollArea.value.scrollHeight,
                behavior: 'smooth'
            })
        }
    })
}


const props = defineProps<Props>()
const open = defineModel<boolean>('open')
const emit = defineEmits(["close"])
const fieldsLocked = ref<boolean>(true);
const disabled = computed(() => props.method === 'edit' && fieldsLocked.value)

const motoristasInstance = ref<Motoristas>(new Motoristas())

const v$ = useVuelidate(motoristasInstance.value.rules, motoristasInstance.value)


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