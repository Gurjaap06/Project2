import express from "express";
import Player from "../models/Player.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// List (Read)
router.get("/", async (req, res) => {
  const q = req.query.q?.trim() || "";
  const filter = q ? { name: { $regex: q, $options: "i" } } : {};
  const players = await Player.find(filter).sort({ createdAt: -1 });
  res.render("players/list", { players, q });
});

// Create: form
router.get("/new", (req, res) => {
  res.render("players/form", {
    player: {},
    title: "Add Player",
    action: "/players",
    method: "POST",
  });
});

// Create: submit
router.post(
  "/",
  body("name").notEmpty().withMessage("Name is required"),
  body("role")
    .isIn(["Batsman", "Bowler", "All-Rounder", "Wicket-Keeper"])
    .withMessage("Choose a valid role"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("players/form", {
        player: req.body,
        title: "Add Player",
        action: "/players",
        method: "POST",
        errors: errors.array(),
      });
    }
    await Player.create(req.body);
    res.redirect("/players");
  }
);

// Show One (Read)
router.get("/:id", async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (!player) return res.status(404).send("Not found");
  res.render("players/show", { player });
});

// Edit: form
router.get("/:id/edit", async (req, res) => {
  const player = await Player.findById(req.params.id);
  if (!player) return res.status(404).send("Not found");
  res.render("players/form", {
    player,
    title: "Edit Player",
    action: `/players/${player._id}?_method=PUT`,
    method: "POST",
  });
});

// Update
router.put("/:id", body("name").notEmpty(), async (req, res) => {
  const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
  });
  if (!player) return res.status(404).send("Not found");
  res.redirect("/players");
});

// Delete
router.delete("/:id", async (req, res) => {
  await Player.findByIdAndDelete(req.params.id);
  res.redirect("/players");
});

export default router;
