<template>
  <v-flex xs12 sm6 md4 xl2>
    <v-card>
      <v-card-title>
        <div>
          <div class="title" :class="`${spell.school.style}--text`" >
            {{ spell.name }}
            <span v-if="spell.ritual" class="grey--text subheading"> (ritual)</span>
          </div>
          <v-avatar size="16" class="Spell__avatar">
            <img :src="`./static/assets/img/${spell.school.style}.png`">
          </v-avatar>
          <span class="grey--text">{{ spell.school.pt }} {{ spell.level }}</span>
        </div>
      </v-card-title>
      <v-card-text class="py-0 px-2">
        <v-chip v-for="(item, id) in spell.classes"
          small :key='id' @click="filterClass(item)">
          {{`${item}`}}
        </v-chip>
      </v-card-text>
      <v-slide-y-transition>
        <v-card-text>
          <ul class="pb-3 Spell__details">
            <li>
              <span class="font-weight-bold">Tempo De Conjuração: </span>{{spell.castingTime}}
            </li>
            <li>
              <span class="font-weight-bold">Alcance: </span>{{spell.range}}
            </li>
            <li>
              <span class="font-weight-bold">Componentes: </span>{{spell.components}}
            </li>
            <li>
              <span class="font-weight-bold">Duração: </span>
              {{spell.concentration?'concentração,' : ''}} até {{spell.duration}}
            </li>
          </ul>
          <div class="Spells__resume" v-html="this.peep"></div>
        </v-card-text>
      </v-slide-y-transition>
      <div class="text-xs-center pb-3">
        <v-dialog v-model="show" width="500">
          <v-btn slot="activator" color="info" @click="show = !show" class="caption">
            descrição completa
          </v-btn>
          <v-card>
            <v-card-title class="headline"
            :class="`${spell.school.style} white--text`" primary-title>
              {{spell.name}}
              <v-spacer></v-spacer>
              <span v-if="spell.ritual" class="white--text subheading"> (ritual)</span>
              <!--v-avatar size="24" class="Spell__avatar">
                <img :src="`./static/assets/img/${spell.school.style}.png`">
              </v-avatar-->
            </v-card-title>
            <v-card-text>
              <ul class="pb-3 Spell__details">
                <li>
                  <span class="font-weight-bold">Tempo De Conjuração: </span>{{spell.castingTime}}
                </li>
                <li>
                  <span class="font-weight-bold">Alcance: </span>{{spell.range}}
                </li>
                <li>
                  <span class="font-weight-bold">Componentes: </span>{{spell.components}}
                </li>
                <li>
                  <span class="font-weight-bold">Duração: </span>
                  {{spell.concentration?'concentração,' : ''}} até {{spell.duration}}
                </li>
                <li v-if="spell.material">
                  <span class="font-weight-bold">Material: </span>{{spell.material}}
                </li>
              </ul>
              <span v-html="spell.description"></span>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-flex class="text-xs-center">
                <v-btn color="primary" outline @click="show = false">
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
  props: ['spell'],
  data() {
    return {
      show: false,
    };
  },
  computed: {
    peep() {
      const text = this.spell.description.replace('<p>', '').replace('</p>', '. ');
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

@media screen and (min-width: 600px) {
  .Spells__resume {
    min-height: 150px;
  }
  .Spell__details {
    min-height: 125px;
  }
}

@media screen and (min-width: 680px) {
  .Spells__resume {
    min-height: 120px;
  }
  .Spell__details {
    min-height: 110px;
  }
}

@media screen and (min-width: 960px) {
  .Spells__resume {
    min-height: 150px;
  }
  .Spell__details {
    min-height: 110px;
  }
}

@media screen and (min-width: 1264px) {
  .Spells__resume {
    min-height: 130px;
  }
  .Spell__details {
    min-height: 100px;
  }
}
</style>

