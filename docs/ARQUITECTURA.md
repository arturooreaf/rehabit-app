# Arquitectura de rehabit-app

> **Cómo usar este documento:** no lo leas de corrido. Mira el **resumen** y el **mapa**, y salta solo a la sección que necesites ahora. Cada sección empieza con una frase que la resume.

---

## Resumen en 5 puntos

1. **Qué es:** una SPA en **React + TypeScript** hecha con **Vite**. Todos los datos se piden a un **API REST**.
2. **Cómo se organiza:** tres zonas, y las dependencias van en **un solo sentido**: `app/ → features/ → shared/`.
3. **Dentro de cada feature:** `ui/` (pinta) → `model/` (estado) → `api/` (habla con el backend).
4. **Lo que viene de fuera se valida** con zod antes de usarlo: respuestas del API y variables de entorno.
5. **La calidad la vigilan las máquinas:** tests, linter, límites entre capas y _hooks_ de git. No depende de acordarse.

---

## Mapa

| #   | Sección                                                           | Para cuándo                               | Lectura |
| --- | ----------------------------------------------------------------- | ----------------------------------------- | ------- |
| 1   | [Stack](#1-stack)                                                 | Para saber qué herramientas hay           | 2 min   |
| 2   | [Carpetas](#2-carpetas)                                           | Para saber dónde va un archivo nuevo      | 3 min   |
| 3   | [Dirección de las dependencias](#3-dirección-de-las-dependencias) | Para saber qué puede importar qué         | 2 min   |
| 4   | [Capas de una feature](#4-capas-de-una-feature)                   | Para escribir una feature nueva           | 3 min   |
| 5   | [Viaje de una petición](#5-viaje-de-una-petición)                 | Para entender qué pasa al pulsar un botón | 3 min   |
| 6   | [Sesión y rutas](#6-sesión-y-rutas)                               | Para el login o una página nueva          | 4 min   |
| 7   | [Errores](#7-errores)                                             | Cuando algo falla                         | 2 min   |
| 8   | [Dónde vive cada dato](#8-dónde-vive-cada-dato)                   | Para saber dónde guardar un dato          | 2 min   |
| 9   | [Calidad](#9-calidad)                                             | Para tests, lint y CI                     | 3 min   |
| 10  | [Build y despliegue](#10-build-y-despliegue)                      | Para subirlo a algún sitio                | 2 min   |
| 11  | [Convenciones](#11-convenciones)                                  | Siempre                                   | 2 min   |
| 12  | [Plantillas de código](#12-plantillas-de-código)                  | Para copiar una base y adaptarla          | —       |
| 13  | [Configuración](#13-configuración)                                | Para montar el proyecto                   | —       |
| 14  | [Glosario backend → frontend](#14-glosario-backend--frontend)     | Para traducir conceptos del backend       | 1 min   |

---

## 1. Stack

**En una frase:** React para la interfaz, Vite para desarrollar y construir, Zustand para el estado y zod para validar.

| Pieza              | Herramienta                                                                | Para qué                                                             |
| ------------------ | -------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Interfaz           | **React 19** + **TypeScript 6** (`strict`)                                 | Componentes con tipos                                                |
| Desarrollo y build | **Vite 8** (+ React Compiler)                                              | Servidor con recarga en caliente y build optimizado                  |
| Rutas              | **react-router-dom 7**                                                     | Navegar sin recargar la página                                       |
| Estado             | **Zustand 5**                                                              | Un _store_ por feature                                               |
| Validación         | **zod 4**                                                                  | Comprobar en ejecución lo que llega de fuera                         |
| Estilos            | **Tailwind CSS 4**                                                         | Clases de utilidad                                                   |
| Componentes base   | **shadcn/ui** (sobre Radix)                                                | Botones, diálogos, tablas… accesibles y **copiados dentro del repo** |
| Iconos             | lucide-react                                                               |                                                                      |
| Textos             | i18next + react-i18next                                                    | Ningún texto escrito directamente en los componentes                 |
| Avisos             | sonner                                                                     | _Toasts_                                                             |
| Tests              | **Vitest**, Testing Library, MSW, Playwright                               | Unitarios, componentes, API simulada, E2E                            |
| Calidad            | ESLint, Prettier, eslint-plugin-boundaries, Husky, lint-staged, commitlint | Que el código no se degrade                                          |

---

## 2. Carpetas

**En una frase:** `app/` monta la aplicación, `features/` tiene una carpeta por cada parte del negocio y `shared/` guarda lo genérico.

```
index.html                 entrada (con Vite está en la raíz)
vite.config.ts             plugins, alias @ y Vitest
playwright.config.ts       E2E
e2e/                       tests E2E
docs/adr/                  decisiones de arquitectura (0001-xxx.md)
src/
├── main.tsx               llama a bootstrap() y monta <App />
├── index.css              Tailwind y variables de color
│
├── app/                   🧩 MONTA LA APP: lo único que conoce a todas las features
│   ├── App.tsx            providers (Tooltip, Toaster, ErrorBoundary) + router
│   ├── bootstrap.ts       conecta auth con el API y restaura la sesión
│   ├── router/
│   │   ├── routes.ts      tabla PAGES: todas las páginas en un sitio
│   │   └── router.tsx     crea el router a partir de la tabla
│   └── layouts/           AppLayout (con menú) y AuthLayout
│
├── features/              📦 UNA CARPETA POR PARTE DEL NEGOCIO
│   ├── auth/
│   │   ├── index.ts       API pública: lo único que otros pueden importar
│   │   ├── api/           auth.service.ts, auth.schemas.ts
│   │   ├── model/         auth.store.ts, auth-steps.ts (+ tests)
│   │   └── ui/            LoginPage.tsx, RequireStep.tsx
│   └── exercises/         (entidad de ejemplo)
│       ├── index.ts
│       ├── api/           exercises.service.ts, exercises.schemas.ts (+ tests)
│       ├── model/         exercises.store.ts, exercise-form.ts (+ tests)
│       └── ui/            ExercisesPage.tsx, ExerciseDialog.tsx
│
├── shared/                🧰 GENÉRICO: no conoce ninguna feature
│   ├── api/               request.ts, client.ts, errors.ts, auth-bridge.ts
│   ├── config/            env.ts
│   ├── components/        propios + ui/ (shadcn), ErrorBoundary, NotFoundPage
│   ├── lib/               funciones puras (+ tests)
│   ├── hooks/
│   └── i18n/              config.ts, locales/es/*.json
│
└── test/                  setup.ts, fetch-stub.ts, msw/
```

### ¿Dónde va mi archivo?

```
¿Es de una parte concreta del negocio (ejercicios, pacientes, citas…)?
├── Sí → features/<parte>/
│        ├── ¿Pinta algo?              → ui/
│        ├── ¿Guarda estado o lógica?  → model/
│        └── ¿Habla con el backend?    → api/
└── No → ¿Lo usan varias features?
         ├── Sí → shared/
         └── ¿Es para montar la app (rutas, layouts, arranque)? → app/
```

> 🌱 **Para empezar:** mientras una feature sea pequeña, los archivos pueden ir **sueltos** en `features/<x>/`, sin `api/`, `model/` ni `ui/`. Las subcarpetas se crean cuando la feature crece.

---

## 3. Dirección de las dependencias

**En una frase:** las flechas van solo hacia abajo: `app` usa `features`, `features` usa `shared`, y nunca al revés.

```
   app/
    │
    ▼
features/  ◄──┐  una feature puede usar otra, pero solo a través de su index.ts
    │    └────┘
    ▼
 shared/
```

| Desde         | ✅ Puede importar                | ❌ No puede importar                      |
| ------------- | -------------------------------- | ----------------------------------------- |
| `app/`        | todo                             | —                                         |
| `features/x/` | `shared/`, `features/y/index.ts` | `app/`, archivos internos de otra feature |
| `shared/`     | `shared/`                        | `app/`, `features/`                       |

**¿Por qué?** Si `shared` importa de `features`, aparecen dependencias circulares, cuesta testear y un cambio en una feature puede romper algo genérico. Con flechas en un solo sentido, cada pieza se entiende por separado.

**¿Quién lo vigila?** `eslint-plugin-boundaries`: un import prohibido **rompe el lint**.

**¿Y si `shared/api` necesita el token, que está en `features/auth`?** Se usa **inversión de dependencias**: `shared` declara una interfaz (`AuthBridge`) y `app/bootstrap.ts` la conecta al arrancar. Ver [12.4](#124-auth-bridge-y-cliente).

---

## 4. Capas de una feature

**En una frase:** el componente pinta, el store decide y el service habla con el backend.

```
ui/ExercisesPage.tsx  ──►  model/exercises.store.ts  ──►  api/exercises.service.ts  ──►  shared/api/client.ts  ──►  backend
     PINTA                   ESTADO + ERRORES               LLAMADA + VALIDACIÓN            TOKEN + 401
```

| Capa                      | Hace                                                       | ❌ No hace                 |
| ------------------------- | ---------------------------------------------------------- | -------------------------- |
| `ui/` (componentes)       | Lee del store, pinta y llama a acciones                    | `fetch`, lógica de negocio |
| `model/` (store y lógica) | Guarda estado, llama a services, enseña errores y _toasts_ | Pintar, `fetch` directo    |
| `model/*.ts` puros        | Validaciones y transformaciones (+ tests)                  | Usar React                 |
| `api/` (service)          | Llama a `api()` y **valida con zod** lo que vuelve         | Usar React, guardar estado |
| `api/*.schemas.ts`        | Esquemas zod → de ahí salen los tipos (`z.infer`)          | —                          |

✅ **Regla de oro:** si algo se puede testear sin navegador, va en un `.ts` puro, fuera del componente.

---

## 5. Viaje de una petición

**En una frase:** el clic llega al store, el store llama al service, el service llama a `api()`, que pone el token y reintenta si ha caducado.

```
👆 Clic en "Buscar"
 │
 ▼
ExercisesPage ── useExercisesStore().searchExercises("rodilla")
 │
 ▼
store: isSearching = true
 │
 ▼
service: api("/exercises?search=rodilla")
 │
 ▼
client.ts: añade "Authorization: Bearer <token>"
 │
 ▼
request.ts: fetch(...)  ──►  backend
 │
 ├── 200 ✅ → zod valida → el store guarda los resultados → React repinta
 │
 ├── 401 🔁 → renueva el token (cookie de refresh) → repite la petición UNA vez
 │
 └── otro error ❌ → ApiError { status, code } → el store llama a showError() → toast
```

**Formato de errores del backend** (siempre igual):

```json
{ "code": "invalid_credentials", "message": "Texto para los logs" }
```

El frontend **traduce el `code`**; no enseña el `message` a la persona usuaria.

---

## 6. Sesión y rutas

**En una frase:** la sesión es una máquina de estados (`step`) y cada página dice en qué estados se puede ver.

### 6.1 Tokens

| Token                          | Dónde vive                        | Por qué                                   |
| ------------------------------ | --------------------------------- | ----------------------------------------- |
| **Access token** (vida corta)  | **En memoria** (store de Zustand) | Si hubiera XSS, no está en `localStorage` |
| **Refresh token** (vida larga) | **Cookie `httpOnly`** del backend | El JavaScript no puede leerla             |

- **Al arrancar**, `restoreSession()` llama a `POST /auth/refresh`; la cookie va sola. Si hay sesión, no vuelve a pedir login.
- **Si llega un 401**, `renewAccessToken()` renueva el token. Si fallan 5 peticiones a la vez, **solo se hace una renovación** (`renewalInFlight`).

### 6.2 Máquina de estados

Versión mínima:

```
signed_out ──login──► signed_in
     ▲                    │
     └──────logout────────┘
```

Versión ampliada (cuando quieras practicar):

```
signed_out ─► verify_email ─► enroll_totp ─► signed_in
     │                                           ▲
     └──────────► enter_totp ────────────────────┘
```

El **backend** dice cuál es el siguiente paso en cada respuesta. El frontend solo lo aplica.

### 6.3 Tabla de páginas

Todas las páginas se declaran en **un solo sitio** (`app/router/routes.ts`):

```ts
{ path: "/exercises", titleKey: "exercises:title", component: ExercisesPage, steps: ["signed_in"], usesAppLayout: true }
```

`router.tsx` recorre la tabla y envuelve cada página en `<RequireStep>`, que:

- Mientras se restaura la sesión, no pinta nada.
- Si el `step` no está en `steps`, redirige a la página de ese paso.
- Si todo está bien, pinta la página.

Las páginas se cargan con `lazy()`: cada una se descarga solo cuando alguien la visita.

---

## 7. Errores

**En una frase:** todo error del API es un `ApiError`, `showError()` lo convierte en un texto traducido y el `ErrorBoundary` evita la pantalla en blanco.

| Tipo de fallo                       | Quién lo coge                                     | Qué ve la persona usuaria               |
| ----------------------------------- | ------------------------------------------------- | --------------------------------------- |
| El API responde con error           | `request.ts` → `ApiError` → store → `showError()` | _Toast_ con un texto traducido          |
| Sin conexión (`TypeError`)          | `showError()`                                     | "Sin conexión"                          |
| Sesión caducada (`unauthenticated`) | `client.ts` → `endSession()`                      | Vuelve al login                         |
| Datos con forma inesperada          | zod en el service                                 | _Toast_ genérico + error en consola     |
| Fallo al pintar                     | `ErrorBoundary`                                   | Pantalla "Algo ha ido mal" + Reintentar |
| Ruta que no existe                  | Ruta `*`                                          | Página 404                              |

**Orden en el que `showError` elige el mensaje:**

1. Lo que pide esa pantalla concreta (`overrides`, por ejemplo `invalid_credentials`).
2. Los códigos comunes (`unauthenticated`…).
3. El status HTTP (403, 429).
4. Un mensaje genérico.

---

## 8. Dónde vive cada dato

**En una frase:** cada dato tiene un sitio, según quién lo necesita y cuánto tiene que durar.

| Dato                                 | Dónde                                    | Ejemplo                                           |
| ------------------------------------ | ---------------------------------------- | ------------------------------------------------- |
| Estado de un solo componente         | `useState`                               | Si un diálogo está abierto o el texto de un input |
| Datos que comparten varias pantallas | Store de Zustand de la feature           | Resultados de búsqueda                            |
| Sesión                               | `useAuthStore` (memoria)                 | `step`, `user`, `accessToken`                     |
| Preferencias de la persona usuaria   | `localStorage` (siempre con `try/catch`) | Tema claro u oscuro                               |
| Datos del negocio                    | **El backend**                           | Todo lo demás                                     |
| Lo que hay en la URL                 | Parámetros de la ruta                    | `/exercises/:exerciseId`                          |

❌ **Nunca** guardes el access token en `localStorage`.

---

## 9. Calidad

**En una frase:** muchas pruebas pequeñas y rápidas, unas cuantas de integración y pocas E2E, y que lo revise todo una máquina antes de cada commit.

### 9.1 Pirámide de tests

```
        ▲  E2E (Playwright)              pocos: login, crear un ejercicio
       ▲▲▲  Componentes (Testing Library + MSW)    bastantes
     ▲▲▲▲▲▲▲  Unitarios (Vitest)          muchos: lógica pura, services, stores
```

| Qué              | Cómo                           | Ejemplo                                                   |
| ---------------- | ------------------------------ | --------------------------------------------------------- |
| Funciones puras  | Vitest                         | `exercise-form.test.ts`                                   |
| Services         | Vitest + `stubFetch` o MSW     | Comprobar URL, método y body; que zod rechaza datos malos |
| Stores           | Vitest + `vi.mock` del service | "Una búsqueda antigua no pisa a la nueva"                 |
| Componentes      | Testing Library + MSW          | Contraseña mal → aparece el error                         |
| Flujos completos | Playwright                     | Login → crear ejercicio → aparece en la lista             |

Cobertura mínima: **80 %** en `features/` y `shared/lib/`.

### 9.2 Automático

| Cuándo                                | Qué se ejecuta                                              |
| ------------------------------------- | ----------------------------------------------------------- |
| Al guardar (editor)                   | Prettier                                                    |
| Al hacer commit (`pre-commit`)        | lint-staged: Prettier + ESLint sobre lo que va en el commit |
| Al escribir el mensaje (`commit-msg`) | commitlint (Conventional Commits)                           |
| En cada push (CI)                     | `npm audit` → `npm run verify` → `npm run build` → E2E      |

### 9.3 Decisiones escritas (ADR)

Cada decisión importante se apunta en `docs/adr/NNNN-titulo.md` con 4 apartados:
**Contexto · Decisión · Alternativas · Consecuencias.**

Primeros ADR recomendados:

- `0001-zustand-para-el-estado.md`
- `0002-tokens-en-memoria-y-cookie.md`
- `0003-limites-entre-capas.md`

---

## 10. Build y despliegue

**En una frase:** `vite build` genera ficheros estáticos en `dist/` y nginx los sirve dentro de un contenedor Docker.

```
npm run build  →  dist/ (minificado, nombres con hash)  →  Docker (nginx)  →  navegador
```

- Las variables `VITE_*` se **meten en el JS al hacer el build**. Para cambiar la URL del API hay que volver a hacer el build.
- **Nunca** pongas secretos en `VITE_*`: cualquiera puede leerlos en el navegador.
- nginx en **modo SPA**: cualquier ruta devuelve `index.html`, así recargar en `/exercises/42` no da 404.
- Caché: `index.html` **sin caché** y los assets con **1 año** (llevan un hash en el nombre).
- Cabeceras de seguridad: HSTS, `X-Frame-Options: DENY`, `nosniff`, CSP y `Referrer-Policy`.

Plantillas en [12.11](#1211-dockerfile-y-nginx).

---

## 11. Convenciones

**En una frase:** código claro antes que listo.

- ✅ **Código imperativo y legible:** bucles `for` con variables con nombre, mejor que cadenas `.map().filter().reduce()`. Más líneas está bien si se lee mejor.
- ✅ **Nombres que dicen qué es:** `latestSearchId`, `isRestoring`, `renewedToken`. Sin abreviaturas.
- ✅ **Tipos sencillos.** Nada de `any`: lo que viene de fuera es `unknown` y se valida con zod.
- ✅ **Sufijos de archivo:** `.service.ts`, `.schemas.ts`, `.store.ts`, `Page.tsx`, `-form.ts`, y `.test.ts` al lado del archivo que prueba.
- ✅ Componentes en `PascalCase.tsx` y el resto en `kebab-case.ts`.
- ✅ Imports con el alias `@/` (= `src/`).
- ✅ Todos los textos visibles en `locales/es/*.json`.
- ✅ **Accesibilidad:** `button` para acciones, `Link` para navegar, cada input con su `label`, y todo usable con teclado.
- ✅ **Commits:** `feat(auth): login con email y contraseña`, `fix(exercises): ...`.
- ✅ **Ramas cortas** (`feat/...`, `fix/...`) y un PR por cambio.
- ✅ `npm run verify` en verde antes de cada commit.

---

## 12. Plantillas de código

Son bases para **entender y adaptar**, no para copiar sin leer. Están en orden: de la capa más baja a la más alta.

### 12.1 Variables de entorno

```ts
// src/shared/config/env.ts
import { z } from "zod";

const EnvSchema = z.object({
  VITE_API_URL: z.string().default("/api"),
});

export const env = EnvSchema.parse(import.meta.env);
```

```ts
// src/vite-env.d.ts
/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}
```

### 12.2 Error del API

```ts
// src/shared/api/errors.ts
export interface ApiErrorBody {
  code: string;
  message: string;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;

  constructor(status: number, body: ApiErrorBody) {
    super(body.message);
    this.name = "ApiError";
    this.status = status;
    this.code = body.code;
  }
}
```

### 12.3 `request`, el `fetch` de bajo nivel

```ts
// src/shared/api/request.ts
import { env } from "@/shared/config/env";
import { ApiError } from "./errors";
import type { ApiErrorBody } from "./errors";

export function withBearer(init: RequestInit, token: string | null): RequestInit {
  if (!token) {
    return init;
  }
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);
  return { ...init, headers };
}

function isApiErrorBody(body: unknown): body is ApiErrorBody {
  return (
    typeof body === "object" && body !== null && "code" in body && typeof body.code === "string"
  );
}

export async function request(path: string, init: RequestInit = {}): Promise<unknown> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const response = await fetch(`${env.VITE_API_URL}${path}`, {
    ...init,
    headers,
    credentials: "include", // envía la cookie del refresh token
  });
  const body: unknown = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    if (isApiErrorBody(body)) {
      throw new ApiError(response.status, body);
    }
    throw new ApiError(response.status, { code: "unknown", message: response.statusText });
  }
  return body;
}
```

### 12.4 Auth bridge y cliente

```ts
// src/shared/api/auth-bridge.ts
export interface AuthBridge {
  getAccessToken: () => string | null;
  renewAccessToken: () => Promise<string | null>;
  endSession: () => void;
}

let connectedAuth: AuthBridge = {
  getAccessToken: () => null,
  renewAccessToken: async () => null,
  endSession: () => {},
};

export function connectAuth(auth: AuthBridge): void {
  connectedAuth = auth;
}

export function currentAuth(): AuthBridge {
  return connectedAuth;
}
```

```ts
// src/shared/api/client.ts — lo que usan TODOS los services
import { currentAuth } from "./auth-bridge";
import { ApiError } from "./errors";
import { request, withBearer } from "./request";

export async function api(path: string, init: RequestInit = {}): Promise<unknown> {
  const auth = currentAuth();
  try {
    return await request(path, withBearer(init, auth.getAccessToken()));
  } catch (error) {
    if (!(error instanceof ApiError)) {
      throw error;
    }
    if (error.status === 401) {
      const renewedToken = await auth.renewAccessToken();
      if (renewedToken) {
        return request(path, withBearer(init, renewedToken));
      }
    }
    if (error.code === "unauthenticated") {
      auth.endSession();
    }
    throw error;
  }
}
```

### 12.5 Esquemas y service

```ts
// src/features/exercises/api/exercises.schemas.ts
import { z } from "zod";

export const ExerciseSchema = z.object({
  id: z.string(),
  name: z.string(),
  bodyArea: z.string(),
  status: z.enum(["active", "archived"]),
});
export type Exercise = z.infer<typeof ExerciseSchema>;

export const ExercisePageSchema = z.object({ items: z.array(ExerciseSchema) });

export interface NewExercise {
  name: string;
  bodyArea: string;
}
```

```ts
// src/features/exercises/api/exercises.service.ts
import { api } from "@/shared/api/client";
import { ExercisePageSchema, ExerciseSchema } from "./exercises.schemas";
import type { Exercise, NewExercise } from "./exercises.schemas";

export async function searchExercises(searchText: string): Promise<Exercise[]> {
  const query = new URLSearchParams({ search: searchText });
  const body = await api(`/exercises?${query}`);
  return ExercisePageSchema.parse(body).items;
}

export async function createExercise(exercise: NewExercise): Promise<Exercise> {
  const body = await api("/exercises", { method: "POST", body: JSON.stringify(exercise) });
  return ExerciseSchema.parse(body);
}
```

### 12.6 Store

```ts
// src/features/exercises/model/exercises.store.ts
import { create } from "zustand";
import { showError } from "@/shared/lib/show-error";
import * as exercisesService from "../api/exercises.service";
import type { Exercise, NewExercise } from "../api/exercises.schemas";

interface ExercisesState {
  searchResults: Exercise[];
  isSearching: boolean;
  searchExercises: (searchText: string) => Promise<void>;
  createExercise: (exercise: NewExercise) => Promise<Exercise | null>;
}

// Si se lanzan dos búsquedas seguidas, solo cuenta la última.
let latestSearchId = 0;

export const useExercisesStore = create<ExercisesState>()((set) => ({
  searchResults: [],
  isSearching: false,

  searchExercises: async (searchText) => {
    latestSearchId += 1;
    const searchId = latestSearchId;
    set({ isSearching: true });
    try {
      const exercises = await exercisesService.searchExercises(searchText);
      if (searchId === latestSearchId) {
        set({ searchResults: exercises, isSearching: false });
      }
    } catch (error) {
      if (searchId === latestSearchId) {
        set({ searchResults: [], isSearching: false });
        showError(error, "exercises:errors.search");
      }
    }
  },

  createExercise: async (exercise) => {
    try {
      return await exercisesService.createExercise(exercise);
    } catch (error) {
      showError(error, "exercises:errors.create", {
        invalid_input: "exercises:errors.invalidInput",
      });
      return null;
    }
  },
}));
```

```ts
// src/features/exercises/index.ts — API pública
export { useExercisesStore } from "./model/exercises.store";
export type { Exercise } from "./api/exercises.schemas";
// Las páginas NO se exportan aquí: el router las carga con lazy() importándolas directamente.
```

### 12.7 Auth: service y store

```ts
// src/features/auth/api/auth.service.ts
// Usa request() y no api(): si refresh usara api(), un 401 intentaría renovar otra vez → bucle.
import { z } from "zod";
import { request, withBearer } from "@/shared/api/request";

const TokenSchema = z.object({ accessToken: z.string() });
export const CurrentUserSchema = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string(),
});
export type CurrentUser = z.infer<typeof CurrentUserSchema>;

export async function login(email: string, password: string): Promise<string> {
  const body = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return TokenSchema.parse(body).accessToken;
}

export async function refresh(): Promise<string> {
  const body = await request("/auth/refresh", { method: "POST" });
  return TokenSchema.parse(body).accessToken;
}

export async function fetchCurrentUser(accessToken: string): Promise<CurrentUser> {
  const body = await request("/auth/me", withBearer({}, accessToken));
  return CurrentUserSchema.parse(body);
}

export async function logout(): Promise<void> {
  await request("/auth/logout", { method: "POST" });
}
```

```ts
// src/features/auth/model/auth.store.ts
import { create } from "zustand";
import { showError } from "@/shared/lib/show-error";
import * as authService from "../api/auth.service";
import type { CurrentUser } from "../api/auth.service";

export type SessionStep = "signed_out" | "signed_in";

interface AuthState {
  step: SessionStep;
  isRestoring: boolean;
  user: CurrentUser | null;
  accessToken: string | null;
  restoreSession: () => Promise<void>;
  renewAccessToken: () => Promise<string | null>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  clearSession: () => void;
}

const SIGNED_OUT = { step: "signed_out" as SessionStep, user: null, accessToken: null };

// Una sola renovación a la vez aunque fallen varias peticiones juntas.
let renewalInFlight: Promise<string | null> | null = null;

export const useAuthStore = create<AuthState>()((set) => {
  async function startSession(accessToken: string): Promise<void> {
    const user = await authService.fetchCurrentUser(accessToken);
    set({ step: "signed_in", user, accessToken });
  }

  return {
    ...SIGNED_OUT,
    isRestoring: true,

    restoreSession: async () => {
      try {
        await startSession(await authService.refresh());
      } catch {
        set(SIGNED_OUT);
      } finally {
        set({ isRestoring: false });
      }
    },

    renewAccessToken: () => {
      if (renewalInFlight) {
        return renewalInFlight;
      }
      renewalInFlight = authService
        .refresh()
        .then((accessToken) => {
          set({ accessToken });
          return accessToken;
        })
        .catch(() => {
          set(SIGNED_OUT);
          return null;
        })
        .finally(() => {
          renewalInFlight = null;
        });
      return renewalInFlight;
    },

    login: async (email, password) => {
      try {
        await startSession(await authService.login(email.trim(), password));
        return true;
      } catch (error) {
        showError(error, "auth:errors.login", {
          invalid_credentials: "auth:errors.invalidCredentials",
        });
        return false;
      }
    },

    logout: async () => {
      try {
        await authService.logout();
      } finally {
        set(SIGNED_OUT);
      }
    },

    clearSession: () => set(SIGNED_OUT),
  };
});
```

```ts
// src/features/auth/model/auth-steps.ts
import type { SessionStep } from "./auth.store";

export function pathForStep(step: SessionStep): string {
  const pathsByStep: Record<SessionStep, string> = {
    signed_out: "/login",
    signed_in: "/",
  };
  return pathsByStep[step];
}
```

### 12.8 Arranque, rutas y guardia

```ts
// src/app/bootstrap.ts
import { connectAuth } from "@/shared/api/auth-bridge";
import { useAuthStore } from "@/features/auth";

export function bootstrap(): void {
  connectAuth({
    getAccessToken: () => useAuthStore.getState().accessToken,
    renewAccessToken: () => useAuthStore.getState().renewAccessToken(),
    endSession: () => useAuthStore.getState().clearSession(),
  });
  void useAuthStore.getState().restoreSession();
}
```

```tsx
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/app/App";
import { bootstrap } from "@/app/bootstrap";
import "./index.css";

bootstrap();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

```ts
// src/app/router/routes.ts
import { lazy } from "react";
import type { ComponentType } from "react";
import type { SessionStep } from "@/features/auth";

export interface Page {
  path: string;
  titleKey: string;
  component: ComponentType;
  steps: SessionStep[];
  usesAppLayout: boolean;
}

export const PAGES: Page[] = [
  {
    path: "/login",
    titleKey: "auth:login.title",
    component: lazy(() => import("@/features/auth/ui/LoginPage")),
    steps: ["signed_out"],
    usesAppLayout: false,
  },
  {
    path: "/",
    titleKey: "exercises:title",
    component: lazy(() => import("@/features/exercises/ui/ExercisesPage")),
    steps: ["signed_in"],
    usesAppLayout: true,
  },
];
```

(Con `lazy()`, cada página se exporta con `export default`. Importar una página interna de una feature desde `app/router/` es la **única excepción** permitida a la regla del `index.ts`; configúrala así en el linter.)

```tsx
// src/app/router/router.tsx
import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RequireStep } from "@/features/auth";
import { NotFoundPage } from "@/shared/components/NotFoundPage";
import { AppLayout } from "../layouts/AppLayout";
import { PAGES } from "./routes";

const routeObjects = [];
for (const page of PAGES) {
  const PageComponent = page.component;
  let content = <PageComponent />;
  if (page.usesAppLayout) {
    content = <AppLayout>{content}</AppLayout>;
  }
  routeObjects.push({
    path: page.path,
    element: (
      <RequireStep steps={page.steps}>
        <Suspense fallback={null}>{content}</Suspense>
      </RequireStep>
    ),
  });
}
routeObjects.push({ path: "*", element: <NotFoundPage /> });

export const router = createBrowserRouter(routeObjects);
```

```tsx
// src/app/App.tsx
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/shared/components/ui/sonner";
import { ErrorBoundary } from "@/shared/components/ErrorBoundary";
import { router } from "./router/router";
import "@/shared/i18n";

export function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </ErrorBoundary>
  );
}
```

```tsx
// src/features/auth/ui/RequireStep.tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../model/auth.store";
import type { SessionStep } from "../model/auth.store";
import { pathForStep } from "../model/auth-steps";

export function RequireStep({ steps, children }: { steps: SessionStep[]; children: ReactNode }) {
  const step = useAuthStore((state) => state.step);
  const isRestoring = useAuthStore((state) => state.isRestoring);
  if (isRestoring) {
    return null; // todavía no sabemos si hay sesión
  }
  if (!steps.includes(step)) {
    return <Navigate to={pathForStep(step)} replace />;
  }
  return <>{children}</>;
}
```

```ts
// src/features/auth/index.ts
export { useAuthStore } from "./model/auth.store";
export type { SessionStep } from "./model/auth.store";
export { RequireStep } from "./ui/RequireStep";
```

### 12.9 Errores en pantalla

```ts
// src/shared/lib/show-error.ts
import { toast } from "sonner";
import i18n from "@/shared/i18n";
import { ApiError } from "@/shared/api/errors";

export function errorMessageKey(
  error: unknown,
  fallbackKey: string,
  overrides: Record<string, string> = {},
): string {
  if (!(error instanceof ApiError)) {
    return error instanceof TypeError ? "shared:errors.offline" : fallbackKey;
  }
  const sharedKeysByCode: Record<string, string> = {
    unauthenticated: "shared:errors.sessionEnded",
  };
  const sharedKeysByStatus: Record<number, string> = {
    403: "shared:errors.forbidden",
    429: "shared:errors.tooManyAttempts",
  };
  return (
    overrides[error.code] ??
    sharedKeysByCode[error.code] ??
    sharedKeysByStatus[error.status] ??
    fallbackKey
  );
}

export function showError(
  error: unknown,
  fallbackKey: string,
  overrides?: Record<string, string>,
): void {
  toast.error(i18n.t(errorMessageKey(error, fallbackKey, overrides)));
}
```

`ErrorBoundary`: tiene que ser un **componente de clase** (`componentDidCatch` / `getDerivedStateFromError`), porque React no tiene un hook para esto. Pinta "Algo ha ido mal" y un botón de reintentar.

### 12.10 Tests

```ts
// src/test/fetch-stub.ts — para los primeros tests de services (antes de MSW)
import { vi } from "vitest";

export interface RecordedRequest {
  url: string;
  method: string;
  headers: Headers;
  body: unknown;
}

export function stubFetch(responses: Array<{ status: number; body?: unknown }>): RecordedRequest[] {
  const recorded: RecordedRequest[] = [];
  const fakeFetch = async (url: string, init: RequestInit = {}) => {
    recorded.push({
      url,
      method: init.method ?? "GET",
      headers: new Headers(init.headers),
      body: init.body ? JSON.parse(String(init.body)) : undefined,
    });
    const next = responses.shift() ?? { status: 200, body: {} };
    return new Response(next.status === 204 ? null : JSON.stringify(next.body ?? {}), {
      status: next.status,
    });
  };
  vi.stubGlobal("fetch", fakeFetch);
  return recorded;
}
```

```ts
// src/features/exercises/model/exercises.store.test.ts
import { expect, test, vi } from "vitest";
import { searchExercises } from "../api/exercises.service";
import type { Exercise } from "../api/exercises.schemas";
import { useExercisesStore } from "./exercises.store";

vi.mock("../api/exercises.service");
vi.mock("sonner", () => ({ toast: { error: vi.fn(), success: vi.fn() } }));

test("una búsqueda antigua que responde la última no pisa a la nueva", async () => {
  const resolvers: Array<(exercises: Exercise[]) => void> = [];
  vi.mocked(searchExercises).mockImplementation(
    () => new Promise((resolve) => resolvers.push(resolve)),
  );

  const older = useExercisesStore.getState().searchExercises("ro");
  const newer = useExercisesStore.getState().searchExercises("rodilla");
  resolvers[1]!([{ id: "nuevo", name: "Sentadilla", bodyArea: "rodilla", status: "active" }]);
  await newer;
  resolvers[0]!([{ id: "viejo", name: "Remo", bodyArea: "espalda", status: "active" }]);
  await older;

  expect(useExercisesStore.getState().searchResults[0]?.id).toBe("nuevo");
});
```

**MSW** (cuando toque): los _handlers_ van en `src/test/msw/handlers.ts`, uno por endpoint. En `src/test/setup.ts` se arranca el servidor antes de los tests, se resetean los _handlers_ después de cada test y se cierra al final. Mira la documentación oficial de MSW de tu versión, porque su API cambia entre versiones mayores.

### 12.11 Dockerfile y nginx

```dockerfile
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

```nginx
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html;
  server_tokens off;

  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "DENY" always;
  add_header Content-Security-Policy "frame-ancestors 'none'; base-uri 'self'; object-src 'none'" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;

  location = /index.html { add_header Cache-Control "no-store"; }
  location ~* \.(?:js|css|svg|png|jpe?g|webp|woff2?)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    try_files $uri =404;
  }
  location / { try_files $uri /index.html; }   # SPA
}
```

`.dockerignore`: `node_modules`, `dist`, `.env`.

---

## 13. Configuración

### 13.1 Dependencias

```bash
# básicas (fases 0 a 11)
npm install react-router-dom zustand zod i18next react-i18next sonner date-fns
npm install tailwindcss @tailwindcss/vite
npm install -D vitest prettier eslint-config-prettier

# calidad (fases 12 y 13), cuando toque
npm install -D @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom msw
npm install -D @playwright/test @vitest/coverage-v8
npm install -D eslint-plugin-boundaries husky lint-staged @commitlint/cli @commitlint/config-conventional
```

### 13.2 `vite.config.ts`

```ts
/// <reference types="vitest/config" />
import path from "node:path";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "./src") },
  },
  server: {
    // opcional: así no hay problemas de CORS ni de cookies en local
    proxy: { "/api": "http://localhost:3000" },
  },
  test: {
    environment: "node",
  },
});
```

### 13.3 TypeScript

En **`tsconfig.json` y `tsconfig.app.json`**:

```json
"compilerOptions": {
  "baseUrl": ".",
  "paths": { "@/*": ["./src/*"] }
}
```

En `tsconfig.app.json`, además: `"strict": true` y `"noUncheckedIndexedAccess": true`.

### 13.4 Scripts de `package.json`

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "typecheck": "tsc -b",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage",
  "e2e": "playwright test",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "verify": "npm run format:check && npm run lint && npm run typecheck && npm test",
  "prepare": "husky"
}
```

### 13.5 Prettier

`.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always"
}
```

Añade `eslint-config-prettier` al final de `eslint.config.js`.

### 13.6 Otras piezas

- **CSS:** la primera línea de `src/index.css` es `@import "tailwindcss";`.
- **shadcn:** `npx shadcn@latest init` y después `npx shadcn@latest add button input table dialog sonner`. En `components.json`, apunta los alias a `@/shared/components`, `@/shared/components/ui`, `@/shared/lib` y `@/shared/hooks`.
- **`.env`:** `VITE_API_URL=/api` (con el proxy) o `http://localhost:3000`. Sube `.env.example` y nunca `.env`.
- **ESLint con tipos:** `tseslint.configs.strictTypeChecked` con `parserOptions.projectService: true`.
- **Límites:** en `eslint-plugin-boundaries`, define los elementos `app`, `feature` (`src/features/*`) y `shared`, y aplica la tabla de la [sección 3](#3-dirección-de-las-dependencias).
- **Accesibilidad:** `eslint-plugin-jsx-a11y` (a finales de 2026) todavía no declara compatibilidad con ESLint 10. Compruébalo antes de instalarlo.
- **Cobertura:** `coverage: { provider: "v8", include: ["src/features/**", "src/shared/lib/**"], thresholds: { lines: 80 } }`.
- **Playwright:** `webServer: { command: "npm run dev", url: "http://localhost:5173" }`, y los tests en `e2e/`.

---

## 14. Glosario backend → frontend

| Backend                                      | Frontend (aquí)                                         |
| -------------------------------------------- | ------------------------------------------------------- |
| Repository / cliente HTTP                    | `api/*.service.ts`                                      |
| Validar DTOs                                 | `api/*.schemas.ts` (zod)                                |
| Capa de servicio o aplicación                | `model/*.store.ts` (Zustand)                            |
| Controlador + vista                          | `ui/*Page.tsx`                                          |
| Tabla de rutas                               | `PAGES` en `app/router/routes.ts`                       |
| Middleware de autenticación                  | `RequireStep` + `api()`                                 |
| Filtro global de errores                     | el `catch` de `api()` + `showError()` + `ErrorBoundary` |
| Inyección de dependencias                    | `auth-bridge` + `app/bootstrap.ts`                      |
| Módulo con API pública                       | `features/x/index.ts` + `eslint-plugin-boundaries`      |
| Configuración por entorno                    | `VITE_*`, que se meten en el **build**                  |
| Sesión en el servidor                        | `useAuthStore` en memoria + cookie de refresh           |
| Tests con mocks                              | Vitest + `vi.mock` / `stubFetch`                        |
| Tests de integración con base de datos falsa | MSW (API falsa en la red)                               |
| Ficheros de mensajes                         | `locales/es/*.json`                                     |
