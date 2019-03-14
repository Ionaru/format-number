# @ionaru/format-number

[![npm version](https://img.shields.io/npm/v/@ionaru/format-number.svg?style=for-the-badge)](https://www.npmjs.com/package/@ionaru/format-number)
[![npm version](https://img.shields.io/npm/v/@ionaru/format-number/next.svg?style=for-the-badge)](https://www.npmjs.com/package/@ionaru/format-number/v/next)
[![Build Status](https://img.shields.io/travis/Ionaru/format-number/master.svg?style=for-the-badge)](https://travis-ci.org/Ionaru/format-number)
[![codecov](https://img.shields.io/codecov/c/github/Ionaru/format-number/master.svg?style=for-the-badge)](https://codecov.io/gh/Ionaru/format-number)

## Description
A package for formatting a number to improve its readability.

## Usage
```bash
npm install @ionaru/format-number
```

Standard use
```typescript
import { formatNumber } from 'format-number';
const formattedNumber = formatNumber(500.8);
console.log(formattedNumber);  // 500.80
```

No decimals
```typescript
import { formatNumber } from 'format-number';
const formattedNumber = formatNumber(1.62, 0);
console.log(formattedNumber);  // 2
```

## API
### formatNumber(amount, decimalAmount, decimalMark, delimiter) ⇒ <code>string</code>
Format a number to make it more readable.

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| amount | <code>number</code> \| <code>string</code> |  | The amount that will be formatted, must be convertible by `Number()`. |
| decimalAmount | <code>number</code> | <code>2</code> | The amount of decimal places will be in the formatted number. |
| decimalMark | <code>string</code> | <code>&quot;.&quot;</code> | The character that marks the start the fractional part of the formatted number. |
| delimiter | <code>string</code> | <code>&quot;,&quot;</code> | The character that separates the thousands in a number. |

## Examples
Standard formatting is great for monetary values.
```typescript
const formattedNumber = formatNumber(19499.99);
console.log(formattedNumber);  // 19,499.99
```

Show only whole numbers
```typescript
const formattedNumber = formatNumber(19499.99, 0);
console.log(formattedNumber);  // 19,500
```

The input number can be a string
```typescript
const formattedNumber = formatNumber('19499.99');
console.log(formattedNumber);  // 19,499.99
```

Change the default markings in the number for international use.

Canadian
```typescript
const formattedNumber = formatNumber(19499.99, undefined, ',', ' ');
console.log(formattedNumber);  // 19 499,99
```

Dutch
```typescript
const formattedNumber = formatNumber(19499.99, undefined, ',', '.');
console.log(formattedNumber);  // 19.499,99
```
