<template>
  <ModalScrollBody
    v-model:open="open"
    :is-show-footer="true"
    :is-show-title-modify="true"
    size-modal="md:max-w-[450px]"
  >

    <!-- Título com ícone -->
    <template #titleModify>
      <div class="flex items-center gap-2">
        <Trash2Icon class="size-8" />
        <span class="text-2xl font-semibold">Excluir Itens</span>
      </div>
    </template>

    <!-- Corpo -->
    <template #body>
      <div class="p-2">
        <p class="text-gray-700 leading-relaxed">
          Tem certeza de que deseja excluir 
          <strong>{{ count }}</strong> item(s) selecionado(s)?
        </p>
      </div>
    </template>

    <!-- Rodapé -->
    <template #actions>
      <div class="flex flex-col md:flex-row gap-2">

        <Button class="default-btn-0" @click="cancel">
          Cancelar
        </Button>

        <Button class="delete-btn-0" @click="confirm">
          Confirmar
        </Button>

      </div>
    </template>

  </ModalScrollBody>
</template>

<script setup lang="ts">
import ModalScrollBody from "@/components/ModalScrollBody.vue"
import { Button } from "@/components/ui/button"
import { Trash2Icon } from "lucide-vue-next"

interface Props {
  open: boolean
  count: number
}

const props = defineProps<Props>()
const emit = defineEmits(["confirm-delete"])
const open = defineModel<boolean>("open")

const cancel = () => {
  open.value = false
}

const confirm = () => {
  emit("confirm-delete")
  open.value = false
}
</script>

<style scoped>
@reference "@/index.css";

.default-btn-0 {
  @apply bg-white border border-gray-200 h-10 px-4 rounded-sm 
         hover:bg-stone-50 text-black cursor-pointer transition duration-300;
}

.delete-btn-0 {
  @apply bg-red-600 border border-red-500 h-10 px-4 rounded-sm
         hover:bg-red-700 text-white cursor-pointer transition duration-300;
}
</style>
