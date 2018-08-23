<template>
  <v-app>
    <v-content>
      <magic-list/>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import MagicList from '@/components/MagicList';

export default {
  name: 'App',
  components: {
    MagicList,
  },
};
</script>
