<template>
  <div class="relative">
    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
      R$
    </span>

    <input
      ref="inputRef"
      type="text"
      inputmode="numeric"
      class="w-full pl-10 pr-3 py-2 border rounded text-right"
      :value="display"
      @input="handleInput"
      :maxlength="maxChars"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: Number,
  maxChars: { type: Number, default: 12 }   // <= LIMITE DE CARACTERES DO INPUT
});

const emit = defineEmits(["update:modelValue"]);

const inputRef = ref<HTMLInputElement | null>(null);
const display = ref("");

// Formatador BRL (sem prefixo)
function formatBRL(value: number) {
  return (value / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Atualiza display quando modelValue vier de fora
watch(
  () => props.modelValue,
  (v) => {
    if (v == null) display.value = "";
    else display.value = formatBRL(v);
  },
  { immediate: true }
);

// Input handler
function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;

  // limpa tudo que não for número
  let raw = target.value.replace(/\D/g, "");

  if (!raw) {
    display.value = "";
    emit("update:modelValue", null);
    return;
  }

  const cents = parseInt(raw, 10);
  display.value = formatBRL(cents);

  emit("update:modelValue", cents);

  // mantém cursor no final
  requestAnimationFrame(() => {
    if (inputRef.value) {
      const len = inputRef.value.value.length;
      inputRef.value.setSelectionRange(len, len);
    }
  });
}
</script>

<style scoped>
input {
  padding-left: 2.3rem;
}
</style>
