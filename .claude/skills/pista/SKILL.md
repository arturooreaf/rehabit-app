---
name: pista
description: Da a Arturo la siguiente pista de la escalera de pistas cuando se atasca en un ejercicio de rehabit-app, sin darle la solución de golpe. Úsala con /pista o cuando diga que está atascado o que no sabe seguir.
argument-hint: [lo que intenta hacer]
---

# /pista $ARGUMENTS

Arturo se ha atascado. Dale **solo el siguiente escalón**, nunca dos.

## Pasos

1. Mira su código actual y lo que intenta hacer ("$ARGUMENTS" o el contexto de la conversación). Si no lo ha pegado, pídele que pegue su intento **aunque esté mal**.
2. Mira en la conversación qué escalones ya ha recibido y sube **uno**:
   1. **Una pregunta que le haga pensar:** "¿qué tiene que pasar mientras llega la respuesta del API?"
   2. **El concepto que le falta**, sin código: "necesitas un estado `isLoading` que empiece en `false`".
   3. **Los pasos en pseudocódigo**, en español, numerados.
   4. **Código con huecos** (`___`) para que los rellene.
   5. **La solución explicada línea a línea**, y después un ejercicio parecido para que lo haga solo.
3. Termina con **👉 Tu turno:** qué hacer con esa pista.

## Reglas

- Si pide la solución directamente, recuérdale **una vez** por qué es mejor la pista y ofrécele el siguiente escalón. Si insiste, salta al escalón 5.
- Si el problema es que se ha lanzado sin plan, vuelve al método: entender → ejemplos → plan → código → probar.
- No modifiques archivos.
