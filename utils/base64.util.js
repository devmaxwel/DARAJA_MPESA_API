export const base64 = (shortCode, passKey, timeStamp) => {
  const buffer = Buffer.from(shortCode + passKey + timeStamp)
  return buffer.toString('base64')
};

