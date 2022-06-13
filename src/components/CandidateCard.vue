<template>
  <div
    class="relative grid grid-cols-5 rounded-md cursor-pointer drop-shadow-md bg-white p-2"
    @click="showDetails"
  >
    <div>
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
      class="ml-4 col-span-3 flex flex-col justify-center text-xs"
      :class="{ 'text-gray-400': isInactive }"
    >
      <span class="text-base font-bold"
        >{{ candidate.firstName }} {{ candidate.lastName }}</span
      >
      <span v-if="!isSearchResult" class="italic">{{ dateStatus }}</span>
      <span v-else>Nuvarande steg: {{ candidate.status.toUpperCase() }}</span>
      <span v-if="isInactive">(Ej aktiv)</span>
    </div>
    <div class="flex flex-col justify-between items-end">
      <button v-if="!isTerminated" class="w-6" @click.stop="toggleMenu">
        <img src="../assets/dots.svg" class="w-6" />
      </button>
      <button v-if="!isTerminated" class="w-6" @click.stop="updateStatus">
        <img src="../assets/next-step.svg" class="w-6" />
      </button>
      <button v-else class="w-6" @click.stop="deleteCandidate">
        <img src="../assets/x.svg" class="w-6" />
      </button>
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
      return this.isTerminated || !this.candidate.active;
    },
    isTerminated() {
      return this.candidate.status === "avslutad";
    },
    dateStatus() {
      if (
        Date.parse(this.candidate.created) ===
          Date.parse(this.candidate.updated) &&
        this.candidate.status === this.$store.state.statuses[0]
      ) {
        return `Skapad: ${this.candidate.created.toLocaleDateString()}`;
      }
      return `Uppdaterad: ${this.candidate.updated.toLocaleDateString()}`;
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
    showDetails() {
      this.$store.dispatch("toggleDetailsModal", {
        visibility: true,
        data: this.candidate,
      });
    },
  },
};
</script>

<style></style>
