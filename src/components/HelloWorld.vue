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
import db from '@/firebase/init'
export default {
  name: 'HelloWorld',
  data(){
    return{
      tasks: [
        ]
    }
  },methods:{
    deleteTask(id){
    
      db.collection('tasks').doc(id).delete().then(()=>{
          this.tasks = this.tasks.filter(task=>{
        return task.id!=id;
      })
      })
    }
  }, created(){
    //fetch data from firestore
    db.collection('tasks').get().then(snapshot=>{
      snapshot.forEach(doc=>{
         let task = doc.data();
         task.id =  doc.id;
         this.tasks.push(task)
      })
    })
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