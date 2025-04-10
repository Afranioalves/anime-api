const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = 3000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const url = "https://animefire.plus"

app.get("/animes", async (req, res) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const animes = [];

    $(".swiper-slide .poster").each((_, element) => {
      const title = $(element).attr("title");
      const url = url + $(element).attr("href");
      const image = $(element).find("img").attr("src");

      animes.push({ title, url, image });
    });

    res.json(animes);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Erro ao buscar dados do site" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
