<template>
  <v-dialog v-model="dialog" persistent max-width="1000px">
    <v-card class="add-task-card px-10 py-10">
      <v-card-title>
        <span class="text-h5">{{ view ? "Task details" : "Add task" }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <div v-if="errors.title?.length > 0">
                <p
                  class="text-red"
                  v-for="(error, index) in errors.title"
                  :key="index"
                >
                  {{ error }}
                </p>
              </div>
              <div v-if="view">
                <b><span>Title</span></b>
                <p>{{ task.title }}</p>
              </div>
              <v-text-field
                v-else
                v-model="form.title"
                required
                label="Title"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <div v-if="errors.description?.length > 0">
                <p
                  class="text-red"
                  v-for="(error, index) in errors.description"
                  :key="index"
                >
                  {{ error }}
                </p>
              </div>
              <div v-if="view">
                <b><span>Description</span></b>
                <p>{{ task.description }}</p>
              </div>
              <v-textarea
                v-else
                :disabled="view"
                required
                v-model="form.description"
                label="Description"
              ></v-textarea>
            </v-col>
            <v-col v-if="view" cols="12" sm="4">
              <div>
                <b><span>Deadline</span></b>
                <p>{{ task.date }}</p>
              </div>
            </v-col>
            <v-col v-if="!view" cols="12">
              <v-field-label>Deadline</v-field-label>
            </v-col>
            <v-col v-if="!view" cols="12" sm="4">
              <datepicker
                :disabled="view"
                class="w-100 px-5 py-4 task-datepicker"
                v-model="form.date"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <div v-if="view">
                <b><span>Tags</span></b>
                <p>{{ task.tags }}</p>
              </div>
              <v-select
                v-else
                :items="[
                  'Design',
                  'Feature Request',
                  'Backend',
                  'QA',
                  'default',
                ]"
                v-model="form.tags"
                :disabled="view"
                label="Tags"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <div v-if="view">
                <b><span>Stage</span></b>
                <p>{{ stage }}</p>
              </div>
              <v-select
                v-else
                :items="
                  columns.map((column) => {
                    return column.title;
                  })
                "
                :disabled="view"
                v-model="form.stage"
                label="Stage"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-file-input
                v-model="form.files"
                counter
                multiple
                accept="image/png, image/jpeg"
                label="Attachments"
              ></v-file-input>
              <div v-if="view">
                <v-img
                  v-for="(file, index) in task.files"
                  :key="index"
                  class="mb-3"
                  height="200"
                  :src="getUrl(file)"
                ></v-img>
              </div>
            </v-col>
            <v-col v-if="view" cols="12">
              <v-textarea v-model="comment" label="Comment"></v-textarea>
              <div v-if="task.comments.length > 0">
                <b><span>Comments: </span></b>
                <p v-for="(comment, index) in task.comments" :key="index">
                  {{ index + 1 }}: {{ comment }}
                </p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="toggleModal"> Cancel </v-btn>
        <v-btn color="blue darken-1" text @click="() => addTask()">
          {{ view ? "Update" : "Add" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Datepicker from "vue3-datepicker";
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    view: {
      type: Boolean,
    },
    task: {
      type: Object,
    },
    stage: {
      type: String,
    },
  },
  components: {
    Datepicker,
  },
  setup(props) {
    const store = useStore();
    let dialog = ref(false);
    let comment = ref("");
    let errors = ref({});
    let form = ref({
      title: "",
      description: "",
      date: new Date(),
      tags: "",
      stage: "",
      files: [],
    });

    let columns = computed(function () {
      return store.state.columns;
    });

    const toggleModal = () => {
      dialog.value = !dialog.value;
    };

    const getUrl = (file) => {
      return URL.createObjectURL(file);
    };

    const validateForm = () => {
      let error = {};
      let valid = true;
      if (form.value.title === "") {
        error["title"] = ["Please provide the title"];
        valid = false;
      }
      if (form.value.description === "") {
        error["description"] = ["Please provide the description"];
        valid = false;
      }
      errors.value = error;
      return valid;
    };

    const addTask = () => {
      if (props.view) {
        let data = {
          id: props.task.id,
          comment: comment.value,
          files: form.value.files,
        };
        store.commit("updateTask", data);
        comment.value = "";
        form.value.files = [];
        toggleModal();
      } else {
        if (validateForm()) {
          store.commit("addTask", form.value);
          form.value = {
            title: "",
            description: "",
            date: new Date(),
            tags: "",
            stage: "",
            files: [],
          };
          toggleModal();
        }
      }
    };

    return {
      form,
      dialog,
      columns,
      addTask,
      toggleModal,
      getUrl,
      comment,
      errors,
    };
  },
};
</script>
<style>
.add-task-card {
  background-color: #c2d8ff;
  color: #273240;
}

.task-datepicker {
  background-color: #b9d0f5;
  border-bottom: 1px solid #8496b3;
  color: #3c475a;
}
</style>
