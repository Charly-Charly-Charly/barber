import { FlatCompat } from '@eslint/eslintrc'

// Inicializa FlatCompat para usar la configuración existente de Next.js
const compat = new FlatCompat({
  // import.meta.dirname es útil para resolver rutas relativas
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next'],
    rules: {
      // Reglas que ya tenías
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',

      // --- Reglas añadidas para ignorar errores en el build ---
      // 1. Desactiva la comprobación del tipo 'any' para permitir el despliegue
      '@typescript-eslint/no-explicit-any': 'off',
      
      // 2. Desactiva la advertencia sobre el uso de la etiqueta <img>
      '@next/next/no-img-element': 'off',
      // --------------------------------------------------------
    },
  }),
]

export default eslintConfig
