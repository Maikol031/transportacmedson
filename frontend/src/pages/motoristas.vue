<template>
  <div class="space-y-4">

    <CommonActionsHeader :is-filter-btn="true" :is-new-register-btn="true" @filter="openModal('filter')"
      @new-register="openModal('add')" />


  <DynamicTableV2 :columns="columns" :items="items" :enableTooltip="true">
      <template #actions="{ row }">
        <DropDownActions :is-excluir="true" @detalhar="openModal('edit', row)" />
      </template>
    </DynamicTableV2>

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

</template>

<script setup lang="ts">
import ModalMotoristasFilter from '@/components/modals/filters/ModalMotoristasFilter.vue'
import DropDownActions from '@/components/ui/dropdown-menu/DropDownActions.vue'
import ModalMotoristas from '@/components/modals/details/ModalMotoristas.vue'
import CommonActionsHeader from '@/components/CommonActionsHeader.vue'
import type { ICaminhoes } from '@/interfaces/ICaminhoes'
import { DynamicTable } from '@/components/ui/table'
import type { Column } from '@/components/ui/table'
import { onMounted, ref } from 'vue'
import DynamicTableV2 from '@/components/ui/table/DynamicTableV2.vue'
import DropdownMenuContent from '@/components/ui/dropdown-menu/DropdownMenuContent.vue'
import DropdownMenuTrigger from '@/components/ui/dropdown-menu/DropdownMenuTrigger.vue'
import DropdownMenuItem from '@/components/ui/dropdown-menu/DropdownMenuItem.vue'
import DropdownMenu from '@/components/ui/dropdown-menu/DropdownMenu.vue'

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
  { key: 'telefone', label: 'Telefone / WhatsApp' },
  { key: 'cnh', label: 'CNH' },
  { key: 'categoriaCnh', label: 'Categoria CNH', width: '8rem' },
  { key: 'validadeCnh', label: 'Validade CNH', width: '10rem' },
  { key: 'exameToxic', label: 'Data Exame Tóxicológico' },
  { key: 'status', label: 'Status', width: '8rem' },
  { key: 'actions', label: 'Ações', width: '80px' }
])


const items = ref([
  {
    id: 1,
    nome: 'João Pereira da Silvadddddddddddddddddddddddddddddddddddddddddddddddddssssssssssssssssssssssssssss',
    cpf: '123.456.789-00',
    telefone: '(11) 98765-4321',
    cnh: '98765432100',
    categoriaCnh: 'E',
    validadeCnh: '2026-05-15',
    exameToxic: '2026-05-15',
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
    exameToxic: '2026-05-15',
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
    exameToxic: '2026-05-15',
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
    exameToxic: '2026-05-15',
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
    exameToxic: '2026-05-15',
    status: 'Inativo'
  }
])

onMounted(async () => {

  console.log("Carregando dados da API")

})
</script>
