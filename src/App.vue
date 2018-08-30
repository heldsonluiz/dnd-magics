<template>
  <v-app>
    <v-toolbar dark color="primary">
      <v-toolbar-title class="white--text font-weight-black">D&D Spells</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>info</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container>
      <spell-filter :filter="filter" @filter="doFilter" />
      <spell-list :filter="filter" @filterClass="doFilterClass" />
      <v-dialog v-model="show" width="500">
        <v-card>
          <v-card-media src="./static/img/dnd-magic.jpg" height="200px"></v-card-media>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Hail e Well Met!</h3>
              <div>
                <p>Este grimório foi escrito para facilitar a jornada daqueles inclinados a
                   desvendar a trama de magia de Dungeons
                  & Dragons.
                </p>
              </div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-flex class="text-xs-center">
              <v-btn color="primary" outline @click="show = false">
                Fechar
              </v-btn>
            </v-flex>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
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
      show: false,
    };
  },
  methods: {
    doFilter(filter) {
      this.filter = filter;
    },

    doFilterClass(classs) {
      this.filter.class = classs;
    },
  },
};
</script>
