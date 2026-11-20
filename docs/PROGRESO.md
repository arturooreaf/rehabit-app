# Progreso

## Ahora mismo

Fase: 2 y 3 — React y estilos: construir la pantalla de login con Tailwind
Siguiente paso: dar estilo a los inputs y al botón (Preflight los deja invisibles) y añadir `w-full` al `<form>`

## Fases

✅ 0 Entorno · ☐ 1 TypeScript · ◐ 2 React · ◐ 3 Estilos · ☐ 4 Formularios · ☐ 5 Rutas · ☐ 6 API · ☐ 7 Zustand · ☐ 8 Auth · ☐ 9 Errores e i18n · ☐ 10 Tests · ☐ 11 Build · ☐ 12 Tests pro · ☐ 13 Calidad · ☐ 14 TanStack Query

◐ = empezada. De la fase 2 ya está hecho el `LoginPage.tsx` con inputs controlados y `onSubmit`.

## Ya he visto (falta practicarlo sin ayuda)

- Componente = función que devuelve JSX; `export default` + `import`
- JSX: un solo padre, cerrar etiquetas, `className`, `htmlFor`, `{ }` para datos
- Formulario: `<form>`, `<label>`, `<input type="email|password">`, `<button type="submit">`
- Eventos: `onSubmit={handleSubmit}` (sin paréntesis) y `e.preventDefault()`
- `useState` e inputs controlados (`value` + `onChange`)
- La consola del navegador (Cmd + Option + J) y `console.log`
- `.env` del front: `VITE_API_URL`, público, nunca secretos
- Arranque: `index.html` (`#root`) → `main.tsx` (`createRoot`, `StrictMode`) → `App` → `LoginPage`
- Alias `@/` = `src/`: se configura en `tsconfig.app.json` (`paths`) **y** en `vite.config.ts` (`resolve.alias`)
- Prettier (formato) vs ESLint (errores) vs `tsc` (tipos); `eslint-config-prettier` al final del array (el último gana)
- Scripts de npm: nombre libre, comando exacto; los comandos viven en `node_modules/.bin/`
- `npm test` (una vez) vs `npm run test:watch` (vigila); `npm run verify` lo pasa todo
- Errores de ESLint: `línea:columna`, gravedad, mensaje y nombre de la regla; silencio = éxito (`echo $?` → 0)

- Login reescrito de cero: `export default` sin `()` (pasar la función, no ejecutarla); `onSubmit={handleSubmit}` sin `()`
- Evento de envío: `React.SubmitEvent<HTMLFormElement>` (`FormEvent` está tachado = _deprecated_)
- Historia de una tecla: `e` → `e.target` (el input) → `.value` → `setEmail` → `value={email}`; `value` sin `onChange` bloquea el campo
- Console (mensajes de `console.log`) vs Network (peticiones a servidores); nunca loguear contraseñas
- Tailwind: clases = atajos de CSS; una clase mal escrita no da error (mirar el navegador); Preflight borra los estilos del navegador
- Colocar cajas: `flex`, `flex-col`, `gap-4`, `items-center`, `justify-center`, `min-h-screen`; tarjeta: `max-w-sm p-8 rounded-xl bg-white shadow`

## Dudas pendientes

- (ninguna apuntada todavía)

## Aparcado (para más adelante)

- VS Code abierto en `clinica/`: el `.vscode/settings.json` de rehabit-app (format on save) solo funciona abriendo `code ~/Projects/clinica/rehabit-app`
- Quitar el `console.log(email)` de `handleSubmit` cuando se conecte con la API
- Primer test con Vitest: `canSubmitLogin(email, password)` en `src/features/auth/login-form.ts` + `login-form.test.ts` (casos normal, límite y raro) → cuando él quiera; ahora `npm test` usa `--passWithNoTests`
- `fetch` al `POST /auth/login` desde `LoginPage` → fases 6 y 8
- Capas profesionales: `shared/api/request.ts` (único `fetch`) → service → store → fases 6 a 8
- El backend (`clinica-api`) responde `{ "error": "..." }` y no tiene refresh token; la guía espera `{ "code", "message" }` + cookie `httpOnly` → decidir en la fase 6
- Concretar las entidades reales de Rehabit (pacientes, citas, ejercicios...) → primera sesión de la fase 2 o 3
- TOTP como paso intermedio del login → fase 8 (opcional)
- Renombrar `clinica-api` → `rehabit-api` → al final
- Quitar el `package-lock.json` vacío de `~/Projects/clinica/`
- `clinica-api/.env.example` tiene `RESEND_FROM==` (dos `=`)
