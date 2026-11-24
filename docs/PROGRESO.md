# Progreso

## Ahora mismo

Fase: 2, 3 y 6 — login con estilo y conectado al backend
Siguiente paso: paso 1 del plan del login profesional (instalar react-router y rutas `/login` y `/register`)

## Plan del login profesional

1. ☐ Instalar react-router y montar las rutas `/login` y `/register`
2. ☑ `AuthLayout`: marco común con panel de marca a la izquierda y formulario a la derecha (en móvil, solo el formulario)
3. ☐ Enlaces entre login y registro con `<Link>`
4. ☐ `RegisterPage` (nombre, email, contraseña → `POST /auth/register`), hecha por él: service → store → página
5. ☐ Login correcto → `/agenda` (página vacía de momento) y proteger `/agenda`
6. ☐ Agenda nivel 1: citas del día, cambiar de día, estado vacío y cargando

## Fases

✅ 0 Entorno · ☐ 1 TypeScript · ◐ 2 React · ◐ 3 Estilos · ☐ 4 Formularios · ☐ 5 Rutas · ◐ 6 API · ☐ 7 Zustand · ☐ 8 Auth · ☐ 9 Errores e i18n · ☐ 10 Tests · ☐ 11 Build · ☐ 12 Tests pro · ☐ 13 Calidad · ☐ 14 TanStack Query

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

- Estilos de inputs y botón: `border rounded-lg px-3 py-2`; `p` = padding, `px` horizontal, `py` vertical, número × 4 = px; `hover:` para el ratón encima
- Puertos: front 5173, back 3000, Postgres 5433; `VITE_API_URL` (front) y `CORS_ORIGIN` (back); reiniciar `npm run dev` al cambiar un `.env`
- CORS: preflight `OPTIONS`, cabecera `Access-Control-Allow-Origin`; lo decide el back y lo aplica el navegador
- `src/shared/config/env.ts` con zod: Vite lee el `.env`, zod lo revisa
- `auth.service.ts`: `fetch` POST con `method`, `headers` (`Content-Type: application/json`) y `body` (`JSON.stringify`); `response.json()`
- `async`/`await`; `fetch` no falla con 401: comprobar `response.ok` y lanzar un error
- `try/catch` en `handleSubmit`; pizarra `errorMessage` y `{errorMessage && <p>...</p>}`; `set...` vuelve a pintar (re-render)
- El patrón del proyecto real: `Page.tsx` → `.store.ts` → `.service.ts` → `shared/api/request.ts` (único `fetch`)

## Dudas pendientes

- `useState` por dentro: qué devuelve y por qué los corchetes `[valor, setValor]` (repasar con calma)

## Aparcado (para más adelante)

- ⭐ Login con Google (OAuth): proyecto en Google Cloud + el back habla con Google y crea o enlaza al usuario + botón en el front → cuando el login normal funcione de principio a fin
- Inspiración de diseño (KPR, Camille Mormal, Dustin Brett): coger ideas (tipografía grande, animación de entrada suave); para el login, mirar shadcn Blocks y los logins de Linear, Vercel o Stripe
- anime.js para micro-animaciones (entrada del formulario, error, check al guardar) → cuando `tw-animate-css` se quede corto
- Mastra (framework de agentes de IA en TypeScript) para la sugerencia de códigos CIE-10 → al final del proyecto
- clinica-api: `emails` no debería ser un módulo con ruta pública (hoy `/emails` es un relay abierto); el envío de emails pasa a `common/` como servicio interno que usan otros módulos
- Mejoras del backend que afectan al front (hacer justo antes de necesitarlas): errores `{ code, message }` en vez de `{ error }`; refresh token en cookie `httpOnly`; citas aisladas por dueño (ejercicio 2) antes de la Agenda; 400 que hoy responden 500
- ¿Un ORM (Prisma o Drizzle) en clinica-api? Ahora usa SQL a mano con `pg` → cuando se quiera
- VS Code abierto en `clinica/`: el `.vscode/settings.json` de rehabit-app (format on save) solo funciona abriendo `code ~/Projects/clinica/rehabit-app`
- Register: mismo patrón que el login, para hacerlo él solo → después de terminar el login
- Validar con zod la respuesta del login (`{ token, user }`) → fase 6
- Primer test con Vitest: `canSubmitLogin(email, password)` en `src/features/auth/login-form.ts` + `login-form.test.ts` (casos normal, límite y raro) → cuando él quiera; ahora `npm test` usa `--passWithNoTests`
- `fetch` al `POST /auth/login` desde `LoginPage` → fases 6 y 8
- Capas profesionales: `shared/api/request.ts` (único `fetch`) → service → store → fases 6 a 8
- El backend (`clinica-api`) responde `{ "error": "..." }` y no tiene refresh token; la guía espera `{ "code", "message" }` + cookie `httpOnly` → decidir en la fase 6
- Concretar las entidades reales de Rehabit (pacientes, citas, ejercicios...) → primera sesión de la fase 2 o 3
- TOTP como paso intermedio del login → fase 8 (opcional)
- Renombrar `clinica-api` → `rehabit-api` → al final
- Quitar el `package-lock.json` vacío de `~/Projects/clinica/`
- `clinica-api/.env.example` tiene `RESEND_FROM==` (dos `=`)
