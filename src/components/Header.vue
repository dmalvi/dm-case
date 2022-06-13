<template>
  <div
    class="z-10 p-2 w-full min-h-fit bg-white flex justify-between items-center"
  >
    <AppButton
      label="SÖK"
      class="w-20"
      size="small"
      @click="$emit('toggleSearchBar')"
    />
    <img
      alt="logo"
      src="../assets/logo.png"
      class="mt-1 w-32"
      @click="$emit('clearSearchResult')"
    />
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
  methods: {
    openModal() {
      this.$store.dispatch("toggleCandidateEditModal", {
        visibility: true,
        candidate: null,
      });
    },
  },
};
</script>
