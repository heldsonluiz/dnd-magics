<template>
  <div class="MagicList">

    <v-container grid-list-lg>
      <v-layout row wrap>
        <spell
          v-for="(item, index) in filteredList" :key=index
          @clicked="filterClass"
          :magic="item">
        </spell>
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
import Spell from '@/components/Spell';

export default {
  name: 'SpellList',
  props: ['filter'],
  components: {
    Spell,
  },
  data() {
    return {
      snackbar: false,
      timeout: 2000,
      magics: magicList,
      levels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      classes: ['bardo', 'bruxo', 'clérigo', 'druida', 'feiticeiro', 'mago', 'paladino', 'patrulheiro'],
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
        item.name.toLowerCase().includes(this.filter.name.toLowerCase()),
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
        debugger;
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

