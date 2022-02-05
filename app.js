const express = require ("express");

const app = express();

app.get ('/', (req, res) => {
    res.send("<h1> Home page</h>")
});

app.listen(5001, () => {
    console.log("server started on port 5001");
});