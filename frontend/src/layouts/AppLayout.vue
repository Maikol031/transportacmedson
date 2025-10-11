<template>
    <component :is="layout">
        <router-view name="menu"/>
        <router-view/>
    </component>
</template>
<script setup lang="ts">
import { markRaw, shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppLayoutDefault from './AppLayoutDefault.vue';

const layout = shallowRef();
const route = useRoute();


const loadLayout = async (layoutName: any) => {
    if (!layoutName) return AppLayoutDefault;
    
    if (layoutName === "AppLayoutWithoutStyles") {
        const { default: component } = await import(`../layouts/${layoutName}.vue`);
        return component;
    }
    
    const { default: component } = await import(`../layouts/${layoutName}.vue`);
    return component;
};

watch(() => route.meta.layout, async (metaLayout) => {
    try {
        const component = await loadLayout(metaLayout);
        layout.value = markRaw(component);
    } catch (error) {
        console.warn(`Layout ${metaLayout} não encontrado, usando layout padrão`);
        layout.value = markRaw(AppLayoutDefault);
    }
}, { immediate: true });


</script>