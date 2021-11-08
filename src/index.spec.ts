import { formatNumber } from './';

describe('formatNumber()', () => {

    it.each([

        [-50000, '-50,000.00'],
        [-0, '0.00'],
        [0, '0.00'],
        [1, '1.00'],
        [500, '500.00'],
        [50000, '50,000.00'],
        [1234567890, '1,234,567,890.00'],
        [5000000000, '5,000,000,000.00'],

        ['0.00', '0.00'],
        ['.004', '0.00'],
        ['.005', '0.01'],
        ['0.01', '0.01'],
        ['5', '5.00'],

    ])('default formatting behaviour: %p', (input, expected) => {
        expect.assertions(2);

        const result = formatNumber(input);
        expect(typeof result).toBe('string');
        expect(result).toBe(expected);

    });

    it('should accept a string as input', () => {
        expect.assertions(2);

        const result = formatNumber('50000');
        expect(typeof result).toBe('string');
        expect(result).toBe('50,000.00');
    });

    it.each([

        -Infinity,
        '50,000.305',
        Infinity,
        'Bogus',
        'not_a_number',
        'Infinity',

    ])('unusable number: %p', (input) => {
        expect.assertions(1);

        expect(() => formatNumber(input)).toThrow('formatNumber only accepts actual numbers.');

    });

    it.each([

        [0, 0, '0'],
        [0.5, 0, '1'],
        [1, 0, '1'],
        [49999.00, 0, '49,999'],
        [49999.49, 0, '49,999'],
        [49999.5, 0, '50,000'],
        [50000, 0, '50,000'],

        [0, 1, '0.0'],
        [1, 1, '1.0'],
        [1.45, 1, '1.4'],
        [1.494, 1, '1.5'],
        [1.495, 1, '1.5'],

        [0, 2, '0.00'],
        [0.5, 2, '0.50'],
        [1, 2, '1.00'],
        [49999.00, 2, '49,999.00'],
        [49999.49, 2, '49,999.49'],
        [49999.5, 2, '49,999.50'],
        [50000, 2, '50,000.00'],
        [50000.494, 2, '50,000.49'],
        [50000.495, 2, '50,000.50'],

        [50000, 6, '50,000.000000'],

        // Dynamic decimal amount
        [49999.995, Infinity, '49,999.995'],
        [50000, Infinity, '50,000'],
        [50000.5, Infinity, '50,000.5'],
        [50000.50, Infinity, '50,000.5'],
        [50000.51234567891, Infinity, '50,000.51234567891'],

    ])('rounding %d to %p decimal place(s)', (input, decimalAmount, expected) => {
        expect.assertions(2);

        const result = formatNumber(input, decimalAmount as number);
        expect(typeof result).toBe('string');
        expect(result).toBe(expected);

    });

    it('should accept different delimiters', () => {
        expect.assertions(2);

        const result = formatNumber(50000, 2, undefined, 'X');
        expect(typeof result).toBe('string');
        expect(result).toBe('50X000.00');
    });

    it('should accept different decimal marks', () => {
        expect.assertions(2);

        const result = formatNumber(50000, 2, 'X');
        expect(typeof result).toBe('string');
        expect(result).toBe('50,000X00');
    });

    it('should be able to have an empty string as delimiter', () => {
        expect.assertions(2);

        const result = formatNumber(50000, 2, undefined, '');
        expect(typeof result).toBe('string');
        expect(result).toBe('50000.00');
    });

    it('should be able to have an empty string as both decimal mark and delimiter', () => {
        expect.assertions(2);

        const result = formatNumber(50000, 2, '', '');
        expect(typeof result).toBe('string');
        expect(result).toBe('5000000');
    });

    it('should be able to handle the same character as decimal mark and delimiter', () => {
        expect.assertions(2);

        const result = formatNumber(50000, 2, 'X', 'X');
        expect(typeof result).toBe('string');
        expect(result).toBe('50X000X00');
    });

    it('should use default values when parameters are undefined', () => {
        expect.assertions(2);

        const result = formatNumber(50000, undefined, undefined, undefined);
        expect(typeof result).toBe('string');
        expect(result).toBe('50,000.00');
    });
});
