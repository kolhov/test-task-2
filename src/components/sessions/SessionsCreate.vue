<script setup lang="ts">
import {ref} from "vue";

const sessionData = defineModel();
const emit = defineEmits(['close']);

const start = ref<string>('');
const end = ref<string>('');
const status = ref<string>('');
const statuses = ['planned' , 'completed' , 'canceled' , 'ongoing'];
const formatedStatuses = ['Запланировано' , 'Завершено' , 'Отменено' , 'Идёт'];
const module = ref<string>('');
const sessionType = ref<string>('');
const sessionTypes = ['lesson', 'examination', 'accreditation'];
const formatedSessionTypes = ['Урок', 'Экзамен', 'Аккредитация'];
const rooms = ref<string>('');
const groups = ref<string>('');

// Само собой во всём этом минимум смысла без типов и запросов для валидации
// ну и в целом бордель страшнейший
function save() {
  const newSession = {
    module: module.value,
    start: start.value,
    end: end.value,
    status: {
      name: status.value
    },
    groups: [{
      name: groups.value
    }],
    rooms: [{
      name: rooms.value
    }],
    type: {
      name: sessionType.value
    }
  }
  sessionData.value = [newSession, ...sessionData.value as any];

  emit('close');
}
</script>

<template>
  <div class="forma" id="create form">
    <span class="text">Дата и время</span>
    <input v-model="start" placeholder="Дата" type="datetime-local" />
    <input v-model="end" placeholder="Дата" type="datetime-local" />
    <span class="text">Статус</span>
    <select v-model="status">
      <option v-for="(item, index) in formatedStatuses" :key="item" :value="statuses[index]">
        {{ item }}
      </option>
    </select>
    <span class="text">Название учебного модуля</span>
    <textarea v-model="module" placeholder="Название" type="text" class="module" />
    <span class="text">Статус</span>
    <select v-model="sessionType">
      <option v-for="(item, index) in formatedSessionTypes" :key="item" :value="sessionTypes[index]">
        {{ item }}
      </option>
    </select>
    <span class="text">Комната</span>
    <input v-model="rooms" placeholder="411" type="text" />
    <span class="text">Группа</span>
    <input v-model="groups" placeholder="2422" type="text" />
    <button @click="save" type="submit" class="create-button">Сохранить</button>
  </div>
</template>

<style scoped>
.forma {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 20rem;
  font-family: var(--font-family), serif;
  font-size: 1.1rem;
}

.module {
  height: 6rem;
  min-height: 2.5rem;
  line-height: 150%;
  overflow: hidden;
  padding: 0.4rem 0.8rem 0.8rem 0.4rem;
}

input, select, textarea {
  all: unset;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 8px 0 16px;
  gap: 8px;
  background: var(--scbase-6);
  border: 1px solid var(--scbase-4);
  border-radius: 12px;
  flex-grow: 0;
  line-height: 154%;
  color: var(--scbase-1);
  height: 2.5rem;
  width: auto;
  font-weight: 500;
}

select {
  cursor: pointer;
}

.text {
  font-weight: 800;
  padding-left: 0.5rem;
}

.create-button {
  border-radius: 0.75rem;
  width: auto;
  height: 2.75rem;
  align-items: center;
  justify-content: center;
  border: none;
  background: var(--scbase-7);
  color: var(--scbase-4);
  font-family: var(--font-family), serif;
  font-weight: 800;
  font-size: 0.94rem;
  line-height: 160%;
  cursor: pointer;
}

.create-button:hover {
  background-color: var(--scbase-17);
}
</style>