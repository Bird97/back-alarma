import { pool } from "../db.js"; // Usar pool para MySQL

// Función para abrir la puerta (estado = 1)
const abrirPuerta = async (req, res) => {
  try {
    const [result] = await pool.execute(
      "UPDATE puerta_estado SET estado = 1 WHERE id = 1;"
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Puerta abierta (estado = 1)" });
    } else {
      res.status(404).json({ error: "Registro no encontrado para actualizar" });
    }
  } catch (error) {
    console.error("Error en abrirPuertaEstado:", error);
    res.status(500).json({ error: "Error al abrir la puerta" });
  }
};

// Función para cerrar la puerta (estado = 0)
const cerrarPuerta = async (req, res) => {
  try {
    const [result] = await pool.execute(
      "UPDATE puerta_estado SET estado = 0 WHERE id = 1;"
    );
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Puerta cerrada (estado = 0)" });
    } else {
      res.status(404).json({ error: "Registro no encontrado para actualizar" });
    }
  } catch (error) {
    console.error("Error en cerrarPuertaEstado:", error);
    res.status(500).json({ error: "Error al cerrar la puerta" });
  }
};

// Función para devolver el estado de la puerta
const devolverEstado = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT estado FROM puerta_estado WHERE id = 1;"
    );
    if (rows.length > 0) {
      const estado = rows[0].estado; // Estado obtenido de la base de datos
      const message = estado === 1 ? "Puerta abierta" : "Puerta cerrada";
      res.status(200).json({ estado, message });
    } else {
      res.status(404).json({ error: "Registro no encontrado" });
    }
  } catch (error) {
    console.error("Error en devolverEstado:", error);
    res
      .status(500)
      .json({ error: "Error al consultar el estado de la puerta" });
  }
};

export { abrirPuerta, cerrarPuerta, devolverEstado };
