<template>
  <input 
    v-model="maskedValue"
    :disabled="disabled" 
    :type="type"
    :maxlength="maxLength"
    :class="[
      'w-full rounded-sm px-2 h-10 border-[0.5px] border-gray-200 focus:border-[0.5px]  disabled:bg-gray-100 disabled:border-none disabled:text-gray-400',
      customizeClass
    ]"
    @input="onInput"
  >
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  type?: string
  customizeClass?: string
  disabled?: boolean
  maxLength?: number
  /**
   * Tipos de máscara disponíveis:
   * - 'cpf'
   * - 'cnpj'
   * - 'cpfCnpj' → detecta automaticamente
   * - 'telefone'
   * - 'cep'
   * - 'none'
   */
  mask?: 'cpf' | 'cnpj' | 'cpfCnpj' | 'telefone' | 'cep' | 'none' | 'cnh'
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  mask: 'none'
})

const model = defineModel<string>('model')
const maskedValue = ref(model.value || '')

/**
 * 🔹 Padrões de máscara (sem switch)
 */
const maskPatterns: Record<string, [RegExp, string][]> = {
  cpf: [
    [/(\d{3})(\d)/, '$1.$2'],
    [/(\d{3})(\d)/, '$1.$2'],
    [/(\d{3})(\d{1,2})$/, '$1-$2']
  ],
  cnpj: [
    [/^(\d{2})(\d)/, '$1.$2'],
    [/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'],
    [/\.(\d{3})(\d)/, '.$1/$2'],
    [/(\d{4})(\d)/, '$1-$2']
  ],
  telefone: [
    [/^(\d{2})(\d)/, '($1) $2'],
    [/(\d{5})(\d{4})$/, '$1-$2']
  ],
  cep: [
    [/^(\d{5})(\d)/, '$1-$2']
  ]
}

/**
 * 🔹 Função genérica de máscara
 */
function applyMask(value: string, maskType: string): string {
  if (!value || maskType === 'none') return value
  let onlyNumbers = value.replace(/\D/g, '')

  // CPF/CNPJ dinâmico
  if (maskType === 'cpfCnpj') {
    maskType = onlyNumbers.length <= 11 ? 'cpf' : 'cnpj'
  }

  if (maskType === 'cnh') {
    // CNH → apenas números, até 11 dígitos (sem formatação)
    return onlyNumbers.slice(0, 11)
  }

  const patterns = maskPatterns[maskType]
  if (!patterns) return onlyNumbers

  for (const [regex, replacement] of patterns) {
    onlyNumbers = onlyNumbers.replace(regex, replacement)
  }

  return onlyNumbers
}

/**
 * 🔹 Atualiza o valor mascarado
 */
function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  const masked = applyMask(target.value, props.mask)
  maskedValue.value = masked
  model.value = masked.replace(/\D/g, '') // valor "limpo" no v-model
}

/**
 * 🔹 Sincroniza com o model externo
 */
watch(model, (val) => {
  maskedValue.value = applyMask(val || '', props.mask)
})
</script>
