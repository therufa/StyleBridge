import fs from 'node:fs'
import path from 'node:path'
import test from 'ava'
// eslint-disable-next-line import/extensions
import convert from '../src/index'

const style = fs.readFileSync(
  // eslint-disable-next-line unicorn/prefer-module
  path.resolve(__dirname, './mockStyle.css'),
  'utf8'
)

test('convert() does convert', (t) => {
  const result = convert(style)
  console.log(result)

  t.truthy(result)
})
