<template>
  <div class="px-3 pt-3 pb-5">
    <div class="d-flex">
      <p class="mr-5 tracking-wide text-uppercase font-weight-medium">
        {{ title }}
      </p>

      <div class="px-3 rounded-pill title-badge my-auto">
        <span>
          {{ count }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    count: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style>
.title-badge {
  background-color: white;
  color: black;
  font-size: smaller;
  font-weight: 600;
}

.tracking-wide {
  letter-spacing: 0.095em;
  font-size: small;
}
</style>
