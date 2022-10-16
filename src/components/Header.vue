<template>
  <div class="title has-text-centered">
    {{ title }}
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      default: 'default app'
    }
  })
</script>