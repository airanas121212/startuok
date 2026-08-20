# Pilnas mirusio turinio auditas — startuok

Data: 2026-08-18 (auditas), 2026-08-18 (valymas atliktas)
Metodas: `grep`-pagrįsta paieška per visus `.html`, `.css`, `.js`, `.md`, `.xml`, `.txt`, `.yml`, `.webmanifest` failus repo šaknyje (be `.git`). Kiekvienas kandidatas patikrintas pagal pilną failo pavadinimą arba tikslų CSS klasės / JS selektoriaus žodį (su ribomis, kad `principles` neatitiktų `pricing-principles-strip` ir pan.).

## REZULTATAI — kas realiai atlikta

Visi žemiau esantys sąrašai liko kaip auditas (istorinis pagrindas), bet dabar prie kiekvieno punkto atlikta tai, kas buvo aiškiai pažymėta „ištrinti“. Ten, kur buvo abejonių, **palikta be pakeitimų** — pagal nurodymą nerizikuoti.

- **`styles.css`** — pašalintos visos 78 negyvos klasės (2.1–2.6 dalys) + su jomis susiję `.animated-timeline`/`.timeline .output` blokai (3.1 dalis). Patikrinta automatiškai: visos likusios (gyvos) klasės išliko nepaliestos, `{`/`}` skaičius subalansuotas prieš ir po. Papildomai pašalintos 16 dabar be paskirties likusių `--store-art-one/-two/-three/-four` CSS kintamųjų deklaracijų (jos nurodė į `crop-one..four`, kurie patys buvo pašalinti).
- **`script.js`** — pašalintas negyvas `.animated-timeline` `IntersectionObserver` blokas (3.1 dalis). Sintaksė patikrinta (`node -c`).
- **Failai** — paruoštas `cleanup-delete-and-commit.ps1` scenarijus, kuris ištrina 68 patvirtintus nenaudojamus failus (1.1–1.4 dalys, be dviejų dalykų, kurie palikti sąmoningai: `brandbook/email/*` šablonai ir trys PNG šaltiniai `storefront-glowina-hero-v4.png`, `storefront-ofisera-hero.png`, `storefront-topiniai-hero-v7.png` — jie liko, nes buvo pažymėti kaip abejotini).
- **Kodėl per PowerShell scenarijų, o ne automatiškai:** ši sesija turi tik failų rašymo tiltą į jūsų kompiuterį (gali *rašyti* naujus/atnaujintus failus), bet neturi terminalo/`git` prieigos jūsų mašinoje — negali pati vykdyti `git rm` ar `git commit`. `styles.css`, `script.js` ir šis `CLEANUP-LOG.md` jau įrašyti tiesiogiai į jūsų repo. Likusiems 68 failams ištrinti ir viskam sucommitinti — paleiskite pridedamą `cleanup-delete-and-commit.ps1`.

---

## 0. Bendros pastabos prieš sąrašus

- **`brandbook/index.html` NEEGZISTUOJA.** `brandbook/` kataloge yra tik `design-tokens.css`, `assets/startuok-logo.png` ir `email/` poaplankis su dviem HTML ir vienu TXT šablonu — jokio `index.html` nėra iš viso. Nėra ką tikrinti dėl nuorodų į jį; pati aplanko struktūra be įėjimo taško yra neišbaigta/nenaudojama iš svetainės pusės.
- **Nė vienas `brandbook/*` failas nėra nuorodomas iš `index.html`, jokios kitos svetainės antraštės/poraštės ar `sitemap.xml`.** Patikrinta per visus `href="..."` svetainėje — nė vienas neveda į `brandbook/`. Žodis „brandbook“ `styles.css` faile pasitaiko tik komentaruose (`/* Startuok — brandbook v2.1 */`), ne nuorodose.
- **`ILLUSTRATION-AUDIT.md`** — ankstesnis (2026-08-05) iliustracijų/svetainės auditas. Pats dokumentas niekur nenuorodomas iš svetainės (ir neturėtų būti — tai vidinis darbinis failas, ne puslapis). Tačiau jis yra **vertingas kaip istorinis kontekstas**: jame aiškiai užfiksuota, kad daug žemiau išvardintų SVG/PNG/WEBP failų buvo sąmoningai pakeisti naujesnėmis versijomis (v3/v4/v7 redizainas), todėl dabar jie „negyvi“ ne per klaidą, o dėl ankstesnės iteracijos liekanų.
- **`brandbook/design-tokens.css`** — neprijungtas jokiu `<link>` nė viename HTML faile. Realiame CSS naudojama tik `styles.css`.

