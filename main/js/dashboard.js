import { dados } from "./dados.js";

import {
  calcularSaldo,
  gerarInsights
} from "./calculos.js";



/* =========================
   SALDO
========================= */

const saldo = calcularSaldo(dados);

document.getElementById("saldo").innerText =
`R$ ${saldo}`;



/* =========================
   INSIGHTS
========================= */

const insights = gerarInsights(dados);

const areaInsightsTexto =
document.getElementById("insights");



insights.forEach(item => {

  const p = document.createElement("p");

  p.innerText = item;

  areaInsightsTexto.appendChild(p);

});



/* =========================
   MENU
========================= */

const menuDashboard =
document.getElementById("menuDashboard");

const menuInsights =
document.getElementById("menuInsights");

const menuRelatorios =
document.getElementById("menuRelatorios");



/* =========================
   ÁREAS
========================= */

const areaDashboard =
document.getElementById("areaDashboard");

const areaInsights =
document.getElementById("areaInsights");

const areaRelatorios =
document.getElementById("areaRelatorios");



/* =========================
   DASHBOARD
========================= */

menuDashboard.addEventListener("click", () => {

    areaDashboard.style.display = "block";

    areaInsights.style.display = "none";

    areaRelatorios.style.display = "none";

});



/* =========================
   INSIGHTS
========================= */

menuInsights.addEventListener("click", () => {

    areaDashboard.style.display = "none";

    areaInsights.style.display = "block";

    areaRelatorios.style.display = "none";

});



/* =========================
   RELATÓRIOS
========================= */

menuRelatorios.addEventListener("click", () => {

    areaDashboard.style.display = "none";

    areaInsights.style.display = "none";

    areaRelatorios.style.display = "block";

});