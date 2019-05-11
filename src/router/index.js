import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/ShowCanvas'
import NewCanvas from '../pages/NewCanvas'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/newCanvas',
      name: 'NewCanvas',
      component: NewCanvas
    }
  ]
})
