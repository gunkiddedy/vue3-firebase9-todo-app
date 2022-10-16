<template>
  <div>
    <div
      v-if="loading"
      class="loading has-text-centered mb-5 is-size-4 has-text-primary">
      <h1>Loading...</h1> 
    </div>
    <div v-else class="loaded">
      <div
        v-for="todo in todos"
        :key="todo.id"
        class="card mb-1"
        :class="{'has-background-primary-light': todo.done}"
      >
        <div class="card-content">
          <div class="content">
            <div class="columns is-mobile is-vcentered">
              <div
                class="column"
                :class="{'line-through' : todo.done}"
              >
                {{ todo.title }}
              </div>
              <div class="column is-5 has-text-right">
                <button
                  @click="done(todo.id)"
                  class="button is-light"
                  :class="{'has-background-success': todo.done}">&check;</button
                >
                <button
                  @click="remove(todo.id)"
                  class="button is-danger ml-2">&cross;</button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    todos: Object,
    loading: Boolean
  })

  const emit = defineEmits(['done', 'remove'])

  const done = (id) => {
    emit('done', id)
  }

  const remove = (id) => {
    emit('remove', id)
  }
</script>