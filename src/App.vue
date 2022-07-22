<template>
  <v-app>
    <v-main>
      <img
        src="https://assets-global.website-files.com/6030eb20edb26744961d31ee/6067d04a3dcff6134015ebc0_respond.io-white.svg"
        width="190"
        alt="respond.io logo"
        class="ml-10 mt-10"
      />
      <KanbanTable />
    </v-main>
  </v-app>
</template>

<script>
import KanbanTable from "./components/KanbanTable.vue";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  name: "App",

  components: {
    KanbanTable,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.v-application {
  background-color: #273240;
}

.dp-custom-input {
  background-color: transparent;
  border: none;
  padding-bottom: 0px;
  padding-top: 0px;
  padding-left: 0px;
  color: #3c475a;
}
.dp__icon {
  display: none;
}

.task-datepicker {
  background-color: #b9d0f5;
  border-bottom: 1px solid #8496b3;
  color: #3c475a;
}
</style>
