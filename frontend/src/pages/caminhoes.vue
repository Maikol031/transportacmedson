<template>

    <div class="space-y-4">

       <CommonActionsHeader
            :is-filter-btn="true"
            :is-new-register-btn="true"
            @filter="modals.isOpen.filter = true"
            @newRegister="modals.isOpen.actions = true"
       />

        <DynamicTable :columns="columns" :items="items" :enableTooltip="true">
            <template #actions>
                <DropDownActions :is-excluir="true" @detalhar="console.log('teste')" />
            </template>
        </DynamicTable>
    </div>
    <ModalTrucks v-model:open="modals.isOpen.actions" :method="'add'"/>
    <ModalTrucksFilter v-model:open="modals.isOpen.filter" />

</template>
<script setup lang="ts">
import ModalTrucksFilter from '@/components/modals/filters/ModalTrucksFilter.vue';
import DropDownActions from '@/components/ui/dropdown-menu/DropDownActions.vue';
import CommonActionsHeader from '@/components/CommonActionsHeader.vue';
import ModalTrucks from '@/components/modals/details/ModalTrucks.vue';
import { DynamicTable } from '@/components/ui/table';
import type { Column } from '@/components/ui/table';
import { ref } from 'vue';


const modals = ref({
    isOpen: {
        filter: false,
        actions: false
    }
})

const columns = ref<Column[]>([
    {
        key: "placa",
        label: "Placa",
        width: "20rem",
        maxWidth: "60rem"
    },
    {
        key: "modelo",
        label: "Modelo"
    },
    {
        key: "dtValTacografo",
        label: "Data Venc. Tacografo"
    },
    {
        key: "kilometragem",
        label: "Kilometragem"
    },
    { key: 'actions', label: 'Ações', width: '80px' }
])

const items = ref([
    {
        id: 1,
        placa: "hbz-1235",
        modelo: "Scania 124 Bicudo",
        dtValTacografo: "21/08/2026",
        kilometragem: "180.000.000",
    },
    {
        id: 2,
        placa: "abc-4321",
        modelo: "Volvo FH16",
        dtValTacografo: "10/04/2025",
        kilometragem: "150.234.756"
    },
    {
        id: 3,
        placa: "xyz-9876",
        modelo: "Mercedes-Benz Actros",
        dtValTacografo: "05/11/2024",
        kilometragem: "200.564.010"
    },
    {
        id: 4,
        placa: "def-7654",
        modelo: "Ford Cargo 2429",
        dtValTacografo: "30/01/2023",
        kilometragem: "99.876.543"
    },
    {
        id: 5,
        placa: "ghi-2468",
        modelo: "Iveco Tector",
        dtValTacografo: "15/07/2025",
        kilometragem: "120.345.678"
    }
])



</script>
<style>

@reference "../index.css";

.new-register-btn {
    @apply bg-main border border-gray-200 h-10 rounded-sm justify-end hover:bg-main-hover text-white cursor-pointer transition duration-300;
}

</style>