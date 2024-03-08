const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const models = require("../models");

const coverImageDirectory = process.env.COVER_IMAGE_DIRECTORY || "public/uploads/covers_images/";
const chapterDirectory = process.env.CHAPTER_DIRECTORY || "public/uploads/chapters/";
const avatarDirectory = process.env.AVATAR_DIRECTORY || "public//uploads/avatars/";

// Gestion des avatars

const renameAvatar = (req, res, next) => {
    const { originalname } = req.file;
    const { filename } = req.file;
    const uuid = uuidv4();
    fs.rename(
      `${avatarDirectory}${filename}`,
      `${avatarDirectory}${uuid}-${originalname}`,
      (err) => {
        if (err) throw err;
        req.avatar = `${uuid}-${originalname}`;
        next();
      }
    );
  };
  
  // Envoie l'avatar
  const sendAvatar = (req, res) => {
    const { fileName } = req.params;
    res.download(avatarDirectory + fileName, fileName, (err) => {
      if (err) {
        res.status(404).send({
          message: `Avatar not found.`,
        });
      }
    });
  };
  
  // Met à jour l'avatar
  const updateAvatar = (req, res) => {
    const id = req.payloads.sub;
    const { avatar } = req;
    models.users
      .updateAvatar(id, avatar)
      .then(([result]) => {
        if (result.affectedRows === 0) res.sendStatus(404);
        else res.status(202).send({ avatar });
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  };
  
  // Supprime l'avatar
  const deleteAvatar = (req, res) => {
    const { fileName } = req.params;
    fs.unlink(`${avatarDirectory}${fileName}`, (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
};

////////////////////////////////////////////////////////////////////// COVER MANHWA //////////////////////////////////////////////

  // Gestion des images de couverture
  const renameCoverImage = (req, res, next) => {
    const { originalname } = req.file;
    const { filename } = req.file;
    const uuid = uuidv4();
    fs.rename(
      `${coverImageDirectory}${filename}`,
      `${coverImageDirectory}${uuid}-${originalname}`,
      (err) => {
        if (err) throw err;
        req.coverImage = `${uuid}-${originalname}`;
        next();
      }
    );
  };

// Envoie l'image de couverture
const sendCoverImage = (req, res) => {
    const { fileName } = req.params;
    res.download(coverImageDirectory + fileName, fileName, (err) => {
      if (err) {
        res.status(404).send({
          message: `Cover image not found.`,
        });
      }
    });
  };
  
    // Met à jour l'image de couverture
    const updateCoverImage = (req, res) => {
        const id = req.payloads.sub;
        const { coverImage } = req;
        models.manhwa
          .updateCoverImage(id, coverImage)
          .then(([result]) => {
            if (result.affectedRows === 0) res.sendStatus(404);
            else res.status(202).send({ coverImage });
          })
          .catch((error) => {
            console.error(error);
            res.sendStatus(500);
          });
        };


  // Supprime l'image de couverture
  const deleteCoverImage = (req, res) => {
    const { fileName } = req.params;
    fs.unlink(`${coverImageDirectory}${fileName}`, (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  };
  

    // Gestion des uploads des images des chapitres : /////////////////////////////////////////////////

    // Renomme le chapitre
const renameChapter = (req, res, next) => {
    const { originalname } = req.file;
    const { filename } = req.file;
    const uuid = uuidv4();
    fs.rename(
      `${chapterDirectory}${filename}`,
      `${chapterDirectory}${uuid}-${originalname}`,
      (err) => {
        if (err) throw err;
        req.chapter = `${uuid}-${originalname}`;
        next();
      }
    );
  };
  
  // Envoie le chapitre
  const sendChapter = (req, res) => {
    const { fileName } = req.params;
    res.download(chapterDirectory + fileName, fileName, (err) => {
      if (err) {
        res.status(404).send({
          message: `Chapter not found.`,
        });
      }
    });
  };
  
  // Met à jour le chapitre
  const updateChapter = (req, res) => {
    const id = req.payloads.sub;
    const { chapter } = req;
    models.chapters
      .updateChapter(id, chapter)
      .then(([result]) => {
        if (result.affectedRows === 0) res.sendStatus(404);
        else res.status(202).send({ chapter });
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  };
  
  // Supprime le chapitre
  const deleteChapter = (req, res) => {
    const { fileName } = req.params;
    fs.unlink(`${chapterDirectory}${fileName}`, (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
  };
  
  module.exports = {
    renameAvatar,
    sendAvatar,
    updateAvatar,
    deleteAvatar,
    renameCoverImage,
    sendCoverImage,
    updateCoverImage,
    deleteCoverImage,
    renameChapter,
    sendChapter,
    updateChapter,
    deleteChapter,
  };