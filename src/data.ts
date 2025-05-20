export const contexts = [
  { name: 'text', input: 'Hello <b>World</b>' },
  { name: 'html', input: 'Hello\n<b>World</b>' },
  { name: 'attribute', input: 'height=\"100%\"' },
  { name: 'attributeName', input: 'data-info' },
  { name: 'elementName', input: 'section' },
  { name: 'number', input: 42 },
  { name: 'scriptString', input: 'Hello "world"\nnew line' },
  { name: 'styleToken', input: '#fff' },
  { name: 'uri', input: 'javascript:alert(1)' },
  { name: 'unsafe', input: '<h1 onclick=\"alert(1)\">Danger</h1>' }
];