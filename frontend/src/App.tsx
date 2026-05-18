import React from 'react';

/**
 * Canonical landing layout. Slot conventions:
 *   - brief.title              — H1 hero headline
 *   - brief.subtitle           — hero subheading
 *   - brief.feature_1_title, feature_1_body, feature_2_*, feature_3_*
 *   - brief.cta_text           — primary CTA button label
 *   - brief.cta_href           — primary CTA href (https:// or https://t.me/...)
 *
 * Finalize pass replaces every marker; audit fails the gate if any slot
 * survives. Do NOT rewrite the JSX structure — only the slot text.
 *
 * Visible-text slots use JS-string-literal wrappers so the file parses
 * as valid JSX even before finalize runs. Attribute values use the bare
 * text-token form — finalize rewrites the value in place.
 */
export default function App() {
  return (
    <main className="landing">
      <section className="hero">
        <h1><span data-slot="title">{'Лендинг для онлайн-школы рисования АртШкола. Учим взрослых и подростков рисовать с нуля: карандаш, а'}</span></h1>
        <p className="subtitle"><span data-slot="subtitle">{'Лендинг для онлайн-школы рисования АртШкола. Учим взрослых и подростков рисовать с нуля: карандаш, акварель, портрет. Пр'}</span></p>
        <a
          className="cta primary"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          {'Continue'}
        </a>
      </section>
      <section className="features">
        <article className="feature">
          <h3>{''}</h3>
          <p>{''}</p>
        </article>
        <article className="feature">
          <h3>{''}</h3>
          <p>{''}</p>
        </article>
        <article className="feature">
          <h3>{''}</h3>
          <p>{''}</p>
        </article>
      </section>
      <section className="cta-bottom">
        <h2>{''}</h2>
        <a className="cta primary" href="#" target="_blank" rel="noopener noreferrer">
          {'Continue'}
        </a>
      </section>
      <footer>
        <small>Сделано на платформе AgentFlow</small>
      </footer>
    </main>
  );
}

