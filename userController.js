import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../models/userModel.js";

const getAll = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch user", error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const { first_name, last_name, age, email } = req.body;

    if (!first_name || !last_name || age === undefined || !email) {
      return res.status(400).json({ message: "first_name, last_name, age, and email are required" });
    }

    const newUser = await createUser({ first_name, last_name, age, email });
    return res.status(201).json(newUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, age, email } = req.body;

    if (!first_name || !last_name || age === undefined || !email) {
      return res.status(400).json({ message: "first_name, last_name, age, and email are required" });
    }

    const updatedUser = await updateUser(id, { first_name, last_name, age, email });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteUser(id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};

export { getAll, getById, create, update, remove };
