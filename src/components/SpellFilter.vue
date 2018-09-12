<template>
  <v-container grid-list-lg>
    <v-layout row wrap class="">
      <v-flex xs12 sm6 class="py-0">
        <v-text-field label="Magia" v-model="name" clearable></v-text-field>
      </v-flex>
      <v-flex xs6 class="py-0">
        <v-select label="Escola" v-model="filter.school" :items="schools" clearable></v-select>
      </v-flex>
      <v-flex xs6 sm3 class="py-0">
        <v-select label="Nível" v-model="filter.level" :items="levels" item-text="slug"
          item-value="value" clearable>
        </v-select>
      </v-flex>
      <v-flex xs6 sm3 class="py-0">
        <v-select label="Classe" v-model="filter.class" :items="classes" clearable></v-select>
      </v-flex>
      <v-flex xs6 sm6 class="py-0">
        <v-select label="Listar" v-model="filter.order" :items="orders" item-value="slug"
          clearable>
          <template slot="selection" slot-scope="{ item }">
            {{ item.text }}
          </template>
          <template slot="item" slot-scope="{ index, item }">
            <v-list-tile-content>
              {{ item.text }}
            </v-list-tile-content>
            <v-spacer></v-spacer>
            <v-list-tile-action>
              <v-icon smal>{{item.icon}}</v-icon>
            </v-list-tile-action>
          </template>
        </v-select>
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
      levels: [
        { slug: 'truques', value: 0 },
        { slug: 'level 1', value: 1 },
        { slug: 'level 2', value: 2 },
        { slug: 'level 3', value: 3 },
        { slug: 'level 4', value: 4 },
        { slug: 'level 5', value: 5 },
        { slug: 'level 6', value: 6 },
        { slug: 'level 7', value: 7 },
        { slug: 'level 8', value: 8 },
        { slug: 'level 9', value: 9 },
      ],
      classes: ['Bárbaro', 'Bardo', 'Bruxo', 'Clérigo', 'Druida', 'Feiticeiro', 'Guerreiro',
        'Ladino', 'Mago', 'Monge', 'Paladino', 'Patrulheiro',
      ],
      schools: ['Abjuração', 'Adivinhação', 'Conjuração', 'Encantamento', 'Evocação', 'Ilusão',
        'Necromancia', 'Transmutação',
      ],
      orders: [{
        slug: 'nasc',
        icon: 'arrow_upward',
        text: 'Nome asc',
      },
      {
        slug: 'ndesc',
        icon: 'arrow_downward',
        text: 'Nome desc',
      },
      {
        slug: 'lasc',
        icon: 'arrow_upward',
        text: 'Nível asc',
      },
      {
        slug: 'ldesc',
        icon: 'arrow_downward',
        text: 'Nível desc',
      },
      {
        slug: 'fav',
        icon: 'favorite',
        text: 'Somente favoritos',
      },
      ],
      onlyFavorites: false,
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

<style scoped>
.no-y {
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0
}

.flex.no-y {
  border: 1px solid red;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0
}
</style>
