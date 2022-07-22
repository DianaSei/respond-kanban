<template>
  <v-container class="mt-5">
    <progress-bar :columns="filteredColumns"></progress-bar>
    <v-row class="justify-end mt-8">
      <v-btn
        color="#448AFF"
        class="text-white mr-3"
        @click="
          () => {
            view = false;
            $refs.addTaskModal.dialog = true;
          }
        "
      >
        Add Task
      </v-btn>
      <v-btn color="#448AFF" class="text-white" @click="toggleFilterModal">
        Search &amp; filter
      </v-btn>
      <filter-modal
        ref="filterModal"
        :applyFilter="(form) => applyFilter(form)"
      ></filter-modal>

      <add-task-modal
        ref="addTaskModal"
        :view="view"
        :task="selectedTask"
        :stage="selectedStage"
      ></add-task-modal>
    </v-row>
    <div class="columns-wrapper d-flex mt-10">
      <v-col
        v-for="(column, index) in filteredColumns"
        :key="index"
        cols="4"
        class="mx-2 rounded-lg px-6 py-3 task-column"
      >
        <badge-column
          :title="column.title"
          :count="column.tasks.length"
        ></badge-column>
        <draggable
          v-model="column.tasks"
          group="tasks"
          @start="drag = true"
          @end="drag = false"
          item-key="id"
        >
          <template #item="{ element }">
            <task-card
              :key="element.id"
              :task="element"
              class="mb-5"
              :toggleModal="toggleModal"
              :toggleViewModal="
                () => {
                  view = true;
                  selectedTask = element;
                  selectedStage = column.title;
                  $refs.addTaskModal.dialog = true;
                }
              "
            ></task-card>
          </template>
        </draggable>
      </v-col>
    </div>
    <remove-task-modal
      ref="removeTaskModal"
      :selectedTask="selectedTask"
    ></remove-task-modal>
  </v-container>
</template>

<script>
import BadgeColumn from "./BadgeColumn.vue";
import TaskCard from "./TaskCard.vue";
import AddTaskModal from "./AddTaskModal.vue";
import RemoveTaskModal from "./RemoveTaskModal.vue";
import FilterModal from "./FilterModal.vue";
import draggable from "vuedraggable";
import ProgressBar from "./ProgressBar";
import { computed } from "vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { checkFilter } from "../utils";

export default {
  name: "KanbanTable",
  components: {
    BadgeColumn,
    TaskCard,
    FilterModal,
    draggable,
    ProgressBar,
    RemoveTaskModal,
    AddTaskModal,
  },
  setup() {
    const store = useStore();
    let addTaskModal = ref();
    let removeTaskModal = ref();
    let view = ref(false);
    let filterModal = ref();
    let selectedTask = ref({});
    let selectedStage = ref("");
    let filter = ref(null);
    let columns = computed(function () {
      return store.state.columns;
    });

    const filteredColumns = computed(function () {
      if (filter.value) {
        return checkFilter(columns.value, filter.value);
      } else {
        return columns.value;
      }
    });

    const applyFilter = (filters) => {
      filter.value = { ...filters };
    };
    const toggleModal = (task) => {
      selectedTask.value = task;
      removeTaskModal.value.dialog = !removeTaskModal.value.dialog;
    };

    const toggleFilterModal = () => {
      filterModal.value.dialog = !filterModal.value.dialog;
    };

    return {
      columns,
      addTaskModal,
      removeTaskModal,
      toggleModal,
      view,
      filterModal,
      selectedTask,
      selectedStage,
      toggleFilterModal,
      applyFilter,
      filter,
      filteredColumns,
    };
  },
};
</script>

<style scoped>
.v-container {
  max-width: 1300px;
}

.columns-wrapper {
  min-height: 100vh;
}

.task-column {
  color: rgb(201, 209, 217);
  background-color: #465a74;
}
</style>
