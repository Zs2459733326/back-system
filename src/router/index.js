import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // mode:'hash',
    routes: [
        {
            path: '/',
            redirect: '/login',
            hidden:true,
        },
        // 登录页
        {
            path: '/login',
            name: 'Login',
            hidden:true,
            component: () => import('@/components/Login.vue')
        },
        // 主页
        {
            path: '/home',
            name: '学生管理',
            redirect: 'home/student',
            iconClass:'fa fa-users',
            component: () => import('@/components/Home.vue'),
            children: [
                {
                    path: '/home/student',
                    name: '学生列表',
                    iconClass:'fa fa-list',
                    component: () => import('@/components/students/studentList.vue')
                },
                {
                    path: '/home/work',
                    name: '作业列表',
                    iconClass:'fa fa-list-ul',
                    component: () => import('@/components/students/workList.vue')
                },
                {
                    path: '/home/info',
                    name: '信息列表',
                    iconClass:'fa fa-list-alt',
                    component: () => import('@/components/students/infoList.vue')
                },
            ]
        },
        // 404页
        {
            // 通配符 * 匹配到没有的路由，显示404
            path: '/*/',
            name: 'NotFound',
            hidden:true,
            component: () => import('@/components/NotFound.vue')
        },
    ]
})