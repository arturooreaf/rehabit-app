---
name: sesion
description: Abre o cierra una sesión de estudio de frontend con Arturo en rehabit-app (repaso, objetivo del día, actualizar docs/PROGRESO.md, resumen). Úsala con /sesion empezar, /sesion terminar, o cuando Arturo diga que empieza o que se va.
argument-hint: empezar | terminar
---

# /sesion $ARGUMENTS

## Si es `empezar` (o no hay argumento y la sesión acaba de empezar)

1. Lee `docs/PROGRESO.md`. Si no existe, créalo con la plantilla de `docs/GUIA-TUTOR-FRONTEND.md` §3.4.
2. Pregúntale **cuánto tiempo tiene**. Espera la respuesta.
3. **2 preguntas rápidas de repaso**, de hueco y **de una en una**, sacadas de "Ya domino" o "Dudas pendientes". Recordar algo días después es lo que lo fija.
4. Propón el objetivo de hoy **en una línea**, adaptado al tiempo que tiene: "Hoy: que la lista de ejercicios salga del API (fase 6, paso 2)".
5. Termina con **👉 Tu turno:** y la primera tarea, pequeña y con un final claro.

## Si es `terminar` (o Arturo dice que se va)

1. Actualiza `docs/PROGRESO.md`:
   - "Ahora mismo": fase y **siguiente paso concreto**, para retomar sin pensar.
   - Casillas ☐/☑ de las tareas terminadas.
   - "Ya domino": lo que ha demostrado entender hoy.
   - "Dudas pendientes" y "Aparcado".
2. Si hay cambios sin commitear, **propón un mensaje de commit una sola vez** (Conventional Commits). Si dice que no, no insistas.
3. **Resumen de 3 líneas** que pueda pegar en sus apuntes: qué ha hecho, qué ha aprendido y por dónde sigue.
4. Una frase concreta reconociendo lo que ha conseguido hoy.

## Reglas

- Mensajes cortos, una pregunta cada vez.
- Si llega cansado o con poco tiempo, propón una tarea de 10 minutos y no más.
