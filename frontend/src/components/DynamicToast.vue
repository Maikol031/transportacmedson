<template>
  <transition-group
    name="toast-fade"
    tag="div"
    class="fixed top-4 right-4 z-50 flex flex-col gap-3 items-end"
  >
    <div
      v-for="toast in toastStore.toasts.value"
      :key="toast.id"
      class="flex items-start gap-3 p-4 w-90 rounded-md shadow-lg bg-white border-l-10"
      :class="toastClasses(toast.type)"
    >
      <component
        :is="toast.icon"
        :class="[
          'size-8 flex-shrink-0 mt-1 rounded-full text-white',
          toast.color ? toast.color : '',
        ]"
      />
      <div class="flex-1">
        <h3 class="font-semibold text-gray-800 mb-1 capitalize">{{ toastTitle[toast.type] }}</h3>
        <p class="text-sm text-gray-600 leading-snug">{{ toast.message }}</p>
      </div>
      <button
        @click="toastStore.toasts.value = toastStore.toasts.value.filter(t => t.id !== toast.id)"
      >
        <X class="w-4 h-4 text-gray-500 hover:text-gray-800" />
      </button>
    </div>
  </transition-group>
</template>

<script setup lang="ts">
import { useToast } from "@/plugins/toast";
import { X } from "lucide-vue-next";
import { ref } from "vue";

const toastStore = useToast();

function toastClasses(type: string) {
  switch (type) {
    case "success": return "border-green-500";
    case "error": return "border-red-500";
    case "info": return "border-blue-500";
    case "warning": return "border-yellow-400";
  }
}

const toastTitle = ref<Record<string, string>>({
  success: "Tudo certo!",
  error: "Algo deu Errado!",
  info: "Informação",
  warning: "Atenção"
})

</script>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.35s ease;
}
.toast-fade-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.toast-fade-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
