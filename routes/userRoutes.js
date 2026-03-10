import express from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getAll);
router.get("/users/:id", getById);
router.post("/users", create);
router.put("/users/:id", update);
router.delete("/users/:id", remove);

export default router;
