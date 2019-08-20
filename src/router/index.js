import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AddTask from '@/components/AddTask'
import EditTask from '@/components/EditTask'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },{
      path: '/add-task',
      name: 'AddTask',
      component: AddTask
    },{
      path: '/edit-task/:task_slug',
      name: 'EditTask',
      component: EditTask
    },
  ]
})
