import test from "ava";
import fs from "fs";
import path from "path";
import convert from "../src/index";

const style = fs.readFileSync(
  path.resolve(__dirname, "./mockStyle.css"),
  "utf8"
);

test("convert() does convert", (t) => {
  const result = convert(style);
  console.log(result);

  t.truthy(result);
});
