<template>
  <div class="p-2 w-full bg-white flex justify-between items-center">
    <AppButton label="SÖK" class="w-20" size="small" @click="$emit('toggleSearchBar')" />
    <h1 class="text-md font-bold">{{ title }}</h1>
    <AppButton label="LÄGG TILL" class="w-20" size="small" @click="openModal" />
  </div>
</template>

<script>
import AppButton from "./Button.vue";

export default {
  name: "AppHeader",
  components: {
    AppButton,
  },
  props: {
    sections: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      title: "Kandidaterna",
    };
  },
  methods: {
    openModal() {
      this.$store.dispatch('toggleCandidateModal', { visibility: true })
    },
  },
};
</script>

<style scoped>
</style>
