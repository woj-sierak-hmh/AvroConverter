const magicPrefix = '000000003D'

module.exports = (avroType, jsonString) => {
  const encoded = avroType.toBuffer(jsonString);
  const hexEncoded = magicPrefix + encoded.toString('hex');
  return hexEncoded;
}