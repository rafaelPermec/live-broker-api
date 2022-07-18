const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL da página que vamos raspar os dados.
const url = "https://www.fundamentus.com.br/resultado.php/api";