---

## 1. FAILAI: `assets/` ir `brandbook/`

Legenda: **CODE** = realiai nuorodomas iš HTML/CSS/JS (renderinamas svetainėje) · **DOC** = paminėtas tik `ILLUSTRATION-AUDIT.md` (ne kode) · **NĖ VIENUR** = nerastas jokioje paieškoje.

### 1.1 Visiškai nenaudojami — nerasti nė kode, nė dokumentuose (17 grupių, 27 failai)

| Failas | Naudojamas | Pasiūlymas |
|---|---|---|
| `assets/concept-mobile-checkout.png` | ne | ištrinti |
| `assets/concept-mobile-checkout.webp` | ne | ištrinti |
| `assets/concept-mobile-checkout-mobile.webp` | ne | ištrinti |
| `assets/concept-multi-market.png` | ne | ištrinti |
| `assets/concept-multi-market.webp` | ne | ištrinti |
| `assets/concept-multi-market-mobile.webp` | ne | ištrinti |
| `assets/concept-storefront.png` | ne | ištrinti |
| `assets/concept-storefront.webp` | ne | ištrinti |
| `assets/concept-storefront-mobile.webp` | ne | ištrinti |
| `assets/linkedin-cover-background-v1.png` | ne | ištrinti (arba perkelti į atskirą „marketing assets“ aplanką, jei dar naudojama LinkedIn profiliui rankiniu būdu) |
| `assets/linkedin-cover-logo-v2.png` | ne | tas pats |
| `assets/linkedin-cover-logo-v2-2x.png` | ne | tas pats |
| `assets/linkedin-cover-v1.png` | ne | tas pats |
| `assets/logos/google-g.png` | ne (naudojamas tik `.webp` variantas, PNG fallback niekur nedeklaruotas) | ištrinti |
| `assets/mockup-glowina-products.png` | ne | ištrinti |
| `assets/mockup-glowina-products.webp` | ne | ištrinti |
| `assets/mockup-ofisera-products.png` | ne | ištrinti |
| `assets/mockup-ofisera-products.webp` | ne | ištrinti |
| `assets/mockup-topiniai-products.png` | ne | ištrinti |
| `assets/mockup-topiniai-products.webp` | ne | ištrinti |
| `assets/startuok-u-icon-white-background-1024.png` | ne | ištrinti (arba palikti kaip šaltinio failą, jei naudojamas socialinių tinklų profilio nuotraukoms rankiniu būdu — pažymėti README, jei taip) |
| `assets/startuok-u-icon-white-background-512.png` | ne | tas pats |
| `assets/storefront-topiniai-hero-v4.png` | ne | ištrinti |
| `assets/storefront-topiniai-hero-v4.webp` | ne | ištrinti |
| `assets/storefront-topiniai-hero-v4-720.webp` | ne | ištrinti |
| `assets/storefront-topiniai-hero-v5.png` | ne | ištrinti |
| `assets/storefront-topiniai-hero-v5.webp` | ne | ištrinti |
| `assets/storefront-topiniai-hero-v5-720.webp` | ne | ištrinti |
| `assets/storefront-topiniai-hero-v6.png` | ne | ištrinti |
| `assets/storefront-topiniai-hero-v6.webp` | ne | ištrinti |
| `assets/storefront-topiniai-hero-v6-720.webp` | ne | ištrinti |
| `brandbook/assets/startuok-logo.png` | ne — el. laiško šablonas `brandbook/email/patvirtinimo-laiskas.html` naudoja logotipą per absoliutų URL `https://startuok.online/assets/startuok-logo.png` (šakninį, ne šį) | ištrinti |
| `brandbook/design-tokens.css` | ne — neprijungtas jokiu `<link>` | ištrinti arba prijungti prie `brandbook/` puslapio, jei jis kada bus sukurtas |

**Pastaba dėl `storefront-topiniai-hero-v4/v5/v6`:** `index.html` šiuo metu naudoja tik **v7** variantą (`storefront-topiniai-hero-v7(.png/.webp/-720.webp)`). v4–v6 yra ankstesnės iteracijos, pakeistos vėlesnėmis — tai patvirtina ir `ILLUSTRATION-AUDIT.md`, kuriame aprašomas laipsniškas Topiniai herojaus vaizdo tobulinimas.

### 1.2 Naudojami tik per „negyvą“ CSS grandinę — realiai puslapyje nerodomi (3 grupės, 12 failų)

