import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBYjJTMR7HB5mdzL7WhMDmxgmL1stSFbjg',
  authDomain: 'vue3-todo-app-8b113.firebaseapp.com',
  projectId: 'vue3-todo-app-8b113',
  storageBucket: 'vue3-todo-app-8b113.appspot.com',
  messagingSenderId: '217064395749',
  appId: '1:217064395749:web:9734953a2b8e229269150c'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {
  db
}