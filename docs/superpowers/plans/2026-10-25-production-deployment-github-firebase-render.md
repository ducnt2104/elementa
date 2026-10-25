# ELEMENTA — GitHub, Firebase & Render Production Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish end-to-end production deployment for ELEMENTA: source code managed and pushed to GitHub (`main`), Firebase configured as authoritative cloud database & authentication layer with robust security rules and data sync, and Render hosting the dynamic web application with unified API + SPA serving.

**Architecture:** 
A fullstack architecture where the Vite-built React 18 SPA is served alongside the native Node.js HTTP authoritative server (`server/src/server.ts`), featuring SQLite persistence, real-time SSE multiplayer, and REST APIs. Firebase Client SDK (Auth, Firestore) provides decentralized user profiles, deck slots, and collection sync with offline-fallback to LocalStorage. Render executes the unified web service on dynamic `$PORT`, with `render.yaml` IaC infrastructure blueprint.

**Tech Stack:**
- Frontend: React 18, TypeScript 5.7, Vite 6.4, TailwindCSS 3.4, Lucide Icons, Web Audio API
- Backend: Node.js 22+, Native HTTP (`node:http`), Native SQLite (`node:sqlite`), Server-Sent Events (SSE)
- Database / Cloud: Google Cloud Firestore, Firebase Authentication, LocalStorage offline fallback
- Deployment & CI/CD: Git, GitHub repository (`ducnt2104/elementa`), Render Web Service (`render.yaml`)

**Spec:** User request requirements (Giai đoạn A - F) and project architecture documentation.

## Global Constraints
- Preserve 100% of existing gameplay, chemical reaction matrices, cards (2200+), visualizers, and data schemas.
- Zero data loss: Do not delete existing SQLite database, local storage keys, or git history.
- Never fake URLs, commits, Firebase status, or Render deployments.
- No exposed credentials, secrets, or service account keys in git history or client bundles.
- Render port binding must strictly use `process.env.PORT || 3001` and bind to `0.0.0.0`.
- All steps must follow the auto-execution policy without unnecessary pauses.

## Review Focus
1. `server.ts` non-API route handling: Static file serving from `dist/` must correctly serve MIME types (HTML, CSS, JS, SVG, WASM) and fall back to `index.html` for client-side SPA routing.
2. `PORT` binding on Render: Service must listen on `process.env.PORT` on host `0.0.0.0` or Render health check will time out.
3. Firebase environment variables: Client configuration must cleanly fall back if environment variables are not injected, preventing blank page crashes.
4. Git security: No `.env` or sensitive `.db` files committed to repository.
5. End-to-end smoke test: Health check `/api/health` and static assets respond with HTTP 200 OK.

---

### Task 1: Enhance Native Server for Unified Production Web Hosting on Render

**Files:**
- Modify: `server/src/server.ts:655-703`
- Modify: `package.json:1-31`
- Test: `tests/test-production-server-serving.mjs`

**Interfaces:**
- Consumes: `dist/` build output, `process.env.PORT`
- Produces: HTTP 200 for `/api/health`, static assets (`/assets/*.js`, `/assets/*.css`), and SPA fallback (`/` -> `dist/index.html`).

- [ ] **Step 1: Write verification test for static file serving and SPA fallback**

Create `tests/test-production-server-serving.mjs` testing:
1. `GET /api/health` returns status `ok` and 200.
2. `GET /` returns `dist/index.html` content with 200 and `Content-Type: text/html`.
3. `GET /arbitrary-spa-route` returns `dist/index.html` with 200.
4. `GET /assets/index-*.css` returns CSS with `Content-Type: text/css`.

- [ ] **Step 2: Run test to verify it fails before server enhancement**

Run: `node tests/test-production-server-serving.mjs`
Expected: FAIL (server currently returns 404 for non-API routes).

- [ ] **Step 3: Enhance `server/src/server.ts` to serve static files from `dist/`**

Add MIME type mapping, file existence check in `dist/`, safe path resolution to prevent directory traversal, and SPA fallback to `dist/index.html`. Also ensure `package.json` contains `tsx` in dependencies and has `"start": "npx tsx server/src/server.ts"`.

- [ ] **Step 4: Run test to verify it passes**

Run: `node tests/test-production-server-serving.mjs`
Expected: PASS with all checks green.

- [ ] **Step 5: Verify production build output and bundle integrity**

Run: `npm run build`
Expected: Clean build into `dist/`.

- [ ] **Step 6: Commit server enhancement**

```bash
git add server/src/server.ts package.json tests/test-production-server-serving.mjs
git commit -m "feat(server): add static file serving and SPA fallback for Render production hosting"
```

---

### Task 2: Configure Render Deployment Blueprint & Production Environment

**Files:**
- Create: `render.yaml`
- Modify: `.env.example`
- Modify: `src/services/apiClient.ts:106-112`
- Test: `tests/test-render-config-spec.mjs`

**Interfaces:**
- Consumes: Render environment configuration, `PORT`
- Produces: `render.yaml` specification for Render Web Service and Static Site options.

- [ ] **Step 1: Write test for Render blueprint and environment specification**

