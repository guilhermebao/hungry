import Vue from 'vue'
import Router from 'vue-router'
import {
  store
} from '../store'
import {
  tokenStore
} from '../components/extra/LocalStorage'
import {
  HTTP,
  setTokenHeader
} from '../http/request'
// import {
//   autoLoginPath
// } from '@/http/ApiRouter'

import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";

import Account from "@/Account.vue";
import Login from "@/Login.vue";
import Establishment from "@/pages/Establishment.vue";
import EstablishmentInput from "@/pages/EstablishmentInput.vue";
import Product from "@/pages/Product.vue";
import ProductInput from "@/pages/ProductInput.vue";

Vue.use(Router)


const router = new Router({
  base: window.location.pathName,
  routes: [{
    path: '/',
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "table",
        name: "Table List",
        component: TableList
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "upgrade",
        name: "Upgrade to PRO",
        component: UpgradeToPRO
      },
      {
        path: "establishment",
        name: "Estabelecimentos",
        component: Establishment
      },
      {
        path: "establishment/:id",
        name: "Estabelecimento",
        component: EstablishmentInput
      },
      {
        path: "product",
        name: "Produtos",
        component: Product
      },
      {
        path: "product/:id",
        name: "Produto",
        component: ProductInput
      }
    ]
  }, {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/account',
    name: 'account',
    component: Account
  },
  {
    path: '*',
    redirect: '/'
  }
  ],
  linkExactActiveClass: "nav-item active"
})

// const validateToken = (token) => {
//   setTokenHeader(token)
//   return HTTP.get(autoLoginPath)
// }

router.beforeEach((to, from, next) => {
  if (!store.getters.isLogged && (to.name === 'login' || to.name === 'forgotpassword')) {
    next()
    store.dispatch('endLoading')

  } else if (!store.getters.isLogged) {
    store.dispatch('startLoading')

    const localToken = tokenStore.get()

    if (localToken) {
      // validateToken(localToken).then(response => {
      //   store.dispatch('setLogin', {
      //     user: response.data,
      //     token: localToken
      //   })

      //   socket(response.data.id, response.data.private, response.data.global)
      //   next('/')
      //   store.dispatch('endLoading')
      // }).catch(error => {

      //   next('/login')
      // })
      next()
      store.dispatch('endLoading')
    } else {
      next('/login')
    }
  } else {
    next()
  }
})


export default router;
