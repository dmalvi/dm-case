<template>
  <div class="candidate-menu bg-white h-20">
    <div class="grid grid-cols-2">
      <button class="p-2" @click.stop="$emit('editCandidate')">Redigera</button>
      <button class="p-2" @click.stop="$emit('toggleActiveStatus')">
        {{ isActive ? "Pausa" : "Aktivera" }}
      </button>
    </div>
    <div class="grid grid-cols-2">
      <button class="p-2" @click.stop="$emit('updateStatus')">Flytta</button>
      <button class="p-2" @click.stop="$emit('deleteCandidate')">Radera</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CandidateMenu",
  props: {
    isActive: {
      type: Boolean,
    },
  },
};
</script>

<style>
.candidate-menu {
  width: calc(100% - 120px);
  animation: fade 0.7s ease;
}

@keyframes fade {
  0% {
    opacity: 0;
    transform: translateX(24px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
