import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import axios from 'axios'
import yaml from 'js-yaml'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'animate.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faHouse, faSun, faMoon, faAngleDown, faUpLong, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import VueObserveVisibility from 'vue3-observe-visibility'
import "./styles/index.scss"

library.add(faUserSecret, faHouse, faHeart, faSun, faMoon, faAngleDown, faUpLong, faAddressCard)

const app = createApp(App)

function cheakTime() {
    var hours = new Date().getHours();
    if (hours >= 18 || (hours >= 0 && hours <= 6)) {
        return 'dark';
    }
    return 'light';
}

const modules = import.meta.glob('./views/*.vue');
axios.get("./yaml/_config.yaml")
    .then((response) => {
        const data = yaml.load(response.data)
        app.config.globalProperties.$configs = data

        var colorShame = localStorage.getItem('colorShame') || cheakTime();
        app.config.globalProperties.$colorShame = colorShame;

        let routes = []
        const rou_configs = data['router_c']
        for (var rou_config in rou_configs) {
            let view = rou_configs[rou_config]['component']
            let router_meta = rou_configs[rou_config]["meta"] || "default"
            let banner = data[router_meta]["banner"]
            var route_one = {
                path: rou_configs[rou_config]['path'],
                name: rou_configs[rou_config]['name'],
                component: modules[`./views/${view}.vue`],
                meta: {
                    banner_img: banner["background_img"],
                    sub_title: banner["sub_title"],
                    tip: banner["tip"],
                    banner_img_height: banner["banner_img_height"],
                    title: (rou_configs[rou_config]['name'] == "Home") ? data["site_name"] : rou_configs[rou_config]['name'] + data["tab_title_separator"] + data["site_name"]
                }
            }
            routes.push(route_one)
        }
        const router = createRouter({
            history: createWebHashHistory(),
            routes
        })
        router.beforeEach((to, from, next) => {
            /* 路由发生变化修改页面title */
            if (to.meta.title) {
                document.title = to.meta.title
            }
            next()
        })
        app.use(router)
        app.use(VueObserveVisibility)
        app.component('font-awesome-icon', FontAwesomeIcon)
        app.mount('#app')
        console.log('%c Xiao v1.0 %c https://www.ailliom.xyz ', 'color: white; background: #e9546b; padding:5px 0;', 'padding:4px;border:1px solid #e9546b;')
    })
    .catch(function (err) {
        console.error(err)
    })