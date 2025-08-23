<script setup lang="ts">
import ChevronIcon from '@/assets/svg/shevron.svg';
import FilterIcon from '@/assets/svg/filter.svg';
import NotFilterIcon from '@/assets/svg/filter-2.svg';
import DebouncedInput from '@/components/debounce-input/DebounceInput.vue'

import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useVueTable,
  createColumnHelper,
  getFilteredRowModel
} from '@tanstack/vue-table'
import {computed, ref} from 'vue'
import {makeData, Person} from './makeData'

const INITIAL_PAGE_INDEX = 0
const globalFilter = ref('');
const defaultData = makeData(100)
const columnHelper = createColumnHelper<Person>()
const goToPageNumber = ref(INITIAL_PAGE_INDEX + 1)
const data = ref(defaultData)

const columns = [
  columnHelper.accessor('firstName', {
    header: 'Name',
  }),
  columnHelper.accessor(row => row.lastName, {
    header: 'Last Name',
  }),
  columnHelper.accessor('age', {
    header: 'Age',
  }),
  columnHelper.accessor('visits', {
    header: 'Visits',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
  })
]

const table = useVueTable({
  get data() {
    return data.value
  },
  state: {
    get globalFilter() {
      return globalFilter.value
    },
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
})

function handleGoToPage(page: number) {
  goToPageNumber.value = page + 1;
  table.setPageIndex(page);
}

function handlePageSizeChange(e: any) {
  table.setPageSize(Number(e.target.value))
}

const pageIndex = computed(() => table.getState().pagination.pageIndex);
const pageCount = computed(() => table.getPageCount());
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
      <div class="table-wrap">
        <div class="p-2">
          <table>
            <thead>
            <tr
                v-for="headerGroup in table.getHeaderGroups()"
                :key="headerGroup.id"
            >
              <th
                  v-for="header in headerGroup.headers"
                  :key="header.id"
                  :colSpan="header.colSpan"
              >
                <FlexRender
                    v-if="!header.isPlaceholder"
                    :render="header.column.columnDef.header"
                    :props="header.getContext()"
                />
              </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="row in table.getRowModel().rows" :key="row.id">
              <td v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                />
              </td>
            </tr>
            </tbody>
            <tfoot>
            <tr
                v-for="footerGroup in table.getFooterGroups()"
                :key="footerGroup.id"
            >
              <th
                  v-for="header in footerGroup.headers"
                  :key="header.id"
                  :colSpan="header.colSpan"
              >
                <FlexRender
                    v-if="!header.isPlaceholder"
                    :render="header.column.columnDef.footer"
                    :props="header.getContext()"
                />
              </th>
            </tr>
            </tfoot>
          </table>
          <div class="paginator-wrap">
            <!--              <button-->
            <!--                  class=""-->
            <!--                  @click="() => table.setPageIndex(0)"-->
            <!--                  :disabled="!table.getCanPreviousPage()"-->
            <!--              >-->
            <!--                «-->
            <!--              </button>-->
            <button
                class="paginator-button"
                @click="() => table.previousPage()"
                :disabled="!table.getCanPreviousPage()"
            >
              ‹
            </button>
            <button
                class="paginator-button selected"
                @click="() => handleGoToPage(pageIndex -1)"
                v-if="pageIndex > 0"
            >
              {{ pageIndex }}
            </button>
            <button
                class="paginator-button selected"
                @click="() => table.previousPage()"
                disabled
            >
              {{ pageIndex + 1 }}
            </button>

            <button
                class="paginator-button selected"
                @click="() => handleGoToPage(pageIndex +1)"
                v-if="pageIndex + 2 < pageCount"
            >
              {{ pageIndex + 2 }}
            </button>
            <button
                class="paginator-button selected"
                @click="() => handleGoToPage(pageIndex +2)"
                v-if="pageIndex + 3 < pageCount"
            >
              {{ pageIndex + 3 }}
            </button>
            <button
                class="paginator-button selected"
                @click="() => handleGoToPage(pageIndex +3)"
                v-if="pageIndex + 4 < pageCount"
            >
              {{ pageIndex + 4 }}
            </button>
            <button
                class="paginator-button selected"
                @click="() => handleGoToPage(pageIndex +4)"
                v-if="pageIndex + 4 < pageCount - 1"
            >
              ...
            </button>

            <button
                class="paginator-button"
                @click="() => handleGoToPage(table.getPageCount() -1)"
                v-if="table.getCanNextPage()"
            >
              {{ table.getPageCount() }}
            </button>
            <button
                class="paginator-button"
                @click="() => table.nextPage()"
                :disabled="!table.getCanNextPage()"
            >
              ›
            </button>
            <!--              <button-->
            <!--                  class=""-->
            <!--                  @click="() => table.setPageIndex(table.getPageCount() - 1)"-->
            <!--                  :disabled="!table.getCanNextPage()"-->
            <!--              >-->
            <!--                »-->
            <!--              </button>-->
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
table {
  border: 1px solid lightgray;
}

tbody {
  border-bottom: 1px solid lightgray;
}

th {
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
  padding: 2px 4px;
}

tfoot {
  color: gray;
}

tfoot th {
  font-weight: normal;
}

.paginator-wrap {
  display: flex;
  padding: 0.75rem;
  background: #f5f7f9;
  gap: 0.5rem;
}

.paginator-button {
  border-radius: 0.5rem;
  padding: 0.62rem;
  width: 1.88rem;
  height: 1.88rem;
  background: var(--scbase-6);
  border: 1px solid transparent;

  font-family: var(--font-family), serif;
  font-weight: 500;
  font-size: 0.94rem;
  line-height: 160%;
  color: #2f3144;
  display: flex;
  justify-content: center;
  align-items: center;
}

.paginator-button:disabled {
  background: #e0e0e0;
}

.paginator-button:hover:not(:disabled) {
  border: 1px solid #3761f3;
  cursor: pointer;
}

.table-wrap {
  border: 1px solid var(--scbase-5);
  border-radius: 0.75rem;
  width: 100%;
  height: calc(100% - 1.2rem);
  margin-top: 1rem;
  margin-bottom: 1rem;
}

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