`styles.css` apibrėžia seną „produktų tinklelio“ mockup komponentą (`.store-products`, `.store-product-grid`, `.store-product`, `.store-product-photo`, `.store-section-head`, `.crop-one/-two/-three/-four`), kuris per CSS custom properties (`--store-art-one` ir t. t.) nurodo į šiuos webp failus. **Tačiau nė viena iš šių CSS klasių niekur nenaudojama jokiame HTML faile** — dabartinis (v3) homepage dizainas pakeitė šį tinklelį vienu dideliu herojaus vaizdu (`.store-hero-media` su `storefront-*-hero*.webp`). Tad nors failo pavadinimas techniškai „randamas grep'u“ `styles.css` viduje, jis niekada nepasiekia naršyklės, nes CSS taisyklė, kuri jį naudoja, niekada neaktyvuojama.

| Failas | Naudojamas | Pasiūlymas |
|---|---|---|
| `assets/mockup-glowina-1.webp` | ne (tik per negyvą `.crop-one` CSS) | ištrinti kartu su CSS blokais 1.3 dalyje |
| `assets/mockup-glowina-2.webp` | ne | ištrinti |
| `assets/mockup-glowina-3.webp` | ne | ištrinti |
| `assets/mockup-glowina-4.webp` | ne | ištrinti |
| `assets/mockup-ofisera-1.webp` | ne | ištrinti |
| `assets/mockup-ofisera-2.webp` | ne | ištrinti |
| `assets/mockup-ofisera-3.webp` | ne | ištrinti |
| `assets/mockup-ofisera-4.webp` | ne | ištrinti |
| `assets/mockup-topiniai-1.webp` | ne | ištrinti |
| `assets/mockup-topiniai-2.webp` | ne | ištrinti |
| `assets/mockup-topiniai-3.webp` | ne | ištrinti |
| `assets/mockup-topiniai-4.webp` | ne | ištrinti |

### 1.3 Paminėti tik `ILLUSTRATION-AUDIT.md` — dokumentuoti kaip pakeisti/legacy (19 failų)

| Failas | Naudojamas | Pasiūlymas |
|---|---|---|
| `assets/mockup-01.svg` | ne (doc only) | ištrinti |
| `assets/mockup-01-final.svg` | ne (doc only) | ištrinti |
| `assets/mockup-01-mobile.svg` | ne (doc only) | ištrinti |
| `assets/mockup-02.svg` | ne (doc only) | ištrinti |
| `assets/mockup-02-final.svg` | ne (doc only) | ištrinti |
| `assets/mockup-02-mobile.svg` | ne (doc only) | ištrinti |
| `assets/mockup-03.svg` | ne (doc only) | ištrinti |
| `assets/mockup-03-final.svg` | ne (doc only) | ištrinti |
| `assets/mockup-03-mobile.svg` | ne (doc only) | ištrinti |
| `assets/visual-integracijos.svg` | ne (doc only) | ištrinti |
| `assets/visual-integracijos-mobile.svg` | ne (doc only) | ištrinti |
| `assets/visual-integracijos-readable.svg` | ne (doc only) | ištrinti |
| `assets/visual-kurimas.svg` | ne (doc only) | ištrinti |
| `assets/visual-kurimas-mobile.svg` | ne (doc only) | ištrinti |
| `assets/visual-kurimas-final.svg` | ne (doc only) | ištrinti |
| `assets/visual-migracija.svg` | ne (doc only) | ištrinti |
| `assets/visual-migracija-mobile.svg` | ne (doc only) | ištrinti |
| `assets/visual-migracija-readable.svg` | ne (doc only) | ištrinti |
| `assets/og-startuok-legacy.png` | ne (doc only — pačiame pavadinime `legacy`) | ištrinti |

### 1.4 PNG šaltiniai, kurių tik `.webp` versija naudojama svetainėje (4 failai)

Šie PNG yra „master“ failai, iš kurių optimizuoti `.webp`, kuriuos realiai serviria svetainė. Patys PNG kode nenuorodomi.

