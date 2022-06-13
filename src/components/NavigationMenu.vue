<template>
  <nav class="fixed bottom-0 w-full bg-white p-2 flex flex-col align-center justify-between">
    <ul class="flex justify-around text-xs">
      <li
        v-for="(section, index) in sections"
        :key="index"
        class="relative flex flex-col items-center cursor-pointer w-16 p-1"
        @click="$emit('scrollToSection', section)"
      >
        <div
          v-if="sectionCandidates(section).length"
          class="absolute top-0 right-1 h-5 px-1.5 bg-sky-800 rounded-md mb-1 text-white font-bold flex"
          :class="{ 'bg-gray-500': section === sections[4] }"
        >
          <span class="m-auto">
            {{ sectionCandidates(section).length }}
          </span>
        </div>
        <img
          alt="menu-icon"
          :src="require(`../assets/${section}.svg`)"
          class="w-8 h-8 mb-1 text-white font-bold flex"
        />
        <span>{{ section }}</span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "NavigationMenu",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      sections: (state) => state.statuses,
    }),
    ...mapGetters({
      sectionCandidates: "filteredCandidates",
    }),
  },
};
</script>

<style scoped></style>
