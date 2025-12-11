<template>
  <div class="relative">
    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
      R$
    </span>

    <input 
      ref="inputRef" 
      type="text" 
      :disabled="isDisabled"
      inputmode="numeric" 
      class="w-full pl-10 pr-3 h-10 py-2 border rounded-sm text-right disabled:bg-gray-100 disabled:border-none disabled:text-gray-400"
      :value="display" 
      @input="handleInput" 
      @keydown="blockNonNumeric" 
      @paste.prevent="handlePaste"
      :maxlength="maxChars" 
    />


  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: Number,
  maxChars: { type: Number, default: 12 },
  isDisabled: { type: Boolean, default: false }
});

const emit = defineEmits(["update:modelValue"]);

const inputRef = ref<HTMLInputElement | null>(null);
const display = ref("");

// Bloca teclas não numéricas
function blockNonNumeric(e: KeyboardEvent) {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "Home",
    "End"
  ];

  if (allowedKeys.includes(e.key)) return;

  // Permite números (0–9)
  if (/^[0-9]$/.test(e.key)) return;

  // Caso contrário, bloqueia
  e.preventDefault();
}

// Evita colar caracteres não numéricos
function handlePaste(e: ClipboardEvent) {
  const text = e.clipboardData?.getData("text") ?? "";
  if (!/^\d+$/.test(text)) {
    e.preventDefault();
  }
}

// Formatador
function formatBRL(value: number) {
  return (value / 100).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

watch(
  () => props.modelValue,
  (v) => {
    if (v == null) display.value = "";
    else display.value = formatBRL(v);
  },
  { immediate: true }
);

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;

  // mantém apenas números
  let raw = target.value.replace(/\D/g, "");

  if (!raw) {
    display.value = "";
    emit("update:modelValue", null);
    return;
  }

  const cents = parseInt(raw, 10);
  display.value = formatBRL(cents);

  emit("update:modelValue", cents);

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
