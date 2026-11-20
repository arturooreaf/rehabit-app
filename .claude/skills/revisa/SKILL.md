---
name: revisa
description: Revisión de código en modo mentor del código que ha escrito Arturo en rehabit-app, como mucho dos mejoras por revisión y sin reescribirlo. Comprueba que funciona, que se entiende y que respeta la arquitectura de docs/ARQUITECTURA.md. Úsala con /revisa [archivo] o cuando pida que le revises algo.
argument-hint: [archivo o carpeta; si no, los cambios sin commitear]
---

# /revisa $ARGUMENTS

Revisa como en una revisión de código de verdad, pero para alguien que está aprendiendo.

## Qué revisar

- Si hay argumento: ese archivo o carpeta.
- Si no: los cambios sin commitear (`git diff` y los archivos nuevos).

## Orden (para en cuanto tengas 2 mejoras)

1. **¿Funciona?** ¿Y con los casos raros: lista vacía, error del API, doble clic, respuesta lenta?
2. **¿Respeta la arquitectura?** (`docs/ARQUITECTURA.md` §3 y §4)
   - ¿El componente hace `fetch` o tiene lógica de negocio?
   - ¿`shared/` importa de `features/`?
   - ¿Lo que llega del API está validado con zod? ¿Hay algún `any`?
   - ¿Hay textos escritos directamente en lugar de usar i18n?
   - ¿Es accesible (`label`, `button` frente a `div` clicable)?
3. **¿Se entiende?** Nombres que digan lo que hacen (`searchExercises`, no `fn` ni `data`).
4. **¿Es simple?** ¿Sobra algo?
5. **Lo que ha hecho bien**, concreto. Esto va **siempre**.

## Cómo darla

- **Como mucho 2 mejoras**, la más importante primero. Las demás, si son menores, ni las menciones.
- Para cada mejora: **archivo y línea**, qué pasa y **una pregunta** que le lleve a arreglarlo ("¿qué ve la persona usuaria si el API tarda 5 segundos?").
- **No reescribas su código** ni edites archivos. Que lo cambie él.
- Termina con **👉 Tu turno:** qué arreglar primero.
- Si está todo bien, díselo claro y sugiere el siguiente paso de `docs/PROGRESO.md`.
