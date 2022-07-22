<template>
  <p class="font-weight-medium text-white text-center mb-5">
    Progress ({{ percentage }}%)
  </p>
  <v-progress-linear
    model-value="15"
    background-color="lighten-3"
    color="#448AFF"
  ></v-progress-linear>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
    },
  },
  computed: {
    percentage() {
      return Math.round(
        (100 * this.columns[2].tasks.length) /
          this.columns.reduce((acc, current) => acc + current.tasks.length, 0)
      );
    },
  },
};
</script>
