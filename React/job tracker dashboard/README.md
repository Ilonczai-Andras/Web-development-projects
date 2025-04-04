# 💼 Job Tracker Dashboard

A modern, AI-támogatott Kanban-stílusú álláskeresési alkalmazás, amely segít a felhasználóknak nyomon követni pályázataikat, hatékonyabban menedzselni a jelentkezési folyamatot, és AI-eszközökkel javítani önéletrajzuk és pályázataik minőségét.

---

## 🚀 Főbb Funkciók

### ✅ Elkészült funkciók

- **Felhasználói hitelesítés**

  - Auth0 integrációval
  - `profiles` tábla adatbázisban a felhasználói profil adatok tárolására

- **Álláspályázatok nyomon követése**

  - Kanban tábla (To Apply, Applied, Interview, Offer, Rejected oszlopokkal)
  - Drag & Drop támogatás `dnd-kit` segítségével
  - Állásjelentkezés részletei: cégnév, pozíció, URL, státusz, megjegyzések

- **React Query**

  - API hívások kezelése és gyorsítótárazása

- **Adatbázis**
  - PostgreSQL alapú, `sql/` mappában tárolt szkript fájlokkal (`01_create_profiles.sql`, `02_create_applications.sql`, stb.)

---

### 🔄 Fejlesztés alatt / Tervezett funkciók

- **📅 Emlékeztetők és határidők**

  - Automatikus vagy manuális emlékeztetők interjúkra, follow-up emailekre

- **📊 Statisztikák és analitika**

  - Hány jelentkezés, sikeres interjúk aránya, ajánlatok száma stb.

- **🔗 LinkedIn integráció**

  - Álláshirdetések importálása közvetlenül LinkedInről
  - Automatikus adatok kinyerése

- **🌐 Multi-platform támogatás**
  - Mobilbarát UI
  - Progressive Web App (PWA) lehetőség

---

## 🧱 Tech stack

| Frontend         | Backend           | Auth  | Database   | Hosting          |
| ---------------- | ----------------- | ----- | ---------- | ---------------- |
| React + Tailwind | Node.js (Express) | Auth0 | PostgreSQL | Vercel / Netlify |

### Használt könyvtárak

- `dnd-kit` – Drag & Drop kezelése
- `react-query` – API állapotkezelés
- `axios` – API hívások
- `jsonwebtoken`, `pg` – Backend oldali biztonság és adatbázis kezelés

---

## 📁 Projektstruktúra

```
job-tracker-dashboard/
│
├── backend/
│   ├── logs/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── applicationController.js
│   │   │   └── profileController.js
│   │   ├── middlewares/
│   │   │   ├── checkJwt.js
│   │   │   ├── errorHandler.js
│   │   │   └── profileLoader.js
│   │   ├── models/
│   │   │   ├── Application.js
│   │   │   └── Profile.js
│   │   ├── routes/
│   │   │   ├── Application.js
│   │   │   └── Profile.js
│   │   ├── services/
│   │   │   ├── applicationService.js
│   │   │   └── profileService.js
│   │   └── utils/
│   │       └── logger.js
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── Card/
│   │   │   │   ├── Card.tsx
│   │   │   │   └── SortableCard.tsx
│   │   │   ├── Modal/
│   │   │   │   ├── ApplicationModal.tsx
│   │   │   │   └── Modal.tsx
│   │   │   ├── Column.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── KanbanBoard.tsx
│   │   │   ├── LoginButton.tsx
│   │   │   ├── LogoutButton.tsx
│   │   │   └── UserMenu.tsx
│   │   ├── hooks/
│   │   │   ├── useCreateApplication.ts
│   │   │   ├── useCreateOrUpdateProfile.ts
│   │   │   ├── useGetApplications.ts
│   │   │   └── useUpdateApplication.ts
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── env.ts
│   │   ├── index.tsx
│   │   ├── react-app-env.d.ts
│   │   ├── reportWebVitals.ts
│   │   └── setupTests.ts
│   ├── .env
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
```

---

## ⚙️ Telepítés

### 1. Környezeti változók

Másold az `.env.example` fájlt `.env` néven, és töltsd ki a szükséges kulcsokat (pl. Auth0 adatok, adatbázis URL).

### 2. Backend indítása

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend indítása

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Tesztelés

- **Backend**: `Jest`, `Supertest`
- **Frontend**: `React Testing Library`, `Vitest` vagy `Jest`

---

## 🗺️ Roadmap

- [x] Alap Kanban tábla drag & drop-pal
- [x] Felhasználói hitelesítés és adatbázis integráció
- [ ] Statisztikák és grafikonok
- [ ] LinkedIn import funkció
- [ ] Emlékeztetők és naptár funkció
- [ ] Mobil/PWA támogatás

---

## 👨‍💻 Közreműködés

Szívesen fogadunk pull requesteket és javaslatokat!  
Később bővítjük a `CONTRIBUTING.md` fájlban a részletes irányelveket.

---

## 📄 Licenc

MIT License – Szabadon felhasználható és módosítható.

---

## 📬 Kapcsolat

Ha kérdésed van vagy hibát találtál: **ilonczai.andras16@gmail.com**
