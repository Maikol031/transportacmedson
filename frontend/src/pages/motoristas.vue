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

  <ModalMotoristas
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
import type { ICaminhoes } from '@/interfaces/ICaminhoes'
import { DynamicTable } from '@/components/ui/table'
import type { Column } from '@/components/ui/table'
import ModalMotoristas from '@/components/modals/details/ModalMotoristas.vue'

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
  { key: 'nome', label: 'Nome do Motorista' },
  { key: 'cpf', label: 'CPF' },
  { key: 'cnpj', label: 'CNPJ' },
  { key: 'telefone', label: 'Telefone / WhatsApp' },
  { key: 'cnh', label: 'CNH' },
  { key: 'categoriaCnh', label: 'Categoria CNH', width: '8rem' },
  { key: 'validadeCnh', label: 'Validade CNH', width: '10rem' },
  { key: 'tipoVinculo', label: 'Tipo de Vínculo', width: '10rem' },
  { key: 'placaVeiculo', label: 'Placa do Veículo', width: '8rem' },
  { key: 'status', label: 'Status', width: '8rem' },
  { key: 'actions', label: 'Ações', width: '80px' }
])


const items = ref([
  {
    id: 1,
    nome: 'João Pereira da Silva',
    cpf: '123.456.789-00',
    cnpj: '00.623.904/0001-73',
    telefone: '(11) 98765-4321',
    cnh: '98765432100',
    categoriaCnh: 'E',
    validadeCnh: '2026-05-15',
    tipoVinculo: 'CLT',
    placaVeiculo: 'HBZ-1235',
    status: 'Ativo'
  },
  {
    id: 2,
    nome: 'Carlos Eduardo Martins',
    cpf: '234.567.890-11',
    telefone: '(12) 99876-5432',
    cnh: '87654321099',
    categoriaCnh: 'D',
    validadeCnh: '2025-09-20',
    tipoVinculo: 'Agregado',
    placaVeiculo: 'ABC-4321',
    status: 'Ativo'
  },
  {
    id: 3,
    nome: 'Marcos Vinícius Almeida',
    cpf: '345.678.901-22',
    telefone: '(31) 91234-5678',
    cnh: '76543210988',
    categoriaCnh: 'E',
    validadeCnh: '2024-12-05',
    tipoVinculo: 'Autônomo',
    placaVeiculo: 'XYZ-9876',
    status: 'Inativo'
  },
  {
    id: 4,
    nome: 'José Ricardo Oliveira',
    cpf: '456.789.012-33',
    telefone: '(41) 97654-3210',
    cnh: '65432109877',
    categoriaCnh: 'C',
    validadeCnh: '2025-03-30',
    tipoVinculo: 'CLT',
    placaVeiculo: 'DEF-7654',
    status: 'Ativo'
  },
  {
    id: 5,
    nome: 'Pedro Henrique Santos',
    cpf: '567.890.123-44',
    telefone: '(21) 96543-2109',
    cnh: '54321098766',
    categoriaCnh: 'D',
    validadeCnh: '2023-11-30',
    tipoVinculo: 'Autônomo',
    placaVeiculo: 'GHI-2468',
    status: 'Inativo'
  }
])

onMounted(async () => {

  console.log("Carregando dados da API")

})
</script>
