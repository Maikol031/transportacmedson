<template>
  <div class="space-y-4">

    <CommonActionsHeader
      :is-filter-btn="true"
      :is-new-register-btn="true"
      @filter="openModal('filter')"
      @new-register="openModal('add')"
    />

    <DynamicTable :columns="columns" :items="items" :enableTooltip="true">
      <template #actions="{ row }">
        <DropDownActions
          :is-excluir="true"
          @detalhar="openModal('edit', row)"
        />
      </template>
    </DynamicTable>

  </div>

  <ModalTrucks
    v-model:open="modals.isOpen.actions"
    :method="modals.method"
    :items="modals.details"
    @close="modals.isOpen.actions = $event"
  />

  <ModalTrucksFilter v-model:open="modals.isOpen.filter" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ModalTrucksFilter from '@/components/modals/filters/ModalTrucksFilter.vue'
import DropDownActions from '@/components/ui/dropdown-menu/DropDownActions.vue'
import CommonActionsHeader from '@/components/CommonActionsHeader.vue'
import ModalTrucks from '@/components/modals/details/ModalTrucks.vue'
import type { ICaminhoes } from '@/interfaces/ICaminhoes'
import { DynamicTable } from '@/components/ui/table'
import type { Column } from '@/components/ui/table'

type ModalType = 'add' | 'edit' | 'filter'
interface ModalProps {
    isOpen: {
        filter: boolean
        actions: boolean
    }
    method: "add" | "edit"
    details: ICaminhoes | {}
}

const modals = ref<ModalProps>({
  isOpen: {
    filter: false,
    actions: false
  },
  method: 'add' as 'add' | 'edit',
  details: {}
})

const openModal = (type: ModalType, item?: any) => {
  const modal: Record<ModalType, () => void> = {
    add: () => {
      modals.value.method = 'add'
      modals.value.isOpen.actions = true
    },
    edit: () => {
      modals.value.method = 'edit'
      modals.value.details = item
      modals.value.isOpen.actions = true
    },
    filter: () => {
      modals.value.isOpen.filter = true
      console.log('filtro')
    }
  }

  modal[type]?.()
}

const columns = ref<Column[]>([
  { key: 'placa', label: 'Placa' },
  { key: 'modelo', label: 'Modelo', maxWidth: '20rem' },
  { key: 'dataVencTacografo', label: 'Data Venc. Tacógrafo', width: '10rem' },
  { key: 'kilometragem', label: 'Kilometragem' },
  { key: 'numeroAet', label: 'Número AET' },
  { key: 'emissaoAet', label: 'Emissão AET' },
  { key: 'validadeAet', label: 'Validade AET' },
  { key: 'situacaoAet', label: 'Situação AET' },
  { key: 'actions', label: 'Ações', width: '80px' }
])

const items = ref([
  {
    id: 1,
    placa: 'HBZ-1235',
    modelo: 'Scania 124 Bicudo',
    dataVencTacografo: '2026-08-10',
    kilometragem: '180.000.000',
    numeroAet: 'AET-2025-0001',
    emissaoAet: '15/01/2025',
    validadeAet: '15/09/2025',
    situacaoAet: 'Válida'
  },
  {
    id: 2,
    placa: 'ABC-4321',
    modelo: 'Volvo FH16',
    dataVencTacografo: '10/04/2025',
    kilometragem: '150.234.756',
    numeroAet: 'AET-2025-0002',
    emissaoAet: '02/12/2025',
    validadeAet: '02/12/2025',
    situacaoAet: 'Válida'
  },
  {
    id: 3,
    placa: 'XYZ-9876',
    modelo: 'Mercedes-Benz Actros',
    dataVencTacografo: '05/11/2024',
    kilometragem: '200.564.010',
    numeroAet: 'AET-2024-0456',
    emissaoAet: '02/12/2025',
    validadeAet: '10/11/2024',
    situacaoAet: 'Expirada'
  },
  {
    id: 4,
    placa: 'DEF-7654',
    modelo: 'Ford Cargo 2429',
    dataVencTacografo: '30/01/2023',
    kilometragem: '99.876.543',
    numeroAet: 'AET-2023-0099',
    emissaoAet: '02/12/2025',
    validadeAet: '05/05/2024',
    situacaoAet: 'Expirada'
  },
  {
    id: 5,
    placa: 'GHI-2468',
    modelo: 'Iveco Tector',
    dataVencTacografo: '15/07/2025',
    kilometragem: '120.345.678',
    numeroAet: 'AET-2025-0321',
    emissaoAet: '02/12/2025',
    validadeAet: '20/10/2025',
    situacaoAet: 'Pendente'
  }
])

onMounted(async () => {

  console.log("Carregando dados da API")

})
</script>
