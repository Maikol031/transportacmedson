<template>

  <div class="space-y-4">

    <CommonActionsHeader 
      :is-filter-btn="true" 
      :is-new-register-btn="true" :is-delete-btn="true"
      :countItems="selectedItems.length" 
      @filter="openModal('filter')" 
      @new-register="openModal('add')" 
      @delete="openModal('delete')" 
    />

    <DynamicTableV2 
      :columns="columns" 
      :items="items" 
      :enable-tooltip="true" :is-actions="false"
      :is-select-all="false"
      @edit="openModal('edit', $event)" @update:selected="selectedItems = $event"
      caption="Dica: clique duas vezes sobre um registro para detalhar/editar." 
    />

  </div>

  <ModalMotoristas 
    v-model:open="modals.isOpen.actions" 
    :method="modals.method" 
    :items="modals.details"
    @close="modals.isOpen.actions = $event" 
  />

  <ModalMotoristasFilter 
    v-model:open="modals.isOpen.filter" 
    @close="modals.isOpen.filter = $event" 
  />

  <ModalConfirmDelete 
    v-model:open="modals.isOpen.delete" 
    :count="selectedItems.length"
  />

</template>

<script setup lang="ts">
import ModalMotoristasFilter from '@/components/modals/filters/ModalMotoristasFilter.vue';
import ModalMotoristas from '@/components/modals/details/ModalMotoristas.vue';
import CommonActionsHeader from '@/components/CommonActionsHeader.vue';
import DynamicTableV2 from '@/components/ui/table/DynamicTableV2.vue';
import ModalConfirmDelete from '@/components/ModalConfirmDelete.vue';
import type { IMotoristas } from '@/interfaces/IMotoristas';
import type { ICaminhoes } from '@/interfaces/ICaminhoes';
import type { Column } from '@/components/ui/table';
import Motoristas from '@/entities/Motoristas';
import { onMounted, ref } from 'vue';


type ModalType = 'add' | 'edit' | 'filter' | 'delete';

interface ModalProps {
  isOpen: {
    filter: boolean
    actions: boolean
    delete: boolean
  }
  method: "add" | "edit"
  details: ICaminhoes | {}
}

const motoristasInstance = ref<Motoristas>(new Motoristas());
const selectedItems = ref<(number | string)[]>([]);
const items = ref<IMotoristas[]>([]);


const columns = ref<Column[]>([
  { key: 'nome', label: 'Nome do Motorista' },
  { key: 'cpf', label: 'CPF' },
  { key: 'telefone', label: 'Telefone / WhatsApp' },
  { key: 'cnh', label: 'CNH' },
  { key: 'categoriaCnh', label: 'Categoria CNH', width: '8rem' },
  { key: 'validadeCnh', label: 'Validade CNH', width: '10rem' },
  { key: 'exameToxic', label: 'Data Exame Tóxicológico' },
  { key: 'status', label: 'Status', width: '8rem' },
  { key: 'actions', label: 'Ações', width: '80px' }
]);

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

const getList = async () => {
  const { data } = await motoristasInstance.value.get();

  if (data) {
    items.value = data?.result;
    return
  }
  items.value = [];
}

onMounted(async () => {
  await getList();
});

</script>
