<script lang="ts" setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import SearchIcon from "@/assets/svg/search.svg";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  debounce: {
    type: Number,
    default: 300,
  },
})

const emit = defineEmits(['update:modelValue'])

const timeout = ref<ReturnType<typeof setTimeout>>()

const localValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    if (timeout.value) {
      clearTimeout(timeout.value)
    }
    timeout.value = setTimeout(
        () => emit('update:modelValue', newValue),
        props.debounce
    )
  },
})
onBeforeUnmount(() => clearTimeout(timeout.value))
</script>

<template>
  <div v-bind="$attrs">
    <SearchIcon />
    <input v-model="localValue" placeholder="Поиск" class="text" />
  </div>
</template>

<style scoped>
input {
  all: unset;
  border: none;
}

.text {
  font-family: var(--font-family), serif;
  font-weight: 500;
  font-size: 0.81rem;
}
</style>
