<template>
  <form @submit.prevent="$emit('addTodo')">
    <div class="field is-grouped mb-5">
      <p class="control is-expanded">
        <input
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          ref="inputTodo"
          class="input"
          type="text"
          placeholder="Add todo here"
        />
      </p>
      <p class="control">
        <button
          :disabled="modelValue.length < 5"
          type="submit"
          class="button is-info"
        > Add </button>
      </p>
    </div>
  </form>
</template>

<script setup>
  defineProps({
    modelValue: String,
  })
  
  defineEmits([
    'update:modelValue', 
    'addTodo'
  ])
</script>