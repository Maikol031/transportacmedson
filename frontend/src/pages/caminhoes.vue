<template>
  <div class="space-y-4">

    <CommonActionsHeader :is-filter-btn="true" :is-new-register-btn="true" @filter="openModal('filter')"
      @new-register="openModal('add')" />

    <DynamicTable :columns="columns" :items="items" :enableTooltip="true">
      <template #actions="{ row }">
        <DropDownActions :is-excluir="true" @detalhar="openModal('edit', row)" />
      </template>
    </DynamicTable>

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
import Caminhoes from '@/entities/Caminhoes'


const caminhoesInstance = ref<Caminhoes>(new Caminhoes())
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

const items = ref<any>([])

const columns = ref<Column[]>([
  { key: 'placa', label: 'Placa' },
  { key: 'marca', label: 'Marca', maxWidth: '20rem' },
  { key: 'modelo', label: 'Modelo', maxWidth: '20rem' },
  { key: 'renavam', label: 'Renavam' },
  { key: 'licenciamento', label: 'Licenciamento', maxWidth: '20rem' },
  { key: 'dh_inc', label: 'Data Venc. Tacógrafo' },
  { key: 'kilometragem', label: 'Kilometragem' },
  { key: 'validadeAet', label: 'Validade AET' },
  { key: 'actions', label: 'Ações', width: '80px' }
])

// const items = ref([
//   {
//     id: 1,
//     placa: 'HBZ-1235',
//     modelo: 'Scania 124 Bicudo',
//     dataVencTacografo: '2026-08-10',
//     kilometragem: '180.000.000',
//     validadeAet: '15/09/2025',
//   },
//   {
//     id: 2,
//     placa: 'ABC-4321',
//     modelo: 'Volvo FH16',
//     dataVencTacografo: '10/04/2025',
//     kilometragem: '150.234.756',
//     validadeAet: '02/12/2025',
//   },
//   {
//     id: 3,
//     placa: 'XYZ-9876',
//     modelo: 'Mercedes-Benz Actros',
//     dataVencTacografo: '05/11/2024',
//     kilometragem: '200.564.010',
//     emissaoAet: '02/12/2025',
//   },
//   {
//     id: 4,
//     placa: 'DEF-7654',
//     modelo: 'Ford Cargo 2429',
//     dataVencTacografo: '30/01/2023',
//     kilometragem: '99.876.543',
//     validadeAet: '05/05/2024',

//   },
//   {
//     id: 5,
//     placa: 'GHI-2468',
//     modelo: 'Iveco Tector',
//     dataVencTacografo: '15/07/2025',
//     kilometragem: '120.345.678',
//     validadeAet: '20/10/2025',
//   }
// ])

const getList = async () => {
  const { data } = await caminhoesInstance.value.read()

  items.value = []
}

onMounted(async () => {
  await getList()
})
</script>
