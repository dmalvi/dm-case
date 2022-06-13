<template>
  <div>
    <div class="fixed z-20 top-0 w-full h-full bg-black opacity-50 cursor-pointer" @click="closeModal" />
    <div
      class="modal z-30 fixed p-4 bg-white w-4/5 md:w-3/5 rounded-md drop-shadow-md"
    >
      <h1 class="font-bold mb-4">Kandidatinformation</h1>
      <table v-if="candidate" class="text-sm mb-4">
        <template v-for="(candidateValue, candidateKey, index) in candidate">
          <tr v-if="labels[candidateKey]" :key="index" class="leading-6">
            <td class="flex">{{ labels[candidateKey] }}</td>
            <td class="pl-2 text-left font-bold">{{ candidateValue }}</td>
          </tr>
        </template>
      </table>
      <div>
        <AppButton label="Stäng" type="danger" @click="closeModal" />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "./Button.vue";

const LABELS = {
  firstName: "Förnamn:",
  lastName: "Efternamn:",
  age: "Ålder:",
  email: "E-post:",
  address: "Adress:",
  status: "Nuvarande steg:",
  created: "Skapad:",
  updated: "Uppdaterad:",
};

export default {
  name: "DetailsModal",
  components: {
    AppButton,
  },
  data() {
    return {
      labels: LABELS,
    };
  },
  computed: {
    candidate() {
      const { data } = this.$store.state.detailsModal;
      return data ? {
        ...data,
        created: data.created.toLocaleDateString(),
        updated: data.updated.toLocaleDateString(),
      } : {};
    },
  },
  methods: {
    closeModal() {
      this.$store.dispatch("toggleDetailsModal", {
        visibility: false,
        data: null,
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
