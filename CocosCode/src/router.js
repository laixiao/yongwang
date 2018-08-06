const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
	{ 
		path: '*', 
		component: (resolve) => require(['./views/index.vue'], resolve)
	},
	{
		path: '../games/action/web-mobile/index.html',
		name: "action",
	},
];
export default routers;