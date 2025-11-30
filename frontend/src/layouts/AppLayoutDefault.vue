<template>
    <SidebarProvider>
        <Menu />
        <main class="relative mb-14 sm:mb-0 flex min-w-0 flex-1 overflow-hidden">
            <SidebarTrigger
                class="bg-white border-l-none text-black hover:bg-stone-100 cursor-pointer md:fixed border-l-black rounded-none rounded-r-md" />

            <div
                class="flex-1 min-w-0 overflow-x-hidden overflow-y-auto pr-6 pt-5 relative min-h-screen sm:ml-14 space-y-16">
                <div class="flex items-center gap-4">
                    <h1 class="font-bold text-4xl text-gray-700">{{ title }}</h1>
                </div>
                <slot />
            </div>
        </main>
    </SidebarProvider>
    <Footer />
    <Loader :is-loading-store="loading.state.isLoading" />
</template>

<script setup lang="ts">
import SidebarProvider from "@/components/ui/sidebar/SidebarProvider.vue";
import { useLoadingStore } from "@/stores/useLoadingStore";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Loader from "@/components/ui/loader/Loader.vue";
import Menu from "@/components/ui/menu/Menu.vue";
import Footer from "@/components/Footer.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const loading = useLoadingStore();
const route = useRoute();
const title = computed(() => route.meta.title ?? "");

</script>
