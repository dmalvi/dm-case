<template>
  <div>
    <div class="flex items-center justify-between mb-2">
      <h2 class="text-md font-bold">{{ sectionName.toUpperCase() }}</h2>
      <div class="rounded w-6 h-6 bg-sky-800 text-xs text-white font-bold flex">
        <span class="m-auto">
          {{ candidates.length }}
        </span>
      </div>
    </div>
    <CandidateCard
      v-for="(candidate, index) in candidates"
      :key="index"
      :candidate="candidate"
      class="mb-2 ani-card"
    />
  </div>
</template>

<script>
import CandidateCard from "./CandidateCard.vue";
export default {
  name: "AppSection",
  components: {
    CandidateCard,
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
};
</script>

<style>
.ani-card {
  animation: slide 1.5s ease;
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
