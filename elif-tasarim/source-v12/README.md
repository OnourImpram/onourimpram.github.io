# Elif Tasarım V12 C+

Coherent project context, a more usable two-bookcase Three.js studio, complete outgoing-message review and Yunus Usta contact.

## Build

Node.js 22 or later. Run `npm ci --ignore-scripts`, `npm run build`, `npm test`, `npm run typecheck:core` and `npm run verify:dist`.

Run `npm run serve` and open the printed local HTTP address. The server reads the V12 C+ manifest and mounts the site at `/elif-tasarim/`. Use a normal HTTP server for the separate ESM files in `dist`. The portable version is `preview/Elif_Tasarim.html` and embeds its local modules and image assets.

The only active build is `tools/build-v12.cjs`. Old scripts remain historical implementation references and are not the release entry point. Dependencies stay pinned to TypeScript 5.8.3 and the existing local Three.js 0.185.1 and MIT Preact runtime. Core strict type checking is not a claim of complete semantic checking of every JSX component. No font files are distributed.

## Verification

`npm test` includes the preserved baseline contracts and new V12 C+ state, measurement, search, source, summary, metadata and HTTP mount tests.

For actual browser tests install Python Playwright and Pillow, then its Chromium browser. Run `xvfb-run -a python tests/v11/acceptance.py`, `xvfb-run -a python tests/v11/followup.py` and `xvfb-run -a python tests/v11/matrix.py`. They use the portable file by default. Set `BASE_URL` to an HTTP site ending with `/` for network testing. `CHROMIUM_PATH` optionally selects a browser binary. `EVIDENCE_DIR` selects the output directory. No customer messages are sent.

`BASE_URL=https://onourimpram.github.io/elif-tasarim/ python tests/v11/public_verify.py` compares the actual release files with the locally built manifest and checks direct HTML routes. Run only after the approved V12 C+ deployment.

## Publication scope

Publish the complete contents of `dist` under `elif-tasarim/` only. Never overwrite the personal root homepage. The noindex preview remains separate from commercial launch approval. Source and documentation are included under `source-v11` for inspection, but are not runtime dependencies or part of the public manifest's runtime file count.

## Important boundaries

Yunus Usta and +90 530 879 71 69 come from the user. WhatsApp links open that recipient but do not prove message sending or receipt. This release has no automatic order record, payment, shipment or invoice service. Notes and customer pictures stay in the open tab's memory. Only explicitly saved public inspiration IDs persist, and only public studio options enter sharing links. Closing or reloading the page may clear private drafts. Files must be shared separately by the visitor.

The 3D table, height range, cabinet movement and plan-view footprint are conceptual geometry, not approved manufacturing drawings or mechanical safety specifications. The room and shelves are not automatically included in a table quote. Real workshop, in-progress, concept and external-reference imagery stay separately identified.

See `docs/v11/PLAN_STATUS.md` for all 33 planned scenarios and outstanding human or commercial gates.

## V12 C+ correction
The upper drawer assembly and cabinet now face the chair on negative Z. Horizontal orbit is unbounded in both room and product mode. Foreground staging is temporarily hidden in the chair-side hemisphere without overwriting shelf preferences. Six real camera presets, mouse and keyboard full orbit, touch pinch and page wheel scrolling are tested. Footprints remain conceptual, not engineering approvals.
