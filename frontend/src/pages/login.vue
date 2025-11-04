<template>

    <main class="flex">

        <section
            class="bg-main md:w-[60%] h-screen hidden md:flex flex-col items-center justify-center text-center px-8">
            <div class="flex flex-col items-center space-y-3">
                <div class="flex items-center space-x-2">
                    <TruckIcon class="w-20 h-20 text-white" />
                    <h1 class="text-white text-5xl font-bold">ACM SYSTEM</h1>
                </div>

                <h2 class="text-white text-5xl font-bold">Gestão de Fretes</h2>

                <p class="text-white max-w-lg text-md leading-relaxed">
                    Registre contratos, abastecimentos e acompanhe saldos de forma simples e rápida.
                    Sistema pensado para transportadoras que operam com terceiros.
                </p>
            </div>
        </section>


        <section class="bg-white w-full md:w-[40%] h-screen flex flex-col items-center">

            <div class="flex-1 flex flex-col justify-center w-full max-w-md">


                <!-- CARD -->
                <Card class="relative pt-16 pb-8 px-6 shadow-lg">
                    <div class="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div class="w-24 h-24 rounded-full bg-main flex items-center justify-center shadow-md">
                            <UserCircleIcon class="text-white w-20 h-20" />
                        </div>
                    </div>
                    <CardHeader class="text-center">
                        <CardTitle class="text-xl font-bold">Acesse sua conta</CardTitle>
                        <CardDescription>Digite suas credenciais para continuar</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form class="space-y-4" @submit.prevent="login">
                            <div>

                                <InputWithLabel
                                    v-model="loginInstance.email"
                                    label="E-mail" 
                                    place-holder="E-mail"
                                />

                            </div>

                            <div class="relative">

                                <InputWithLabel
                                    v-model="loginInstance.password"
                                    :type="isTypePassword ? 'password' : 'text'"
                                    label="Senha" 
                                    place-holder="Senha"
                                />

                                <button type="button" @click="isTypePassword = !isTypePassword"
                                    class="absolute inset-y-11 right-2 flex items-center text-gray-500 hover:text-main focus:outline-none cursor-pointer">
                                    <EyeIcon v-if="!isTypePassword" class="w-5 h-5" />
                                    <EyeSlashIcon v-else class="w-5 h-5" />
                                </button>
                            </div>

                            <div class="flex justify-between px-4">
                                <label class="flex items-center gap-2">
                                    <input type="checkbox" class="rounded border-gray-300" /> Lembrar-me
                                </label>
                                <a href="#" class="text-main hover:underline">Esqueci a senha</a>
                            </div>

                            <button type="submit"
                                class="w-full bg-main text-white py-2 rounded-md hover:bg-main-hover transition cursor-pointer">
                                Entrar
                            </button>
                        </form>
                    </CardContent>

                    <!-- <CardFooter class="flex justify-between items-center text-sm text-gray-600 mt-4">
                        <p class="flex items-center gap-2">
                            Não Possue Cadastro?
                        </p>
                        <a href="#" class="text-main hover:underline">Cadastrar-se</a>
                    </CardFooter> -->

                </Card>

            </div>

            <div class="w-full mt-auto">
                <Footer />
            </div>

        </section>
    </main>




</template>
<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TruckIcon, UserCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';
import Footer from "@/components/Footer.vue";
import { ref } from 'vue';
import Login from '@/entities/Login';
import InputWithLabel from '@/components/ui/input/InputWithLabel.vue';


const isTypePassword = ref<boolean>(true);

const loginInstance = ref<Login>(new Login());


const login = () => {
    console.log(loginInstance.value)
}

</script>