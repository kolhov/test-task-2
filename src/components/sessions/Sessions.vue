<script setup lang="ts">
import FilterIcon from '@/assets/svg/filter.svg';
import NotFilterIcon from '@/assets/svg/filter-2.svg';
import DebouncedInput from '@/components/debounce-input/DebounceInput.vue';
import {
  createColumnHelper,
} from '@tanstack/vue-table';
import {h, ref} from 'vue';
import sessions from './data1.json';
import type {Session} from "@/components/sessions/sessions.types.ts";
import {parseISO, format} from "date-fns";
import StatusBadge from '@/components/status/StatusBadge.vue';
import TanTable from "@/components/table/Table.vue";

const globalFilter = ref('');

// Нет нормальных типов, только на коленке сгенерированные так что пока any
const sessionData = ref(sessions.sessions as any);
const columnHelper = createColumnHelper<Session>()

const columns = [
      columnHelper.accessor(row =>
          format(parseISO(row.start), 'dd.mm.yyyy, hh:mm') + format(parseISO(row.end), '-HH:mm'), {
        header: 'Дата и время',
      }),
      columnHelper.accessor(row => formatSessionStatus(row.status.name).text, {
        header: 'Статус',
        cell: ({row}) => {
          const {text, className} = formatSessionStatus(row.original.status.name);
          return h(StatusBadge, {text, className});
        }
      }),
      columnHelper.accessor(row => row.module, {
        header: 'Название учебного модуля',
      }),
      columnHelper.accessor(row => formatSessionType(row.type.name), {
        header: 'Тип сессии',
      }),
      columnHelper.accessor(row => row.rooms.map(x => x.name).join(', '), {
        header: 'Комната',
      }),
      columnHelper.accessor(row => row.groups.map(x => x.name).join(', '), {
        header: 'Группа',
      }),
    ]

const formatSessionType = (sType: string) => {
  let text = sType;
  switch (sType) {
    case 'lesson': {
      text = 'Урок';
      break;
    }
    case 'examination': {
      text = 'Экзамен';
      break;
    }
    case 'accreditation': {
      text = 'Аккредитация';
      break;
    }
  }
  return text;
}

const formatSessionStatus = (sStatus: string) => {
  let text = sStatus;
  let className = '';
  switch (sStatus) {
    case 'planned': {
      text = 'Запланировано';
      className = 'planned'
      break;
    }
    case 'completed': {
      text = 'Завершено';
      className = 'completed'
      break;
    }
    case 'canceled': {
      text = 'Отменено';
      className = 'canceled'
      break;
    }
    case 'ongoing': {
      text = 'Идёт';
      className = 'ongoing'
      break;
    }
  }
  return {
    text,
    className
  }
}
</script>

<template>
  <main>
    <div class="main-wrap">
      <div class="header-wrap">
        <h1 class="text-wrap-header">Учебные сессии</h1>
        <div class="header-buttons">
          <div>
            <DebouncedInput
                :modelValue="globalFilter ?? ''"
                @update:modelValue="value => (globalFilter = String(value))"
                className="search"
            />
          </div>
          <button class="header-filters">
            <FilterIcon/>
          </button>
          <button class="header-filters">
            <NotFilterIcon/>
          </button>
          <button class="create-button">Создать</button>
        </div>
      </div>
      <TanTable :table-props="{data: sessionData, filter: globalFilter, columns: columns}"/>
    </div>
  </main>
</template>

<style>
table {
  table-layout: fixed;
  width: 100%;
  text-align: start;
}

tr {
  height: 3.9rem;
}

th {
  text-align: start;
  height: 3rem;
}

th:nth-child(1) {
  padding-block: 0.62rem;
  padding-inline: 1rem;
  width: 12.88rem;
}

th:nth-child(2) {
  padding-block: 0.62rem;
  padding-inline: 1rem;
  width: 9.69rem;
}

th:nth-child(3) {
  padding-block: 0.62rem;
  padding-inline: 1rem;
  width: 35%;
}

th:nth-child(4) {
  padding-block: 0.62rem;
  padding-inline: 1rem;
  width: 10rem;
}

th:nth-child(5) {
  padding-block: 0.62rem;
  padding-inline: 1rem;
  width: 20%;
}

th:nth-child(6) {
  padding-block: 0.62rem;
  padding-inline: 1rem;
  width: 15%;
}
</style>

<style scoped>
.header-wrap {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.header-buttons {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  gap: 0.88rem;
}

.create-button {
  border-radius: 0.75rem;
  width: 7rem;
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

main {
  width: 100%;
  height: 100vh;
  max-height: 100%;
}

.main-wrap {
  background-color: var(--scbase-6);
  height: calc(100% - 0.6rem);
  margin: 0.6rem;
  padding: 1.2rem;
  border-radius: 0.5rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.header-filters {
  border-radius: 0.75rem;
  width: 2.75rem;
  height: 2.75rem;
  background: var(--scbase-5);
  border: none;
  cursor: pointer;
}

.header-filters:hover {
  background: var(--scbase-4);
}

.search {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 8px 0 16px;
  gap: 8px;
  width: 260px;
  height: 44px;
  background: var(--scbase-6);
  border: 1px solid var(--scbase-4);
  border-radius: 12px;
  flex-grow: 0;
  font-family: var(--font-family), serif;
  font-weight: 500;
  font-size: 0.81rem;
  line-height: 154%;
  color: var(--scbase-1);
}

.text-wrap-header {
  /* Учебные сессий */
  width: 197px;
  height: 28px;
  font-family: 'Manrope', serif;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;

  line-height: 28px;
  display: flex;
  align-items: center;
  font-feature-settings: 'liga' off;
  color: var(--scbase-1);
}
</style>