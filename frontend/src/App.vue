
<template>
  <AppLayout/>
  <DynamicToast/>
</template>

<script setup lang="ts">
import DynamicToast from './components/DynamicToast.vue';
import AppLayout from './layouts/AppLayout.vue';
import { defineComponent } from 'vue';

defineComponent({
  name: "App",
  components: { AppLayout },
})


</script>
