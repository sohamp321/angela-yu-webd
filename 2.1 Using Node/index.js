const fs = require("fs");

// fs.writeFile("message.txt", "Hello from node.js", (err) => {
//   if (err) {
//     console.error("Error writing to file", err);
//   } else {
//     console.log("File written successfully");
//   }
// });


try {
    const data = fs.readFileSync('./message.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
