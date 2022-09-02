import Cookie from 'js-cookie'
export default {
    state: {
        currentMenu: null, //菜单参数
        tablist: [{
            path: "/",
            name: 'home',
            label: "Home",
            icon: "data-line",
        }
        ],//标签
        isCollapse: false,//折叠
        menu: [],
    },
    mutations: {
        selectMenu(state, val) {
            if (val.name != 'home') {//判断传入的是否是home
                state.currentMenu = val;//将传入的菜单属性赋值给state.currentMenu
                let result = state.tablist.findIndex(item => item.name === val.name);
                if (result == -1) {
                    state.tablist.push(val);
                }//去重
            } else {
                state.currentMenu = null;
            }
        },/* 面包屑导航 */
        closeTab(state, val) {
            let result = state.tablist.findIndex(item => item.name === val.name);
            state.tablist.splice(result, 1);
        },/* 关闭标签 */
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },/* 折叠菜单 */
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },/* 设置菜单 */
        clearMenu(state) {
            state.menu = '';
            Cookie.remove('menu');
        },/* 清楚菜单 */
        addMenu(state, router) {
            let menu = Cookie.get('menu') && JSON.parse(Cookie.get('menu'))
            if (!menu) {
                return
            }
            state.menu = menu
            let currenMenu = [
                {
                    path: '/',
                    component: () => import('@/views/Main'),
                    children: []//将动态路由都放在children中
                }
            ]
            menu.forEach(item => {//通过forEach方法添加children
                if (item.children) {//首先进行判断是否含有子菜单
                    item.children = item.children.map(item => {//通过map方法过找到有子菜单的
                        item.component = () => import(`@/views/${item.url}`)//模板字符串拼接
                        return item
                    })
                    currenMenu[0].children.push(...item.children)//通过展开运算符对children展开添加到children
                } else {
                    item.component = () => import(`@/views/${item.url}`)
                    currenMenu[0].children.push(item)
                }

            });
            router.addRoutes(currenMenu)//调用router中的addRoutes方法动态添加路由
        }/* 添加菜单 */
    },
    actions: {},
}