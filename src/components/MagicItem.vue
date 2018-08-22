<template>
  <div class="MagicItem">
    {{ magic.name }} -
    {{ magic.school }} lvl: {{ magic.level }} - classes:
    <span v-for="(classs, index) in magic.classes" :key='index'> {{classs}}</span>
  </div>
</template>

<script>
export default {
  name: 'MagicItem',
  props: ['magic'],
};
</script>

<style scoped>
.MagicItem {
  margin: 0;
  padding: 0;
}
</style>

