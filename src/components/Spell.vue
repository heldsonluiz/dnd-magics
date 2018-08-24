<template>
  <v-flex xs12 sm6 md4 xl2>
    <v-card>
      <v-card-title>
        <div>
          <div class="title" :class="`${magic.school.en}--text`" >
            {{ magic.name }}
            <spam v-if="magic.ritual" class="grey--text subheading"> (ritual)</spam>
          </div>
          <span class="grey--text">{{ magic.school.pt }} {{ magic.level }}</span>
        </div>
      </v-card-title>
      <v-card-text class="py-0 px-2">
        <v-chip v-for="(item, id) in magic.classes" :key='id' @click="filterClass(item)">
          {{`${item.slice(0,3)}`}}
        </v-chip>
      </v-card-text>
      <v-slide-y-transition>
        <v-card-text>
          <ul class="pb-3 Spell__details">
            <li>
              <spam class="font-weight-bold">Tempo De Conjuração: </spam>{{magic.castingTime}}
            </li>
            <li>
              <spam class="font-weight-bold">Alcance: </spam>{{magic.range}}
            </li>
            <li>
              <spam class="font-weight-bold">Componentes: </spam>{{magic.components}}
            </li>
            <li>
              <spam class="font-weight-bold">Duração: </spam>
              {{magic.concentration?'concentração,' : ''}} até {{magic.duration}}
            </li>
          </ul>
          <span>{{this.peep}}</span>
        </v-card-text>
      </v-slide-y-transition>
      <div class="text-xs-center pb-3">
        <v-dialog v-model="show" width="500">
          <v-btn slot="activator" primary @click="show = !show" class="caption">
            descrição completa
          </v-btn>
          <v-card>
            <v-card-title class="headline" :class="`${magic.school.en} white--text`" primary-title>
              {{magic.name}}
              <spam v-if="magic.ritual" class="grey--text subheading"> (ritual)</spam>
              <v-spacer></v-spacer>
              <!--v-avatar size="24" class="Spell__avatar">
                <img :src="`./static/assets/img/${magic.school.en}.png`">
              </v-avatar-->
            </v-card-title>
            <v-card-text>
              <ul class="pb-3 Spell__details">
                <li>
                  <spam class="font-weight-bold">Tempo De Conjuração: </spam>{{magic.castingTime}}
                </li>
                <li>
                  <spam class="font-weight-bold">Alcance: </spam>{{magic.range}}
                </li>
                <li>
                  <spam class="font-weight-bold">Componentes: </spam>{{magic.components}}
                </li>
                <li>
                  <spam class="font-weight-bold">Duração: </spam>
                  {{magic.concentration?'concentração,' : ''}} até {{magic.duration}}
                </li>
                <li v-if="magic.material">
                  <spam class="font-weight-bold">Material: </spam>{{magic.material}}
                </li>
              </ul>
              <span v-html="magic.description"></span>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-flex class="text-xs-center">
                <v-btn color="primary" flat @click="show = false">
                  Fechar
                </v-btn>
              </v-flex>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'Spell',
  props: ['magic'],
  data() {
    return {
      show: false,
    };
  },
  computed: {
    peep() {
      const text = this.magic.description.replace('<p>', '').replace('</p>', '. ');
      return `${text.slice(0, 210)}...`;
    },
  },
  methods: {
    filterClass(value) {
      this.$emit('clicked', value);
    },
  },
};
</script>

<style scoped>
.Spell__details {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>

