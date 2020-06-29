import Vue from 'vue';
import Router from 'vue-router';
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/health-tab',
                    component: () => import(/* webpackChunkName: "health-tab" */ '../components/page/BaseTable.vue'),
                    meta: { title: '信息管理' }
                },
                {
                    path: '/health-edit',
                    component: () => import(/* webpackChunkName: "health-edit" */ '../components/page/BaseEditTab.vue'),
                    meta: { title: '信息修改' }
                },
                {
                    path: '/health-insert',
                    component: () => import(/* webpackChunkName: "health-insert" */ '../components/page/BaseForm.vue'),
                    meta: { title: '信息录入' }
                },
                {
                    path: '/manage-tab',
                    component: () => import(/* webpackChunkName: "health-insert" */ '../components/page/ManageTable.vue'),
                    meta: { title: '管理员列表', auth: true }
                },
                // {
                //     path: '/school-tab',
                //     component: () => import(/* webpackChunkName: "health-insert" */ '../components/page/SchoolTable.vue'),
                //     meta: { title: '学校管理', auth: true }
                // },
                // {
                //     path: '/404',
                //     component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                //     meta: { title: '404' }
                // },
                // {
                //     path: '/403',
                //     component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                //     meta: { title: '403' }
                // },
                
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
