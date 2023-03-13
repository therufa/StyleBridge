/* eslint-disable @typescript-eslint/ban-ts-comment */
import postcss from 'postcss'
import postcssJs, { type CssInJs } from 'postcss-js'
import { parse } from 'css-what'

function _convert (
  styles: CssInJs,
  parsed: ReturnType<typeof parse>,
  val: CssInJs
) {
  return parsed.map((item) => [item, val] as const)
    .reduce((acc, [selector, val]) => {
      return selector.reduceRight<CssInJs>(({ style, selectors, ...accInner }, item) => {
        if (item.type === 'pseudo' || item.type === 'pseudo-element') {
          return {
            ...accInner,
            selectors: {
              ...selectors,
              [item.name]: style
            }
          }
        }

        if (item.type === 'attribute') {
          return {
            ...accInner,
            [item.value]: selectors !== undefined
              ? {
                  ...accInner?.[item.value],
                  selectors: {
                    ...accInner?.[item.value]?.selectors,
                    ...selectors
                  }
                }
              : {
                  ...accInner?.[item.value],
                  ...style
                }
          }
        }

        return { style, ...accInner }
      }, { style: val, ...acc })
    }, styles)
}

export default function convert (style: string) {
  const styleObj = postcssJs.objectify(postcss.parse(style))

  return Object.entries(styleObj).reduce<CssInJs>((styles, [key, val]) => {
    const parsed = parse(key)
    return _convert(styles, parsed, val)
  }, {})
}
