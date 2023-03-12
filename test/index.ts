import fs from "fs";
import test from "ava";
import convert from "../src/index";

const style = fs.readFileSync("./mockStyle.css", "utf8");

test("convert() does convert", () => {
  const result = convert(style);
  console.log(result);
});
