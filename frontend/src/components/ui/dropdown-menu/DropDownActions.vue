<template>
    <DropdownMenu>
        <DropdownMenuTrigger class="flex hover:bg-slate-200 w-8 h-8 rounded-full items-center justify-center cursor-pointer">
            <EllipsisVertical class="w-4 h-4 text-gray-600 hidden md:inline" />
            <EllipsisIcon class="w-5 h-5 text-gray-600 md:hidden" />
        </DropdownMenuTrigger>
        <DropdownMenuContent class="mr-10">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem v-if="isDetalhar" @click="$emit('detalhar')" class="cursor-pointer flex justify-between">
                Resumo de Pagamentos
                <BookOpenText />
            </DropdownMenuItem>
            <DropdownMenuItem v-if="isExcluir" @click="$emit('excluir')" class="cursor-pointer flex justify-between">
                Excluir
                <Trash2Icon />
            </DropdownMenuItem>
            <!-- <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem> -->
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script setup lang="ts">
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { EllipsisVertical, EllipsisIcon, BookOpenText, Trash2Icon } from 'lucide-vue-next';

interface Props {
    isDetalhar?: boolean
    isExcluir?: boolean
}

withDefaults(defineProps<Props>(), {
    isDetalhar: true
})
defineEmits(["detalhar", "excluir"])


</script>