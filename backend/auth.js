// Importation des modules nécessaires
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Récupération du secret JWT depuis les variables d'environnement
const { JWT_SECRET } = process.env;

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

// Fonction pour hacher le mot de passe
const hashPassword = (req, res, next) => {
  // Hachage du mot de passe avec argon2
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      // Stockage du mot de passe haché dans la requête et suppression du mot de passe en clair
      req.body.hashedPassword = hashedPassword;
      delete req.body.password;
      next();
    })
    .catch((err) => {
      // Gestion des erreurs
      console.error(err);
      res.status(400).send({ message: "Erreur lors du hachage du mot de passe" });
    });
};

// Fonction pour vérifier le mot de passe
const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password, hashingOptions)
    .then((isVerified) => {
      // Si le mot de passe est vérifié, création d'un token JWT
      if (isVerified) {
        const token = jwt.sign({ sub: req.user.id }, JWT_SECRET, {
          algorithm: "HS512",
        });
        delete req.user.hashedPassword;
        res.send({ token, user: req.user });
      } else res.status(401).send({ message: "Mot de passe incorrect" });
    })
    .catch((err) => {
      // Gestion des erreurs
      console.error(err);
      res.status(400).send({ message: "Erreur lors de la vérification du mot de passe" });
    });
};

// Fonction pour vérifier le token
const verifyToken = (req, res, next) => {
  try {
    // Récupération du header d'autorisation
    const autorizationHeader = req.headers.authorization;
    if (!autorizationHeader)
      throw new Error("Autorisation nécessaire pour cette route");

    // Vérification du type de token
    const [type, token] = autorizationHeader.split(" ");
    if (type !== "Bearer") throw new Error("Seuls les tokens de type Bearer sont autorisés");
    if (!token) throw new Error("Token nécessaire");

    // Vérification du token JWT
    req.payloads = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    // Gestion des erreurs
    console.error(err);
    res.status(401).send({ message: err.message });
  }
};

// Exportation des fonctions
module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
};
