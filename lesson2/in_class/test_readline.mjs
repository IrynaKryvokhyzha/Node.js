import readline from "readline";
const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//1

// r1.question("What is your name?\n", (answer) => {
//   console.log(`Hello ${answer}`);
//   r1.close();
// });

//2

r1.setPrompt("What is your age?");
r1.prompt();

r1.on("line", (age) => {
  console.log(`Age received by a user: ${age}`);
  r1.close();
});

r1.on("SIGINT", () => {
  r1.question("Exit (y or n)?", (input) => {
    if (input.match(/^y(es)?$/i)) {
      r1.pause();
    }
  });
});
