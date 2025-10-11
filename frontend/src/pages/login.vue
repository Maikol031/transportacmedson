<template>

    <div class="flex">

        <section
            class="bg-[#4F8F9D] md:w-[60%] h-screen hidden md:flex flex-col items-center justify-center text-center px-8">
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
                        <div class="w-24 h-24 rounded-full bg-[#4F8F9D] flex items-center justify-center shadow-md">
                            <UserCircleIcon class="text-white w-20 h-20" />
                        </div>
                    </div>
                    <CardHeader class="text-center">
                        <CardTitle class="text-xl font-bold">Acesse sua conta</CardTitle>
                        <CardDescription>Digite suas credenciais para continuar</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Usuário</label>
                                <input type="text"
                                    class="mt-1 block w-full rounded-sm px-2 h-8 border-gray-300 shadow-sm focus:border-[#4F8F9D] focus:ring-[#4F8F9D]"
                                    placeholder="Usuário" />
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-700 ">Senha</label>
                                <input type="password"
                                    class="mt-1 block w-full px-2 h-8 rounded-sm border-gray-300 shadow-sm focus:border-[#4F8F9D] focus:ring-[#4F8F9D]"
                                    placeholder="Senha" />
                            </div>

                            <div class="flex justify-between px-4">
                                <label class="flex items-center gap-2">
                                    <input type="checkbox" class="rounded border-gray-300" /> Lembrar
                                </label>
                                <a href="#" class="text-[#4F8F9D] hover:underline">Esqueci a senha</a>
                            </div>

                            <button type="submit"
                                class="w-full bg-[#4F8F9D] text-white py-2 rounded-md hover:bg-[#437c89] transition cursor-pointer">
                                Entrar
                            </button>
                        </form>
                    </CardContent>

                    <!-- <CardFooter class="flex justify-between items-center text-sm text-gray-600 mt-4">
                        <p class="flex items-center gap-2">
                            Não Possue Cadastro?
                        </p>
                        <a href="#" class="text-[#4F8F9D] hover:underline">Cadastrar-se</a>
                    </CardFooter> -->

                </Card>

            </div>

            <div class="w-full mt-auto">
                <Footer />
            </div>

        </section>
    </div>




</template>
<script setup lang="ts">
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TruckIcon, UserCircleIcon } from '@heroicons/vue/24/outline'
import Footer from "@/components/Footer.vue"


</script>