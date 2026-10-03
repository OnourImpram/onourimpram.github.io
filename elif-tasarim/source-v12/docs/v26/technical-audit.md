# V26 technical audit of the existing V25.2 site

Date: 2026-10-03. Scope: read-only source and existing generated artifacts in `elif-tasarim/source-v12`; no browser or screenshot review in this audit. The parent audit owns visual inspection and implementation. No implementation, dependencies, or release artifacts were changed for this audit.

Read `AGENTS.md` before inspection. Preserve the approved emblem and heading, the single 3D Studio, factual workshop/concept distinctions, Yunus Usta contact, preview `noindex`, and the separate private-draft/public-selection/model-export data scopes.

## Baseline and verification

- Active build: `npm run build` → `tools/build-v25.cjs`.
- Existing manifest: `v25.2-evidence-and-discovery`, package `0.25.2`, 51 routes and 56 used modules.
- Existing initial assets: 532,801-byte app JS and 285,673-byte CSS. These are artifact byte counts, not a measured browser performance score.
- The builder transpiles collected TS/TSX but only includes its traversed `require` graph in the app. CSS concatenates 17 source files. Historical source filenames do not alone establish dead runtime code.
- Core strict no-emit TypeScript check passed with the package's listed domain files.
- Read-only integrity verification failed for the existing `dist` manifests, detailed below.
- Parsed all 51 generated route HTML files. Referenced same-mount `a`, `img`, `script`, and `link` paths all existed. This was a filesystem check; it did not execute links, validate downloads, or inspect rendered layouts.
- In-memory execution used TypeScript transpilation and a minimal component/state stub to reproduce the storage-clear failure, bare mount parsing, and pending-photo reset race. These were not browser accessibility or rendering tests.

## Prioritized findings

### 1. P1 — a pending photo can return after the project was cleared or replaced

**Files:** `src/pages/BringModel.tsx` (`add`, the new-project handler, and `DraftRecovery onRestore`); `src/components/DraftRecovery.tsx`.

`add()` awaits photo processing, then checks only `this.alive` before adding every accepted photo to the shared attachment store. “Yeni bir proje başlat” remains enabled while processing, clears the store, and navigates to `/modelini-getir`. When already at that route, `App.navigate` returns without unmounting the form. The pending job still has `alive=true`, so it attaches the old photo to the new project. Restoring/importing a draft also replaces the current draft while the form can remain mounted.

**Reproduction result:** deferred `prepareImage` → start new project → attachments immediately `[]` → resolve processing → attachments become `["late-photo"]`. The reset button was not disabled.

**Bounded fix:** add an upload generation/cancellation token and invalidate it whenever the project is reset or replaced. A stale operation must revoke all prepared object URLs and avoid mutating either the shared attachment store or current form state. Cover reset and recovery/import, as well as unmount. Disabling replacement controls during processing is an alternative UX choice, but cancellation still needs consistent handling.

**Verification:** begin an upload, clear or restore the project before processing completes, then resolve it. No prior photo may appear in the replacement project; no stale preview URLs should remain.

### 2. P1 — device-data deletion reports complete success even when it failed

**Files:** `src/App.tsx` (information-dialog clear handler and selection persistence callbacks); `src/lib/draft-session.ts` (`disable`).

The global clear handler ignores the boolean returned by `draftSession.disable()`, catches and discards localStorage removal errors, closes the dialog, and always announces “Elif taslağı ve bu cihazdaki kayıtlar temizlendi.” The draft-session helper already distinguishes deletion failure and offers browser-site-data guidance, but the global flow discards that result. A retained personal recovery record is therefore presented as deleted.

**Reproduction result:** with `localStorage.removeItem` throwing, the stored draft still exists and the emitted notification is the complete-success sentence above.

The 30-day selection opt-out similarly changes its remembered state to false after a failed removal; the message describes a save failure rather than accurately confirming whether the prior record was removed.

**Bounded fix:** clear in-memory data independently, aggregate storage removal outcomes, and keep the deletion outcome visible. Only claim full removal when all relevant removals succeeded; otherwise state that open-tab data was cleared but device records could not be removed and retain the existing manual-clearing guidance. Keep selection opt-out truthfully distinguished from successful removal.

**Verification:** exercise successful removal, unavailable localStorage, and throwing removeItem. The record's actual state and the visible result must agree.

### 3. P1 release gate — checked-in `dist` does not pass its integrity verifier

**Files:** `dist/release-v25.json`, `dist/release-v23.json`; `tools/verify-v25.cjs`; `tools/build-v25.cjs`.

`node tools/verify-v25.cjs` fails with `Integrity: release-v23.json`. Inspecting every recorded file found exactly two mismatches: `release-v23.json` and `release-v25.json`. Both claim an expected size of 40,901 bytes but are 41,177 bytes. The compatibility manifest is an exact copy of the active manifest; both contain obsolete self/peer digest entries. The other listed files passed the read-only digest comparison.

This is an existing generated-artifact problem, not a demonstrated defect in a clean run of the active builder. The active builder removes `dist`, walks generated files before writing either manifest, and therefore should not produce these self-references.

**Bounded fix:** regenerate through the one authorized builder and run the integrity verifier before publication. Do not repair the hashed JSON by inventing new self-hashes or hand-edit the published HTML. Determine whether a historical post-build step reinserted manifest files if the mismatch returns.

