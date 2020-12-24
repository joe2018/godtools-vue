import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
//具体store模块引入：
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission' 

Vue.use(Vuex)//通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission
  },
  getters
})

export default store
