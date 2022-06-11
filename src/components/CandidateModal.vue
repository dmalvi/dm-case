<template>
  <div>
    <div class="fixed top-0 w-full h-full bg-black opacity-50" />
    <div
      class="modal fixed p-4 bg-white w-4/5 md:w-3/5 rounded-md drop-shadow-md"
    >
      <h1 class="font-bold mb-2">{{ title }}</h1>
      <form class="flex flex-col gap-2 p-4" action="">
        <div class="grid grid-cols-3">
          <label for="first-name" class="text-start">Förnamn: </label>
          <input
            v-model="formData.firstName"
            name="first-name"
            type="text"
            class="col-span-2 pl-2"
          />
        </div>
        <div class="grid grid-cols-3">
          <label for="last-name" class="text-start">Efternamn: </label>
          <input
            v-model="formData.lastName"
            name="last-name"
            type="text"
            class="col-span-2 pl-2"
          />
        </div>
        <div class="grid grid-cols-3">
          <label for="age" class="text-start">Ålder: </label>
          <input v-model="formData.age" class="pl-2" name="age" type="number" />
        </div>
        <div class="grid grid-cols-3">
          <label for="email" class="text-start">E-mail: </label>
          <input
            v-model="formData.email"
            name="email"
            type="email"
            class="col-span-2 pl-2"
          />
        </div>
        <div class="grid grid-cols-3">
          <label for="address" class="text-start">Adress: </label>
          <input
            v-model="formData.address"
            name="address"
            type="text"
            class="col-span-2 pl-2"
          />
        </div>
      </form>
      <div class="flex justify-between">
        <AppButton label="Avbryt" type="danger" @click="closeModal" />
        <AppButton label="Spara" @click="saveCandidate" />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "./Button.vue";

export default {
  name: "CandidateModal",
  components: {
    AppButton,
  },
  props: {
    // candidate: {
    //   type: Object,
    //   default: () => {},
    // },
    // isEditMode: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        age: "",
        email: "",
        address: "",
      },
    };
  },
  computed: {
    isEditMode() {
      return !!this.$store.state.candidateToEdit;
    },
    title() {
      return this.isEditMode ? 'Redigera kandidat' : 'Lägg till kandidat';
    },
  },
  mounted() {
    // TODO: refactor to same logic as confirmation modal
    const candidate = this.$store.state.candidateToEdit;
    if (candidate) {
      this.formData = {
        ...candidate,
      };
    }
  },
  methods: {
    saveCandidate() {
      if (this.isEditMode) {
        const updatedCandidate = {
          ...this.formData,
        };
        this.$store.dispatch("editCandidate", updatedCandidate);
        console.log("SAVED EDIT");
      } else {
        // TODO: validate form data
        const newCandidate = {
          ...this.formData,
          id: this.$store.state.candidates.length + 1,
          status: "kontakt",
          active: true,
          updated: new Date(),
          created: new Date(),
        };
        this.$store.commit("addCandidate", newCandidate);
        console.log("SAVED NEW");
      }
      this.closeModal();
    },
    closeModal() {
      this.$store.dispatch("toggleCandidateModal", { visibility: false });
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

input {
  @apply border border-solid border-gray-400;
}
</style>
