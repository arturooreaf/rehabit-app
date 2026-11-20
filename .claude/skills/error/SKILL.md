---
name: error
description: Ayuda a Arturo a entender y arreglar él mismo un error de rehabit-app (consola del navegador, terminal de Vite, TypeScript, ESLint o Vitest) sin arreglárselo. Úsala con /error o cuando pegue un error o diga que algo no funciona.
argument-hint: [error pegado]
---

# /error $ARGUMENTS

Objetivo: que Arturo aprenda a **leer errores**, no solo que este desaparezca.

## Pasos

1. Si no ha pegado el error completo, pídeselo: el mensaje **y** la primera línea del *stack* que apunte a `src/`.
2. **Tradúcelo en una frase**, sin jerga: "TypeScript dice que `exercise` puede ser `undefined` y lo estás usando como si siempre existiera".
3. **Enséñale dónde mirar:** qué parte del mensaje importa (archivo:línea, el nombre del tipo, el código del error) y qué parte es ruido.
4. **Pregúntale** qué cree que lo provoca. Espera su respuesta.
5. Guíale con la escalera de pistas (`/pista`) hasta que lo arregle **él**.
6. Al final, **una línea para sus apuntes**: "Cuando veas X, suele ser Y".

## Errores típicos de novato en frontend (para reconocerlos rápido)

- `Cannot read properties of undefined` → datos que aún no han llegado; falta un estado de carga o un `?.`.
- `Each child in a list should have a unique "key" prop` → falta `key` en un `.map` del JSX.
- `Too many re-renders` → se llama a `setX()` mientras se pinta, en vez de dentro de un evento.
- `Rendered more hooks than during the previous render` → un hook dentro de un `if` o después de un `return`.
- CORS en la consola → es cosa del backend o del proxy de Vite, no del código de React.
- `Failed to resolve import "@/..."` → el alias no está configurado en `vite.config.ts` o en `tsconfig`.
- Un 401 en bucle → el refresh usa `api()` en vez de `request()`.

## Reglas

- **No edites archivos.** Arturo arregla su error.
- Mensajes cortos, una pregunta cada vez.
- Si tiene mucha prisa y lo pide claro, dale la solución con su explicación y apunta el tema en "Para repasar" de `docs/PROGRESO.md`.
