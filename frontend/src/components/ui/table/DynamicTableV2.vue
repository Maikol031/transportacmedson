<template>
  <div>
    <!-- Tabela desktop/tablet -->
    <div class="hidden md:flex border rounded-md overflow-x-auto relative" :class="{'pr-[60px]': isActions}">
      <div class="flex-1 overflow-x-auto">
        <table class="min-w-full border-collapse">
          <caption v-if="caption" class="table-caption">{{ caption }}</caption>
          <thead>
            <tr class="bg-main text-white whitespace-nowrap">
              <th class="px-3 py-2 border-b w-10 text-center">
                <label v-if="isSelectAll" class="custom-checkbox">
                  <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
                  <span></span>
                </label>
              </th>
              <th v-for="col in columnsWithoutActions" :key="col.key" :style="{
                width: col.width,
                maxWidth: col.maxWidth,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }" class="px-3 py-2 text-left font-semibold truncate border-b">
                {{ col.label }}
              </th>
            </tr>
          </thead>
          <tbody v-if="paginatedItems.length">
            <tr v-for="row in paginatedItems" :key="row[idKey]" class="hover:bg-gray-100 group cursor-pointer"
              @dblclick="$emit('edit', row)">
              <td class="px-3 py-2 border-b w-10 text-center">
                <label class="custom-checkbox" @click.stop @dblclick.stop>
                  <input type="checkbox" v-model="selectedRows" :value="row[idKey]">
                  <span></span>
                </label>
              </td>
              <td v-for="col in columnsWithoutActions" :key="col.key" :style="{
                maxWidth: col.maxWidth,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }" class="px-3 py-2 truncate border-b text-left text-sm"
                :title="props.enableTooltip ? row[col.key] : ''">

                <span :class="col.ruleStyle && col.ruleStyle(row) ? col.ruleStyle(row) : ''">
                  {{ row[col.key] }}
                </span>
                <!-- {{ row[col.key] }} -->
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td :colspan="columnsWithoutActions.length + 1" class="text-center py-2">
                Nenhum registro encontrado!
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Coluna de ações fixa ao lado -->
      <div v-if="isActions" class=" flex flex-col border-l-0 rounded-tr-md mb-2.5 rounded-br-md absolute right-0 bg-white">
        <div class="py-[18px] border-none" v-if="caption"></div>
        <div class="px-3 py-[7.5px] text-main font-semibold border-b text-center select-none border-t-1">Ações
        </div>
        <div v-for="row in paginatedItems" :key="row[idKey]"
          class="flex-1 flex items-center justify-center border-b border-l min-h-[37px] group">
          <div class="flex gap-2">
            <DropDownActions @detalhar="$emit('detalhar')" />
          </div>
        </div>
      </div>
    </div>

    <!-- Tabela mobile (sem alterações) -->
    <div class="block md:hidden w-full overflow-x-hidden">
      <div v-if="paginatedItems.length > 0" v-for="row in paginatedItems" :key="row[idKey]"
        class="rounded-lg mb-4 p-4 bg-gray-50 border shadow">
        <div v-for="col in columns" :key="col.key" class="mb-2">
          <div class="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
            {{ col.label }}
          </div>
          <div class="text-base text-gray-900 w-full break-words whitespace-pre-line" style="word-break: break-word;">
            {{ row[col.key] }}
          </div>
        </div>
        <div class="mt-4 flex justify-end">
          <button class="group rounded-full p-2 transition-all duration-200
                          text-gray-600 hover:bg-gray-100 hover:text-gray-900
                          focus:outline-none focus:ring-2 focus:ring-gray-300" @click="$emit('edit', row)"
            aria-label="Editar" type="button">
            <SquarePen class="w-5 h-5" />
          </button>
          <button class="group rounded-full p-2 transition-all duration-200
                          text-gray-600 hover:bg-gray-100 hover:text-gray-900
                          focus:outline-none focus:ring-2 focus:ring-gray-300" @click="$emit('delete', row)"
            aria-label="Excluir" type="button">
            <Trash2Icon class="w-5 h-5" />
          </button>
        </div>
      </div>
      <div v-else class="text-center text-gray-500 py-6 border rounded bg-white">
        Nenhum registro encontrado!
      </div>
    </div>

    <!-- Paginação (sem alterações) -->
    <div v-if="isPaginate && paginatedItems.length > 0" class="w-full flex">
      <div class="ml-auto flex items-center mt-4 space-x-2">
        <Pagination :items-per-page="itemsPerPage" :total="items.length" :default-page="currentPage"
          @update:page="currentPage = $event" v-slot="{ page }">
          <PaginationContent>
            <PaginationPrevious @click="previousPage" />
            <template v-for="pg in pages" :key="pg">
              <PaginationItem :value="pg" :is-active="page === pg" @click="goToPage(pg)">
                {{ pg }}
              </PaginationItem>
            </template>
            <PaginationNext @click="nextPage" />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PaginationContent, PaginationItem,
  PaginationNext, PaginationPrevious, Pagination,
} from '@/components/ui/pagination'
import { ref, computed, watch } from 'vue'
import { SquarePen, Trash2Icon } from 'lucide-vue-next'
import DropDownActions from '../dropdown-menu/DropDownActions.vue'

