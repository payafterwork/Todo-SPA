<template>
  <div class="index container">
    <div class="card" v-for="task in tasks" :key="task.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteTask(task.id)">delete</i>
        <h2 class="indigo-text">{{ task.title }}</h2>
        <ul class="details">
          <li v-for="(detail, index) in task.details" :key="index">
            <span class="chip">{{ detail }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{
      tasks: [
        { title: 'Ninja Brew', slug: 'ninja-brew', details: ['bananas', 'coffee', 'milk'], id: '1' },
        { title: 'Morning Mood', slug: 'morning-mood', details: ['mango', 'lime', 'juice'], id: '2' }
      ]
    }
  },methods:{
    deleteTask(id){
      this.tasks = this.tasks.filter(task=>{
        return task.id!=id;
      })
    }
  }
}
</script>

<style>
.index{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .details{
  margin: 30px auto;
}
.index .details li{
  display: inline-block;
}
.index .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>