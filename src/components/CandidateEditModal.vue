<template>
  <div>
    <div
      class="fixed z-10 top-0 w-full h-full bg-black opacity-50 cursor-pointer"
      @click="closeModal"
    />
    <div
      class="modal z-20 fixed p-4 bg-white w-4/5 md:w-3/5 rounded-md drop-shadow-md"
    >
      <h1 class="font-bold mb-2">{{ title }}</h1>
      <form class="flex flex-col gap-2 p-4 text-sm">
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
          <input v-model="formData.age" class="pl-2" name="age" type="text" />
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
        <AppButton label="Spara" type="confirm" @click="saveCandidate" />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "./Button.vue";

export default {
  name: "CandidateEditModal",
  components: {
    AppButton,
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
      return !!this.$store.state.editModal.candidate;
    },
    title() {
      return this.isEditMode ? "Redigera kandidat" : "Lägg till kandidat";
    },
  },
  mounted() {
    const candidate = this.$store.state.editModal.candidate;
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
      }
      this.closeModal();
    },
    closeModal() {
      this.$store.dispatch("toggleCandidateEditModal", {
        visibility: false,
        candidate: null,
      });
    },
  },
};
</script>
