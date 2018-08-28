<template>
  <div class="SpellList">
    <div class="text-xs-center pb-3">
      <v-pagination v-show="this.numOfPages >= 1"
        v-model="pagination.currentPage"
        :length="this.numOfPages"
        :total-visible="7">
      </v-pagination>
      <h2 v-show="this.numOfPages < 1">
        Nenhuma magia encontrada
      </h2>
    </div>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <spell
          v-for="(item, index) in computedSpells" :key=index
          @filterClass="doFilterClass"
          :spell="item">
        </spell>
      </v-layout>
    </v-container>
    <div class="text-xs-center">
      <v-pagination v-show="this.numOfPages >= 1"
        v-model="pagination.currentPage"
        :length="this.numOfPages"
        :total-visible="7">
      </v-pagination>
    </div>
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
      pagination: {
        currentPage: 1,
        perPage: 12,
        perPageOptions: [24, 36, 48],
      },
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
    setPage(n) {
      this.pagination.currentPage = n;
    },
  },
  computed: {
    filteredList() {
      this.setPage(1);
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
    offset() {
      return ((this.pagination.currentPage - 1) * this.pagination.perPage);
    },
    limit() {
      return (this.offset + this.pagination.perPage);
    },
    numOfPages() {
      return Math.ceil(this.filteredList.length / this.pagination.perPage);
    },
    computedSpells() {
      const list = this.filteredList;
      if (this.offset > list.length) {
        this.setPage(this.numOfPages);
      }
      return list.slice(this.offset, this.limit);
    },
  },
};
</script>

<style scoped>

</style>

