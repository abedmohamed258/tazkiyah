# أذونات الخطوط والأرشيفات المضمَّنة / Font & Bundled Library Licenses

SPDX notice for third-party assets embedded inside `index.html`. The application code
itself is licensed under the GNU GPL v3+ (see `LICENSE`); this file covers what is
*inside* the single HTML file and is **not** the author's own code.

---

## 1. Tajawal Arabic font — SIL Open Font License 1.1

The Tajawal family (weights 500–900) is embedded as base64 `@font-face` WOFF2 data
directly in `index.html` so the app renders fully offline. The source marks it verbatim as:

```css
/* Tajawal (OFL) مضمَّن ليعمل الملف أوفلاين */
```

— see `index.html`, line 17 (the `@font-face` block that follows).

The embedded binary carries the upstream SIL OFL-1.1 license. The upstream copyright
line, as published in the official Google Fonts repository
([`google/fonts/ofl/tajawal/OFL.txt`](https://github.com/google/fonts/blob/main/ofl/tajawal/OFL.txt)):

```
Copyright 2018 Boutros International. (http://www.boutrosfonts.com)
```

The full OFL 1.1 text is available at <https://openfontlicense.org/> and in the
upstream repository above. Per the OFL, the font remains under its own license:
it may be used, bundled and redistributed verbatim, but the font itself may not be
sold or renamed independently of the license terms.

## 2. Bundled JavaScript libraries — MIT

Three MIT-licensed libraries are inlined into `index.html` (this is what makes the app
work with zero network requests):

| Library | Header in `index.html` | Attribution as found in source |
|---|---|---|
| `adhan` (prayer times) | `/* adhan (MIT) - Batoul Apps */` (line 1991) | Copyright Batoul Apps, MIT |
| `astronomy-engine` (moon-conjunction math for the Hijri calendar) | `/* astronomy-engine (MIT) - Don Cross */` (line 1725) | `Copyright (c) 2019-2023 Don Cross` (line 1736), <https://github.com/cosinekitty/astronomy> |
| `html-to-image` (PNG report export) | `/* html-to-image (MIT) */` (line 1986) | MIT |

MIT requires only that the copyright/permission notices be retained — which they are,
in the inlined source headers above.

## 3. Icons

The app icons under `icons/` are original artwork created for this project and fall
under the project's GPL-3.0-or-later license (see `LICENSE`).
