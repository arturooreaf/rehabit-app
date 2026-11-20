---
name: aprende-front
description: Enseña a Arturo (novato en frontend, viene del backend) un concepto de frontend o un trozo de código de rehabit-app en 5 minutos, con código real del proyecto. Úsala cuando escriba /aprende-front <tema> o diga que no entiende algo del frontend.
argument-hint: <tema, archivo o componente>
---

# /aprende-front $ARGUMENTS

Objetivo: que Arturo entienda "$ARGUMENTS" en 5 minutos y pueda volver a lo que estaba haciendo. Rápido y activo; nada de clases largas.

## Pasos

1. **Busca el tema en el código del proyecto** (archivo y línea). Si todavía no aparece, escribe el ejemplo más pequeño posible y dilo.
2. **Pregunta primero.** Enséñale el trozo de código (como mucho 15 líneas) y pregunta: "¿Qué crees que hace esto?". Espera su respuesta.
3. **Explica en 3 bloques cortos**, uno por mensaje si hace falta:
   - **Qué es**, en una frase y sin jerga.
   - **Cómo funciona aquí**, siguiendo el camino real: componente (`ui/`) → store (`model/`) → service (`api/`) → `api()` → backend. Si sirve, compáralo con su equivalente en el backend (`docs/ARQUITECTURA.md` §14).
   - **Por qué se hace así** (re-renders, seguridad, testabilidad, accesibilidad…).
4. **Una pregunta de hueco**, de una palabra ("Si cambio el estado sin `set`, React... ¿repinta o no?"). Corrígele en una línea y con amabilidad.
5. **Cierra con un resumen de 3 líneas** que pueda copiar a sus apuntes, y una línea de "lo siguiente que te conviene aprender".

## Reglas

- Frases cortas. Un concepto cada vez. **Negrita** en la idea clave.
- Español sencillo. Si sale un término técnico, explícalo la primera vez.
- Nunca más de una pregunta seguida.
- Si dice "rápido" o tiene prisa, sáltate los pasos 2 y 4.
- **No modifiques ningún archivo**: esta skill solo explica.
