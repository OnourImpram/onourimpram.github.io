# Elif Tasarım V25 implementation plan

Goal. Integrate the eight approved AI storage-bed concepts as a wood-first, accessible collection and publish the verified build without replacing unrelated repository work.

Architecture. Extend the existing category, concept, selection and source-context models. Use the same image pipeline and dialog. Add one specialised category page and reusable bed cards. Preserve the existing hero carousel and single 3D studio.

Constraints. Original logo and slogan. Yunus Usta and existing contact details. Noindex preview. Twenty real archive entries unchanged. No fabricated price, material certification, load rating or production validation. No customer images or notes in public files.

Review focus. Mobile and 200 percent text reflow. Open and closed images preserve the complete product. Image-load failure keeps a useful state. Saving and inquiry preserve the exact model. Keyboard modal closure returns focus. New collection remains readable without JavaScript.

## 1. Data and assets
Write tests for eight distinct bed ids, four wood-focused concepts, correct category and two image views per bed. Run failing tests. Add lib/beds.ts, responsive image variants with provenance and portfolio entries. Run tests.

## 2. Collection and integration
Write browser tests for filters, view switch, gallery keyboard, source-bound inquiry and saved models. Implement BedCollection.tsx, use BedCard from ConceptCard, and add a homepage teaser and footer link. Add category metadata. Run browser tests and full route checks.

## 3. Release and review
Use tools/build-v25.cjs as active compiler. Keep build-v23.cjs as a compatibility forwarding entry for old regression runners. Record release-v25.json as active manifest and an identical compatibility manifest for historical tools. Test V25 identity and all existing contracts. Run core typing, all unit tests, all maintained browser suites and local responsive audit. Review screenshots.

## 4. Publication
Transfer only approved assets and scoped source changes. Build against the current repository source, preserving later hero fixes. Publish only the elif-tasarim subtree using a fast-forward commit, never force. Verify live manifest, all linked files, routes and new interactions before stating success.
