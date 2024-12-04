import { pool } from "../db.js"; // Usar pool para MySQL

const getTarjetas = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `
      SELECT t.*
      FROM tarjeta t
      LEFT JOIN usuarios u ON t.card_uid = u.card_uid
      WHERE u.card_uid IS NULL;
      `
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener tarjetas:", error);
    res.status(500).json({ error: "Error al obtener las tarjetas" });
  }
};

const postTarjeta = async (req, res) => {
  const { card_uid } = req.body;
  try {
    // Ejecutar el procedimiento y recuperar el parámetro de salida
    const [rows] = await pool.execute("CALL agregar_tarjeta(?, @mensaje);", [
      card_uid,
    ]);

    // Obtener el valor del mensaje
    const [[result]] = await pool.query("SELECT @mensaje AS mensaje");

    // Enviar la respuesta según el mensaje
    if (result.mensaje === "El card_uid ya existe.") {
      res.status(400).send(result.mensaje); // Si ya existe
    } else {
      res.status(200).send(result.mensaje); // Si la tarjeta fue agregada exitosamente
    }
  } catch (error) {
    console.error("Error al crear tarjeta:", error);
    res.status(500).json({ error: "Error al crear la tarjeta" });
  }
};

const eliminarTarjeta = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.execute("DELETE FROM tarjeta WHERE id = ?;", [id]);
    res.status(200).send("Tarjeta eliminada exitosamente.");
  } catch (error) {
    console.error("Error al eliminar tarjeta:", error);
    res.status(500).json({ error: "Error al eliminar la tarjeta" });
  }
};

export { getTarjetas, postTarjeta, eliminarTarjeta };
