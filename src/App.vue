<template>
  <v-app>
    <spell-filter @doFilter="doFilter"/>
    <spell-list :filter="filter"/>
  </v-app>
</template>

<script>
import SpellFilter from '@/components/SpellFilter';
import SpellList from '@/components/SpellList';

export default {
  name: 'App',
  components: {
    SpellFilter,
    SpellList,
  },
  data() {
    return {
      filter: {
        name: '',
        level: '',
        school: '',
        class: '',
      },
    };
  },
  methods: {
    doFilter(filter) {
      this.filter = filter;
    },
  },
};
</script>
