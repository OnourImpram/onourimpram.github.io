// Keep keyboard focus inside the active modal, including the last-to-first Tab edge.
document.addEventListener('keydown', function(event) {
  if (event.key !== 'Tab') return;
  var modal = document.querySelector('dialog[open]');
  if (!modal) return;
  var items = Array.from(modal.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')).filter(function(el) { return el.getClientRects().length > 0; });
  if (!items.length) { event.preventDefault(); modal.focus(); return; }
  var first = items[0], last = items[items.length-1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
}, true);
