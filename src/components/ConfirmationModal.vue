<template>
  <div>
    <div class="fixed top-0 w-full h-full bg-black opacity-50" />
    <div
      class="modal fixed p-4 bg-white w-4/5 md:w-3/5 rounded-md drop-shadow-md"
    >
      <h2 class="mb-4">
        Bekräfta borttagning av {{ candidate.firstName }}
        {{ candidate.lastName }}
      </h2>
      <div class="flex justify-between">
        <AppButton
          label="Avbryt"
          class="w-20"
          size="small"
          type="danger"
          @click="cancel"
        />
        <AppButton
          label="Bekräfta"
          class="w-20"
          size="small"
          @click="confirm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "./Button.vue";
import { mapState } from "vuex";

export default {
  name: "ConfirmationModal",
  components: {
    AppButton,
  },
  computed: {
    ...mapState({
      candidate: (state) => state.confirmationModal.data,
    }),
  },
  methods: {
    cancel() {
      this.$store.dispatch("toggleConfirmationModal", {
        visibility: false,
        candidate: null,
      });
    },
    confirm() {
      this.$store.dispatch("deleteCandidate", this.candidate);
      this.$store.dispatch("toggleConfirmationModal", {
        visibility: false,
        candidate: null,
      });
    },
  },
};
</script>

<style scoped>
.modal {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
