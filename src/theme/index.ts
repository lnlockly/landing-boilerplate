import type { LandingConfig } from '../config/schema';
import { cyberpunk } from './cyberpunk';
import { corporate } from './corporate';
import { minimal } from './minimal';

const presets = { cyberpunk, corporate, minimal };

export function applyTheme(theme: LandingConfig['theme']) {
  const preset = presets[theme.preset] ?? cyberpunk;
  const root = document.documentElement;
  root.setAttribute('data-theme', theme.preset);
  for (const [key, value] of Object.entries(preset.vars)) {
    root.style.setProperty(key, value);
  }
  if (theme.primary) {
    root.style.setProperty('--primary', theme.primary);
  }
}
