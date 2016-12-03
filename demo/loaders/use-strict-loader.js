
// This a simple use-strict loader...
// It adds the "use strict"; pragma to each module it loads

const pragma = JSON.stringify('use strict;');

// The loader module should export a function,
// that is called when a resource should be transformed by this loader
module.exports = function loader(source) {

  // Make this loader result cacheable.
  // A cacheable loader must have a deterministic result,
  // when inputs and dependencies haven't changed. 
  this.cacheable();

  // The loader should return a string (or a Buffer).
  return `${ pragma };\n${ source };`;

};