export interface Column {
  key: string
  label: string
  width?: string
  maxWidth?: string
  ruleStyle?: (row?: any) => string
}

interface Props {
  items: Record<string, any>[]
  columns: Column[]
  caption?: string
  itemsPerPage?: number
  idKey?: string
  enableTooltip?: boolean
  isActions?: boolean
  isSelectAll?: boolean
  isPaginate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 10,
  idKey: 'id',
  enableTooltip: false,
  isActions: true,
  isSelectAll: true,
  isPaginate: true
})

const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(props.items.length / props.itemsPerPage))
const emit = defineEmits<{
  (e: 'update:selected', ids: (string | number)[]): void
  (e: 'edit', row: any): void
  (e: 'delete', row: any): void
  (e: 'detalhar'): void
}>()

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage
  return props.items.slice(start, start + props.itemsPerPage)
})

const pages = computed(() => Array.from({ length: totalPages.value }, (_, i) => i + 1))

function goToPage(page: number) {
  currentPage.value = page
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
function previousPage() {
  if (currentPage.value > 1) currentPage.value--
}
watch(() => props.items, () => currentPage.value = 1)

// Só as colunas sem a de ações
const columnsWithoutActions = computed(() => props.columns.filter(col => col.key !== 'actions'))


const selectedRows = ref<(string | number)[]>([])

// Controla checkbox principal
const selectAll = ref(false)

// Quando clicar no checkbox principal
function toggleSelectAll() {
  if (selectAll.value) {
    selectedRows.value = paginatedItems.value.map(row => row[props.idKey])
  } else {
    selectedRows.value = []
  }

  emit('update:selected', selectedRows.value)
}


// Sincroniza checkbox principal ao marcar/desmarcar linhas
watch(selectedRows, () => {
  const idsAtuais = paginatedItems.value.map(r => r[props.idKey])
  selectAll.value = idsAtuais.every(id => selectedRows.value.includes(id))
  emit('update:selected', selectedRows.value)
})
</script>

<style scoped>
/* Barra de rolagem custom */
.flex-1.overflow-x-auto::-webkit-scrollbar {
  height: 10px;
}

.flex-1.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 8px;
  border: 2px solid #fff;
  transition: background 0.2s;
}

.flex-1.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #bdbdbd;
}

.flex-1.overflow-x-auto::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 8px;
}

.flex-1.overflow-x-auto::-webkit-scrollbar-corner {
  background: #fff;
}


.custom-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.custom-checkbox input {
  display: none;
}

.custom-checkbox span {
  width: 18px;
  height: 18px;
  border: 2px solid #4b5563;
  /* gray-600 */
  border-radius: 6px;
  display: inline-block;
  transition: all 0.2s ease-in-out;
  background-color: white;
  position: relative;
}

.custom-checkbox:hover span {
  border-color: #1f2937;
  /* gray-800 */
}

.custom-checkbox input:checked+span {
  background-color: #2563eb;
  /* blue-600 */
  border-color: #2563eb;
}

.custom-checkbox input:checked+span::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 1px;
  width: 4px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.table-caption {
  caption-side: top;
  text-align: left;
  padding: 8px 12px;
  font-size: 0.85rem;
  color: #4b5563;
  /* gray-600 */
}
</style>