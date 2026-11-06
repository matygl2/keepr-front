# Keepr — App

La app del celular de Keepr: guardá tus productos y no te pierdas ninguna garantía.

**Tecnología:** Expo SDK 58, Expo Router, Expo Go.

La app **necesita** que el backend esté corriendo: ahí se guardan las cuentas, los productos y las fotos de los documentos. El backend está en otro repositorio: https://github.com/matygl2/keepr-back. **Primero se levanta el backend** (ver su README) y después esta app.

---

## Requisitos

- **Node.js 20.19 o superior** (o 22.12+ / 24+). Se comprueba con `node --version`.
- **Expo Go** instalado en el celular.
- El celular y la PC en **la misma red Wi-Fi**.
- El **backend corriendo** en la PC.

Todos los comandos se corren **en la raíz de este repositorio** (donde está `package.json`).

---

## 1. Primera vez

**Antes de empezar:** tené el backend corriendo y anotá la línea **"Red local"** que imprime al arrancar (por ejemplo `http://192.168.1.12:3000`).

```bash
git clone https://github.com/matygl2/keepr-front
cd keepr-front
npm install
```

**Decirle a la app dónde está el backend.** Creá el archivo `.env.local` en la raíz de este repositorio, con una sola línea:

```
EXPO_PUBLIC_API_URL=http://192.168.1.12:3000
```

Reemplazá la IP por la de **tu PC en la red Wi-Fi** (la línea "Red local" del servidor). Cuidado: si la PC tiene varias redes (VPN, WSL, VirtualBox), el servidor imprime una línea por cada una. La correcta es la IPv4 del adaptador **Wi-Fi**; en Windows la ves con `ipconfig`.

Si usás el **emulador de Android** en vez de un celular real, la dirección es `http://10.0.2.2:3000`.

`.env.local` no se sube a Git: cada persona crea el suyo con la IP de su propia PC.

**Arrancar la app:**

```bash
npx expo start -c
```

Escaneá el QR con Expo Go. Después de crear o cambiar `.env.local` siempre hay que reiniciar Expo con `-c`, porque la variable se lee solo al iniciar.

---

## 2. Después de traer cambios (`git pull`)

Mirá qué archivos cambiaron y hacé lo que corresponda:

| Si cambió… | Hacé |
|---|---|
| `package.json` o `package-lock.json` | `npm install` → `npx expo start -c` |
| Tu `.env.local` (por ejemplo, cambió la IP de la PC) | `npx expo start -c` |

Si no sabés qué cambió, la rutina completa es segura:

```bash
npm install
npx expo start -c
```

**Ojo con el backend:** si el cambio de la app depende de campos o rutas nuevas de la API, traé también los cambios del repositorio del backend y seguí la sección "Después de traer cambios" de su README (migraciones y reinicio del servidor). Si no, la app puede fallar contra un servidor desactualizado.

---

## 3. Chequeos

```bash
npx tsc --noEmit    # revisa los tipos de TypeScript
npm run lint
```

---

## 4. Problemas frecuentes

| Qué ves | Causa y solución |
|---|---|
| La app dice `The API address is not configured` | Falta `.env.local`, o no reiniciaste Expo con `npx expo start -c` después de crearlo. |
| La app dice `Cannot reach the server` o da timeout desde el celular | Revisá que el servidor esté corriendo, que el celular y la PC estén en la misma Wi-Fi, que la IP de `.env.local` sea la del adaptador Wi-Fi (no ZeroTier/VPN) y que el firewall de Windows permita a Node en redes privadas. |
| Cambiaste `.env.local` y no pasa nada | La variable se lee solo al iniciar: reiniciá con `npx expo start -c`. |
| `npm install` falla con un error de versión de Node | Actualizá Node a 20.19 o superior. |
