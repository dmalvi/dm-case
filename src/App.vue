<template>
  <div id="app" class="flex flex-col h-screen overflow-hidden bg-sky-200">
    <Header
      :sections="sections"
      @scrollToSection="scrollToSection"
      @toggleSearchBar="toggleSearchBar"
      @clearSearchResult="clearSearchResult"
    />
    <div v-if="isSearchBarVisible" class="search-bar flex flex-col py-4 px-6">
      <form @submit.prevent="makeSearch">
        <input
          v-model="searchString"
          name="search"
          type="text"
          class="p-2 w-full rounded-md"
          placeholder="Sök bland kandidater"
          autocomplete="off"
        />
        <input
          type="submit"
          value="Sök"
          class="py-1 px-8 mt-4 rounded-md bg-white border border-solid border-sky-800"
        />
      </form>
    </div>
    <div v-if="searchResult" class="overflow-y-scroll grow p-6">
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-md font-bold">SÖKRESULTAT</h2>
        <div class="flex items-end justify-end">
          <span class="mr-1 text-xs leading-6">Antal: </span>
          <div
            class="rounded w-6 h-6 bg-sky-800 text-xs text-white font-bold flex"
          >
            <span class="m-auto">
              {{ searchResult.length }}
            </span>
          </div>
        </div>
      </div>
      <span v-if="!searchResult.length" class="text-xs">Inga sökträffar</span>
      <CandidateCard
        v-for="(candidate, index) of searchResult"
        :key="index"
        :candidate="candidate"
        :is-search-result="true"
        class="mb-2"
      />
    </div>
    <div v-else class="overflow-y-scroll pb-96">
      <Section
        v-for="(section, index) of sections"
        :key="index"
        :id="section"
        :section-name="section"
      />
      <div class="pb-80" />
    </div>
    <CandidateModal v-if="$store.state.isCandidateModalVisible" />
    <ConfirmationModal v-if="$store.state.confirmationModal.visibility" />
    <DetailsModal v-if="$store.state.detailsModal.visibility" />
    <NavigationMenu @scrollToSection="scrollToSection" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import NavigationMenu from "./components/NavigationMenu.vue";
import Section from "./components/Section.vue";
import CandidateModal from "./components/CandidateModal.vue";
import ConfirmationModal from "./components/ConfirmationModal.vue";
import DetailsModal from "./components/DetailsModal.vue";
import CandidateCard from "./components/CandidateCard.vue";
import mockData from "./mocks/candidates.json";
import { mapState } from "vuex";

const SCROLL_OPTIONS = {
  behavior: "smooth",
};

export default {
  name: "App",
  components: {
    Header,
    Section,
    CandidateModal,
    ConfirmationModal,
    CandidateCard,
    NavigationMenu,
    DetailsModal,
  },
  data() {
    return {
      isModalVisible: false,
      isSearchBarVisible: false,
      candidates: [],
      searchString: "",
      searchResult: null,
    };
  },
  mounted() {
    this.candidates = mockData;
    this.$store.commit("setInitialCandidates", mockData);
  },
  computed: {
    ...mapState({
      sections: (state) => state.statuses,
    }),
  },
  methods: {
    clearSearchResult() {
      this.searchResult = null;
      this.isSearchBarVisible = false;
    },
    async scrollToSection(section) {
      await this.clearSearchResult();
      document.getElementById(section).scrollIntoView(SCROLL_OPTIONS);
    },
    toggleSearchBar() {
      this.isSearchBarVisible = !this.isSearchBarVisible;
      if (this.isSearchBarVisible) {
        document.getElementById("kontakt").scrollIntoView(SCROLL_OPTIONS);
      }
    },
    makeSearch() {
      const result = this.$store.getters.searchCandidates(
        this.searchString.toLowerCase()
      );
      this.searchResult = result;
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333333;
}

.search-bar {
  animation: slide 0.7s ease;
}

@keyframes slide {
  0% {
    opacity: 0;
    transform: translateY(-120px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
