<template>
  <div class="MagicList">
    <v-container grid-list-lg>
    <v-layout row wrap class="mb-3">
      <v-flex xs12 sm6 md3 class="my-0">
        <v-text-field v-model="search" label="Magia" clearable>
        </v-text-field>
      </v-flex>
      <v-flex xs6 md3 class="my-0">
        <v-combobox label="Nível" v-model="filter.level" :items="levels" clearable>
        </v-combobox>
      </v-flex>
      <v-flex xs6 md3 class="my-0">
        <v-combobox label="Classe" v-model="filter.class" :items="classes" clearable>
          <template slot="selection" slot-scope="data">
            {{ data.item }}
          </template>
        </v-combobox>
      </v-flex>
      <v-flex xs12 sm6 md3 class="my-0">
        <v-combobox label="Escola" v-model="filter.school" :items="schools" clearable>
          <template slot="selection" slot-scope="data">
            {{ data.item }}
          </template>
        </v-combobox>
      </v-flex>
    </v-layout>
    </v-container>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <magic-item v-for="(item, index) in filteredList" :key=index
        @clicked="filterClass"
        :magic="item"></magic-item>
      </v-layout>
    </v-container>


    <v-snackbar v-model="snackbar" top color="info"
      :timeout="2000" multi-line vertical>
      Magias de {{ this.upper(this.filter.class) }}
    </v-snackbar>

  </div>
</template>

<script>
import magicList from '~/listOfMagics.json';
import MagicItem from '@/components/MagicItem';

export default {
  name: 'MagicList',
  components: {
    MagicItem,
  },
  data() {
    return {
      snackbar: false,
      timeout: 2000,
      magics: magicList,
      search: '',
      levels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      classes: ['bardo', 'bruxo', 'clérigo', 'druida', 'feiticeiro', 'mago', 'paladino', 'patrulheiro'],
      filter: {
        level: '',
        school: '',
        class: '',
      },
    };
  },
  methods: {
    isEmpty(value) {
      return !value || value === '';
    },
    filterClass(value) {
      this.snackbar = true;
      this.filter.class = value;
    },
    upper(value) {
      return !this.isEmpty(value) ? value.charAt(0).toUpperCase() + value.slice(1) : value;
    },
  },
  computed: {
    filteredList() {
      let list = magicList.filter(item =>
        item.name.toLowerCase().includes(this.search.toLowerCase()),
      );

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
          item.school.toLowerCase() === this.filter.school.toLowerCase(),
        );
      }

      return list;
    },
    schools() {
      const schools = [];
      magicList.filter((item) => {
        if (schools.findIndex(s => s === item.school) === -1) {
          schools.push(item.school);
        }
        return true;
      });
      return schools;
    },
  },
};
</script>

<style scoped>

</style>

