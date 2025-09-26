"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-800">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname} // anima cada vez que cambia la ruta
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-screen"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  );
}
