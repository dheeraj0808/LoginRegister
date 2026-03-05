const app = require("./app");

console.log("Hello World!");
console.log(app.get);

app.listen(PORT = 3002, () => {
    console.log(`Server running on port ${PORT}`);
});
