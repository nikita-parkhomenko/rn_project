export function ConvertNfcIosSerialNumber(serial: string) {
  if (!serial) {
    return '';
  }

  let result = '';
  const serialSplit = serial.split('');

  for (let i = serialSplit.length - 1; i >= 0; i -= 2) {
    const from = i - 1;
    const to = i + 1;
    result += serial.substring(from, to);
  }

  return result;
}
