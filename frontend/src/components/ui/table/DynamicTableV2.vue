<template>
  <div>
    <!-- Tabela desktop/tablet -->
    <div class="hidden md:flex border rounded-md overflow-x-auto">
      <!-- Zona de rolagem: tabela de dados -->
      <div class="flex-1 overflow-x-auto">
        <table class="min-w-full border-collapse">
          <caption v-if="caption" class="p-2 text-left font-semibold">{{ caption }}</caption>
          <thead>
            <tr class="bg-main text-white whitespace-nowrap">
              <th v-for="col in columnsWithoutActions" :key="col.key"
                  :style="{
                    width: col.width,
                    maxWidth: col.maxWidth,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }"
                  class="px-3 py-2 text-left truncate border-b">
                {{ col.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in paginatedItems" :key="row[idKey]" class="hover:bg-gray-100 group">
              <td v-for="col in columnsWithoutActions" :key="col.key"
                  :style="{
                    maxWidth: col.maxWidth,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }"
                  class="px-3 py-2 truncate border-b text-left"
                  :title="props.enableTooltip ? row[col.key] : ''">
                {{ row[col.key] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Coluna de ações fixa ao lado -->
      <div class="w-28 flex flex-col border-l bg-white rounded-tr-md rounded-br-md">
        <div class="px-3 py-2 text-main font-semibold border-b bg-white text-center select-none">Ações</div>
        <div v-for="row in paginatedItems" :key="row[idKey]" class="flex-1 flex items-center justify-center border-b min-h-[48px] group hover:bg-gray-100">
          <div class="flex gap-2">
            <button class="group rounded-full p-2 transition-all duration-200
                           text-gray-600 hover:bg-gray-100 hover:text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-gray-300"
                    @click="$emit('edit', row)" aria-label="Editar" type="button">
              <SquarePen class="w-5 h-5" />
            </button>
            <button class="group rounded-full p-2 transition-all duration-200
                           text-gray-600 hover:bg-gray-100 hover:text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-gray-300"
                    @click="$emit('delete', row)" aria-label="Excluir" type="button">
              <Trash2Icon class="w-5 h-5" />
            </button>
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
                          focus:outline-none focus:ring-2 focus:ring-gray-300" @click="$emit('edit', row)" aria-label="Editar" type="button">
            <SquarePen class="w-5 h-5" />
          </button>
          <button class="group rounded-full p-2 transition-all duration-200
                          text-gray-600 hover:bg-gray-100 hover:text-gray-900
                          focus:outline-none focus:ring-2 focus:ring-gray-300" @click="$emit('delete', row)" aria-label="Excluir" type="button">
            <Trash2Icon class="w-5 h-5" />
          </button>
        </div>
      </div>
      <div v-else class="text-center text-gray-500 py-6 border rounded bg-white">
        Nenhum registro encontrado!
      </div>
    </div>

    <!-- Paginação (sem alterações) -->
    <div v-if="paginatedItems.length > 0" class="w-full flex">
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

export interface Column {
  key: string
  label: string
  width?: string
  maxWidth?: string
}

interface Props {
  items: Record<string, any>[]
  columns: Column[]
  caption?: string
  itemsPerPage?: number
  idKey?: string
  enableTooltip?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 10,
  idKey: 'id',
  enableTooltip: false
})

const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(props.items.length / props.itemsPerPage))

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
</style>
