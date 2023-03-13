import fs from 'node:fs'
import path from 'node:path'
import test from 'ava'
import convert from '../src/index'

const style = fs.readFileSync(
  path.resolve(__dirname, './mockStyle.css'),
  'utf-8'
)

const expected = fs.readFileSync(
  path.resolve(__dirname, './mockStyle.json'),
  'utf-8'
)

test('convert() should convert doc', t => {
  const result = convert(style)

  t.deepEqual(JSON.parse(JSON.stringify(result)), JSON.parse(expected))
})
