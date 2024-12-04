import { pool } from "../db.js"; // Usar pool para MySQL

const controlPuerta = async (req, res) => {
  try {
    const [rows] = await pool.execute("CALL actualizar_control_puerta();");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error en controlPuerta:", error);
    res.status(500).json({ error: "Error al ejecutar controlPuerta" });
  }
};

const abrirPuerta = async (req, res) => {
  try {
    const [result] = await pool.execute(
      "INSERT INTO puerta (hora_marca, tipo) VALUES (NOW(), 'ABRIR');"
    );
    res.status(200).json({ id: result.insertId, message: "Puerta abierta" });
  } catch (error) {
    console.error("Error en abrirPuerta:", error);
    res.status(500).json({ error: "Error al abrir la puerta" });
  }
};

const tablaPuerta = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `
      SELECT 
        id, 
        DATE_FORMAT(hora_marca, '%Y-%m-%d') AS día, 
        DATE_FORMAT(hora_marca, '%H:%i:%s') AS hora, 
        tipo 
      FROM 
        puerta
      ORDER BY 
        hora_marca DESC;
      `
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error en tablaPuerta:", error);
    res.status(500).json({ error: "Error al obtener la tabla de puertas" });
  }
};

export { controlPuerta, abrirPuerta, tablaPuerta };
