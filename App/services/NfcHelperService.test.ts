import { ConvertNfcIosSerialNumber } from './NfcHelperService';

test('ConvertNfcIosSerialNumber returns correctly formatted nfc serial number of even length', () => {
  const serial = 'E0040150CBB7E7F4';
  const expected = 'F4E7B7CB500104E0';

  const result = ConvertNfcIosSerialNumber(serial);
  expect(result).toBe(expected);
});

test('ConvertNfcIosSerialNumber returns correctly formatted nfc serial number of odd length', () => {
  const serial = 'E0040150CBB7E7F45';
  const expected = '457F7EBB0C154000E';

  const result = ConvertNfcIosSerialNumber(serial);
  expect(result).toBe(expected);
});

test('ConvertNfcIosSerialNumber returns empty string if undefined serial number', () => {
  const serial = undefined;
  const expected = '';

  const result = ConvertNfcIosSerialNumber(serial as any);
  expect(result).toBe(expected);
});
