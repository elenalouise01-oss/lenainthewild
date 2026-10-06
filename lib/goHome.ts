// "Home" links: on the home page itself, glide back to the top and clear any
// #section from the address bar instead of reloading; elsewhere, let the
// link navigate to the home page as normal.
export function goHome(e: React.MouseEvent) {
  if (window.location.pathname !== '/') return;
  e.preventDefault();
  window.history.replaceState(null, '', '/');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
}

// "Back to top": glide to the top of whichever page you're on.
export function scrollToTop(e: React.MouseEvent) {
  e.preventDefault();
  window.history.replaceState(null, '', window.location.pathname);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
}
