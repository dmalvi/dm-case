<template>
  <div class="grid grid-cols-5 rounded-md drop-shadow-md bg-white p-2">
    <div class="">
      <div
        class="w-16 h-16 bg-sky-800 rounded-full flex"
        :class="{ 'bg-gray-400': isInactive }"
      >
        <span class="text-xl font-bold m-auto text-white">
          {{ candidate.firstName[0] + candidate.lastName[0] }}
        </span>
      </div>
    </div>
    <div
      class="col-span-3 flex flex-col justify-center"
      :class="{ 'text-gray-400': isInactive }"
    >
      <span class="text-md font-bold"
        >{{ candidate.firstName }} {{ candidate.lastName }}</span
      >
      <span v-if="!isSearchResult" class="text-xs"
        >Uppdaterad: {{ dateStatus }}</span
      >
      <span v-else class="text-xs"
        >Nuvarande steg: {{ candidate.status.toUpperCase() }}</span
      >
    </div>
    <div class="flex flex-col justify-between items-end">
      <div class="w-6" @click="toggleMenu">
        <img src="../assets/dots.svg" class="w-6" />
      </div>
      <div v-if="!isInactive" class="w-6" @click="updateStatus">
        <img src="../assets/next-step.svg" class="w-6" />
      </div>
      <div v-else class="w-6" @click="deleteCandidate">
        <img src="../assets/x.svg" class="w-6" />
      </div>
    </div>
    <CandidateMenu
      v-if="isMenuVisible"
      class="absolute right-10 top-0"
      :is-active="candidate.active"
      @editCandidate="editCandidate"
      @updateStatus="updateStatus"
      @deleteCandidate="deleteCandidate"
      @toggleActiveStatus="toggleActiveStatus"
    />
  </div>
</template>

<script>
import CandidateMenu from "./CandidateMenu.vue";

export default {
  name: "CandidateCard",
  components: {
    CandidateMenu,
  },
  props: {
    candidate: {
      type: Object,
      default: () => {},
    },
    isSearchResult: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isMenuVisible: false,
    };
  },
  watch: {
    candidate() {
      this.isMenuVisible = false;
    },
  },
  computed: {
    isInactive() {
      return this.candidate.status === "avslutad" || !this.candidate.active;
    },
    dateStatus() {
      // TODO: compare created vs updated and display most recent
      const updated = new Date();
      return updated.toLocaleDateString();
    },
  },
  methods: {
    updateStatus() {
      const { statuses } = this.$store.state;
      const statusIndex = statuses.findIndex(
        (status) => status === this.candidate.status
      );
      this.$store.dispatch("editCandidate", {
        ...this.candidate,
        status: statuses[statusIndex + 1],
      });
      this.toggleMenu();
    },
    deleteCandidate() {
      this.$store.dispatch("toggleConfirmationModal", {
        visibility: true,
        data: this.candidate,
      });
    },
    editCandidate() {
      this.$store.dispatch("toggleCandidateModal", {
        visibility: true,
        candidate: this.candidate,
      });
      this.toggleMenu();
    },
    toggleActiveStatus() {
      this.$store.dispatch("editCandidate", {
        ...this.candidate,
        active: !this.candidate.active,
      });
      this.toggleMenu();
    },
    toggleMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
  },
};
</script>

<style></style>
