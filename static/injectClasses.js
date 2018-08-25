const listOfSpellsByClasses = require('./classesSpells.json');
const listOfSpells = require('./spells.json');
const fs = require('fs');

const spells = [];

function filterList() {
  listOfSpells.forEach((spell) => {
    let elem = spell;

    if (!spell.class) {
      elem = {
        ...spell,
        classes: [],
      };
    }

    listOfSpellsByClasses.forEach((element) => {
      if (element.spells.findIndex(e => e.toLowerCase() === elem.name.toLowerCase()) !== -1) {
        elem.classes.push(element.class);
      }
    });

    spells.push(elem);
  });

  spells.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
}

filterList();

fs.writeFile('listOfSpells.json', JSON.stringify(spells, null, '\t'), (err) => {
  if (err) {
    // eslint-disable-next-line
    console.error(err);
  }
});
