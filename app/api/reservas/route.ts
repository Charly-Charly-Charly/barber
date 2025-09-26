import { NextResponse } from "next/server";
import pool from "@/lib/db";

function toMySQL(dt: Date) {
  return dt.toISOString().slice(0, 19).replace("T", " ");
}

export async function GET() {
  try {
    const [rows]: any = await pool.query("SELECT * FROM reservas ORDER BY start_datetime");
    return NextResponse.json(rows);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { start, duration_hours, services, total_price, nombre, telefono, correo } = body;

    if (!start || !duration_hours || !services || !nombre || !correo) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const startDate = new Date(start);
    const endDate = new Date(startDate.getTime() + duration_hours * 3600 * 1000);

    const startStr = toMySQL(startDate);
    const endStr = toMySQL(endDate);

    // 1) comprobar conflictos
    const [conflictRows]: any = await pool.query(
      `SELECT id FROM reservas WHERE start_datetime < ? AND DATE_ADD(start_datetime, INTERVAL duration_hours HOUR) > ?`,
      [endStr, startStr]
    );

    if ((conflictRows as any[]).length > 0) {
      return NextResponse.json({ error: "Horario no disponible", conflicts: conflictRows }, { status: 409 });
    }

    // 2) insertar
    const [result]: any = await pool.query(
      `INSERT INTO reservas (start_datetime, duration_hours, services, total_price, nombre, telefono, correo)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [startStr, duration_hours, JSON.stringify(services), total_price, nombre, telefono, correo]
    );

    // 3) La funcionalidad de correo electrónico ha sido eliminada.

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}