Create `tests/test-render-config-spec.mjs` to validate:
1. `render.yaml` is valid YAML and defines service `elementa-web`.
2. Build command is `npm run build`.
3. Start command is `npm start` or `npx tsx server/src/server.ts`.
4. Health check path `/api/health` is configured.
5. `src/services/apiClient.ts` honors `import.meta.env.VITE_API_BASE_URL`.

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/test-render-config-spec.mjs`
Expected: FAIL (`render.yaml` does not exist).

- [ ] **Step 3: Create `render.yaml` and update `apiClient.ts`**

Define `render.yaml` with:
- Service name: `elementa-tactical-chemistry`
- Env: `node`
- Plan: `starter` / `free`
- BuildCommand: `npm run build`
- StartCommand: `npm start`
- HealthCheckPath: `/api/health`
- EnvVars: `NODE_ENV=production`, `PORT=3001`
Update `src/services/apiClient.ts` so `API_BASE_URL` reads `import.meta.env.VITE_API_BASE_URL` if set, otherwise defaults to relative path `''` in production (same origin) and `http://localhost:3001` in dev.

- [ ] **Step 4: Run test to verify it passes**

Run: `node tests/test-render-config-spec.mjs`
Expected: PASS.

- [ ] **Step 5: Commit Render configuration**

```bash
git add render.yaml src/services/apiClient.ts .env.example tests/test-render-config-spec.mjs
git commit -m "feat(render): configure render.yaml IaC blueprint and dynamic API baseURL"
```

---

### Task 3: Audit Firebase Security Rules, Indexes & Data Synchronization

**Files:**
- Audit & Verify: `firestore.rules`
- Audit & Verify: `firestore.indexes.json`
- Test: `tests/test-firebase-security-and-sync.mjs`

**Interfaces:**
- Consumes: Firebase Auth user claims, Firestore document structures (`users`, `decks`, `collections`, `matches`, `shop_transactions`).
- Produces: Validated security rules ensuring default deny, owner isolation, non-negative balances, and tamper-proof financial records.

- [ ] **Step 1: Write comprehensive test for Firebase rules and service contract**

Create `tests/test-firebase-security-and-sync.mjs` to verify:
1. `firestore.rules` enforces `rules_version = '2'`.
2. `users/{userId}` enforces `request.auth.uid == userId` and non-negative balances.
3. `decks/{deckId}` enforces `mainDeck.size() >= 30 && mainDeck.size() <= 60`.
4. `shop_transactions/{txId}` forbids updates and deletes (`allow update, delete: if false`).
5. `matches/{matchId}` validation criteria.
6. `firebaseService.ts` correctly exposes `signInAsGuest`, `loginWithEmail`, `registerWithEmail`, `saveProfile`, `loadProfile`, `saveDecks`, `saveCollection`.

- [ ] **Step 2: Run test and audit rules**

Run: `node tests/test-firebase-security-and-sync.mjs`
Expected: PASS.

- [ ] **Step 3: Commit Firebase validation suite**

```bash
git add tests/test-firebase-security-and-sync.mjs
git commit -m "test(firebase): verify firestore rules, indexes, and cloud synchronization contract"
```

---

### Task 4: Audit Git Security, Repository Health & Update README.md

**Files:**
- Modify: `README.md`
- Verify: `.gitignore`
- Test: `tests/test-git-cleanliness-and-secrets.mjs`

**Interfaces:**
- Consumes: Repository state, Git tracked files
- Produces: Secret-free staging, comprehensive deployment guide in `README.md`.

- [ ] **Step 1: Write test checking git cleanliness and secret prevention**

Create `tests/test-git-cleanliness-and-secrets.mjs` that checks:
1. No `.env`, `.env.local`, `serviceAccountKey.json`, `*.db`, or `*.pem` are tracked in git.
2. `.gitignore` contains rules for all sensitive extensions.
3. `package.json` contains proper repository url `https://github.com/ducnt2104/elementa.git`.

- [ ] **Step 2: Run test to verify repository safety**

Run: `node tests/test-git-cleanliness-and-secrets.mjs`
Expected: PASS.

- [ ] **Step 3: Update `README.md` with complete Deployment & Operations Guide**

Include:
- Architecture diagram and technology stack.
- GitHub workflow and automated deployment triggers.
- Firebase Setup (Auth providers, Firestore indexes, Security Rules deployment).
- Render Web Service setup step-by-step (connect repo, build & start commands, environment variables).
- Troubleshooting and rollback procedures.

- [ ] **Step 4: Commit documentation and verification**

```bash
git add README.md tests/test-git-cleanliness-and-secrets.mjs
git commit -m "docs: update production deployment guide for GitHub, Firebase, and Render"
```

---

### Task 5: Push to GitHub Remote & Verify State

**Files:**
- Git remote: `origin` (`https://github.com/ducnt2104/elementa.git`)
- Branch: `main`

- [ ] **Step 1: Run comprehensive pre-push checks**

1. Run `npm run build` to verify frontend builds without warnings or errors.
2. Run newly created production and regression tests.
3. Check `git status` for clean staging.

- [ ] **Step 2: Push commits to GitHub repository**

Run: `git push origin main`
Verify: Command succeeds with zero rejection.

- [ ] **Step 3: Verify GitHub remote commit hash**

Run: `git ls-remote origin refs/heads/main`
Verify the remote hash matches local `HEAD`.

---

### Task 6: Final Verification, Smoke Testing & Comprehensive Report

**Files:**
- Create: `docs/DEPLOYMENT_REPORT.md`

- [ ] **Step 1: Execute local production smoke test of the full unified server**

Start the unified server, make live HTTP requests to `/api/health`, `/`, and verify static assets load properly.

- [ ] **Step 2: Generate Final Production Deployment Report**

Write `docs/DEPLOYMENT_REPORT.md` answering all 10 criteria specified in the user request.
