<script setup lang="ts">

const isShowed = defineModel<boolean>();
</script>

<template>
  <div v-if="isShowed" @click.self="isShowed = false" class="z-99 dialog-backdrop">
    <div class="dialog-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.dialog-backdrop {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
}
</style>