<template>
  <v-flex xs12 sm6 md4 xl2 transition="slide-y-transition">
    <v-card>

      <v-card-title>
        <div>
          <div class="title" :class="`${spell.school.style}--text`">
            <v-avatar class="py-3" size="16">
              <img :src="`./static/img/schools/${spell.school.style}.png`">
            </v-avatar>
            {{ spell.name }}
            <span v-if="spell.ritual" class="grey--text body-1"> (ritual)</span>
          </div>
          <div>
            <span class="grey--text caption">({{spell.name_en}})</span>
          </div>
        </div>
      </v-card-title>

      <v-card-text class="py-0 px-2">
        <v-chip v-for="(item, id) in spell.classes" small :key='id' @click="doFilterClass(item)">
          <span class="Spell__class">{{`${item}`}}</span>
        </v-chip>
      </v-card-text>

      <v-card-text>
        <ul class="pb-3 Spell__details">
          <li>
            <strong>Nível: </strong>{{spell.level}}
          </li>
          <li>
            <strong>Escola: </strong>{{spell.school.pt}}
          </li>
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
            {{spell.concentration?'concentração,' : ''}} {{spell.duration}}
          </li>
        </ul>
        <div class="Spells__resume" v-html="this.peep"></div>
      </v-card-text>

      <v-card-actions class="pa-3">
        <v-btn outline color="info" @click="doshowSpell(spell)">
          Descrição Completa
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="doFavorite(spell)">
          <v-icon :color="`${spell.favorite ? 'pink' : 'primary'}`">
            {{spell.favorite ? 'favorite':'favorite_border'}}
          </v-icon>
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'Spell',
  props: ['spell'],

  data() {
    return {};
  },

  computed: {
    peep() {
      const text = this.spell.description.replace('<p>', '').replace('</p>', '. ');
      return `${text.slice(0, 210)}...`;
    },
  },

  methods: {
    doFilterClass(value) {
      this.$emit('filterClass', value);
    },

    doshowSpell(spell) {
      this.$emit('showSpell', spell);
    },

    doFavorite(spell) {
      this.$emit('favorite', spell);
    },
  },
};
</script>

<style scoped>

.Spell__class {
  cursor: pointer;
}
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

