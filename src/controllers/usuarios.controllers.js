import { pool } from "../db.js"; // Usar pool para MySQL

const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT id, nombre, tipo FROM usuarios");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

const getUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.execute("SELECT * FROM usuarios WHERE id = ?", [
      id,
    ]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

const postUsuario = async (req, res) => {
  const { nombre, tipo, usuario, contrasena } = req.body;
  if (nombre && tipo && usuario && contrasena) {
    try {
      await pool.execute(
        "INSERT INTO usuarios (nombre, tipo, usuario, contrasena) VALUES (?, ?, ?, ?)",
        [nombre, tipo, usuario, contrasena]
      );
      res.status(200).send("Usuario creado exitosamente");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      res.status(500).send("Error al crear el usuario");
    }
  } else {
    res.status(400).send("Por favor, verifique los datos suministrados");
  }
};

const agregarTarjeta = async (req, res) => {
  const { card_uid, id } = req.body;
  try {
    await pool.execute("UPDATE usuarios SET card_uid = ? WHERE id = ?", [
      card_uid,
      id,
    ]);
    res.status(200).send(`Tarjeta actualizada para el usuario ${id}`);
  } catch (error) {
    console.error("Error al actualizar tarjeta:", error);
    res.status(500).send("Error al actualizar tarjeta");
  }
};

const devolverIdUsuario = async (req, res) => {
  const { cid } = req.params;
  try {
    const [rows] = await pool.execute(
      "SELECT id FROM usuarios WHERE card_uid = ?",
      [cid]
    );
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el ID del usuario:", error);
    res.status(500).send("Error al obtener el ID del usuario");
  }
};

const existeLaTarjeta = async (req, res) => {
  const { cid } = req.params;
  try {
    const [rows] = await pool.execute(
      "SELECT id FROM usuarios WHERE card_uid = ?",
      [cid]
    );
    if (rows.length > 0) {
      res.status(200).send("true");
      return true;
    }
    res.status(200).send("false");
    return false;
  } catch (error) {
    console.error("Error al verificar la tarjeta:", error);
    res.status(500).send("Error al verificar la tarjeta");
  }
};

const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.execute(
      "UPDATE usuarios SET fechaEliminacion = NOW(), card_uid=NULL WHERE id = ?",
      [id]
    );
    res.status(200).send(`Usuario ${id} eliminado exitosamente`);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).send("Error al eliminar el usuario");
  }
};

export {
  getUsuarios,
  getUsuarioPorId,
  postUsuario,
  agregarTarjeta,
  eliminarUsuario,
  devolverIdUsuario,
  existeLaTarjeta,
};
