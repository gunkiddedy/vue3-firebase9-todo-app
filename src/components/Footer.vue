<template>
  <div>
    <div
      v-if="!todos.length"
      class="no-todos is-size-7 has-text-centered is-uppercase has-text-weight-semibold"
    >
      <p>you don't have any todos</p>
      <button
        @click="$emit('getData')"
        class="button is-warning mt-4"
      > Get Data </button>
    </div>
    <div
      v-else
      class="no-todos is-size-7 has-text-centered is-uppercase has-text-weight-semibold"
    >
      {{ todos.length }} {{ todos.length === 1 ? 'todo' : 'todos' }}
    </div>
  </div>
</template>

<script setup>
  defineProps({
    todos: [Array, Object]
  })

  defineEmits([
    'getData'
  ])
</script>