<template>
  <div class="pt-4 px-6">
    <div class="grid grid-cols-3 mb-2">
      <h2 class="text-md font-bold text-left">
        {{ sectionName.toUpperCase() }}
      </h2>
      <button class="text-xs" @click="toggleListVisibility">
        {{ isListVisible ? "Dölj" : "Visa" }}
      </button>
      <div class="flex items-end justify-end">
        <span class="mr-1 text-xs leading-6">Antal: </span>
        <div
          class="rounded w-6 h-6 bg-sky-800 text-xs text-white font-bold flex"
        >
          <span class="m-auto">
            {{ candidates.length }}
          </span>
        </div>
      </div>
    </div>
    <div v-if="isListVisible">
      <span v-if="!candidates.length" class="text-xs">Inga kandidater</span>
      <CandidateCard
        v-for="(candidate, index) in candidates"
        :key="index"
        :candidate="candidate"
        class="mb-2 card-animation"
      />
    </div>
  </div>
</template>

<script>
import CandidateCard from "./CandidateCard.vue";
export default {
  name: "AppSection",
  components: {
    CandidateCard,
  },
  data() {
    return {
      isListVisible: true,
    };
  },
  props: {
    sectionName: {
      type: String,
      default: "",
    },
  },
  computed: {
    candidates() {
      return this.$store.getters.filteredCandidates(this.sectionName);
    },
  },
  methods: {
    toggleListVisibility() {
      this.isListVisible = !this.isListVisible;
    },
  },
};
</script>

<style>
.card-animation {
  animation: slide 0.7s ease;
}

@keyframes slide {
  0% {
    opacity: 0;
    transform: translateX(200px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
