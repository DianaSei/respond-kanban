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
    <v-dialog v-model="dialog" width="500">
      <v-card class="add-task-card px-5 py-5">
        <v-card-title class="text-h5 grey lighten-2">
          Remove Task
        </v-card-title>

        <v-card-text> Are you sure you want to remove the task? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="toggleModal"> Cancel </v-btn>
          <v-btn
            color="danger"
            text
            @click="
              () => {
                removeTask(element);
              }
            "
          >
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import BadgeColumn from "./BadgeColumn.vue";
import TaskCard from "./TaskCard.vue";
import AddTaskModal from "./AddTaskModal.vue";
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
    AddTaskModal,
  },
  setup() {
    const store = useStore();
    let addTaskModal = ref();
    let dialog = ref(false);
    let view = ref(false);
    let selectedTask = ref({});
    let selectedStage = ref("");

    let columns = computed(function () {
      return store.state.columns;
    });

    const removeTask = () => {
      store.commit("removeTask", selectedTask.value);
      toggleModal();
    };

    const toggleModal = (task) => {
      selectedTask.value = task;
      dialog.value = !dialog.value;
    };

    return {
      columns,
      dialog,
      addTaskModal,
      removeTask,
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
