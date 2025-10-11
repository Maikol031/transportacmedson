<template>

    <div class="flex">

        <div class="bg-[#4F8F9D] md:w-[60%] h-screen hidden md:block justify-items-center">
            <TruckIcon class="w-15 h-15 text-white" />
        </div>

        <div class="bg-white w-full md:w-[40%] h-screen block">
            <Card class="w-lg bg-amber-300">
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    Card Content
                </CardContent>
                <CardFooter>
                    Card Footer
                </CardFooter>
            </Card>
        </div>

    </div>




</template>
<script setup lang="ts">

import { TruckIcon } from '@heroicons/vue/24/outline'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

</script>