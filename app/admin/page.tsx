"use client";

import { motion } from "framer-motion";
import AdminTable from "./AdminTable";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Reservas</h1>
        <p className="text-gray-600 mb-10">
          Aquí puedes gestionar todas las reservas de la barbería en tiempo real.
        </p>
        <AdminTable />
      </motion.div>
    </main>
  );
}
