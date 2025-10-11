
<template>
  <AppLayout/>
</template>

<script setup lang="ts">
import AppLayout from './layouts/AppLayout.vue';
import { defineComponent } from 'vue';

defineComponent({
  name: "App",
  components: { AppLayout },
})


</script>
