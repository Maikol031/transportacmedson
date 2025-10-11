<template>
    <main>
        <div>
            <slot/>
        </div>
    </main>
    <Footer/>
    <Spinner class="size-8"/>

</template>
<script setup lang="ts">
import Footer from "@/components/Footer.vue"
import Spinner from "@/components/ui/spinner/Spinner.vue"

</script>