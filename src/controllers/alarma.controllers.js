import { pool } from "../db.js"; // Usa un pool para conexiones eficientes

const activarAlarma = async (req, res) => {
  try {
    const [result] = await pool.execute(
      "INSERT INTO alarma (hora_activar) VALUES (NOW());"
    );

    // Recuperar el registro insertado
    const [rows] = await pool.execute("SELECT * FROM alarma WHERE id = ?", [
      result.insertId,
    ]);

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error al activar la alarma:", error);
    res.status(500).json({ error: "Error al activar la alarma" });
  }
};

const desactivarAlarma = async (req, res) => {
  try {
    // Obtener el ID de la última alarma activada
    const [lastAlarm] = await pool.execute(
      "SELECT id FROM alarma ORDER BY hora_activar DESC LIMIT 1;"
    );

    if (!lastAlarm.length) {
      return res.status(404).json({ error: "No hay alarmas para desactivar" });
    }

    const alarmId = lastAlarm[0].id;

    // Actualizar la hora de desactivación
    await pool.execute(
      "UPDATE alarma SET hora_desactivar = NOW() WHERE id = ?;",
      [alarmId]
    );

    // Recuperar la alarma actualizada
    const [updatedAlarm] = await pool.execute(
      "SELECT * FROM alarma WHERE id = ?;",
      [alarmId]
    );

    res.status(200).json(updatedAlarm[0]);
  } catch (error) {
    console.error("Error al desactivar la alarma:", error);
    res.status(500).json({ error: "Error al desactivar la alarma" });
  }
};

export { activarAlarma, desactivarAlarma };
