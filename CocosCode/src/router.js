const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/button.vue'], resolve)
    }
];
export default routers;