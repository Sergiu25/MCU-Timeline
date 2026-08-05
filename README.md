# Marvel Watchlist

Aplicație web locală pentru urmărirea filmelor și serialelor Marvel în ordinea recomandată de vizionare.

Proiectul conține trei liste:

- **MCU Timeline**
- **X-Men Universe**
- **Spider-Man Universes**

Utilizatorul poate marca producțiile vizionate, poate urmări progresul separat pentru fiecare listă și poate alege între tema luminoasă și tema întunecată.

## Funcționalități

- liste ordonate de filme, seriale, sezoane, speciale și scurtmetraje;
- afișarea anului, tipului, universului și importanței fiecărei producții;
- trei niveluri de importanță: `Esențial`, `Recomandat` și `Opțional`;
- progres calculat separat pentru fiecare univers;
- checkbox pentru marcarea producțiilor vizionate;
- sincronizarea automată a producțiilor care apar în mai multe liste;
- producțiile viitoare apar în lista lor, dar nu pot fi bifate;
- temă light/dark cu switch glisant;
- salvarea locală a progresului și a temei.

## Cum funcționează sincronizarea

Fiecare producție are un `id` unic. Atunci când aceeași producție apare în mai multe liste, aceasta folosește același ID peste tot.

De exemplu, `Deadpool & Wolverine` apare atât în MCU Timeline, cât și în X-Men Universe. Dacă filmul este bifat într-o listă, el va apărea bifat automat și în cealaltă.

Listele nu sunt scrise direct în componente. Datele sunt păstrate separat în:

```text
src/data/mcu.ts
src/data/xmen.ts
src/data/spiderman.ts
```

Structura unui element este definită în `src/types/watchItem.ts`.

## Salvarea datelor

Aplicația nu folosește backend, bază de date sau conturi de utilizator. Datele sunt salvate în `localStorage`, direct în browser.

Sunt folosite următoarele chei:

- `marvel-watchlist:watched` — lista ID-urilor marcate ca vizionate;
- `marvel-watchlist:theme` — tema selectată (`light` sau `dark`).

Datele rămân salvate după închiderea și repornirea aplicației, atât timp cât:

- aplicația este deschisă în același browser și același profil;
- datele site-ului nu sunt șterse;
- adresa locală folosită pentru aplicație rămâne aceeași.

Ștergerea datelor browserului sau rularea aplicației pe alt port/origine poate crea un spațiu `localStorage` diferit.

Pentru resetarea manuală a progresului, deschide consola browserului și rulează:

```js
localStorage.removeItem('marvel-watchlist:watched')
```

Pentru resetarea temei:

```js
localStorage.removeItem('marvel-watchlist:theme')
```

Apoi reîncarcă pagina.

## Tehnologii

- React 19;
- TypeScript;
- Vite;
- CSS simplu;
- Oxlint.

Nu sunt folosite servicii externe sau biblioteci UI.

## Cerințe locale

Este necesar să ai instalate:

- Node.js;
- npm.

Poți verifica instalarea cu:

```powershell
node --version
npm.cmd --version
```

Pe Windows este recomandat `npm.cmd`. Acesta funcționează și atunci când politica PowerShell blochează scriptul `npm.ps1`.

## Instalare

Deschide PowerShell în directorul proiectului:

```powershell
cd D:\MCU_Timeline
npm.cmd install
```

Comanda instalează dependențele definite în `package.json`.

## Pornirea aplicației

Pentru modul de dezvoltare:

```powershell
npm.cmd run dev
```

Vite va afișa în terminal adresa locală, de obicei:

```text
http://localhost:5173
```

Deschide adresa în browser. Serverul trebuie să rămână pornit în terminal cât timp folosești aplicația.

Pentru oprire, apasă `Ctrl+C` în terminal.

## Verificarea proiectului

Verificarea statică a codului:

```powershell
npm.cmd run lint
```

Compilarea locală de verificare:

```powershell
npm.cmd run build
```

Build-ul este generat în folderul `dist`. Acesta este doar un rezultat local al compilării și nu publică aplicația pe internet.

Pentru a verifica local build-ul generat:

```powershell
npm.cmd run preview
```

## Structura principală

```text
src/
  components/
    WatchList.tsx          # afișarea elementelor și checkboxurilor
  data/
    mcu.ts                 # datele MCU Timeline
    xmen.ts                # datele X-Men Universe
    spiderman.ts           # datele Spider-Man Universes
  hooks/
    useWatchedItems.ts     # citirea și salvarea progresului
  types/
    watchItem.ts           # tipurile TypeScript
  App.tsx                  # navigarea, progresul și tema
  App.css                  # stilurile componentelor
  index.css                # stilurile globale și culorile temelor
```

## Deploy

Proiectul este destinat rulării locale. Nu include și nu necesită configurare de deploy, hosting, Docker, backend sau bază de date.
