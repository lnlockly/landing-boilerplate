import type { LandingConfig } from '../config/schema';

export function applyDocumentSEO(config: LandingConfig) {
  if (typeof document === 'undefined') return;
  document.title = config.seo.title;
  setMeta('description', config.seo.description);
  setMeta('og:title', config.seo.title, 'property');
  setMeta('og:description', config.seo.description, 'property');
  if (config.seo.og_image) setMeta('og:image', absoluteUrl(config.seo.og_image, config.seo.site_url), 'property');
  if (config.seo.site_url) setMeta('og:url', config.seo.site_url, 'property');
  setMeta('twitter:title', config.seo.title);
  setMeta('twitter:description', config.seo.description);
}

function setMeta(key: string, value: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function absoluteUrl(path: string, base?: string): string {
  if (!base) return path;
  if (path.startsWith('http')) return path;
  return base.replace(/\/$/, '') + (path.startsWith('/') ? path : '/' + path);
}
