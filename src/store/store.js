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
    detailsModal: {
      visibility: false,
      data: null,
    },
    candidateToEdit: null,
    recentlyEditedCandidate: null,
  },
  mutations: {
    setInitialCandidates(state, payload) {
      state.candidates = payload.map((candidate, index) => ({
        ...candidate,
        created: new Date(Date.parse(candidate.created || "2022-06-10")),
        updated: new Date(Date.parse(candidate.created || "2022-06-10")),
        id: index + 1,
      }));
    },
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
    setDetailsModal(state, payload) {
      state.detailsModal = payload;
    },
    setRecentlyEditedCandidate(state, payload) {
      state.recentlyEditedCandidate = payload
    },
  },
  actions: {
    editCandidate({ commit, state }, payload) {
      const updatedCandidates = state.candidates.map((candidate) => {
        if (candidate.id === payload.id) {
          const updatedCandidate = {
            ...payload,
            updated:
              candidate.status !== payload.status
                ? new Date()
                : candidate.updated,
          };
          commit("setRecentlyEditedCandidate", updatedCandidate);
          return updatedCandidate;
        } else {
          return candidate;
        }
      });

      commit("setCandidates", updatedCandidates);
    },
    deleteCandidate({ commit, state }, payload) {
      const updatedCandidates = state.candidates.filter(
        (candidate) => candidate.id !== payload.id
      );
      commit("setCandidates", updatedCandidates);
    },
    toggleCandidateModal({ commit }, payload) {
      commit("setCandidateModal", payload);
    },
    toggleConfirmationModal({ commit }, payload) {
      commit("setConfirmationModal", payload);
    },
    toggleDetailsModal({ commit }, payload) {
      commit("setDetailsModal", payload);
    },
  },
  getters: {
    filteredCandidates: (state) => (status) => {
      return state.candidates
        .filter((candidate) => candidate.status === status)
        .sort((a, b) => a.updated - b.updated);
    },
    searchCandidates: (state) => (searchString) => {
      return state.candidates.filter(
        (candidate) =>
          candidate.firstName.toLowerCase().includes(searchString) ||
          candidate.lastName.toLowerCase().includes(searchString) ||
          candidate.address.toLowerCase().includes(searchString) ||
          candidate.status.toLowerCase().includes(searchString) ||
          candidate.email.toLowerCase().includes(searchString)
      );
    },
  },
});

export default store;
