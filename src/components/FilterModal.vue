<template>
  <v-dialog v-model="dialog" persistent max-width="1000px">
    <v-card class="add-task-card px-10 py-10">
      <v-card-title>
        <span class="text-h5">Search &amp; Filter</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="12">
              <Datepicker
                range
                :format="format"
                inputClassName="dp-custom-input"
                class="w-100 px-5 py-4 task-datepicker"
                v-model="form.date"
                :clearable="true"
                placeholder="Select dates range"
              />
            </v-col>
            <v-col cols="12" sm="12">
              <v-select
                :items="['All', 'Design', 'Feature Request', 'Backend', 'QA']"
                v-model="form.tags"
                label="Tags"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="12">
              <v-text-field v-model="form.search" label="Search"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="toggleModal"> Cancel </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="
            () => {
              applyFilter(form);
              toggleModal();
            }
          "
        >
          apply
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import Datepicker from "@vuepic/vue-datepicker";
import { ref } from "vue";

export default {
  props: {
    applyFilter: {
      type: Function,
    },
  },
  components: {
    Datepicker,
  },
  setup() {
    let dialog = ref(false);
    let form = ref({
      date: [],
      tags: "",
      search: "",
    });

    const format = (date) => {
      const day1 = date[0].getDate();
      const month1 = date[0].getMonth() + 1;
      const year1 = date[0].getFullYear();
      const day2 = date[1].getDate();
      const month2 = date[1].getMonth() + 1;
      const year2 = date[1].getFullYear();

      return `${day1}/${month1}/${year1} - ${day2}/${month2}/${year2}`;
    };

    const toggleModal = () => {
      dialog.value = !dialog.value;
    };

    return {
      form,
      dialog,
      toggleModal,
      format,
    };
  },
};
</script>
<style>
.add-task-card {
  background-color: #c2d8ff;
  color: #273240;
}
</style>
