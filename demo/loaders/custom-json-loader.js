
// This a simple json loader...


// It may have external dependencies
const utils = require('loader-utils');


// The loader module should export a function,
// that is called when a resource should be transformed by this loader
module.exports = function loader(source) {

  // Make this loader result cacheable.
  // A cacheable loader must have a deterministic result,
  // when inputs and dependencies haven't changed. 
  this.cacheable();

  const parsedObject = parseJSON(source);

  // Get querystring parameters
  const { tabSize } = utils.parseQuery(this.query);

  // The loader should return a string (or a Buffer).
  return `module.exports = ${ JSON.stringify(parsedObject, null, Number(tabSize)) };`;

};


/**
 * Private helpers
 */

function parseJSON(source) {
  try {
    return JSON.parse(source);
  } catch (e){
    return {};
  }
}