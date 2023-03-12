import postcss from "postcss";
import postcssJs from "postcss-js";

export default function convert(style: string) {
  return postcssJs.objectify(postcss.parse(style));
}
