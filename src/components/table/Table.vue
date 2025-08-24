<script setup lang="ts">

import {
  type AccessorFnColumnDef,
  type ColumnDef,
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel, type SortingState,
  useVueTable
} from "@tanstack/vue-table";
import {computed, ref} from "vue";
import ChevronIcon from "@/assets/svg/shevron.svg";

interface TableProps<T> {
  columns: any;
  data: T[];
  filter: string;
}
const props = defineProps<{
  tableProps: TableProps<any>
}>();

const INITIAL_PAGE_INDEX = 0
const sorting = ref<SortingState>([]);
const goToPageNumber = ref(INITIAL_PAGE_INDEX + 1)

const table = useVueTable({
  get data() {
    return props.tableProps.data
  },
  state: {
    get globalFilter() {
      return props.tableProps.filter;
    },
    get sorting() {
      return sorting.value;
    }
  },
  onSortingChange: updateOrValue => {
    sorting.value = typeof updateOrValue === 'function'
        ? updateOrValue(sorting.value)
        : updateOrValue
  },
  columns: props.tableProps.columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getSortedRowModel: getSortedRowModel(),
})

function handleGoToPage(page: number) {
  goToPageNumber.value = page + 1;
  table.setPageIndex(page);
}

const pageIndex = computed(() => table.getState().pagination.pageIndex);
const pageCount = computed(() => table.getPageCount());
table.setPageSize(11);
</script>

<template>
  <div class="table-wrap">
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
            class="text-wrap-table-head"
            @click="header.column.getToggleSortingHandler()?.($event)"
        >
          <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
          />
          <ChevronIcon class="sort-icon sort-icon-asc" v-if="header.column.getIsSorted() === 'asc'"/>
          <ChevronIcon class="sort-icon sort-icon-desc" v-else-if="header.column.getIsSorted() === 'desc'"/>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in table.getRowModel().rows" :key="row.id">
        <td v-for="cell in row.getVisibleCells()" :key="cell.id"
            class="text-wrap"
        >
          <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
          />
        </td>
      </tr>
      </tbody>
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
</template>

<style scoped>
table {
  width: 100%;
  height: 80%;
  border-collapse: collapse;
}

tr:nth-child(even) {
  background: var(--scbase-12);
}

th {
  background-color: var(--scbase-12);
  padding-block: 0.62rem;
  padding-inline: 1rem;
  height: 3.25rem;
  min-width: 9.12rem;
  cursor: pointer;
  user-select: none;
}

th:hover {
  background-color: var(--scbase-4);
}

th:nth-child(1) {
  border-radius: 0.75rem 0 0;
}

th:last-child {
  border-radius: 0 0.75rem 0 0;
}

td {
  padding-block: 0.62rem;
  padding-inline: 1rem;
}

.paginator-wrap {
  display: flex;
  padding: 0.75rem;
  background: #f5f7f9;
  gap: 0.5rem;
  border-radius: 0 0 0.75rem 0.75rem;
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
  border: 1px solid var(--scbase-12);
  border-radius: 0.75rem;
  width: 100%;
  height: auto; /* calc(100% - 1.2rem);*/
  margin-top: 1rem;
}

.text-wrap {
  font-family: var(--font-family), serif;
  font-weight: 500;
  font-size: 0.94rem;
  line-height: 160%;
  color: #2f3144;
}

.text-wrap-table-head {
  font-family: var(--font-family), serif;
  font-weight: 800;
  font-size: 1.06rem;
  line-height: 165%;
  color: #2f3144;
  justify-content: center;
}

.sort-icon {
  border-radius: 0.38rem;
  margin-left: 0.4rem;
  height: 1rem;
}
.sort-icon-desc {
  transform: rotate(180deg) translateY(-40%);
}
.sort-icon-asc {
  transform: translateY(-10%);
}

.text-wrap-status {
  font-family: var(--font-family), serif;
  font-weight: 500;
  font-size: 0.81rem;
  line-height: 154%;
  color: #2f3144;
}

</style>