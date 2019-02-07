const avro = require('avsc');

module.exports = schema => {
  return avro.Type.forSchema(schema);
}