const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();

// Serverar statiska filer i mappen "public"
app.use(express.static("public"));

// API-proxy: Hämta miljömotioner från riksdagen
app.get("/api/miljomotioner", async (req, res) => {
  try {
    const response = await fetch(
      "https://data.riksdagen.se/dokumentlista/?sok=miljö&sort=datum&doktyp=mot&utformat=json"
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Fel vid API-anrop:", error);
    res.status(500).send("Något gick fel vid hämtning av data");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servern är igång på port ${PORT}`);
});