| Failas | Naudojamas | Pasiūlymas |
|---|---|---|
| `assets/storefront-glowina-hero.png` | ne (originalas, pakeistas v4) | ištrinti — pakeistas `storefront-glowina-hero-v4.*` |
| `assets/storefront-glowina-hero.webp` | ne (originalas, pakeistas v4) | ištrinti |
| `assets/storefront-glowina-hero-v4.png` | ne kode (tik `.webp` naudojamas `index.html`) | **palikti** kaip redagavimo šaltinį, arba ištrinti, jei PNG originalai nebereikalingi po `.webp` konvertavimo |
| `assets/storefront-ofisera-hero.png` | ne kode (tik `.webp` naudojamas) | **palikti** kaip šaltinį arba ištrinti (žr. pastabą aukščiau) |
| `assets/storefront-topiniai-hero.png` | ne (originalas, pakeistas v7) | ištrinti |
| `assets/storefront-topiniai-hero.webp` | ne (originalas, pakeistas v7) | ištrinti |
| `assets/storefront-topiniai-hero-v7.png` | ne kode (tik `.webp` naudojamas) | **palikti** kaip šaltinį arba ištrinti |

*(Pastaba: `storefront-glowina-hero-v4.png`, `storefront-ofisera-hero.png` ir `storefront-topiniai-hero-v7.png` skiriasi nuo 1.3 sąrašo tuo, kad jų `.webp` giminaitis YRA aktyviai naudojamas — tik pats PNG nėra tiesiogiai serviruojamas. Sprendimas priklauso nuo to, ar norite repo laikyti neoptimizuotus šaltinius, ar ne.)*

### 1.5 El. laiškų šablonai — neprijungti prie svetainės navigacijos (3 failai)

| Failas | Naudojamas | Pasiūlymas |
|---|---|---|
| `brandbook/email/patvirtinimo-laiskas.html` | ne iš svetainės (nėra `<link>`/`<a>` į jį; tikėtina, kad turinys rankiniu būdu nukopijuotas į EmailJS šabloną, į kurį rodo `script.js` konstanta `EMAILJS_TEMPLATE_OWNER`) | **palikti** kaip šaltinio/dokumentacijos failą, jei tai vienintelė vieta, kur saugoma šio EmailJS šablono redakcija — patikrinti EmailJS panelėje, ar tekstas sutampa |
| `brandbook/email/template-a-pranesimas.html` | ne iš svetainės | ta pati pastaba |
| `brandbook/email/template-a-pranesimas.txt` | ne iš svetainės | ta pati pastaba |

### 1.6 Naudojami failai — patikrinta, viskas tvarkoje (informaciniam pilnumui)

