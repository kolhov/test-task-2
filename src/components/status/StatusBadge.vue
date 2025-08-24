<script setup lang="ts">
import {computed, onMounted, ref} from "vue";

type statuses = 'planned' | 'completed' | 'canceled' | 'ongoing';
const props = defineProps<{
  status: string | statuses
}>();

const className = ref<string>('');
const text = ref<string>('');

onMounted(
    () => {
      switch (props.status) {
        case 'planned': {
          text.value = 'Запланировано';
          className.value = 'planned'
          break;
        }
        case 'completed': {
          text.value = 'Завершено';
          className.value = 'completed'
          break;
        }
        case 'canceled': {
          text.value = 'Отменено';
          className.value = 'canceled'
          break;
        }
        case 'ongoing': {
          text.value = 'Идёт';
          className.value = 'ongoing'
          break;
        }
      }
    }
)
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