module.exports = (avroType, hexString) => {
  let buf = Buffer.from(hexString, 'hex');
  if (buf[0] === 0x00) buf = buf.slice(5);
  const decoded = avroType.fromBuffer(buf);
  return decoded;
}