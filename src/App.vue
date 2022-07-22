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
</style>
