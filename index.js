const avro = require('avsc');

// from: https://github.com/hmhco/uds/blob/master/app/kafka/schemas.js
// or: http://schema-registry.prod.hmheng-infra.brnp.internal/subjects/calculated.behavior/versions/1 
const udsType = avro.Type.forSchema({
  namespace: 'com.hmhco.uds',
  doc: 'Represents a calculated behavior event to store for a user',
  type: 'record',
  name: 'calculated.behavior',
  fields: [
    {
      name: 'key',
      type: 'string',
      doc: 'A unique key set by client to identify the data element',
    },
    {
      name: 'user',
      type: 'string',
      doc: 'The unique ID of the user',
    },
    {
      name: 'operation',
      type: {
        type: 'enum',
        name: 'supportedOperations',
        symbols: [
          'increment',
          'merge',
          'decrement',
          'set',
          'unset',
        ],
      },
      doc: 'The requested operation type',
    },
    {
      name: 'data',
      type: [
        'null',
        'string',
        'double',
        'boolean',
        {
          // Arrays (of any type) and JSON objects (of any shape)
          type: 'record',
          name: 'serializedArrayOrJson',
          fields: [
            {
              name: 'json',
              type: 'string',
            },
          ],
        },
      ],
      doc: 'The data element to store in UDS',
    },
  ],
});

// below is the message as taken from the Kafka Tool
const msgHex = '000000003D146C6F67696E436F756E744832373065666635622D303635652D343634322D386363622D3037333131326436393932370000';

// creating buffer from the hex above
const buf1 = Buffer.from(msgHex, 'hex');
console.log('1a:', buf1.toString('hex'));
console.log('2a:', buf1.slice(5).toString('hex'));

// now decoding from AVRO to JSON
const fromHex = udsType.fromBuffer(buf1.slice(5));
console.log('3a:', fromHex);

const grzyb = {...fromHex};
console.log('grzyb:', grzyb);

// now let's try to encode the json object into AVRO
const msgHex2Buf = udsType.toBuffer({
  key: 'loginCount',
  user: '270eff5b-065e-4642-8ccb-073112d69927',
  operation: 'increment',
  data: null 
});

// here is the object as utf8 and as hex
console.log('4a:', msgHex2Buf.toString('utf8'));
console.log('5a:', msgHex2Buf.toString('hex'));



// below doesn't work for some reason...
// const msgString = '=loginCountH270eff5b-065e-4642-8ccb-073112d69927'//'=loginCountH7fbaa9d0-2d5d-40bc-8183-a33cf84fd316';
// const buf2 = Buffer.from(msgString, 'utf8');
// console.log('1b:', buf2.toString('utf8'))

// const arr = [buf1, buf2];
// console.log('-----------------------')
// console.log(arr.sort(Buffer.compare))
// console.log('-----------------------')

// const fromString = udsType.fromBuffer(buf2.slice(5));
// console.log('3b:', fromString);