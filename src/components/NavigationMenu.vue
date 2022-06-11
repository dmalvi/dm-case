<template>
  <div class="w-full bg-white p-2 flex flex-col align-center justify-between">
    <nav class="">
      <ul class="flex justify-around text-xs">
        <li
          v-for="(section, index) in sections"
          :key="index"
          class="flex flex-col items-center rounded-md w-16 p-1"
        >
          <div
            class="w-6 h-6 bg-sky-800 rounded mb-1 text-white font-bold flex"
          >
            <span class="m-auto">
              {{ $store.getters.filteredCandidates(section).length }}
            </span>
          </div>
          <span @click="$emit('scrollToSection', section)">
            {{ section }}
          </span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
  },
};
</script>

<style scoped></style>
