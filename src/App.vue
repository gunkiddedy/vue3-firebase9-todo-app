<template>
  <div class="todo-app mt-4">

    <!-- header -->
    <Header title="Vue3 Todo App" />
    
    <!-- form input -->
    <FormInput 
      v-model='newTodo'
      @addTodo="addTodo"
    />

    <!-- card -->
    <CardTodo
      :todos="todos"
      @done="toggleDone"
      @remove="deleteTodo"
      :loading="loading"
    />
    
    <!-- footer -->
    <Footer
      v-if="!loading"
      :todos="todos"
    />

  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  // import { v4 as uuidv4 } from 'uuid'
  import { 
    collection, 
    getDocs, 
    onSnapshot, 
    doc,
    addDoc, 
    updateDoc,
    deleteDoc,
    query, 
    orderBy, 
    limit
  } from 'firebase/firestore'
  import { db } from '@/firebase'

  // components
  import CardTodo from '@/components/CardTodo.vue'
  import FormInput from '@/components/FormInput.vue'
  import Footer from '@/components/Footer.vue'
  import Header from '@/components/Header.vue'

  const todos = ref([])
  const newTodo = ref('')
  const loading = ref(false)

  const todosRef = collection(db, 'todos')
  const todosQuery = query(todosRef, orderBy('date', 'desc'))
  
  const getData = async () => {
    loading.value = true
    onSnapshot(todosQuery, (querySnapshot) => {
      const firebaseData = []

      querySnapshot.forEach((doc) => {
        const todo = {
          id: doc.id,
          title: doc.data().title,
          done: doc.data().done
        }
        firebaseData.push(todo)
      })
      
      todos.value = firebaseData
      loading.value = false
    })
  }

  onMounted(() => {
    // // console.log('on mounted')
    // // const querySnapshot = await getDocs(collection(db, 'todos'))
    // // const firebaseData = []

    // // querySnapshot.forEach((doc) => {
    // //   const todo = {
    // //     id: doc.id,
    // //     title: doc.data().title,
    // //     done: doc.data().done
    // //   }

    // //   firebaseData.push(todo)
    // // })

    // // todos.value = firebaseData
    // loading.value = true
    // onSnapshot(collection(db, 'todos'), (querySnapshot) => {
    //   const firebaseData = []
    //   querySnapshot.forEach((doc) => {
    //     const todo = {
    //       id: doc.id,
    //       title: doc.data().title,
    //       done: doc.data().done
    //     }
    //     firebaseData.push(todo)
    //   })
    //   todos.value = firebaseData
    //   loading.value = false
    // })
    getData()
  })

  // add todo func
  const addTodo = async () => {
    await addDoc(todosRef, {
      title: newTodo.value,
      done: false,
      date: Date.now()
    })
    
    newTodo.value = ''

    // const todo = {
    //   id: uuidv4(),
    //   title: newTodo.value,
    //   done: false
    // }

    // if(todos.value.length > 4) {
    //   alert('max todos are 5')
    //   newTodo.value = ''
    // } else {
    //   todos.value.unshift(todo)
    //   newTodo.value = ''
    // }

  }

  // toggle done func
  const toggleDone = async id => {
    const index = todos.value.findIndex(todo => todo.id === id)
    await updateDoc(doc(todosRef, id), {
      done: !todos.value[index].done
    })
  }

  // delete todo func
  const deleteTodo = async (id) => {
    await deleteDoc(doc(todosRef, id))
  }
</script>

<style>
  @import "bulma/css/bulma.min.css";

  .todo-app {
    max-width: 600px;
    overflow: auto;
    padding: 20px;
    margin: 0 auto;
  }

  .line-through {
    text-decoration: line-through;
  }
</style>