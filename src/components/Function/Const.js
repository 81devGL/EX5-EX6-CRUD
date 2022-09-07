const GEN = [
    { label: 'nam', value: 'nam' },
    { label: 'nữ', value: 'nữ' },
];
const ARRAY_VOUCHER = [
    { label: '100,000đ', value: 100000 },
    { label: 'Voucher 5% ', value: 5 },
    { label: 'Voucher 15% ', value: 15 },
];
const REGEX_MOBILE = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export { GEN, ARRAY_VOUCHER, REGEX_MOBILE, REGEX_EMAIL };
