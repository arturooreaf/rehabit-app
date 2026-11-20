# Progreso

## Ahora mismo

Fase: 0 — Preparar el entorno
Siguiente paso: explicar qué pasa desde que abro `localhost:5173` hasta que veo la página (SPA, `index.html`, Vite)

## Fases

☐ 0 Entorno · ☐ 1 TypeScript · ◐ 2 React · ☐ 3 Estilos · ☐ 4 Formularios · ☐ 5 Rutas · ☐ 6 API · ☐ 7 Zustand · ☐ 8 Auth · ☐ 9 Errores e i18n · ☐ 10 Tests · ☐ 11 Build · ☐ 12 Tests pro · ☐ 13 Calidad · ☐ 14 TanStack Query

◐ = empezada. De la fase 2 ya está hecho el `LoginPage.tsx` con inputs controlados y `onSubmit`.

## Ya he visto (falta practicarlo sin ayuda)

- Componente = función que devuelve JSX; `export default` + `import`
- JSX: un solo padre, cerrar etiquetas, `className`, `htmlFor`, `{ }` para datos
- Formulario: `<form>`, `<label>`, `<input type="email|password">`, `<button type="submit">`
- Eventos: `onSubmit={handleSubmit}` (sin paréntesis) y `e.preventDefault()`
- `useState` e inputs controlados (`value` + `onChange`)
- La consola del navegador (Cmd + Option + J) y `console.log`
- `.env` del front: `VITE_API_URL`, público, nunca secretos

## Dudas pendientes

- (ninguna apuntada todavía)

## Aparcado (para más adelante)

- `fetch` al `POST /auth/login` desde `LoginPage` (se empezó: `async` en `handleSubmit`, sin commit) → fases 6 y 8
- Capas profesionales: `shared/api/request.ts` (único `fetch`) → service → store → fases 6 a 8
- El backend (`clinica-api`) responde `{ "error": "..." }` y no tiene refresh token; la guía espera `{ "code", "message" }` + cookie `httpOnly` → decidir en la fase 6
- Concretar las entidades reales de Rehabit (pacientes, citas, ejercicios...) → primera sesión de la fase 2 o 3
- TOTP como paso intermedio del login → fase 8 (opcional)
- Subir `rehabit-app` a GitHub (`git push`) → cuando se quiera
- Renombrar `clinica-api` → `rehabit-api` → al final
- Quitar el `package-lock.json` vacío de `~/Projects/clinica/`
- `clinica-api/.env.example` tiene `RESEND_FROM==` (dos `=`)
