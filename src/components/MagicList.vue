<template>
  <div class="MagicList">
    <label for="fName">Name: </label>
    <input id="fName" type="text" v-model="search" placeholder="Search title.."/>

    <label for="fLevel">Level: </label>
    <select id="fLevel" v-model="filter.level">
      <option v-for="(level, id) in levels" :key=id>{{level}}</option>
    </select>

    <label for="fSchool">School: </label>
    <select id="fSchool" v-model="filter.school">
      <option v-for="(school, id) in schools" :key=id>{{school}}</option>
    </select>

    <label for="fClass">Class: </label>
    <select id="fClass" v-model="filter.class">
      <option v-for="(pJclass, id) in classes" :key=id>{{pJclass}}</option>
    </select>

    <magic-item v-for="(item, index) in filteredList" :key=index :magic="item"></magic-item>
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
      magics: magicList,
      search: '',
      levels: ['', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      classes: ['', 'bardo', 'bruxo', 'clérigo', 'druida', 'feiticeiro', 'mago', 'paladino', 'patrulheiro'],
      filter: {
        level: '',
        school: '',
        class: '',
      },
    };
  },
  computed: {
    filteredList() {
      let list = magicList.filter(item =>
        item.name.toLowerCase().includes(this.search.toLowerCase()),
      );

      if (this.filter.class !== '') {
        list = list.filter(item =>
          item.classes.findIndex(i => i.toLowerCase() === this.filter.class.toLowerCase()) !== -1,
        );
      }

      if (this.filter.level !== '') {
        list = list.filter(item =>
          item.level === this.filter.level,
        );
      }

      if (this.filter.school !== '') {
        list = list.filter(item =>
          item.school === this.filter.school,
        );
      }

      return list;
    },
    schools() {
      const schools = [''];
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
.MagicList {
  margin: 0;
  padding: 0;
}
</style>

