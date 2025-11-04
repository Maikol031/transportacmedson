<template>
    <SidebarProvider>
        <Menu />
        <main class=" relative mb-14 sm:mb-0 flex w-full">
            <SidebarTrigger
                class="bg-white border-l-none text-black hover:bg-stone-100 cursor-pointer md:fixed border-l-black rounded-none rounded-r-md" />
            <div class="flex-1 pr-6 pt-5 relative min-h-screen sm:ml-14 space-y-16">
                <div class="flex items-center gap-4">
                    <h1 class="font-bold text-4xl text-gray-700">{{ title }}</h1>
                    <!-- <div class="flex-1 h-px bg-gray-200 mt-4"></div> -->
                </div>
                <slot />
            </div>
        </main>
    </SidebarProvider>
    <Footer />
    <Loader :is-loading-store="loadingStore" />
</template>

<script setup lang="ts">
import SidebarProvider from "@/components/ui/sidebar/SidebarProvider.vue";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Loader from "@/components/ui/loader/Loader.vue";
import Menu from "@/components/ui/menu/Menu.vue";
import Footer from "@/components/Footer.vue";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

const loadingStore = ref<boolean>(false);
const route = useRoute();
const title = ref<string>("");

watch(()=> route.meta.title, (value)=> {
    title.value = String(value);
});




</script>
