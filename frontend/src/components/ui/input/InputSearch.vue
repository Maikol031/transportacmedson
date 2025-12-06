<template>
    <div ref="root" class="relative w-full md:w-auto">

        <div class="flex flex-col bg-gray-100 rounded-r-md">

            <div class="flex w-full">
                <div
                    class="flex items-center bg-white rounded-r-md border border-gray-100 border-l-0 h-10 relative w-full mr-2">

                    <div class="h-full w-px bg-gray-200"></div>

                    <div class="flex relative h-full items-center">

                        <input :disabled="disabled" type="text" placeholder="Código" v-model="searchId"
                            @keyup.enter="runSearch" class="flex items-center justify-center h-10 text-center w-20 focus:outline-none text-gray-500
                            disabled:bg-gray-100" />

                        <button
                            type="button"
                            :disabled="disabled"
                            class="h-10 flex items-center px-1 border-y-1 bg-blue-500 cursor-pointer  border-x-none border-y-gray-200 disabled:bg-blue-500/30  disabled:cursor-not-allowed"
                            @click="runSearch"
                        >

                            <Search class="text-white" :size="18" />
                        </button>

                    </div>

                    <div class="h-full w-px bg-gray-200"></div>

                    <input :disabled="disabled" type="text" placeholder="Pesquisar..." v-model="searchText"
                        @keyup.enter="runSearch" class="px-4 w-full h-full focus:outline-none text-gray-500 
                        disabled:bg-gray-100" />
                </div>
            </div>

            <!-- RESULTADOS -->
            <div v-if="showResults"
                class="absolute left-0 top-12 bg-white p-4 rounded-md shadow border w-full max-w-md z-30">
                <h3 class="font-semibold mb-2">Resultados:</h3>

                <div v-if="filteredItems.length === 0" class="text-gray-400 text-sm">
                    Nenhum item encontrado.
                </div>

                <ul v-else class="space-y-1">
                    <li v-for="item in filteredItems" :key="item.id" @click="chooseItem(item)"
                        class="p-2 border rounded hover:bg-gray-50 cursor-pointer" v-html="highlight(item)"></li>
                </ul>
            </div>

        </div>

    </div>
</template>


<script setup lang="ts">
import { Search } from "lucide-vue-next";
import { ref, onMounted, onBeforeUnmount, computed, type Prop } from "vue";

const root = ref<HTMLElement | null>(null);

interface Props {
    disabled?: boolean
}

withDefaults(defineProps<Props>(), {
    disabled: false
})

// Dropdown
const open = ref(false);
const selected = ref("Código");
const options = ["Código", "Descrição"];

const select = (option: string) => {
    selected.value = option;
    open.value = false;
};

const handleClickOutside = (e: Event) => {
    if (!root.value) return;

    if (!root.value.contains(e.target as Node)) {
        open.value = false;
        showResults.value = false;
    }
};


onMounted(() => document.addEventListener("pointerdown", handleClickOutside));
onBeforeUnmount(() => document.removeEventListener("pointerdown", handleClickOutside));



const items = ref<{ id: number; name: string }[]>([
    { id: 0, name: "SLK NUM COMPENSA" },
    { id: 2, name: "SLK COMPENSA" },
    { id: 25, name: "ITEM TESTE" }
]);

// Inputs
const searchId = ref("");
const searchText = ref("");

const showResults = ref(false);

// Filtragem automática
const filteredItems = computed(() => {
    const idTerm = searchId.value.trim();
    const textTerm = searchText.value.trim().toLowerCase();

    // Retorna todos
    if (!idTerm && !textTerm) {
        return items.value;
    }

    return items.value.filter(i => {
        const matchesId = idTerm ? i.id.toString().includes(idTerm) : true;
        const matchesName = textTerm ? i.name.toLowerCase().includes(textTerm) : true;
        return matchesId && matchesName;
    });
});


// Execução da busca
const runSearch = () => {
    showResults.value = true;
};

// Selecionar item: sempre preencher os 2 inputs
const chooseItem = (item: any) => {
    searchId.value = item.id.toString();
    searchText.value = item.name;

    showResults.value = false;
};

// Highlight
const highlight = (item: any) => {
    const idTerm = searchId.value.trim();
    const textTerm = searchText.value.trim();

    let code = item.id.toString();
    let name = item.name;

    // Grifar ID se existir busca de ID
    if (idTerm) {
        const idRegex = new RegExp(`(${idTerm})`, "gi");
        code = code.replace(idRegex, "<mark>$1</mark>");
    }

    // Grifar nome se existir busca de nome
    if (textTerm) {
        const nameRegex = new RegExp(`(${textTerm})`, "gi");
        name = name.replace(nameRegex, "<mark>$1</mark>");
    }

    return `
        <span class="font-semibold">Código:</span> ${code}<br>
        <span class="font-semibold">Descrição:</span> ${name}
    `;
};

</script>
