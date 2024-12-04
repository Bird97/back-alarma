<?php

header('Access-Control-Allow-Origin: *');

require_once 'conexion.php';

// Función para obtener el control de entrada y salida
function obtenerControlEntrada() {
    global $conn;

    // Consulta SQL para obtener los datos de entrada y salida
    $sql = "
        SELECT 
            u.nombre,
            DATE_FORMAT(e.hora_marca, '%Y-%m-%d') AS dia,
            DATE_FORMAT(e.hora_marca, '%H:%i:%s') AS hora_entrada,
            DATE_FORMAT(s.hora_marca, '%H:%i:%s') AS hora_salida,
            CASE 
                WHEN s.hora_marca IS NOT NULL THEN 
                    TIME_FORMAT(TIMEDIFF(s.hora_marca, e.hora_marca), '%H:%i:%s')
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
            u.nombre, e.hora_marca;
    ";

    $result = $conn->query($sql);

    $control_entrada = [];
    while ($row = $result->fetch_assoc()) {
        $control_entrada[] = $row;
    }

    return $control_entrada;
}

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Control de Entrada y Salida</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-5">
    <h2 class="text-center">Control de Entrada y Salida</h2>

    <table class="table table-bordered mt-4">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Día</th>
                <th>Hora Entrada</th>
                <th>Hora Salida</th>
                <th>Horas Cumplidas</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $control_entrada = obtenerControlEntrada();
            foreach ($control_entrada as $row) {
                echo "<tr>
                        <td>{$row['nombre']}</td>
                        <td>{$row['dia']}</td>
                        <td>{$row['hora_entrada']}</td>
                        <td>{$row['hora_salida']}</td>
                        <td>{$row['horas_cumplidas']}</td>
                    </tr>";
            }
            ?>
        </tbody>
    </table>
    <div class="text-center mt-4"><a href="dashboard.php" class="btn btn-secondary">Volver</a></div><br>
</div>
</body>
</html>
