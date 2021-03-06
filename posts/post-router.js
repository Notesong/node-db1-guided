const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

// /api/posts

router.get("/", (req, res) => {
  db("posts")
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  db("posts")
    .where("id", req.params.id)
    .first()
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(400).json({ message: "Post not found" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  const postData = req.body;

  db("posts")
    .insert(postData)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("posts")
    .where("id", req.params.id)
    .update(changes)
    .then((count) => {
      if (count) {
        res.json({ updated: count });
      } else {
        res.status(404).json({ message: "invalid id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "error updating", err });
    });
});

router.delete("/:id", (req, res) => {
  db("posts")
    .where({ id: req.params.id })
    .del()
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "record deleted successfully" });
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "sorry, ran into an error" });
    });
});

module.exports = router;
