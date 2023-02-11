const express = require("express");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + "/build"));

app.get("/*", function (req, res) {
  res.sendFile('index.html');
});

// Inicia a aplicação pela porta configurada
app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
