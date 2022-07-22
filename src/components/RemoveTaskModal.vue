<template>
  <v-dialog v-model="dialog" width="500">
    <v-card class="add-task-card px-5 py-5">
      <v-card-title class="text-h5 grey lighten-2"> Remove Task </v-card-title>

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
</template>
<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    selectedTask: {
      type: Object,
    },
  },
  setup(props) {
    const store = useStore();

    let dialog = ref(false);

    const toggleModal = () => {
      dialog.value = !dialog.value;
    };

    const removeTask = () => {
      store.commit("removeTask", props.selectedTask);
      toggleModal();
    };

    return {
      dialog,
      toggleModal,
      removeTask,
    };
  },
};
</script>
