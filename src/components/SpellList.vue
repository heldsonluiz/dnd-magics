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
          @showSpell="doShowSpell"
          @favorite="doFavorite"
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
        <v-card v-touch="{left: () => swipe('left'), right: () => swipe('right')}">
          <v-card-title>
            <div>
              <div class="headline" :class="`${spell.school.style}--text`">
                <v-avatar class="py-3" size="16">
                  <img :src="`./static/img/schools/${spell.school.style}.png`">
                </v-avatar>
                {{ spell.name }}
                <span v-if="spell.ritual" class="grey--text body-1"> (ritual)</span>
              </div>
              <div>
                <span class="grey--text caption">({{spell.name_en}})</span>
              </div>
            </div>
          </v-card-title>
          <v-card-text class="px-3 pt-0">
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
          <v-card-actions class="pa-3">
            <v-btn outline color="info" @click="show = false">
              Fechar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon :color="`${this.favorites.includes(spell) ? 'pink' : 'primary'}`"
                @click="doFavorite(spell)">
                {{this.favorites.includes(spell) ? 'favorite':'favorite_border'}}
              </v-icon>
            </v-btn>
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
      onlyFavorites: false,
      show: false,
      spell: {},
      spells: [],
      favorites: [],
      levels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      classes: ['Bárbaro', 'Bardo', 'Bruxo', 'Clérigo', 'Druida', 'Feiticeiro', 'Guerreiro', 'Ladino', 'Mago', 'Monge', 'Paladino', 'Patrulheiro'],
    };
  },

  methods: {
    orderList(list, order) {
      switch (order) {
        case 'lasc':
          return list.sort((a, b) => a.level.localeCompare(b.level));
        case 'ldesc':
          return list.sort((a, b) => b.level.localeCompare(a.level));
        case 'ndesc':
          return list.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
        default:
          return list.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
      }
    },

    isEmpty(value) {
      return !value || value === '';
    },

    doFilterClass(value) {
      this.filter.class = value;
      this.$emit('filterClass', value);
    },

    doShowSpell(spell) {
      this.show = !this.show;
      this.spell = spell;
    },

    doFavorite(spell) {
      const idx = this.computedSpells.indexOf(spell);
      const elem = this.computedSpells[idx];

      if (this.favorites.includes(spell)) {
        this.favorites.splice(this.favorites.indexOf(spell), 1);
        elem.favorite = false;
      } else {
        this.favorites.push(spell);
        elem.favorite = true;
      }
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
    this.spells = spellList.map(e => ({ ...e, favorite: false }));
    this.spell = this.spells[0];
  },

  computed: {
    filteredList() {
      this.setPage(1);
      let list = [];

      if (this.filter.onlyFavorites) {
        list = this.favorites;
      } else {
        list = this.spells;
      }

      if (!this.isEmpty(this.filter.name)) {
        list = this.spells.filter(item =>
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

      return this.orderList(list, this.filter.order);
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
