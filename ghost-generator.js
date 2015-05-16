var _ = require('lodash');
var Promise = require('Bluebird');



var speak = function* (greetings, script) {
  yield _.sample(greetings);

  while(true) {
    var line = _.sample(script);

    if(Array.isArray(line)) {
      for(let bit of line) {
        yield bit;
      }
    } else {
      yield line;
    }
  }
}

var awaitUserInput = function () {
  return new Promise(function(resolve) {
    process.stdin.on('data', function (data) {
      console.log('user says:', data.toString());
      process.stdin.removeAllListeners();
      resolve();
    });
  })
};


// main ----------------

var ghostGreetings = [
  'Hi %s, pleased to be chattin',
  '%s.... That was the name of an old friend. Hello :)'
];

var ghostScript = [
  'I died in a fire',
  'The world\'s really old',
  ['first in series', 'second in series', 'third in series']
];


var ghost = speak(ghostGreetings, ghostScript);

function run() {
  console.log('ghost says: ', ghost.next().value);
  awaitUserInput().then(run);
}

run();
