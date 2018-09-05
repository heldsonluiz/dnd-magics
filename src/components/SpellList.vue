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
          @filterClass="doFilterClass" @showSpell="doshowSpell"
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

    <div class="text-xs-center">
      <v-dialog v-model="show" width="500">
        <v-card v-touch="{
          left: () => swipe('left'), right: () => swipe('right')}">

          <v-card-title class="headline"
            :class="`${spell.school.style}--text`"
            primary-title>
            <div>
              {{spell.name}}
            </div>
            <v-spacer></v-spacer>
            <span v-if="spell.ritual" class="white--text subheading"> (ritual)</span>
            <div class="grey--text caption">({{spell.name_en}})</div>
          </v-card-title>

          <v-card-text class="px-3">
            <v-chip v-for="(item, id) in spell.classes"
              small :key='id' @click="doFilterClass(item)">
              <span class="Spell__class">{{`${item}`}}</span>
            </v-chip>
            <ul class="py-3 Spell__details">
              <li>
                <strong>Nível: </strong>{{spell.level}}
              </li>
              <li>
                <strong>Escola: </strong>{{spell.school.pt}}
              </li>
              <li>
                <strong>Tempo De Conjuração: </strong>{{spell.castingTime}}
              </li>
              <li>
                <strong>Alcance: </strong>{{spell.range}}
              </li>
              <li>
                <strong>Componentes: </strong>{{spell.components}}
              </li>
              <li>
                <strong>Duração: </strong>
                {{spell.concentration?'concentração,' : ''}} {{spell.duration}}
              </li>
              <li v-if="spell.material">
                <strong>Material: </strong>{{spell.material}}
              </li>
            </ul>
            <span v-html="spell.description"></span>
          </v-card-text>

          <v-card-actions class="pb-3">
            <v-flex class="text-xs-center">
              <v-btn color="primary" outline @click="show = false">
                Fechar
              </v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      },
      show: false,
      spell: {},
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

    doshowSpell(spell) {
      this.show = !this.show;
      this.spell = spell;
    },

    setPage(n) {
      this.pagination.currentPage = n;
    },

    swipe(direction) {
      let pos = this.filteredList.findIndex(e => e.id === this.spell.id);
      let page = this.pagination.currentPage;
      if (direction === 'left' && pos < this.filteredList.length - 1) {
        pos++;
        if (pos % this.pagination.perPage === 0) {
          this.setPage(++page);
        }
      } else if (direction === 'right' && pos > 0) {
        if (pos % this.pagination.perPage === 0) {
          this.setPage(--page);
        }
        pos--;
      }
      this.spell = this.filteredList[pos];
    },
  },
  beforeMount() {
    this.spell = this.filteredList[0];
  },
  computed: {
    filteredList() {
      this.setPage(1);
      let list = spellList;

      if (!this.isEmpty(this.filter.name)) {
        list = spellList.filter(item =>
          item.name.toLowerCase().includes(this.filter.name.toLowerCase()) ||
          item.name_en.toLowerCase().includes(this.filter.name.toLowerCase()));
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

