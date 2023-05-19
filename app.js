const express = require("express");

const app = express();

//Middleware pour verifier l'heure de la demande

const verification = (req, res, next) => {
  const jourService = new Date().getDay();
  const heureService = new Date().getHours;

  if (
    jourService >= 1 &&
    jourService <= 5 &&
    heureService >= 9 &&
    heureService < 17
  ) {
    next();
  } else {
    res
      .status(403)
      .send(
        "L'application web n'est disponible que pendant les heures de travail (du lundi au vendredi de 09h à 17h)"
      );
  }
};

// definition du moteur d'affichage
app.set("view engine", "ejs");
app.set("views", "pages");

app.get("/", (req, res) => {
  res.status(200).render("index");
});
app.get("/services", (req, res) => {
  res.status(200).render("services");
});
app.get("/contact", (req, res) => {
  res.status(200).render("contact");
});
app.use((req, res) => {
  res.status(404).render("pageIntrouvable");
});

//utilisation du middleware
app.use(verification);

app.listen(3000);
console.log("demarrage au pourt 3000");
