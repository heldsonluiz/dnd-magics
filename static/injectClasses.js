const listOfMagicsByClasses = require('./magicByClasses.json');
const listOfMagics = require('./magics.json');
const fs = require('fs');

const magics = [];

function filterList() {
  listOfMagics.forEach((magic) => {
    let elem = magic;
    elem.name = elem.name.toLowerCase();

    if (!magic.class) {
      elem = {
        ...magic,
        classes: [],
      };
    }

    listOfMagicsByClasses.forEach((element) => {
      if (element.magics.findIndex(e => e.toLowerCase() === elem.name) !== -1) {
        elem.classes.push(element.class);
      }
    });

    magics.push(elem);
  });

  magics.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
}

filterList();

fs.writeFile('./static/listOfMagics.json', JSON.stringify(magics, null, '\t'), (err) => {
  if (err) {
    // eslint-disable-next-line
    console.error(err);
  }
});
