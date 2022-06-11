import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    statuses: ["kontakt", "dialog", "intervju", "erbjudande", "avslutad"],
    candidates: [],
    isCandidateModalVisible: false,
    confirmationModal: {
      visibility: false, 
      data: null,
    },
    candidateToEdit: null,
  },
  mutations: {
    setCandidates(state, payload) {
      state.candidates = payload;
    },
    addCandidate(state, payload) {
      const updatedCandidates = [...state.candidates, payload];
      state.candidates = updatedCandidates;
    },
    removeCandidate(state, payload) {
      const updatedCandidates = state.candidates.filter(
        (candidate) => candidate.id !== payload.id
      );
      state.candidates = updatedCandidates;
    },
    setCandidateModal(state, payload) {
      if (payload.candidate) {
        state.candidateToEdit = payload.candidate;
      } else {
        state.candidateToEdit = null;
      }
      state.isCandidateModalVisible = payload.visibility;
    },
    setConfirmationModal(state, payload) {
      state.confirmationModal = payload;
    },
  },
  actions: {
    editCandidate({ commit, state }, payload) {
      const updatedCandidates = state.candidates.map((candidate) => {
        if (candidate.id === payload.id) {
          return { ...payload, updated: new Date() };
        } else {
          return candidate;
        }
      });

      commit("setCandidates", updatedCandidates);
    },
    deleteCandidate({ commit, state }, payload) {
      const updatedCandidates = state.candidates.filter((candidate) => candidate.id !== payload.id);
      commit("setCandidates", updatedCandidates);
    },
    toggleCandidateModal({ commit }, payload) {
      commit("setCandidateModal", payload);
    },
    toggleConfirmationModal({ commit }, payload) {
      commit("setConfirmationModal", payload);
    },
  },
  getters: {
    contactCandidates: (state) => {
      return state.candidates.filter(
        (candidate) => candidate.status === "kontakt"
      );
    },
    dialogCandidates: (state) => {
      return state.candidates.filter(
        (candidate) => candidate.status === "dialog"
      );
    },
    interviewCandidates: (state) => {
      return state.candidates.filter(
        (candidate) => candidate.status === "intervju"
      );
    },
    contractCandidates: (state) => {
      return state.candidates.filter(
        (candidate) => candidate.status === "erbjudande"
      );
    },
    terminatedCandidates: (state) => {
      return state.candidates.filter(
        (candidate) => candidate.status === "avslutad"
      );
    },
    filteredCandidates: (state) => (status) => {
      return state.candidates.filter(
        (candidate) => candidate.status === status
      );
    },
    searchCandidates: (state) => (searchString) => {
      return state.candidates.filter(
        (candidate) =>
          candidate.firstName.toLowerCase().includes(searchString) ||
          candidate.lastName.toLowerCase().includes(searchString) ||
          candidate.address.toLowerCase().includes(searchString) ||
          candidate.email.toLowerCase().includes(searchString)
      );
    },
  },
});

export default store;
