<template>
  <div class="space-y-4">

    <CommonActionsHeader 
      :is-filter-btn="true" 
      :is-new-register-btn="true" 
      :is-delete-btn="true"
      :count-items="selectedItems.length" 
      @filter="openModal('filter')"
      @newRegister="openModal('add')" 
      @delete="openModal('delete')" 
    />

    <DynamicTableV2 
      :columns="columns" 
      :items="items" 
      :enable-tooltip="true" 
      :is-actions="true" 
      :is-select-all="false"
      @edit="openModal('edit', $event)" 
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
  <ModalHome 
    v-model:open="modals.isOpen.actions" 
    :method="modals.method" 
    :items="modals.details"
    @close="modals.isOpen.actions = $event" 
  />
  <ModalHomeFilter
    v-model:open="modals.isOpen.filter"
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
import ModalHome from '@/components/modals/details/ModalHome.vue';
import { formatMoney } from '@/utils/utils';
import ModalHomeFilter from '@/components/modals/filters/ModalHomeFilter.vue';

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
  { key: 'vlUnit', label: 'Vlr. Unitário Tonelada' },
  { key: 'vlTot', label: 'Vlr. Total' },
  { key: 'vlPago', label: 'Vlr. Pago' },
  { key: 'vlReceb', label: 'Vlr. a Receber' },
  {
    key: 'statusV', label: 'Status Viagem', ruleStyle: (row: any) => {
      if (row.statusV === "Em Andamento") return 'blink-yellow'
      if (row.statusV === "Finalizado") return 'blink-green'
    }
  },
  {
    key: 'statusC', label: 'Status Contrato', style: "blink-red", ruleStyle: (row: any) => {
      if (row.statusC === "Aberto") return 'blink-yellow'
      if (row.statusC === "Concluído") return 'blink-green'
    }
  },
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
    vlReceb: formatMoney(30000),
    statusV: 'Em Andamento',
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
    vlReceb: formatMoney(30000),
    statusV: 'Finalizado',
    statusC: 'Concluído'
  },
  {
    id: 3,
    nroContrato: 'CT-2025-004',
    cliente: 'Transvale Transportes',
    dtEmiss: '2025-02-01',
    dtSaida: '2025-02-03',
    origem: 'Sorocaba - SP',
    destino: 'Florianópolis - SC',
    placa: 'DEF-9988',
    peso: 17500,
    vlUnit: 4.70,
    vlTot: 82250,
    vlPago: 41000,
    vlReceb: formatMoney(30000),
    statusV: 'Em Andamento',
    statusC: 'Aberto'
  },
  {
    id: 4,
    nroContrato: 'CT-2025-005',
    cliente: 'Rápido Nacional',
    dtEmiss: '2025-01-25',
    dtSaida: '2025-01-28',
    origem: 'Rio Claro - SP',
    destino: 'Fortaleza - CE',
    placa: 'GHI-2211',
    peso: 26000,
    vlUnit: 5.30,
    vlTot: 137800,
    vlPago: 100000,
    vlReceb: formatMoney(30000),
    statusV: 'Em Andamento',
    statusC: 'Aberto'
  },
  {
    id: 5,
    nroContrato: 'CT-2025-006',
    cliente: 'Super Cargas Brasil',
    dtEmiss: '2025-02-10',
    dtSaida: '2025-02-12',
    origem: 'Limeira - SP',
    destino: 'Natal - RN',
    placa: 'JKL-7722',
    peso: 19500,
    vlUnit: 4.90,
    vlTot: 95550,
    vlPago: 95550,
    vlReceb: formatMoney(30000),
    statusV: 'Finalizado',
    statusC: 'Concluído'
  },
  {
    id: 6,
    nroContrato: 'CT-2025-007',
    cliente: 'Expresso Minas',
    dtEmiss: '2025-01-18',
    dtSaida: '2025-01-20',
    origem: 'Belo Horizonte - MG',
    destino: 'Porto Alegre - RS',
    placa: 'MNO-4455',
    peso: 24000,
    vlUnit: 5.00,
    vlTot: 120000,
    vlPago: 60000,
    vlReceb: formatMoney(30000),
    statusV: 'Finalizado',
    statusC: 'Concluído'
  },
  {
    id: 7,
    nroContrato: 'CT-2025-008',
    cliente: 'Global Translog',
    dtEmiss: '2025-02-14',
    dtSaida: '2025-02-16',
    origem: 'Joinville - SC',
    destino: 'Recife - PE',
    placa: 'PQR-8890',
    peso: 20000,
    vlUnit: 5.20,
    vlTot: 104000,
    vlPago: 0,
    vlReceb: formatMoney(30000),
    statusV: 'Finalizado',
    statusC: 'Concluído'
  },
  {
    id: 8,
    nroContrato: 'CT-2025-009',
    cliente: 'Rodomax Transportes',
    dtEmiss: '2025-01-30',
    dtSaida: '2025-02-01',
    origem: 'Curitiba - PR',
    destino: 'Campo Grande - MS',
    placa: 'STU-3300',
    peso: 18500,
    vlUnit: 4.60,
    vlTot: 85100,
    vlPago: 85100,
    vlReceb: formatMoney(30000),
    statusV: 'Finalizado',
    statusC: 'Concluído'
  },
  {
    id: 9,
    nroContrato: 'CT-2025-010',
    cliente: 'Brasil Cargo Express',
    dtEmiss: '2025-02-05',
    dtSaida: '2025-02-08',
    origem: 'Manaus - AM',
    destino: 'Belém - PA',
    placa: 'VWX-6622',
    peso: 17000,
    vlUnit: 5.40,
    vlTot: 91800,
    vlPago: 30000,
    vlReceb: formatMoney(30000),
    statusV: 'Finalizado',
    statusC: 'Concluído'
  },
  {
    id: 10,
    nroContrato: 'CT-2025-011',
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
    vlReceb: formatMoney(30000),
    statusV: 'Finalizado',
    statusC: 'Concluído'
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
