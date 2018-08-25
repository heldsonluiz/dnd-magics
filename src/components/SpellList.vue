<template>
  <div class="SpellList">
    <v-container grid-list-lg>
      <v-layout row wrap>
        <spell
          v-for="(item, index) in filteredList" :key=index
          @filterClass="doFilterClass"
          :spell="item">
        </spell>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import spellList from '~/listOfSpells.json';
import Spell from '@/components/Spell';

export default {
  name: 'SpellList',
  props: ['filter'],
  components: {
    Spell,
  },
  data() {
    return {
      spells: spellList,
      levels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      classes: ['Bárbaro', 'Bardo', 'Bruxo', 'Clérigo', 'Druida', 'Feiticeiro', 'Guerreiro', 'Ladino', 'Mago', 'Monge', 'Paladino', 'Patrulheiro'],
    };
  },
  methods: {
    isEmpty(value) {
      return !value || value === '';
    },

    doFilterClass(value) {
      this.filter.class = value;
      this.$emit('filterClass', value);
    },
  },
  computed: {
    filteredList() {
      let list = spellList;

      if (!this.isEmpty(this.filter.name)) {
        list = spellList.filter(item =>
          item.name.toLowerCase().includes(this.filter.name.toLowerCase()));
      }

      if (!this.isEmpty(this.filter.class)) {
        list = list.filter(item =>
          item.classes.find(i => i.toLowerCase() === this.filter.class.toLowerCase()),
        );
      }

      if (!this.isEmpty(this.filter.level)) {
        list = list.filter(item =>
          item.level === this.filter.level,
        );
      }

      if (!this.isEmpty(this.filter.school)) {
        list = list.filter(item =>
          item.school.pt.toLowerCase() === this.filter.school.toLowerCase(),
        );
      }

      return list;
    },
  },
};
</script>

<style scoped>

</style>

