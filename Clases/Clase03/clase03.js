const fs = require("fs")

const data = fs.readFileSync("./fyh.txt", "utf-8")


let fechaYhora = new Date();
let fechaYhoraStr = fechaYhora.toString();

fs.writeFileSync("./fyh.txt", fechaYhoraStr)

console.log(data);
