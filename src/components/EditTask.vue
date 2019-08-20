<template>
  <div v-if="task" class="edit-task container z-depth-1">
    <h2 class="indigo-text center-align">Edit {{ task.title }} task</h2>
    <form @submit.prevent="edittask">
      <div class="field title">
        <label for="title">task title:</label>
        <input type="text" name="title" v-model="task.title">
      </div>
      <div v-for="(ing, index) in task.details" class="field detail" :key="index">
        <label for="detail">detail:</label>
        <input type="text" name="detail" v-model="task.details[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-detail">
        <label for="add-detail">Add an detail (press tab to add):</label>
        <input type="text" name="add-detail" @keydown.tab.prevent="addIng" v-model="another">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update task</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'Edittask',
  data(){
    return{
      task: null, 
      another: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    edittask(){
       if(this.task.title){
        this.feedback = null
        // create a slug
        this.slug = slugify(this.task.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        // update task in firestore
        db.collection('tasks').doc(this.task.id).update({
          title: this.task.title,
          slug: this.slug,
          details: this.task.details
        }).then(() => {
          this.$router.push({ name: 'HelloWorld' })
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.feedback = 'You must enter a task title'
      }
    
    },
    addIng(){
      if(this.another){
        this.task.details.push(this.another)
        this.another = null
        this.feedback = null
      } else {
        this.feedback = 'You must enter a value to add another detail'
      }
    },
    deleteIng(ing){
      this.task.details = this.task.details.filter(detail => {
        return detail != ing
      })
    }
  },
  created(){
    let ref = db.collection('tasks').where('slug', '==', this.$route.params.task_slug)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.task = doc.data() //All data is fetched into it
        this.task.id = doc.id
      })
    })
  }
}
</script>
 
<style>
.edit-task{
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-task h2{
  font-size: 2em;
  margin: 20px auto;
}
.edit-task .field{
  margin: 20px auto;
  position: relative;
}
.edit-task .delete{
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>