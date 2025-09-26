import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET(req: Request) {
  console.log("-----------------------------------------");
  console.log("Iniciando la solicitud GET en /api/reservas/check");

  try {
    const url = new URL(req.url);
    const fecha = url.searchParams.get("fecha");
    const hora = url.searchParams.get("hora");

    // Paso 1: Verificar que los parámetros se están recibiendo correctamente
    console.log("Parámetros recibidos:");
    console.log(`- Fecha: ${fecha}`);
    console.log(`- Hora: ${hora}`);

    if (!fecha || !hora) {
      console.error("Error 400: Falta uno o ambos parámetros (fecha o hora).");
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
    }

    // Paso 2: Intentar la conexión a la base de datos
    console.log("Intentando conectar a la base de datos...");
    const connection = await mysql.createConnection({
      host: '193.203.166.162',
      user: 'u798549879_barber_admin',
      password: 'barber_Admin22',
      database: 'u798549879_barber_demo',
    });
    console.log("¡Conexión a la base de datos exitosa!");

    // Paso 3: Preparar y ejecutar la consulta SQL
    const sqlQuery = "SELECT * FROM reservas WHERE fecha = ? AND hora = ?";
    console.log("Ejecutando la consulta SQL:");
    console.log(`- Query: "${sqlQuery}"`);
    console.log(`- Valores: [${fecha}, ${hora}]`);

    const [rows] = await connection.execute(sqlQuery, [fecha, hora]);
    
    // Paso 4: Revisar el resultado de la consulta
    console.log("Consulta ejecutada. Filas encontradas:", rows);

    await connection.end();
    console.log("Conexión a la base de datos cerrada.");

    // Devolver el resultado de la consulta
    return NextResponse.json(rows ?? []);

  } catch (err: any) {
    // Paso 5: Capturar y registrar cualquier error
    console.error("--- OCURRIÓ UN ERROR EN EL SERVIDOR ---");
    console.error("Error en la ruta /api/reservas/check:", err.message); // Imprimir solo el mensaje de error para más claridad
    // Imprimir el stack trace para un diagnóstico más detallado
    if (err.stack) {
      console.error("Stack trace:", err.stack);
    }
    console.error("-----------------------------------------");

    return NextResponse.json({ error: "Error en servidor" }, { status: 500 });
  }
}