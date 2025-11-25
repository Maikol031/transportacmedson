<template>
  <div class="space-y-4">

    <CommonActionsHeader 
      :is-filter-btn="true" 
      :is-new-register-btn="true" 
      :is-delete-btn="true"
      :count-items="selectedItems.length"
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

  <ModalTrucks 
    v-model:open="modals.isOpen.actions" 
    :method="modals.method" 
    :items="modals.details"
    @close="modals.isOpen.actions = $event" />

  <ModalTrucksFilter 
    v-model:open="modals.isOpen.filter"
    @close="modals.isOpen.filter = $event"
  />

  <ModalConfirmDelete 
    v-model:open="modals.isOpen.delete" 
    :count="selectedItems.length"
  />

</template>

<script setup lang="ts">
import ModalTrucksFilter from '@/components/modals/filters/ModalTrucksFilter.vue';
import CommonActionsHeader from '@/components/CommonActionsHeader.vue';
import ModalTrucks from '@/components/modals/details/ModalTrucks.vue';
import DynamicTableV2 from '@/components/ui/table/DynamicTableV2.vue';
import ModalConfirmDelete from '@/components/ModalConfirmDelete.vue';
import type { ICaminhoes } from '@/interfaces/ICaminhoes';
import type { Column } from '@/components/ui/table';
import Caminhoes from '@/entities/Caminhoes';
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

const caminhoesInstance = ref<Caminhoes>(new Caminhoes());
const selectedItems = ref<(number | string)[]>([]);
const items = ref<ICaminhoes[]>([]);

const columns = ref<Column[]>([
  { key: 'placa', label: 'Placa' },
  { key: 'marca', label: 'Marca', maxWidth: '20rem' },
  { key: 'modelo', label: 'Modelo', maxWidth: '20rem' },
  { key: 'renavam', label: 'Renavam' },
  { key: 'licenciamento', label: 'Licenciamento', maxWidth: '20rem' },
  { key: 'dh_inc', label: 'Data Venc. Tacógrafo' },
  { key: 'kilometragem', label: 'Kilometragem' },
  { key: 'validadeAet', label: 'Validade AET' },
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
  const { data } = await caminhoesInstance.value.get();

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
