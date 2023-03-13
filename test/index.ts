import fs from 'node:fs'
import path from 'node:path'
import test from 'ava'
import convert from '../src/index'

const style = fs.readFileSync(
  path.resolve(__dirname, './mockStyle.css'),
  'utf8'
)

test('convert() does convert', t => {
  const result = convert(style)
  console.log(JSON.stringify(result))

  t.truthy(result)
})
