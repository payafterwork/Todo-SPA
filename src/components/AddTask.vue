<template>
  <div class="add-Task container z-depth-1" @submit.prevent="addTask">
    <h2 class="center-align indigo-text">Add New Task</h2>
    <form>
      <div class="field title">
        <label for="title">Task title:</label>
        <input type="text" name="title" v-model="title">
      </div>
       <div v-for="(det, index) in details" class="field task" :key="index">
        <label for="ingredient">Detail:</label>
        <input type="text" name="ingredient" v-model="details[index]">
        <i class="material-icons delete" @click="deleteDetail(det)">delete</i>
      </div>
      <div class="field add-task">
        <label for="add-task">Add an task (press tab to add):</label>
        <input type="text" name="add-task" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Task</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'AddTask',
  data(){
    return{
      title: null,
      details: [],
      another: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    addTask(){
      if(this.title){
           this.feedback=null
           // create slug
           this.slug = slugify(this.title,{
            replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
           })
           db.collection('tasks').add({
            title: this.title,
            details: this.details,
            slug: this.slug
           }).then(()=>{
        this.$router.push({name:'HelloWorld'})
       }).catch(err=>{
        console.log(err)
        })
      }
      else{
        this.feedback = 'You must enter a value to an an task'
      }
    },
    addIng(){
      if(this.another){
        this.details.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to an an task'
      }
     },
      deleteDetail(det){
        this.details = this.details.filter(detail=>{
          return detail != det
        })
      }
    }
  }

</script>

<style>
.add-Task{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-Task h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-Task .field{
  margin: 20px auto;
}

.add-Task .delete{
  
}
</style>