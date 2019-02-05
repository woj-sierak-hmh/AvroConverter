const { HighLevelProducer, KafkaClient } = require('kafka-node');
const uuid = require('uuid/v1');

const client = new KafkaClient({
  kafkaHost: 'kafka.brcore01.internal:9092'
});
const producer = new HighLevelProducer(client);

const msgHex = '000000003d146c6f67696e436f756e744832373065666635622d303635652d343634322d386363622d3037333131326436393932370000';
const buf = Buffer.from(msgHex, 'hex');

producer.on('ready', () => {
  const payload = {
    topic: 'hmheng-uds.dev.calculated-behavior-events.schema.calculated.behavior',
    messages: buf,
    key: uuid()
  };
  producer.send([payload], (err, data) => {
    if (err) return (console.log('Err: ', err));
    console.log('data->', data);
  });
});
