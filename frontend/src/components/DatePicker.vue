<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="cn(
          'w-full h-10 justify-start text-left font-normal disabled:bg-gray-200 disabled:!cursor-not-allowed',
          !dateValue && 'text-muted-foreground',
        )"
        :disabled="disabled"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ dateValue ? df.format(dateValue.toDate(getLocalTimeZone())) : "Selecione uma Data" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="dateValue" initial-focus />
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import type { DateValue } from "@internationalized/date"
import {
  DateFormatter,
  getLocalTimeZone,
  fromDate,
} from "@internationalized/date"
import { Calendar as CalendarIcon } from "lucide-vue-next"
import { computed } from "vue"
import { cn } from "@/lib/utils"
import Button from "./ui/button/Button.vue"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const df = new DateFormatter("pt-BR", {
  dateStyle: "long",
})

interface Props {
  disabled?: boolean
  modelValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

// Função para converter string para DateValue
function stringToDateValue(dateString: string): DateValue | undefined {
  if (!dateString) return undefined

  let day: number | undefined
  let month: number | undefined
  let year: number | undefined

  // Formato DD/MM/YYYY
  if (dateString.includes('/')) {
    const [d, m, y] = dateString.split('/')
    day = parseInt(d ?? '')
    month = parseInt(m ?? '')
    year = parseInt(y ?? '')
  }
  // Formato YYYY-MM-DD (ISO)
  else if (dateString.includes('-')) {
    const [y, m, d] = dateString.split('-')
    day = parseInt(d ?? '')
    month = parseInt(m ?? '')
    year = parseInt(y ?? '')
  }

  if (isNaN(day as number) || isNaN(month as number) || isNaN(year as number)) return undefined

  try {
    const date = new Date(year as number, (month as number) - 1, day as number)
    if (isNaN(date.getTime())) return undefined
    return fromDate(date, getLocalTimeZone())
  } catch {
    return undefined
  }
}

// Computed para converter entre string (v-model) e DateValue (Calendar)
const dateValue = computed({
  get: () => stringToDateValue(props.modelValue || ''),
  set: (newDateValue: DateValue | undefined) => {
    if (newDateValue) {
      const date = newDateValue.toDate(getLocalTimeZone())
      const formatted = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
      emit('update:modelValue', formatted)
    } else {
      emit('update:modelValue', null)
    }
  }
})
</script>
