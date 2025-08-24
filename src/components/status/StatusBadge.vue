<script setup lang="ts">
type statuses = 'planned' | 'completed' | 'canceled' | 'ongoing';
const props = defineProps<{
  text: string,
  className: string | statuses
}>();

</script>

<template>
  <span class="badge"
        :class="className"
  >
    {{ text }}
  </span>
</template>

<style scoped>
.badge {
  border-radius: 2.69rem;
  padding-block: 0.25rem;
  padding-inline: 0.75rem;
  height: 1.75rem;
}

.ongoing {
  background: #ffdaa1;
}

.completed {
  background: var(--completed-color);
}

.planned {
  background-color: #AFBFF5;
}

.canceled {
  background: orangered;
  color: #f4f4f4;
}
</style>