<template>
  <div class="candidate-menu bg-white h-20">
    <ul class="grid grid-cols-2">
      <li class="p-2" @click="$emit('editCandidate')">Redigera</li>
      <li class="p-2" @click="$emit('toggleActiveStatus')">{{ isActive ? 'Pausa' : 'Aktivera' }}</li>
    </ul>
    <ul class="grid grid-cols-2">
      <li class="p-2" @click="$emit('updateStatus')">Flytta</li>
      <li class="p-2" @click="$emit('deleteCandidate')">Radera</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CandidateMenu',
  props: {
    isActive: {
      type: Boolean,
    }
  },
  methods: {
  }
}
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