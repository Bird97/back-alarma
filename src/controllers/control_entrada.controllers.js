import { pool } from "../db.js"; // Usar pool de conexiones MySQL

const controlEntrada = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.execute("CALL actualizar_control_entrada(?);", [
      id,
    ]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error en controlEntrada:", error);
    res.status(500).json({ error: "Error al ejecutar controlEntrada" });
  }
};

const TablaControl = async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT 
      u.nombre,
      DATE_FORMAT(e.hora_entrada, '%Y-%m-%d') AS dia,
      DATE_FORMAT(e.hora_entrada, '%H:%i:%s') AS hora_entrada,
      DATE_FORMAT(s.hora_salida, '%H:%i:%s') AS hora_salida,
      CASE 
          WHEN s.hora_salida IS NOT NULL THEN 
              TIME_FORMAT(TIMEDIFF(s.hora_salida, e.hora_entrada), '%H:%i:%s')
          ELSE 
              NULL
      END AS horas_cumplidas
  FROM 
      (SELECT id_usuario, hora_marca AS hora_entrada, 
              ROW_NUMBER() OVER (PARTITION BY id_usuario ORDER BY hora_marca) AS rn
      FROM control_entrada
      WHERE tipo = 'entrada') e
  LEFT JOIN 
      (SELECT id_usuario, hora_marca AS hora_salida, 
              ROW_NUMBER() OVER (PARTITION BY id_usuario ORDER BY hora_marca) AS rn
      FROM control_entrada
      WHERE tipo = 'salida') s
  ON e.id_usuario = s.id_usuario AND e.rn = s.rn
  JOIN 
      usuarios u ON e.id_usuario = u.id
  ORDER BY 
      u.nombre, e.hora_entrada;
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error en TablaControl:", error);
    res.status(500).json({ error: "Error al ejecutar TablaControl" });
  }
};

const calcularDiferencia = async (req, res) => {
  const { id, dia } = req.body;

  try {
    const [rows] = await pool.execute(
      "CALL calcular_diferencia_entrada_salida(?, ?);",
      [id, dia]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error en calcularDiferencia:", error);
    res.status(500).json({ error: "Error al calcular diferencia" });
  }
};

export { controlEntrada, calcularDiferencia, TablaControl };