Likę **~57** `assets/` faile (favicon'ai, `apple-touch-icon.png`, `icon-192/512.png`, `startuok-logo.png/.webp`, visi `logos/*` išskyrus `google-g.png`, visi `og-*` išskyrus `og-startuok-legacy.png`, visi `service-*` ir `service-*-mobile` webp/png, aktyvūs `storefront-glowina-hero-v4*`, `storefront-ofisera-hero*`, `storefront-topiniai-hero-v7*`) — **realiai nuorodomi HTML/CSS faile ir naudojami svetainėje**. Palikti be pakeitimų.

---

## 2. CSS: `styles.css` klasės, kurios neatitinka jokio dabartinio HTML elemento

Metodika: iš `styles.css` ištraukti visi klasių selektoriai (`.klase`), kiekvienas patikrintas kaip pilnas žodis (su ribomis) visuose HTML failuose IR `script.js` (nes dalis elementų generuojama dinamiškai JS kodu — pvz., `pricing-close`, `review-chip`, `exit-popup-close`, `data-consent` atributai kuriami per `innerHTML`/`className` pačiame `script.js`, todėl **NĖRA** įtraukti į šį sąrašą, nors statiniame HTML jų nėra).

Rasta **78 klasės**, kurios neatitinka nė vieno dabartinio elemento nei statiniame HTML, nei JS generuojamame turinyje. Sugrupuota pagal tikėtiną funkciją (matyt, ankstesnių puslapio iteracijų liekanos prieš konsolidavimą į `paslaugos-ir-kainos` centrinį puslapį):

### 2.1 Sena „store product grid“ komponentė (susijusi su 1.2 dalies failais)

| Klasė | Naudojama | Pasiūlymas |
|---|---|---|
| `.store-products` | ne | ištrinti kartu su 1.2 failais |
| `.store-product-grid` | ne | ištrinti |
| `.store-product` | ne | ištrinti |
| `.store-product-photo` | ne | ištrinti |
| `.store-photo` | ne | ištrinti |
| `.store-section-head` | ne | ištrinti |
| `.crop-one` | ne | ištrinti |
| `.crop-two` | ne | ištrinti |
| `.crop-three` | ne | ištrinti |
| `.crop-four` | ne | ištrinti |

### 2.2 Sena „timeline“ animacija (susijusi su JS, žr. 3 dalį)

| Klasė | Naudojama | Pasiūlymas |
|---|---|---|
| `.output` (kontekste `.timeline .output`) | ne — jokio `.timeline` elemento HTML faile nėra | ištrinti kartu su `.animated-timeline` blokais |

### 2.3 Senos „approach“/„principles“/„path“/„process“ sekcijos

| Klasė | Naudojama | Pasiūlymas |
|---|---|---|
| `.approach-card` | ne | ištrinti |
| `.approach-grid` | ne | ištrinti |
| `.principles` | ne | ištrinti |
| `.process-layout` | ne | ištrinti |
| `.path-arrow` | ne | ištrinti |
| `.path-item` | ne | ištrinti |
| `.path-list` | ne | ištrinti |
| `.path-note` | ne | ištrinti |
| `.path-number` | ne | ištrinti |
| `.path-panel` | ne | ištrinti |
| `.path-panel-head` | ne | ištrinti |
| `.work-process` | ne | ištrinti |
| `.work-process-intro` | ne | ištrinti |
| `.work-section-head` | ne | ištrinti |

### 2.4 Senos kainodaros (pricing) kortelės — prieš `paslaugos-ir-kainos` konsolidaciją

| Klasė | Naudojama | Pasiūlymas |
|---|---|---|
| `.price-card` | ne | ištrinti |
| `.price-card-primary` | ne | ištrinti |
| `.price-total` | ne | ištrinti |
| `.pricing-boundary-bulb` | ne | ištrinti |
| `.pricing-card-kicker` | ne | ištrinti |
| `.pricing-choice-layout` | ne | ištrinti |
| `.pricing-choice-list` | ne | ištrinti |
| `.pricing-factor-card` | ne | ištrinti |
| `.pricing-factor-grid` | ne | ištrinti |
| `.pricing-grid` | ne | ištrinti |
| `.pricing-hub-hero` | ne | ištrinti |
| `.pricing-hub-hero-grid` | ne | ištrinti |
| `.pricing-path-card` | ne | ištrinti |
| `.pricing-path-head` | ne | ištrinti |
| `.pricing-quiz-note` | ne | ištrinti |
| `.pricing-quote-grid` | ne | ištrinti |
| `.pricing-scope-card` | ne | ištrinti |
| `.pricing-scope-grid` | ne | ištrinti |
| `.pricing-scope-section` | ne | ištrinti |
| `.pricing-services-section` | ne | ištrinti |
| `.scope-label` | ne | ištrinti |

*(Pastaba: šalia jų realiai naudojamos `.pricing-principles-strip`, `.pricing-principles-grid`, `.pricing-trigger` ir kt. — tos liko aktyvios, į šį sąrašą nepateko.)*

### 2.5 Senos kontaktų / „next step“ / FAQ sekcijos

| Klasė | Naudojama | Pasiūlymas |
|---|---|---|
| `.contact-booking-link` | ne | ištrinti |
| `.contact-booking-option` | ne | ištrinti |
| `.contact-hero-art` | ne | ištrinti |
| `.contact-quiz-link` | ne | ištrinti |
| `.contact-section` | ne | ištrinti |
| `.homepage-contact-card` | ne | ištrinti |
| `.mail-card` | ne | ištrinti |
| `.mail-check` | ne | ištrinti |
| `.next-card` | ne | ištrinti |
| `.next-option` | ne | ištrinti |
| `.next-step` | ne | ištrinti |
| `.quiz-contact-icon` | ne | ištrinti |
| `.service-booking-link` | ne | ištrinti |
| `.service-cta` | ne | ištrinti |
| `.service-cta-actions` | ne | ištrinti |
| `.service-cta-card` | ne | ištrinti |
| `.faq-all-link` | ne | ištrinti |
| `.faq-bottom-cta` | ne | ištrinti |
| `.faq-category-nav` | ne | ištrinti |
| `.faq-layout` | ne | ištrinti |
| `.first-clients` | ne (šalia naudojamos `.first-clients-panel` — kitas pavadinimas) | ištrinti |
| `.first-clients-grid` | ne | ištrinti |

### 2.6 Įvairios pavienės klasės

| Klasė | Naudojama | Pasiūlymas |
|---|---|---|
| `.button-outline` | ne | ištrinti |
| `.card-number` | ne | ištrinti |
| `.copy-message` | ne | ištrinti |
| `.fine-print` | ne | ištrinti |
| `.legacy-anchor` | ne | ištrinti |
| `.narrow` | ne | ištrinti |
| `.project-caption` | ne | ištrinti |
| `.project-index` | ne | ištrinti |
| `.project-status` | ne | ištrinti |
| `.tag` | ne | ištrinti |

---

## 3. JS: `script.js` funkcijos / event listener'iai

`script.js` turi 5 pagrindines inicializavimo funkcijas: `initPricingPanels()`, `initQuiz(form)`, `initLeadForm(form)`, `initConsentBanner()`, `initExitIntentPopup()`. **Visos penkios iškviečiamos ir realiai naudojamos** — patikrinta, kad jų DOM taikiniai (`#quiz-form`, `#lead-form`, `.pricing-trigger` per `data-pricing-open`, ir t. t.) egzistuoja HTML failuose arba yra kuriami dinamiškai pačių funkcijų viduje (pvz., kainų dialogo, „exit intent“ iššokančio lango, slapukų juostos ir atsiliepimų UI elementai — `.pricing-close`, `.review-chip`, `.exit-popup-close`, `[data-consent]` ir pan. — generuojami per `innerHTML`/`className` tame pačiame faile, taigi jie NĖRA negyvas kodas, nors statiniame HTML jų ir nerasite).

| Funkcija / selektorius | Naudojama | Pasiūlymas |
|---|---|---|
| `initPricingPanels()` | taip — iškviečiama, taikiniai (`.pricing-trigger`, `[data-pricing-open]`) yra 4 puslapiuose | palikti |
| `initQuiz(form)` | taip — `#quiz-form` yra `klausimynas/index.html` | palikti |
| `initLeadForm(form)` | taip — `#lead-form` yra `aptarti-projekta/index.html` | palikti |
| `initConsentBanner()` | taip — visada iškviečiama, kuria savo UI | palikti |
| `initExitIntentPopup()` | taip — visada iškviečiama, kuria savo UI | palikti |
| `.portfolio-browser` karuselė (homepage) | taip — `index.html` | palikti |
| `pricingCatalog` duomenų objektas | taip — naudojamas `initPricingPanels()` | palikti |

### 3.1 Vienintelis rastas negyvas JS/CSS ryšys: `.animated-timeline`

`script.js` (apie 199 eilutę) turi `IntersectionObserver` logiką, pritaikytą `doc.querySelectorAll('.animated-timeline')` elementams, o `styles.css` turi platų, kelis kartus dubliuotą stilių rinkinį šiai klasei (bazinis apibrėžimas + responsive override'ai + `prefers-reduced-motion` išimtis). **Tačiau nė vienas HTML elementas, nei statinis, nei JS generuojamas, niekada negauna `animated-timeline` klasės.** Tai — pilnai negyva funkcija (matyt, sena „proceso žingsnių“ laiko juosta, pakeista kitu komponentu).

| Elementas | Naudojama | Pasiūlymas |
|---|---|---|
| `script.js`: `.animated-timeline` observer logika (~1 blokas, ~10 eilučių) | ne | ištrinti kartu su CSS |
| `styles.css`: `.animated-timeline` + susiję selektoriai (keliose vietose: bazinis blokas, media query override'ai, reduced-motion override'ai) | ne | ištrinti |
| `styles.css`: `.timeline .output` (žr. 2.2) | ne | ištrinti |

---

## 4. Santrauka

| Kategorija | Kandidatų skaičius | Rekomendacija |
|---|---|---|
| Visiškai nenaudojami failai (1.1) | 27 | ištrinti |
| Failai, naudojami tik per negyvą CSS (1.2) | 12 | ištrinti kartu su CSS (2.1) |
| Failai, paminėti tik audito dokumente (1.3) | 19 | ištrinti |
| PNG šaltiniai be tiesioginio kodo ryšio (1.4) | 4–7 (priklauso nuo sprendimo) | palikti arba ištrinti — jūsų sprendimas |
| El. laiškų šablonai (1.5) | 3 | palikti (tikrinti prieš trinant) |
| Negyvos CSS klasės (2.1–2.6) | 78 | ištrinti |
| Negyvas JS/CSS ryšys (3.1) | 1 funkcija + susijęs CSS | ištrinti |

**Iš viso konkrečių trynimo kandidatų (failai): ~58–61**, **CSS klasių: 78**, **JS funkcijų/blokų: 1**.

Jokie failai ar kodo eilutės šiuo etapu nebuvo ištrinti — tai tik auditas kitam žingsniui.
