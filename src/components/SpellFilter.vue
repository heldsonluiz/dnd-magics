<template>
  <v-container grid-list-lg>
    <v-layout row wrap class="mb-3">
      <v-flex xs12 sm6 md3 class="my-0">
        <v-text-field label="Magia" v-model="name" clearable></v-text-field>
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
import _ from 'lodash';

export default {
  name: 'SpellFilter',
  props: ['filter'],
  data() {
    return {
      name: '',
      levels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      classes: ['Bárbaro', 'Bardo', 'Bruxo', 'Clérigo', 'Druida', 'Feiticeiro', 'Guerreiro', 'Ladino', 'Mago', 'Monge', 'Paladino', 'Patrulheiro'],
      schools: ['Abjuração', 'Adivinhação', 'Conjuração', 'Encantamento', 'Evocação', 'Ilusão', 'Necromancia', 'Transmutação'],
    };
  },
  watch: {
    name() {
      this.debouncedGetName();
    },
  },
  created() {
    this.debouncedGetName = _.debounce(this.getName, 300);
  },
  methods: {
    getName() {
      this.filter.name = this.name;
    },
  },
};
</script>

