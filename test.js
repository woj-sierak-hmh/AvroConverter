const avro = require('avsc');

const pet1 = { kind: 'DOG', name: 'Beethoven', age: 4 , scopePoints: 1234321};

const inferredType = avro.Type.forValue(pet1);
console.log('1:', inferredType.schema());

const bufPet1 = inferredType.toBuffer(pet1);
console.log('2:', bufPet1.toString('ascii'));

const decodedPet1 = inferredType.fromBuffer(bufPet1);
console.log('3:', decodedPet1);



const pet2 = { kind: 'CAT', name: 'Puszek', age: 3 , scopePoints: 43211234};
const testPet2 = inferredType.isValid(pet2);
console.log('4:', testPet2);

const exactType = avro.Type.forSchema({
  type: 'record',
  fields: [
    {name: 'kind', type: {type: 'enum', symbols: ['CAT', 'DOG']}},
    {name: 'name', type: 'string'},
    {name: 'age', type: 'int'},
  ]
});
const bufPet11 = exactType.toBuffer(pet1);
console.log('5:', bufPet11.toString('ascii'));
console.log('6:', bufPet1.length, bufPet11.length);

console.log('7:', bufPet11)