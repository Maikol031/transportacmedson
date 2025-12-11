<template>
  <div class="relative">
    <input
      ref="inputRef"
      type="number"
      inputmode="numeric"
      :disabled="isDisabled"
      class="w-full pr-3 h-10 py-2 border rounded-sm text-right disabled:bg-gray-100 disabled:border-none disabled:text-gray-400"
      :value="modelValue"
      @input="onInput"
      @keydown="blockNonNumeric"
      @paste.prevent="handlePaste"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  modelValue: { type: Number, default: null },
  maxChars: { type: Number, default: 12 },
  isDisabled: { type: Boolean, default: false}
});

const emit = defineEmits(["update:modelValue"]);

const inputRef = ref<HTMLInputElement | null>(null);

// 👉 BLOQUEIA NÃO-NÚMEROS E RESPEITA maxChars
function blockNonNumeric(e: KeyboardEvent) {
  const allowed = [
    "Backspace", "Delete", "ArrowLeft", "ArrowRight",
    "Tab", "Home", "End"
  ];

  // Se for tecla de controle → permite
  if (allowed.includes(e.key)) return;

  // Se não for número → bloqueia
  if (!/^[0-9]$/.test(e.key)) {
    e.preventDefault();
    return;
  }

  // Se já atingiu limite → bloqueia
  const currentValue = String(inputRef.value?.value ?? "");
  if (currentValue.length >= props.maxChars) {
    e.preventDefault();
  }
}

// 👉 TRATA COLAR TEXTO E LIMITA maxChars
function handlePaste(e: ClipboardEvent) {
  let text = e.clipboardData?.getData("text") ?? "";

  // só números
  text = text.replace(/\D/g, "");

  // respeita maxChars
  text = text.slice(0, props.maxChars);

  emit("update:modelValue", Number(text));
}

// 👉 INPUT NORMAL
function onInput(e: Event) {
  const target = e.target as HTMLInputElement;

  let v = target.value.replace(/\D/g, "");

  // aplica maxChars
  v = v.slice(0, props.maxChars);

  emit("update:modelValue", v === "" ? null : Number(v));
}
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
