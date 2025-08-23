<script setup lang="ts">
import SideBar from '@/components/sidebar/SideBar.vue'
import Sessions from '@/components/sessions/Sessions.vue'
</script>

<template>
  <div class="wrap">
    <SideBar />
    <Sessions />
  </div>
</template>

<style scoped>
.wrap {
  display: flex;
  background-color: #f4f4f8;
}
</style>