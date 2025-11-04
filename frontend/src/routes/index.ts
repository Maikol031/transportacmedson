import { createRouter, createWebHistory } from "vue-router"
import login from "@/pages/login.vue"
import home from "@/pages/home.vue"

const routes = [
    {
        name: "login",
        path: "/sign",
        component: login,
        meta: {
            layout: "AppLayoutBlank"
        }
    },
    {
        name: "home",
        path: "/",
        components: {
            default: home,
            // Menu: () => import("@/components/ui/menu/Menu.vue")
        },
        meta: {
            requiresAuth: true,
            layout: "AppLayoutDefault",
            title: "Home"
        }
    },
    {
        name: "caminhoes",
        path: "/cadastros/caminhoes",
        components: {
            default: () => import("@/pages/caminhoes.vue"),
        },
        meta: {
            requiresAuth: true,
            layout: "AppLayoutDefault",
            title: "Caminhões"
        }
    },
    {
        name: "motoristas",
        path: "/cadastros/motoristas",
        components: {
            default: () => import("@/pages/motoristas.vue"),
        },
        meta: {
            requiresAuth: true,
            layout: "AppLayoutDefault",
            title: "Motoristas"
        }
    }

]


export const router = createRouter({
    history: createWebHistory(),
    routes
})



// router.beforeEach((to, from, next) => {
//   // exemplo: pegar o token do localStorage
//   const token = localStorage.getItem("auth_token")
//   const isAuthenticated = !!token

//   if (to.meta.requiresAuth && !isAuthenticated) {
//     next({ name: "login" })
//   } else if (to.name === "login" && isAuthenticated) {
//     // se já estiver logado, redireciona pra dashboard
//     next({ name: "home" })
//   } else {
//     next()
//   }
// })