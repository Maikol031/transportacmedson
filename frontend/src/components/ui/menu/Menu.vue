<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel class="h-16 flex justify-center mb-5 border-b pb-2 rounded-none gap-x-2">
          <TruckIcon class="!w-12 !h-12 text-white" />
          <span class="text-2xl text-white ">ACM SYSTEM</span>
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton asChild class="text-white hover:text-white text-md active:text-white">
                <a :href="item.url">
                  <component :is="item.icon" class="!size-5" />
                  <span>{{ item.title }}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <!-- CADASTRO MENU -->
            <Collapsible defaultOpen class="group/collapsible">
              <SidebarMenuItem class="text-white hover:text-white active:text-white">

                <CollapsibleTrigger asChild>

                  <SidebarMenuButton @click="isChevronDown = !isChevronDown"
                    class="flex justify-between items-center cursor-pointer !text-white hover:!text-white text-md active:!text-white w-full">
                    <div class="flex items-center gap-2">
                      <ClipboardPlusIcon class="size-5" />
                      <span>Cadastros</span>
                    </div>

                    <ChevronDown v-if="isChevronDown" class="ml-auto" />
                    <Minus v-else class="ml-auto" />
                  </SidebarMenuButton>


                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>

                    <SidebarMenuSubItem v-for="item in cadastroModule" :key="item.title">

                      <RouterLink :to="item.url">
                        <SidebarMenuButton class="cursor-pointer text-white hover:text-white text-md active:text-white">
                          <a class="flex gap-2 items-center">
                            <component :is="item.icon" class="w-4 h-4" />
                            <span>{{ item.title }}</span>
                          </a>
                        </SidebarMenuButton>
                      </RouterLink>
                    </SidebarMenuSubItem>

                  </SidebarMenuSub>
                </CollapsibleContent>

              </SidebarMenuItem>

            </Collapsible>

          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu v-model:open="isOpen">
            <DropdownMenuTrigger as-child>
              <SidebarMenuButton class="text-white hover:text-white active:text-white cursor-pointer">
                <User2 /> Edson

                <ChevronUp class="ml-auto" v-if="isOpen" />
                <ChevronDown class="ml-auto" v-else />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="top" class="w-(--reka-popper-anchor-width)">
              <DropdownMenuItem  :class="'cursor-pointer'">
                <LogOut />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>

<script setup lang="ts">
import { FileText, ClipboardPlusIcon, ChevronDown, Minus, Users, User, Fuel, Clipboard, Truck, ChevronUp, User2, LogOut } from "lucide-vue-next"
import { TruckIcon } from '@heroicons/vue/24/outline';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarFooter,
} from "@/components/ui/sidebar"

import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "../dropdown-menu";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../collapsible";
import { ref } from "vue";

// Menu items.
const items = [
  {
    title: "Contratos",
    url: "/",
    icon: FileText,
  },
];

const cadastroModule = [
  {
    title: "Clientes",
    url: "#",
    icon: Users,
  },
  {
    title: "Motoristas",
    url: "/cadastro/motoristas",
    icon: User,
  },
  // {
  //   title: "Postos",
  //   url: "#",
  //   icon: Fuel,
  // },
  {
    title: "Abastecimentos",
    url: "#",
    icon: Clipboard,
  },
  {
    title: "Caminhões",
    url: "/cadastro/caminhoes",
    icon: Truck,
  },
]

const isChevronDown = ref(true)
const isChevronUp = ref(true)
const isOpen = ref<boolean>(false)

</script>
