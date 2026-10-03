# V26 independent second review

Reviewed 3 October 2026 against `6b47990c0c343bdaa365b5e7d3737b173e463ea9`, including the uncommitted source, build, CSS and V26 tests. Applied the `requesting-code-review` reviewer instructions, read `AGENTS.md` and `implementation-plan.md`. No production source, builder, index or branch was modified by this review; this report is the requested exception to read-only review.

## Substantive finding

### Important — a deleted project's pending ZIP still downloads

Location: `src/pages/BringModel.tsx`, `exportBundle` (line 50 at review time), together with `componentWillUnmount`, `restored`, and the New Project handler.

`exportBundle` captures the private project text and photo blobs, awaits `localZip`, and then calls `saveBlob` unconditionally. The new cancellation generation protects `add`, but neither the generation nor `alive` protects this export. Starting a new project, restoring a different project or leaving the form does not invalidate that pending side effect. A ZIP of the old private draft can download after the user has cleared the draft; its completion also writes a success message into the reset form. This is a private local export, not evidence of public URL or server disclosure.

Verified with the actual transpiled `BringModel` class, a synchronous component-state harness and a deferred ZIP promise. Only `localZip` and browser dependencies were replaced. The probe started with a private note and one private photo, invoked `exportBundle`, invoked the rendered New Project button, verified that the form note and photos were empty, and then resolved ZIP preparation. Observed: one `saveBlob` call after reset, carrying the old text/photo entries, and the old success message on the new form. A separate probe invoked `componentWillUnmount` before resolving preparation; it also downloaded afterward.

Fix: capture a draft-operation generation before preparation and check it, plus `alive`, immediately before `saveBlob` and before asynchronous status/finally updates. Invalidate it on reset, restore and unmount. Reset `sharing` with the new draft. Apply the same stale-status protection to `shareFiles`; an already-open native sharing sheet cannot be canceled by this component, so do not claim that it can. Add a deferred-export regression for reset/restore/unmount and a case ensuring an old operation cannot clear a newer operation's busy state.

## What the review established

The photo guard handles accepted-image cleanup and prevents an obsolete completion from unlocking a newer upload. Device-clear failure remains visible instead of claiming complete deletion. Public inspiration export remains a whitelist of catalog IDs; the desk URL remains a normalized studio configuration. Work handoff already obtains source identity through `modelHref`'s existing work matching. The new concept preview does not replace this privacy boundary.

`node --test tests/v26/*.cjs` completed successfully. `git diff --check` was clean. Source inspection covered dialog navigation/return focus, category ordering, home concept use, selection persistence, draft restore/import, ZIP capture timing, 3D loading, scoped CSS, the pinned esbuild transform and the static Vite preview. The builder was not run because the coordinator was reviewing its current output in the browser.

## Uncertainty, not a verified blocker

The 3D tests manually fire script callbacks and therefore prove loader state reset, not a real browser's module-map behavior. Retrying the same URL after a module has evaluated without installing its global can differ from a failed fetch. Modern HTML loading rules have also changed for fetch failures, so a blanket claim that every failed network module is permanently cached would be unsound. No persistent real-browser retry failure was reproduced here. Do not add speculative cache-busting from this review alone.

Reference checked: [HTML Standard module loading](https://html.spec.whatwg.org/multipage/webappapis.html#fetch-a-single-module-script). Browser-specific retry verification remains distinct from the passing handler test.

## Declined to judge

- Actual GPU scene quality, AR and native file-sharing completion: this review has no GPU/device execution evidence; the coordinator owns browser QA and reports the GPU limitation.
- Real-browser layout and concept-dialog focus at all viewport sizes: inspected the implementation, but did not duplicate the coordinator's active CUA session.
- Pending recovery-file import after a same-page reset: the import performs a fresh confirmation after reading the file and no silent overwrite was established; not promoted to a blocker without a reproducible user-visible failure.
- Live publication, benchmark completeness and remote-branch safety: these are coordinator release gates, outside this code-only review.

## Assessment

Ready to merge: **with the ZIP cancellation fix and its regression verification**. No critical issue or public-export privacy regression was found in the inspected changes. The outstanding verified issue is a stale private download surviving deletion of the draft that created it.

## Follow-up disposition — resolved

Re-reviewed the coordinator's fix on 3 October 2026. `draftGeneration` is now captured by `exportBundle` and `shareFiles`, and invalidated by the reset, restore and unmount paths. The ZIP checks the generation and component lifetime before downloading; success, error and finally updates use the same checks. Reset and restore clear `sharing` and the old message. Therefore a canceled export cannot download the old project, write status into its replacement or clear the replacement generation's busy state. The native share completion guard affects only local status and does not pretend to cancel an already-open operating-system sheet.

Ran `node --test tests/v26/upload-race.cjs` successfully, then `node tests/v26/upload-race.cjs` to inspect individual results: **7 tests passed, 0 failed**. This includes delayed ZIP completion after reset, restore and unmount, plus the four photo cancellation regressions. `git diff --check` remained clean. The coordinator separately reports that the three ZIP regressions failed before applying the fix; this reviewer independently observed the original defect and the passing fixed cases.

Updated assessment: **no outstanding blocking findings from this review**. The verified Important finding is closed. The browser, GPU and publication limits recorded above still apply; this code review does not replace those release checks.
