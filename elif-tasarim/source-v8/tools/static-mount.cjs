'use strict';
// Map a mounted preview URL to its dist-relative path, preserving path boundaries.
exports.stripMount = function stripMount(pathname, base) {
  const prefix = (base || '').replace(/\/$/, '');
  if (!prefix) return pathname;
  if (pathname === prefix || pathname === prefix + '/') return '/';
  return pathname.startsWith(prefix + '/') ? pathname.slice(prefix.length) : null;
};
