<template>
    <div class="space-y-4">
        <CommonActionsHeader :is-filter-btn="true" :is-new-register-btn="true" @filter=""
            @newRegister="() => console.log('testandooooooooooooooooooooooooooo')" />

        <DynamicTable :columns="columns" :items="items" :enableTooltip="true">
            <template #actions>
                <DropDownActions :is-excluir="true"/>
            </template>
        </DynamicTable>
    </div>

</template>
<script setup lang="ts">
import CommonActionsHeader from '@/components/CommonActionsHeader.vue';
import DynamicTable from '@/components/ui/table/DynamicTable.vue';
import { ref } from 'vue';


const columns = ref<any[]>([
  { key: 'nroContrato', label: 'Nro. Contrato' },
  { key: 'cliente', label: 'Cliente' },
  { key: 'dtEmiss', label: 'Data Emissão' },
  { key: 'dtSaida', label: 'Data Saída' },
  { key: 'origem', label: 'Origem' },
  { key: 'destino', label: 'Destino' },
  { key: 'placa', label: 'Placa' },
  { key: 'peso', label: 'Peso (KG)' },
  { key: 'vlUnit', label: 'Vlr. Unitário' },
  { key: 'vlTot', label: 'Vlr. Total' },
  { key: 'vlPago', label: 'Vlr. Pago' },
  { key: 'statusV', label: 'Status Viagem' },
  { key: 'statusC', label: 'Status Contrato' },
])


const items = ref([
  // {
  //   id: 1,
  //   placa: 'HBZ-1235',
  //   modelo: 'HBZ-1235',
  // },
])

</script>
