<template>
  <v-flex xs12 sm6 md4 xl2>
    <v-card>

      <v-card-title>
        <div>
          <span>{{ magic.name }}</span><br>
          <span class="grey--text">{{ magic.school }} {{ magic.level }}</span><br>
        </div>
      </v-card-title>

      <v-card-text>
        <div class="mb-3"><v-chip small
          v-for="(classs, index) in magic.classes"
          :key='index' @click="filterByClass(classs)">
          {{`${classs.slice(0,3)}`}}
        </v-chip></div>
        <span v-show="!show" v-html="this.peep"></span>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" icon @click="show = !show">
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-slide-y-transition>
        <v-card-text v-show="show">
          <span v-html="magic.description"></span>
        </v-card-text>
      </v-slide-y-transition>

    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'MagicItem',
  props: ['magic'],
  data() {
    return {
      show: false,
    };
  },
  computed: {
    peep() {
      return `${this.magic.description.slice(0, 200)}...`;
    },
  },
  methods: {
    filterByClass(value) {
      this.$emit('clicked', value);
    },
  },
};
</script>

<style scoped>

</style>

