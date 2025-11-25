<template>
    <div class="space-y-4">

        <CommonActionsHeader 
            :is-filter-btn="true" 
            :is-new-register-btn="true"
            :is-delete-btn="true"
            :count-items="selectedItems.length"
            @filter=""
            @newRegister="() => console.log('testandooooooooooooooooooooooooooo')" 
            @delete="openModal('delete')"
        />

        <DynamicTableV2 
            :columns="columns" 
            :items="items" 
            :enable-tooltip="true" 
            :is-actions="true"
            :is-select-all="false" @edit="openModal('edit', $event)" 
            @update:selected="selectedItems = $event"
            @detalhar="openResumo = !openResumo"
            caption="Dica: clique duas vezes sobre um registro para detalhar/editar." 
        />

    </div>

    <ModalConfirmDelete 
        v-model:open="modals.isOpen.delete" 
        :count="selectedItems.length"
    />
    <ModalResumoPagamentos 
      v-model:open="openResumo" 
      method="add"
      @close="modals.isOpen.filter = $event"
    />
</template>
<script setup lang="ts">
import CommonActionsHeader from '@/components/CommonActionsHeader.vue';
import DynamicTableV2 from '@/components/ui/table/DynamicTableV2.vue';
import { getUser } from '@/stores/authStore';
import { onMounted, ref } from 'vue';
import ModalConfirmDelete from '@/components/ModalConfirmDelete.vue';
import ModalResumoPagamentos from '@/components/modals/resumoPagamentos/ModalResumoPagamentos.vue';

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

const openResumo = ref(false)


const selectedItems = ref<(number | string)[]>([]);

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
  {
    id: 1,
    nroContrato: 'CT-2025-001',
    cliente: 'Transportes Silva LTDA',
    dtEmiss: '2025-01-12',
    dtSaida: '2025-01-15',
    origem: 'São Paulo - SP',
    destino: 'Curitiba - PR',
    placa: 'ABC-1234',
    peso: 15000,
    vlUnit: 4.50,
    vlTot: 67500,
    vlPago: 30000,
    statusV: 'Em trânsito',
    statusC: 'Aberto'
  },
  {
    id: 2,
    nroContrato: 'CT-2025-002',
    cliente: 'Logística Martins',
    dtEmiss: '2025-01-10',
    dtSaida: '2025-01-13',
    origem: 'Campinas - SP',
    destino: 'Rio de Janeiro - RJ',
    placa: 'XYZ-5678',
    peso: 22000,
    vlUnit: 5.10,
    vlTot: 112200,
    vlPago: 112200,
    statusV: 'Finalizado',
    statusC: 'Concluído'
  },
  {
    id: 3,
    nroContrato: 'CT-2025-003',
    cliente: 'Mercado Brasil Cargo',
    dtEmiss: '2025-01-20',
    dtSaida: '2025-01-22',
    origem: 'Belo Horizonte - MG',
    destino: 'Salvador - BA',
    placa: 'JKL-8899',
    peso: 18000,
    vlUnit: 4.80,
    vlTot: 86400,
    vlPago: 0,
    statusV: 'Aguardando saída',
    statusC: 'Pendente'
  }
])


const modals = ref<ModalProps>({
  isOpen: {
    filter: false,
    actions: false,
    delete: false,
  },
  method: 'add' as 'add' | 'edit',
  details: {}
});

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



onMounted(() => {
    console.log(getUser())
})

</script>
