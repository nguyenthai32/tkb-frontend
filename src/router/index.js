import { createWebHistory, createRouter } from "vue-router";
import store from "../store"

import Home from '../views/Home.vue'
import ThoiKhoaBieu from '../views/ThoiKhoaBieu.vue'
import DanhSachTKB from '../views/DanhSachTKB.vue'
import DangKy from '../views/DangKy.vue'
import DangNhap from '../views/DangNhap.vue'


const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/thoikhoabieu',
        name: 'ThoiKhoaBieu',
        component: ThoiKhoaBieu
    },
    {
        path: '/dstkb',
        name: 'DanhSachTKB',
        component: DanhSachTKB,
    },
    {
        path: '/dangky',
        name: 'DangKy',
        component: DangKy,
    },
    {
        path: '/dangnhap',
        name: 'DangNhap',
        component: DangNhap,
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ["/dangnhap", "/dangky"];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = store.getters.userLoggedIn;
    if (authRequired && !loggedIn) {
        next("/dangnhap");
    } else {
        next();
    }
});

export default router;