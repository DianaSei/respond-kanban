<template>
  <v-card class="mx-auto task-card rounded-lg" color="#c2d8ff" max-width="400">
    <v-card-title class="pb-0">
      <v-row>
        <v-col cols="12" sm="8">
          <span
            @click="() => toggleViewModal()"
            class="font-weight-medium task-title text-subtitle-1"
            >{{ task.title }}</span
          >
        </v-col>
        <v-col cols="12" sm="4" class="text-right">
          <v-icon
            class="mt-2 icon-remove"
            size="20"
            icon="mdi-delete"
            @click="() => toggleModal(task)"
          ></v-icon>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text>
      {{ task.description }}
    </v-card-text>
    <v-card-text v-if="task.files?.length > 0" class="pt-0">
      {{ task.files.length }} attachments
    </v-card-text>
    <v-card-text>
      <div class="d-flex justify-space-between">
        <div>
          <v-icon class="mr-1" icon="mdi-calendar"></v-icon>
          {{ task.date }}
        </div>
        <div
          class="px-3 rounded-pill title-badge my-auto"
          :class="'text-white bg-' + badgeColor"
        >
          <span>
            {{ task.tags }}
          </span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    task: {
      type: Object,
      default: () => {},
    },
    toggleModal: {
      type: Function,
    },
    toggleViewModal: {
      type: Function,
    },
  },
  computed: {
    badgeColor() {
      const mappings = {
        Design: "purple",
        "Feature Request": "teal",
        Backend: "blue",
        QA: "green",
        default: "teal",
      };
      return mappings[this.task.tags] || mappings.default;
    },
  },
};
</script>
<style scoped>
.task-card {
  color: #273240;
  cursor: grab;
}

.task-card:active {
  cursor: grabbing;
}

.text-white {
  color: white !important;
}

.icon-remove {
  cursor: pointer;
}

.task-title:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
