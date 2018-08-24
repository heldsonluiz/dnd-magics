<template>
  <v-container grid-list-lg>
    <v-layout row wrap class="mb-3">
      <v-flex xs12 sm6 md3 class="my-0">
        <v-text-field label="Magia" v-model="filter.name" clearable></v-text-field>
      </v-flex>
      <v-flex xs6 md3 class="my-0">
        <v-select label="Nível" v-model="filter.level" :items="levels" clearable></v-select>
      </v-flex>
      <v-flex xs6 md3 class="my-0">
        <v-select label="Classe" v-model="filter.class" :items="classes" clearable></v-select>
      </v-flex>
      <v-flex xs12 sm6 md3 class="my-0">
        <v-select label="Escola" v-model="filter.school" :items="schools" clearable></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'SpellFilter',
  data() {
    return {
      filter: {
        name: '',
        level: '',
        school: '',
        class: '',
      },
      levels: ['all', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      classes: ['all', 'bárbaro', 'bardo', 'bruxo', 'clérigo', 'druida', 'feiticeiro', 'ladino', 'mago', 'paladino', 'patrulheiro'],
      schools: ['all', 'abjuração', 'adivinhação', 'conjuração', 'encantamento', 'evocação', 'ilusão', 'necromancia', 'transmutação'],
    };
  },
  watch: {
    filter: {
      handler(val) {
        const filt = { ...val };
        this.$emit('doFilter', filt);
      },
      deep: true,
    },
  },
};
</script>