**Verification:** a fresh build must pass `verify:dist`, with both release manifests equal and neither included as a hashed file of itself.

### 4. P2 — the bare deployment mount renders a client-side 404

**Files:** `src/App.tsx` (`currentLocation`); `tools/static-mount.cjs`; `tools/serve-static.cjs`.

The static server deliberately maps both `/elif-tasarim` and `/elif-tasarim/` to the home page. `currentLocation` strips the deployment base only if the pathname starts with `base + '/'`. For the bare `/elif-tasarim` it returns `/elif-tasarim`, so the generated home content is replaced by the app's missing-page view after mounting.

**Reproduction result:** base `/elif-tasarim`, pathname `/elif-tasarim`, no query/hash → `currentLocation()` returns `/elif-tasarim` rather than `/`.

**Bounded fix:** treat pathname equal to the base as `/`; keep the existing path-boundary check for descendants. Optionally canonicalize the served bare mount to its slash URL, but route parsing should still be correct.

**Verification:** root, bare mount, slash mount, real descendants, and similarly prefixed but different paths.

### 5. P2 — 3D loading ignores an explicitly empty deployment base

**File:** `src/components/DeskExperience.tsx` (`loadRuntime`).

The active builder supports `BASE_PATH=''`. The lazy loader instead uses `(w.__ELIF_BASE__ || '/elif-tasarim')`, so that supported root deployment requests `/elif-tasarim/three/desk-scene.mjs` while its files are under `/three/`.

**Bounded fix:** use a nullish/default check that respects the empty string and the same base-path convention as the image/runtime helpers.

**Verification:** 3D script URLs must be correct for `''` and `/elif-tasarim` bases. This finding does not claim the present default subpath deployment has that failure.

### 6. P2 — one 3D initialization failure cannot use the advertised retry

**File:** `src/components/DeskExperience.tsx` (`loadRuntime`).

The loader resets `runtimePromise` and removes the script on `script.onerror`. In its separate `onload` branch, a missing `window.ElifDesk3D` rejects the promise without clearing it. Every subsequent attempt returns that same rejected promise, so the visible “3D görünümü yeniden dene” action cannot start a fresh attempt for that failure condition.

**Bounded fix:** centralize failure cleanup for both rejection paths, resetting the cached promise and cleaning the failed script. A loading timeout would be a separate enhancement and is not required to fix this proven branch.

**Verification:** simulate onload without a runtime, then retry with a valid runtime. The second attempt must create and load a fresh script.

### 7. P3 — unknown guide URLs show the guide index under 404 metadata

**Files:** `src/App.tsx` (`renderPage`); `src/pages/Editorial.tsx` (`Journal`); `src/lib/routes.ts` (`pageTitle`).

`renderPage` routes every `/rehber/...` string to `Journal`. `Journal` renders its index when it cannot find the supplied slug. Metadata meanwhile identifies the unknown route as “Sayfa bulunamadı.” The page body and page identity disagree, and deeper invalid paths can resolve to the same article because only the third path segment is passed.

**Bounded fix:** route only the known article slugs and exact guide index to `Journal`; let the shared missing-page view handle other guide paths.

**Verification:** a known guide, `/rehber`, unknown slug, and a known slug with an extra segment.

## Existing safeguards to retain

- The generated HTML contains a static content snapshot and an explicit no-JavaScript contact notice. Form/button controls are disabled in that snapshot, while direct contact and internal links remain real anchors. The app removes the snapshot on mount. A missing JS file therefore leaves a readable fallback.
- Public selection files accept known catalog identifiers and cap their count. Private draft backups and 3D configuration exports use separate formats and validation paths.
- Draft recovery is opt-in, expires after seven days on the next check, and excludes photos. Public selection storage has its own 30-day consent.
- Private images are decoded and re-encoded locally; the image preparation path bounds file size and pixel count, and removes metadata in its JPEG sharing copy. This audit did not prove decoder compatibility on every target browser.
- Shared studio links serialize public model options; room dimensions and customer notes are not appended. 3D export clones model geometry before asynchronous exporter loading, and imported design JSON rejects unexpected configuration fields.
- Pinterest is only embedded after an explicit click, inside a sandboxed iframe, with an explanation of the external connection. No automatic Pinterest request was found in the initial code path.
- `workPhotoEvidence` separates photo-stage tags from the broader project record status. Preserve that distinction; source-only inspection cannot establish what an unseen photo proves.
- Primary content images use a bounded retry and an accessible failure state. Some decorative/studio images still use ordinary `img`; this observation alone is not evidence that they currently fail.
- Native dialogs implement Escape/cancel handling and restore the prior connected focus target. Keyboard focus order, scroll blocking, zoom behavior and device-specific behavior remain browser-review work.
- The Three.js/exporter license files are present under `public/three/vendor/` and are copied by the active builder.
- The `_headers` file is only generated configuration. Its presence is not proof that the deployed host serves those headers; the CSP is explicitly report-only. No live security-header claim is made here.

## Scope limitations

No live site, external messaging, browser rendering, 3D/AR device behavior, public publication, or visual photo interpretation was performed in this audit. No broad rewrite, dependency replacement, CSS purge, or new factual business claim is warranted by these findings. Re-run the relevant acceptance flows after bounded fixes; the existing V22 contact acceptance remains an explicit project gate.
