<template>
  <div id="app" class="flex flex-col h-screen">
    <Header
      :sections="sections"
      @scrollToSection="scrollToSection"
      @toggleSearchBar="toggleSearchBar"
    />
    <div v-if="isSearchBarVisible" class="flex flex-col py-4 px-6 bg-sky-200">
      <form @submit.prevent="makeSearch">
        <input
          v-model="searchString"
          name="search"
          type="text"
          class="p-2 w-full rounded-md"
          placeholder="Sök bland kandidater"
        />
        <input
          type="submit"
          value="Sök"
          class="p-2 px-8 mt-2 rounded-md bg-white border border-solid border-gray-200"
        />
      </form>
    </div>
    <div v-if="searchResult.length" class="overflow-scroll grow p-6 bg-sky-200">
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-md font-bold">SÖKRESULTAT</h2>
        <div class="rounded w-6 h-6 bg-sky-800 text-xs text-white font-bold flex">
          <span class="m-auto">
            {{ searchResult.length }}
          </span>
        </div>
      </div>
      <CandidateCard
        v-for="(candidate, index) of searchResult"
        :key="index"
        :candidate="candidate"
        :is-search-result="true"
        class="mb-2"
      />
    </div>
    <div v-else class="overflow-scroll grow bg-sky-200">
      <Section
        v-for="(section, index) of sections"
        :key="index"
        :id="section"
        :section-name="section"
        class="p-6"
      />
    </div>
    <CandidateModal v-if="$store.state.isCandidateModalVisible" />
    <ConfirmationModal v-if="$store.state.confirmationModal.visibility" />
    <NavigationMenu @scrollToSection="scrollToSection" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import NavigationMenu from "./components/NavigationMenu.vue";
import Section from "./components/Section.vue";
import CandidateModal from "./components/CandidateModal.vue";
import ConfirmationModal from "./components/ConfirmationModal.vue";
import CandidateCard from "./components/CandidateCard.vue";
import mockData from "./mocks/candidates.json";
import { mapState } from 'vuex';

export default {
  name: "App",
  components: {
    Header,
    Section,
    CandidateModal,
    ConfirmationModal,
    CandidateCard,
    NavigationMenu,
  },
  data() {
    return {
      isModalVisible: false,
      isSearchBarVisible: false,
      candidates: [],
      searchString: "",
      searchResult: [],
    };
  },
  mounted() {
    this.candidates = mockData;
    this.$store.commit("setCandidates", mockData);
  },
  computed: {
    ...mapState({
      sections: state => state.statuses,
    }),
  },
  methods: {
    scrollToSection(value) {
      document.getElementById(value).scrollIntoView({ behavior: "smooth" });
    },
    toggleSearchBar() {
      this.isSearchBarVisible = !this.isSearchBarVisible;
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
