import { createRouter, createWebHistory } from "vue-router"
import login from "@/pages/login.vue"

const routes = [
    {
        name: "login",
        path: "/sign",
        component: login,
        meta: {
            layout: "AppLayoutBlank"
        }
    }

]


export const router = createRouter({
    history: createWebHistory(),
    routes
})