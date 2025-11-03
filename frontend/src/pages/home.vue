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
  { key: 'placa', label: 'Placa' },
  { key: 'modelo', label: 'Modelo', maxWidth: '20rem' },
])


const items = ref([
  {
    id: 1,
    placa: 'HBZ-1235',
    modelo: 'HBZ-1235',
  },
])

</script>
