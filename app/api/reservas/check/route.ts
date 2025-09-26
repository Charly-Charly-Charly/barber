import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: Request) {
  console.log("-----------------------------------------");
  console.log("Iniciando la solicitud POST en /api/reservas/check");

  try {
    const { start, duration_hours } = await req.json();

    console.log("Parámetros recibidos:");
    console.log(`- Fecha/Hora de inicio: ${start}`);
    console.log(`- Duración (horas): ${duration_hours}`);

    if (!start || duration_hours === undefined) {
      console.error("Error 400: Falta uno o ambos parámetros.");
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
    }

    const startDatetime = new Date(start);
    const endDatetime = new Date(startDatetime.getTime() + duration_hours * 60 * 60 * 1000);

    console.log(`- Fecha/Hora de fin calculada: ${endDatetime.toISOString()}`);

    console.log("Intentando conectar a la base de datos...");
    const connection = await mysql.createConnection({
      host: '193.203.166.162',
      user: 'u798549879_barber_admin',
      password: 'barber_Admin22',
      database: 'u798549879_barber_demo',
    });
    console.log("¡Conexión a la base de datos exitosa!");

    const sqlQuery = "SELECT COUNT(*) AS count FROM reservas WHERE start_datetime < ? AND DATE_ADD(start_datetime, INTERVAL duration_hours HOUR) > ?";
    console.log("Ejecutando la consulta SQL para verificar conflictos:");
    console.log(`- Query: "${sqlQuery}"`);
    console.log(`- Valores: [${endDatetime.toISOString()}, ${startDatetime.toISOString()}]`);

    const [rows] = await connection.execute(sqlQuery, [endDatetime.toISOString(), startDatetime.toISOString()]);
    const [result]: any = rows;
    const isAvailable = result.count === 0;

    console.log("Consulta ejecutada. Reservas conflictivas encontradas:", result.count);

    await connection.end();
    console.log("Conexión a la base de datos cerrada.");

    return NextResponse.json({ available: isAvailable });

  } catch (err: unknown) {
    console.error("--- OCURRIÓ UN ERROR EN EL SERVIDOR ---");
    if (err instanceof Error) {
      console.error("Error en la ruta /api/reservas/check:", err.message);
      console.error("Stack trace:", err.stack);
    } else {
      console.error("Error en la ruta /api/reservas/check:", err);
    }
    console.error("-----------------------------------------");

    return NextResponse.json({ error: "Error en servidor" }, { status: 500 });
  }
}
