<template>
    <ModalScrollBody v-model:open="open" :title="method === 'add' ? 'Resumo de Pagamentos' : 'Editar'"
        :subTitle="'Contrato 484554 Pendente'" :is-show-footer="false" size-modal="md:max-w-[1000px]"
        customize-class="bg-orange-500 text-white">
        <template #body>
            <div class="flex justify-between items-center pb-6">
                <span class="text-gray-500">
                    Dica: clique duas vezes sobre um registro para detalhar/editar.
                </span>
                <CommonActionsHeader :is-new-register-btn="true" :is-delete-btn="true" :count-items="countSelected"
                    @newRegister="openModal('add')" />

            </div>
            <div class="border border-x-0 rounded overflow-hidden">

                <div class="hidden sm:block max-h-48 overflow-y-auto" ref="scrollArea">
                    <table class="w-full table-fixed border-collapse text-sm">

                        <thead class="bg-white sticky top-0 z-10">
                            <tr class="border-b h-10">
                                <th class="w-10"></th>
                                <th class="text-left px-3 w-full">Tipo de Despesa</th>
                                <th class="text-left px-3 w-full">Valor</th>
                                <th class="text-left px-3 w-full">Placa</th>
                                <th class="text-left px-3 w-full">Posto</th>
                                <th class="text-left px-3 w-full">Data Pagamento</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr v-for="item in items" :key="item.id"   
                                @dblclick="openModal('edit', item)"
                                class="border-b h-10 hover:bg-gray-50 transition cursor-pointer"
                            >
                            
                                <td class="px-3 w-16 text-center" @click.stop @dblclick.stop>
                                    <input type="checkbox" v-model="selectedRows" :value="item.id">
                                </td>
                                <td class="px-3 w-40" :title="formatDesp(item.tipoDespesa)">{{ formatDesp(item.tipoDespesa) }}</td>
                                <td class="px-3 w-28" :title="formatMoney(item.valor)"> {{ formatMoney(item.valor) }} </td>
                                <td class="px-3 w-28" :title="item.placa"> {{ item.placa }} </td>
                                <td class="px-3 w-64 truncate" :title="'Morada do Sol'"> {{ item.posto }} </td>
                                <td class="px-3 w-32"> {{ formattIsoToDate(item.dtPagamento) }} </td>

                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="sm:hidden max-h-64 overflow-y-auto space-y-2 p-2">

                    <div v-for="item in items" :key="item.id" class="border rounded p-3 bg-white shadow-sm">
                        <p><span class="font-semibold">Valor:</span> R$ {{ item.valor }}</p>
                        <p><span class="font-semibold">Tipo:</span> {{ formatDesp(item.tipoDespesa) }}</p>
                        <p><span class="font-semibold">Data:</span> {{ item.dtPagamento }}</p>
                    </div>
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


        </template>

    </ModalScrollBody>
    <ModalAcoesPagamentos 
        v-model:open="modals.isOpen.actions" 
        :method="modals.method" 
        :items="modals.details"
        @close="modals.isOpen.actions = $event" 
    />

    <ModalConfirmDelete 
        v-model:open="modals.isOpen.delete" 
        :count="selectedItems.length"
    />

</template>
<script setup lang="ts">
import ModalAcoesPagamentos from '../resumoPagamentos/ModalAcoesPagamentos.vue';
import CommonActionsHeader from '@/components/CommonActionsHeader.vue';
import ModalConfirmDelete from '@/components/ModalConfirmDelete.vue';
import ModalScrollBody from '@/components/ModalScrollBody.vue';
import { formatMoney, formattIsoToDate } from '@/utils/utils';
import type { IPagamentos } from '@/interfaces/IPagamentos';
import Pagamentos from '@/entities/Pagamentos';
import { ref, watch } from 'vue';
import { computed } from 'vue';

interface Props {
    open: boolean
    method: "add" | "edit"
}

const scrollArea = ref<HTMLElement | null>(null)


const props = defineProps<Props>()
const open = defineModel<boolean>('open')
const emit = defineEmits(["close"])
const selectedItems = ref<(number | string)[]>([]);

const pagamentosInstance = ref<Pagamentos>(new Pagamentos())
const selectedRows = ref<(string | number)[]>([])

const items = ref<IPagamentos[]>([
  { id: 1, tipoDespesa: "0", valor: 5000, placa: "NS6-15151", dtPagamento: "2024-10-07", posto: "Decio" },
  { id: 2, tipoDespesa: "2", valor: 0, placa: "ABC-1234", dtPagamento: "2024-10-05", posto: "Morada do Sol" },
  { id: 3, tipoDespesa: "1", valor: 850, placa: "QWE-9988", dtPagamento: "2024-10-10", posto: "Rede 7" },
  { id: 4, tipoDespesa: "0", valor: 320, placa: "XYZ-4422", dtPagamento: "2024-10-10", posto: "Morada do Sol" },
  { id: 5, tipoDespesa: "2", valor: 0, placa: "PLA-7744", dtPagamento: "2024-10-15", posto: "Decio" },
  { id: 6, tipoDespesa: "1", valor: 1400, placa: "KJD-5521", dtPagamento: "2024-05-19", posto: "Morada do Sol" },
  { id: 7, tipoDespesa: "0", valor: 270, placa: "HTR-6623", dtPagamento: "2024-10-01", posto: "Rede 7" },
  { id: 8, tipoDespesa: "2", valor: 0, placa: "MNB-3141", dtPagamento: "2024-10-30", posto: "Decio" },
  { id: 9, tipoDespesa: "1", valor: 620, placa: "FDS-8820", dtPagamento: "2024-10-22", posto: "Morada do Sol" },
  { id: 10, tipoDespesa: "0", valor: 450, placa: "JLK-5509", dtPagamento: "2024-10-13", posto: "Rede 7" },
]);



const formatDesp = (type: string) => {
    if (type === "0") return "Abastecimento"
    if (type === "1") return "Avaria"
    if (type === "2") return "Avaria"
}


const countSelected = computed(() => selectedRows.value.length)





const modals = ref<ModalProps>({
    isOpen: {
        filter: false,
        actions: false,
        delete: false,
    },
    method: 'add' as 'add' | 'edit',
    details: {}
});


type ModalType = 'add' | 'edit' | 'filter' | 'delete';

interface ModalProps {
    isOpen: {
        filter: boolean
        actions: boolean
        delete: boolean
    }
    method: "add" | "edit"
    details: any | {}
}

const openModal = (type: ModalType, item?: any) => {
    const modal: Record<ModalType, () => void> = {
        add: () => {
            modals.value.method = 'add';
            modals.value.isOpen.actions = true;
        },
        edit: () => {
            modals.value.method = 'edit';
            modals.value.details = item;
            modals.value.isOpen.actions = true;
        },
        filter: () => {
            modals.value.isOpen.filter = true;
        },
        delete: () => {
            modals.value.isOpen.delete = true;
        }
    }

    modal[type]?.();
}

watch(() => props.open, async (value: boolean) => {
    // items.value =  await pagamentosInstance.value.get()
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