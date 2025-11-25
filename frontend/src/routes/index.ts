import { createRouter, createWebHistory } from "vue-router"
import login from "@/pages/login.vue"
import home from "@/pages/home.vue"

import { getAccessToken, restoreSession } from "@/stores/authStore";
import api from "@/services/AxiosConfig";


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
            default: () => import("@/pages/home.vue"),
        },
        meta: {
            requiresAuth: true,
            layout: "AppLayoutDefault",
            title: "Contratos"
        }
    },

    {
        path: "/cadastro",
        children: [
            {
                name: "caminhoes",
                path: "caminhoes",
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
                path: "motoristas",
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
    },
]


export const router = createRouter({
    history: createWebHistory(),
    routes
})





let isRestoring = false;

router.beforeEach(async (to, from, next) => {
    const publicRoutes = ["login", "register", "sign"];

    const isPublic = publicRoutes.includes(to.name as string);

    if (to.name === "login") {
        await restoreSession(api)
    }

    let token = getAccessToken();

    if (token) {
        if (to.name === "login") return next({ name: "home" });
        return next();
    }

    if (isPublic) return next();

    if (!isRestoring) {
        isRestoring = true;

        try {
            await restoreSession(api);
            token = getAccessToken();
        } catch (e) { }

        isRestoring = false;
    }

    const authenticated = !!token;

    if (!authenticated && !isPublic) {
        return next({ name: "login" });
    }

    return next();
});