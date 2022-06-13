<template>
  <button
    class="rounded-md py-2 border border-solid text-xs bg-white"
    :class="dynamicClasses"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "medium",
    },
    type: {
      type: String,
      default: "regular",
    },
  },
  computed: {
    sizeClasses() {
      switch (this.size) {
        case "small":
          return ["px-2"];
        default:
          return ["px-4"];
      }
    },
    typeClasses() {
      switch (this.type) {
        case "danger":
          return ["border-red-600"];
        case "confirm":
          return ["border-green-600"];
        default:
          return ["border-sky-800"];
      }
    },
    dynamicClasses() {
      return [...this.sizeClasses, ...this.typeClasses];
    },
  },
};
</script>

<style></style>
