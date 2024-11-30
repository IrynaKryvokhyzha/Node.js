/*Задача 1. У консольний додаток передають через параметр пенсійний вік. Наприклад
node app.mjs –-pension=65
Потім питаємо у терміналі користувача скільки йому років (використати “readline”) і кажемо чи він є пенсіонером.
*/

import readline from "readline";

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const urlSearchString = process.argv.slice(2).join("&");
const args = new URLSearchParams(urlSearchString);
const pensionAge = args.get("--pension");

r1.setPrompt("What is your age? ");
r1.prompt();

r1.on("line", (age) => {
  if (age >= pensionAge) {
    console.log("You are pensioner!");
  } else {
    console.log("You are still not pensioner!");
  }
  r1.close();
});
