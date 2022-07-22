<template>
  <v-container class="mt-5">
    <progress-bar :columns="columns"></progress-bar>
    <v-row class="justify-end mt-8">
      <v-btn
        color="#448AFF"
        class="text-white"
        @click="
          () => {
            view = false;
            $refs.addTaskModal.dialog = true;
          }
        "
      >
        Add Task
      </v-btn>
      <add-task-modal
        ref="addTaskModal"
        :view="view"
        :task="selectedTask"
        :stage="selectedStage"
      ></add-task-modal>
    </v-row>
    <div class="columns-wrapper d-flex mt-10">
      <v-col
        v-for="(column, index) in columns"
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
import draggable from "vuedraggable";
import ProgressBar from "./ProgressBar";
import { computed } from "vue";
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  name: "KanbanTable",
  components: {
    BadgeColumn,
    TaskCard,
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
    let selectedTask = ref({});
    let selectedStage = ref("");

    let columns = computed(function () {
      return store.state.columns;
    });

    const toggleModal = (task) => {
      selectedTask.value = task;
      removeTaskModal.value.dialog = !removeTaskModal.value.dialog;
    };

    return {
      columns,
      addTaskModal,
      removeTaskModal,
      toggleModal,
      view,
      selectedTask,
      selectedStage,
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
