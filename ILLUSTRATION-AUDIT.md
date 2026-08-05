# Startuok illustration and website audit

Date: 2026-08-05  
Reviewed inputs: Startuok brandbook v2.2 and website package v2.4

## Executive summary

Startuok is a Lithuanian Shopify implementation studio for new stores, migrations, and integrations. The positioning is strong: practical delivery, direct communication, clear scope, and control after launch.

The original illustrations were consistent and technically competent, but they looked like internal SaaS diagrams rather than believable samples of commerce work. Their biggest problems were tiny baked-in text, repetitive card-and-connector layouts, weak commercial realism, and an illustration typeface that did not match the website.

The final package replaces the three homepage illustrations with large, responsive, code-built storefront campaign views for Ofisera, Glowina, and Topiniai. Each direction now has a full-width commercial photograph, readable live copy, one primary call to action, and a three-point assurance strip. Dense miniature product grids and repeated images were removed. The first impression now resembles a real ecommerce campaign rather than a compressed wireframe. The three service pages retain their realistic explanatory scenes for store creation, migration, and integrations. All concepts remain clearly identified as demonstrations rather than client work.

## Website structure

The site is a plain static website with no framework or build step.

| Route | Purpose |
|---|---|
| `/` | Homepage: three realistic storefront mockups, platform logos, services, process, pricing, FAQ, starter offer, CTAs |
| `/shopify-parduotuviu-kurimas/` | Shopify store creation service |
| `/migracija-i-shopify/` | Migration to Shopify service |
| `/shopify-integracijos/` | Shopify integrations service |
| `/klausimynas/` | Seven-step browser-only project questionnaire |
| `/aptarti-projekta/` | Project form that prepares an email through `mailto:` |
| `/privatumas.html` | Privacy information |
| `/404.html` | Not-found page |

Shared files: `styles.css`, `script.js`, `.nojekyll`, `CNAME`, `robots.txt`, `sitemap.xml`, `site.webmanifest`.

## Final homepage redesign (v3)

| Direction | Commercial message | Visual system | Active hero asset |
|---|---|---|---|
| Ofisera | Parents can prepare a child for school in one order | Strict black/white interface, restrained natural colour only in photography, practical offer and class-based reassurance | `assets/storefront-ofisera-hero.webp` |
| Glowina | Cosmetics and beauty procedures made understandable by skin need | Saturated raspberry, coral, butter yellow and lavender; joyful European beauty-campaign energy; no competitor assets copied | `assets/storefront-glowina-hero.webp` |
| Topiniai | Recognizable internet discoveries collected in one trustworthy store | Near-black, cobalt, cyan, magenta and acid lime; eight visible trend products; vertical-content rhythm without platform logos or copied social UI | `assets/storefront-topiniai-hero.webp` |

The source PNGs are retained beside the optimized WebPs. Every piece of Lithuanian copy is live HTML rather than text baked into an image. The carousel no longer autoplays; named Ofisera, Glowina, and Topiniai selectors give the visitor control. Browser addresses use `demo.startuok.lt/...`, and the frame explicitly says `Demonstracinis pavyzdys` before any fictional offer or price is shown.

### Concise visual system

- One campaign idea per store, one dominant photograph, one primary CTA.
- Desktop mockup split: approximately 40–43% live copy and 57–60% photography.
- Mobile mockup stacks readable copy above the complete campaign photograph; no product is hidden by a miniature catalogue grid.
- Interface text remains short, concrete, and understandable without ecommerce jargon.
- Trust information appears in a separate three-point strip, not over the main message.
- Photography contains no readable packaging, logos, trademarks, watermarks, or generated typography.
- Competitor references inform category expectations only; layouts, assets, wording, packaging and brand codes remain original.

## Complete SVG inventory and original usage

There are 23 SVG files: 18 illustration files/variants and five official partner logos.

### Original active illustrations

| Message | Desktop | Mobile | Original location |
|---|---|---|---|
| Homepage: clean storefront | `assets/mockup-01-final.svg` | `assets/mockup-01-mobile.svg` | `index.html` hero carousel |
| Homepage: mobile purchase | `assets/mockup-02-final.svg` | `assets/mockup-02-mobile.svg` | `index.html` hero carousel |
| Homepage: multi-market growth | `assets/mockup-03-final.svg` | `assets/mockup-03-mobile.svg` | `index.html` hero carousel |
| Store creation | `assets/visual-kurimas-final.svg` | `assets/visual-kurimas-mobile.svg` | `shopify-parduotuviu-kurimas/index.html` hero |
| Migration | `assets/visual-migracija-readable.svg` | `assets/visual-migracija-mobile.svg` | `migracija-i-shopify/index.html` hero |
| Integrations | `assets/visual-integracijos-readable.svg` | `assets/visual-integracijos-mobile.svg` | `shopify-integracijos/index.html` hero |

### Original unused drafts

- `assets/mockup-01.svg`
- `assets/mockup-02.svg`
- `assets/mockup-03.svg`
- `assets/visual-kurimas.svg`
- `assets/visual-migracija.svg`
- `assets/visual-integracijos.svg`

### Active official SVG logos - retained unchanged

- `assets/logos/shopify.svg`
- `assets/logos/stripe.svg`
- `assets/logos/paysera.svg`
- `assets/logos/dpd.svg`
- `assets/logos/klaviyo.svg`

The original SVG illustrations remain in the package as an unused comparison archive. No page references them now. Official logos remain active and should not be redrawn.

## Assessment of the original illustration style

### What worked

- Consistent navy, blue, pale-blue, and white palette.
- Dedicated desktop and mobile variants.
- Correct `<picture>` usage, dimensions, preload/lazy-load behavior, and descriptive alternative text.
- Honest disclaimer that fictional concepts are not client work.

### What reduced perceived quality

- The visuals resembled presentation-deck wireframes or generic SaaS diagrams rather than polished ecommerce work.
- Repeated browser cards and connector lines made different services look too similar.
- Large amounts of baked-in SVG copy became approximately 6-10 px at real display size.
- Embedded copy was not selectable, localizable, or fully represented by the image alternative text.
- SVGs used Arial while the website specified a Manrope/system stack.
- The site mixed detailed UI mockups, technical diagrams, outline icons, emoji/CSS art, and partner logos without one dominant visual grammar.
- Tilt, sheen, floating chips, mouse effects, grids, gradients, and repeated hover lifts competed for attention.

## Brandbook findings

The strongest brand principles are worth preserving:

- Calm premium, not conspicuous luxury.
- Technically precise but easy to understand.
- One meaningful blue action or state at a time.
- Graphics explain the work rather than fill space.
- White space remains a primary design element.
- Never invent clients, metrics, reviews, awards, or outcomes.

The written illustration direction was already correct - realistic ecommerce interfaces, mobile purchase flows, migrations, URL maps, and integration nodes - but the supplied brandbook example was a generic blank-card browser and contradicted that guidance.

Important production gaps:

- `#0F86FF` on white is only 3.57:1, so it should not carry normal-size text or the bright end of a white-text CTA. The refreshed site uses a darker action gradient while retaining the original blue for accents.
- Manrope is named but not shipped. Nonstandard weights such as 580/620/660 can be synthesized inconsistently. The refreshed CSS standardizes the active system to 400/600/700 weights.
- Only a raster logo lockup is supplied. A future brand-production pass should add faithful SVG, reverse, compact, wordmark-only, and favicon variants without redesigning the approved mark.

## Inspiration - principles, not copies

- [We Make Websites](https://www.wemakewebsites.com/): one strong commerce image per section, cinematic confidence, generous whitespace.
- [Ask Phill](https://askphill.com/): unmistakable niche positioning, bold hierarchy, evidence near the top.
- [Swanky](https://swankyagency.com/): art-directed storefront/device tableaux rather than generic browser diagrams.
- [Eastside Co](https://eastsideco.com/): large case-study imagery supported by verifiable proof.
- [Shopify](https://www.shopify.com/lt): outcome-first storytelling using merchant, product, device, and operational UI scenes.

The update borrows the transferable principles - scale, clarity, proof, and tangible commerce imagery - not their palettes, layouts, exact rotations, photography, or proprietary compositions.

## Prioritized replacement plan

| Priority | Replacement | Reason | Status |
|---|---|---|---|
| P0 | Three homepage concept pairs | They define the first impression and must look like believable work | Replaced with Ofisera, Glowina, and Topiniai live storefront mockups |
| P0 | Migration pair | Original was dense, text-heavy, and abstract | Replaced |
| P0 | Integrations pair | Original hub diagram lacked operational realism | Replaced |
| P1 | Store-creation pair | Original repeated the surrounding card-grid pattern | Replaced |
| P1 | CTA contrast and effect stacking | Bright CTA and simultaneous effects reduced clarity | Improved |
| P1 | Typography weight stability | Nonstandard weights depended on unavailable variable fonts | Improved |
| P2 | Partner-logo optical normalization | Official sources vary in shape and color | Existing containers retained; review later |
| P2 | Production logo family | Only one raster lockup exists | Future work |
| P2 | Authentic proof/case studies | Concepts cannot replace verified client work forever | Future work |

## Concise visual system: Pragmatic Premium Commerce

1. **Message first.** Every visual explains one client outcome without requiring decorative interpretation.
2. **Homepage shows plausible work.** The first screen uses responsive storefront interfaces with real navigation, merchandising, prices, and calls to action rather than abstract commerce art.
3. **Service visuals stay explanatory.** Store creation, migration, and integrations use recognizable products, parcels, databases, payment terminals, email, documents, and status lights.
4. **Three depth layers.** Studio surface, operational interface, and one status/action layer.
5. **Consistent light.** Soft daylight from the upper left, controlled blue shadows, subtle fine grain.
6. **Restrained palette.** Navy `#06142C`, ink `#07152E`, blue `#0F86FF`, periwinkle `#3157FF`, sky `#69B4FF`, off-white `#F5F8FD`; green only for verified success.
7. **Copy stays in HTML.** Product photography contains no readable labels or logos. Store names, navigation, prices, buttons, and disclaimers remain editable and accessible in the page.
8. **Responsive by design.** Homepage storefronts reflow from a wide desktop campaign to a stacked, readable mobile campaign; service artwork retains dedicated 3:2 and 1:1 delivery files.
9. **Purposeful motion only.** A short reveal or data pulse is enough. No permanent tilt, sheen, parallax, or multiple competing effects.

## New asset manifest

| Use | PNG source | Web delivery | Notes |
|---|---|---|---|
| Ofisera storefront | `assets/storefront-ofisera-hero.png` | `assets/storefront-ofisera-hero.webp` | Parent and child preparing a backpack; black/white campaign UI |
| Glowina storefront | `assets/storefront-glowina-hero.png` | `assets/storefront-glowina-hero.webp` | Model and four blank beauty products; saturated campaign UI |
| Topiniai storefront | `assets/storefront-topiniai-hero.png` | `assets/storefront-topiniai-hero.webp` | Eight recognizable trend products; bold social-commerce campaign UI |
| Store creation service | `assets/service-store-build.png` | `assets/service-store-build.webp` and `assets/service-store-build-mobile.webp` | Responsive explanatory scene |
| Migration service | `assets/service-migration.png` | `assets/service-migration.webp` and `assets/service-migration-mobile.webp` | Responsive explanatory scene |
| Integrations service | `assets/service-integrations.png` | `assets/service-integrations.webp` and `assets/service-integrations-mobile.webp` | Responsive explanatory scene |

The three active homepage sources are 1536 x 1024 and are delivered as optimized WebPs of approximately 98-135 KB. Store interface copy is rendered by HTML/CSS rather than baked into the photography. The former 1254 x 1254 product boards and their crops remain only as an unused archive. Service PNG sources remain 1536 x 1024 with optimized desktop and mobile WebPs.

`assets/og-startuok.png` is also refreshed as a cohesive 1200 x 630 social card. The prior card is preserved as `assets/og-startuok-legacy.png`.

## Plain-language illustration copy

All customer-facing illustration labels now describe the visible result rather than internal design or development terminology.

| Illustration | Main message | Supporting message |
|---|---|---|
| Ofisera storefront | `Mokslo metams pasiruoškite vienu kartu.` | A parent-focused back-to-school offer, class-based sets, price cue, and one direct action |
| Glowina storefront | `Daugiau spindesio kasdien.` | Cosmetics and beauty procedures explained in plain language with one primary and one secondary action |
| Topiniai storefront | `Matai internete? Randi čia.` | Eight recognizable internet discoveries, weekly-newness cue, and one direct action |
| Store creation | No overlay labels | The adjacent hero text explains the service |
| Migration | No overlay labels | The adjacent hero text explains the service |
| Integrations | No overlay labels | The adjacent hero text explains the service |

The homepage browser bar now shows `demo.startuok.lt/ofisera`, `demo.startuok.lt/glowina`, or `demo.startuok.lt/topiniai`, together with an immediate demonstration label. Dense product grids were removed because each campaign must carry one message clearly. A clear note states that the names, offers, and prices are demonstrational. The two floating text chips were also removed from every service illustration so the artwork has more space and the explanation remains in the adjacent page copy.

## Ready-to-use generation prompts

The following three prompts reproduce the final text-free campaign photography used by the live homepage storefronts. Store names, navigation, offers, prices, and buttons are added in HTML/CSS for accuracy and responsiveness. The older square product-board prompts are retained below as an archive; they are no longer used above the fold. Service prompts reproduce the three service-page illustrations.

### Final v3-1. Ofisera parent-focused campaign

```text
Use case: website-hero
Asset type: photorealistic landscape ecommerce campaign photograph for a fictional Lithuanian school and office supplies store, intended to sit on the right half of a premium Shopify homepage hero.
Primary request: Create an exceptionally credible, publication-ready back-to-school campaign photo aimed at parents. Show a stylish parent and one primary-school-aged child preparing for the new school year together at a bright white desk: they are naturally packing a clean black backpack with notebooks, a pencil case, colored pencils, a ruler, and a reusable water bottle. The interaction should feel warm, competent, practical, and real—not sentimental stock photography.
Scene/backdrop: minimal high-end white studio/home-study setting with a white wall, subtle black shelving details, and generous clean negative space; the subjects and school supplies sit mainly in the right two-thirds of the composition so the image crops well.
Style/medium: real contemporary Scandinavian-style commercial lifestyle photography, premium ecommerce campaign quality, understated fashion editorial polish, not illustration, not CGI, not a collage.
Composition/framing: wide 3:2 landscape; waist-up/desk-level framing; one parent and one child only; clear product story at first glance; backpack, notebooks and pencil case all plainly visible; believable proportions; no cut-off hands; enough padding around faces and objects for responsive cropping.
Lighting/mood: soft directional morning window light, crisp whites, natural skin tones, gentle controlled shadows, calm confident mood.
Color palette: predominantly white, black, graphite and warm gray, with restrained accents from real school supplies in cobalt blue, tomato red and sunny yellow.
Materials/textures: realistic canvas backpack, paper notebooks, wood pencils, metal ruler, matte plastic bottle, cotton clothing.
Text: none.
Constraints: no readable labels, no letters, no words, no numbers, no school name, no logos, no trademarks, no watermark, no duplicated limbs, no malformed fingers, no extra people, no visible computer screens, no artificial plastic-looking skin. Clothing must be simple black, white, or gray with no branding.
Avoid: generic corporate stock-photo smiles, overly posed subjects, pastel nursery styling, navy corporate branding, cluttered shelves, excessive props, cartoon look, 3D render, fake typography.
```

### Final v3-2. Glowina beauty campaign

```text
Use case: website-hero
Asset type: photorealistic landscape beauty ecommerce campaign photograph for a fictional Lithuanian cosmetics and beauty-services Shopify store, intended for the right half of a premium homepage hero.
Primary request: Create a bold, joyful, genuinely commercial Gen-Z beauty campaign that immediately communicates cosmetics plus expert beauty care. Show one confident young adult woman with luminous natural skin, playful but tasteful makeup, and healthy textured hair, holding one completely blank coral-pink skincare bottle near her cheek. On a glossy pedestal in the foreground, show a small curated lineup of three additional blank cosmetic products: a serum dropper bottle, a moisturizer jar, and a lip product. The face and products must both be clear and believable.
Scene/backdrop: energetic studio set built from original abstract rounded forms and layered color fields; no resemblance to any single real campaign; composition concentrated in the center-right with clean cropping margins.
Style/medium: real premium European beauty advertising photography, current 2026 ecommerce campaign polish, editorial yet accessible, not illustration, not 3D render, not a collage.
Composition/framing: wide 3:2 landscape; medium close-up portrait; model on the right half, products clearly staged along the lower foreground; strong diagonal movement and depth; all products fully visible; enough padding around face and bottle for responsive cropping.
Lighting/mood: bright soft beauty lighting, luminous skin, glossy highlights, subtle colored bounce light, uplifting confident mood.
Color palette: saturated raspberry pink, coral, butter yellow and lavender with a restrained deep plum anchor; fresh and energetic rather than pale luxury beige.
Materials/textures: realistic skin, hair, glass, soft-touch cosmetic plastic, cream, glossy lacquered pedestal.
Text: none.
Constraints: one adult person only; no readable packaging labels; packaging must be completely blank; no letters, no words, no numbers, no logos, no trademarks, no watermark, no duplicated products, no malformed hands or fingers, no excessive skin retouching, no plastic-looking CGI skin, no medical claims.
Avoid: copying OnlyBio, Stars From The Stars, or any recognizable brand campaign; muted dusty spa aesthetic; generic white-background product grid; excessive florals; soap bubbles; floating objects; neon cyberpunk; childish candy styling; illegible pseudo-text.
```

### Final v3-3. Topiniai eight-product campaign

```text
Use case: website-hero
Asset type: photorealistic landscape ecommerce campaign photograph for a fictional Lithuanian viral-trend products Shopify store, intended for the right half of a premium homepage hero.
Primary request: Create an energetic, credible 'viral drop' commercial product scene containing exactly eight clearly recognizable current social-commerce trend items, each distinct and fully visible: 1) a compact pastel thermal mini printer with one completely blank paper curl, 2) a small sunset projection lamp glowing amber, 3) a compact rechargeable neck/handheld fan, 4) a portable smoothie blender cup, 5) a magnetic phone selfie light on a short tripod beside one generic phone with a blank screen, 6) a stainless-steel facial ice roller, 7) a large insulated tumbler with handle, and 8) a mini label maker with no printed label. Arrange them as a premium coordinated product drop, not a catalog grid.
Scene/backdrop: bold original studio set with layered vertical panels and curved platforms that subtly recall fast-moving vertical social video; cobalt-blue base, sharp cyan and magenta light accents, acid-lime detail, and deep near-black anchors.
Style/medium: real high-end Gen-Z ecommerce product campaign photography, contemporary 2026 social-commerce energy, crisp and polished, not illustration, not 3D render, not a collage.
Composition/framing: wide 3:2 landscape; clear hero hierarchy with the portable blender, mini printer, lamp and phone light slightly larger; exactly eight items; staggered heights and diagonal motion; every product individually readable at thumbnail size; generous crop padding; products concentrated center-right; no overlaps that obscure identity.
Lighting/mood: bright controlled studio flashes, crisp realistic shadows, one warm lamp glow, colorful edge light, exciting and fresh but still trustworthy enough for a real store.
Materials/textures: realistic molded plastic, brushed stainless steel, glass blender jar, silicone, anodized metal, blank smartphone glass.
Text: none.
Constraints: no people; no hands; no readable labels; no letters; no words; no numbers; no hashtags; no logos; no trademarks; no TikTok mark; no social-media UI icons; no watermark; phone screen completely blank; printer paper completely blank; label maker output blank; exactly eight product types; believable product construction and scale.
Avoid: cheap marketplace collage, floating physics, neon cyberpunk darkness, repeated products, mystery gadgets, toy-like proportions, clutter, packaging boxes, text-like marks, flat lay, rigid 2x2 or catalog grid.
```

### Archived v2 homepage product-board prompts

#### Archived 1. Homepage - Ofisera product board

```text
Use case: product-mockup
Asset type: square homepage ecommerce product-photography board for a fictional Lithuanian Shopify stationery and school-supplies store; the store name must not appear.
Primary request: Create one photorealistic commercial catalog image arranged as an exact 2x2 grid of four equal square photographic panels with clean, straight, even white gutters separating every quadrant.
Panel 1: a modern office desk set with a blank weekly planner and a closed notebook.
Panel 2: premium pens, highlighters, and a pencil case for back-to-school.
Panel 3: a stylish school backpack and a reusable water bottle.
Panel 4: a desk organizer with a calculator, tape dispenser, and sticky notes.
Style/medium: crisp contemporary ecommerce catalog photography; realistic product proportions, construction, and materials.
Composition/framing: perfectly square overall canvas; strict two-columns-by-two-rows layout; four equal square panels; each quadrant independently crop-ready, uncluttered, and centered; no object crosses a gutter or panel boundary; exactly the four requested product groupings, one per panel.
Lighting/mood: soft natural studio daylight, clean highlights, gentle controlled shadows, calm premium mood.
Color palette: calm navy, powder blue, cream, with only small warm-yellow accents.
Materials/textures: realistic paper, fabric, coated metal, plastic, and soft-touch stationery surfaces.
Constraints: no people; no hands; no readable labels; no letters; no words; no numbers; no logos; no brand names; no trademarks; no watermark; no duplicate products; no extra panels; no collage overlap; keep gutters pure white and uniform.
```

The first output required one targeted correction to remove duplicated stationery and calculator markings from the lower-right panel:

```text
Use case: precise-object-edit
Asset type: square homepage ecommerce product-photography board
Input images: Image 1 is the edit target.
Primary request: Change only the bottom-right quadrant. Preserve the exact square canvas, exact 2x2 grid, equal panel sizing, pure white gutters, lighting, color palette, camera treatment, and the other three quadrants unchanged. In the bottom-right quadrant, remove the notebook, all pens, all pencils, and scissors so no product duplicates another quadrant. Keep a premium navy desk organizer as the main object, with a blank calculator, tape dispenser, and cream/powder-blue/warm-yellow sticky-note pads arranged neatly. Make every calculator key completely blank and unmarked, and make its display blank.
Constraints: exact 2x2 grid; change only the bottom-right panel; no people; no hands; no readable labels; no letters; no words; no numbers; no mathematical symbols; no logos; no brand names; no trademarks; no watermark; no duplicate products; no extra products; no object crossing panel boundaries.
```

#### Archived 2. Homepage - Glowina product board

```text
Use case: product-mockup
Asset type: photorealistic ecommerce product-photography board for a premium homepage mockup
Primary request: Create one square image containing an exact 2x2 grid of four equal square commercial beauty photo panels, separated by clean, perfectly even warm-cream gutters.
Scene/backdrop: Four independent refined studio tabletop scenes, each fully contained in its own quadrant.
Subject: Top-left: one elegant serum bottle and one moisturizer jar with completely blank minimal packaging. Top-right: one lipstick, one blush compact with visible powder, and one makeup brush. Bottom-left: a spa facial-treatment setup with folded towels, one gua sha stone, and a restrained soft botanical detail. Bottom-right: one body-care bottle, one candle, and one bath accessory.
Style/medium: Photorealistic modern luxury beauty editorial product photography for a fictional Lithuanian Shopify cosmetics and beauty-services store. Real commercial photography, not illustration or 3D render.
Composition/framing: Strict orthogonal 2 columns by 2 rows; four equal square panels; straight cream vertical and horizontal gutters crossing exactly at canvas center; no overlaps across gutters; every quadrant independently crop-ready, centered, balanced, and visually distinct; products do not touch panel edges.
Lighting/mood: Soft directional window light, elegant calm spa mood, controlled natural shadows.
Color palette: Warm cream, blush, dusty rose, restrained burgundy accents.
Materials/textures: Realistic transparent glass, viscous serum liquid, cream, ceramic, candle wax, soft towels, polished stone, and makeup powder.
Constraints: No people. No readable labels. No brand name Glowina anywhere. No letters, words, numerals, logos, monograms, trademarks, signatures, watermark, or decorative pseudo-text. Packaging surfaces must be completely blank. Exact 2x2 layout only. No duplicate products. Four discrete photographs with clean gutters, not one continuous scene.
Avoid: extra panels, unequal panels, diagonal dividers, collage overlaps, repeated objects, floating objects, excessive flowers, busy props, harsh reflections, plastic-looking CGI, text-like marks.
```

#### Archived 3. Homepage - Topiniai product board

```text
Use case: product-mockup
Asset type: square homepage ecommerce product-photography board
Primary request: Create a photorealistic commercial product-photography board for the fictional Lithuanian viral internet-trend product store concept "Topiniai"; the store name is context only and must not appear anywhere in the image.
Scene/backdrop: an exact 2 by 2 grid of four equal square studio-photo panels, separated by straight, clean, even pale-gray gutters; no outer frame and no overlap between quadrants.
Subject: exactly four distinct product setups, one independently centered setup per quadrant:
1. compact pastel mini thermal printer with a single blank white paper curl;
2. compact sunset projection lamp casting one clean amber-orange circular glow;
3. stainless-steel facial ice roller paired with one compact unbranded skincare gadget;
4. magnetic smartphone light/tripod accessory paired with one generic blank smartphone.
Style/medium: bright contemporary Gen-Z ecommerce product photography, fully photorealistic, premium online-store catalog quality, realistic scale and materials, tasteful cobalt-blue, orange, and lime accent details over a clean neutral base.
Composition/framing: strict orthographic-looking 2x2 layout; all four panels exactly equal squares; each quadrant must be independently crop-ready, centered, and have generous internal padding; no product crosses a gutter; crisp silhouettes and balanced visual weight.
Lighting/mood: bright softbox studio lighting with crisp controlled shadows, clean high-key mood.
Materials/textures: believable pastel plastic, brushed stainless steel, glass or acrylic lamp lens, anodized metal tripod parts, matte blank phone surfaces.
Text: none.
Constraints: true exact 2x2 grid; exactly four different product setups; no people; no hands; no readable labels; no letters; no numbers; no brand name; no TikTok branding; no logos; no trademarks; no watermark; phone screen completely blank; printer paper completely blank; no duplicate products.
Avoid: collage-like overlaps, diagonal or curved gutters, unequal panel sizes, extra panels, extra products, packaging, social-media icons, text-like marks, garbled typography, floating accessories, messy props, neon cyberpunk lighting.
```

### 4. Service - store creation

```text
Use case: stylized-concept
Asset type: service-page hero - Shopify store creation
Create a believable visual about designing and building an online store from modular parts. Show one dominant storefront being assembled from a product gallery, navigation strip, product detail block, mobile preview, and launch-ready confirmation cue. Communicate structure and usability rather than coding.
Match the approved premium 2.5D commerce language, soft studio light, crisp geometry, matte objects, navy chrome, and Startuok palette.
Composition: wide 3:2; centered square safe area; one storefront-builder frame with at most four supporting modules.
Constraints: no readable words, letters, numbers, logos, Shopify mark, people, or watermark. Avoid generic analytics, neon, floating clutter, heavy gradients, and crypto styling.
```

### 5. Service - controlled migration

```text
Use case: stylized-concept
Asset type: service-page hero - controlled Shopify migration
Create a self-explanatory visual about safely moving an operating store into a new commerce environment. Show an older pale storefront/database module on the left, a brighter destination storefront on the right, and one controlled transfer path between them. Along the path depict exactly three checkpoints for audit, test, and launch using shapes and status lights. Move a few product, customer/order, and URL records in an orderly sequence.
Match the approved premium 2.5D systems style, soft studio lighting, modular geometry, matte objects, navy chrome, and Startuok palette.
Composition: wide 3:2; centered square safe area; clear left-to-right story.
Constraints: no readable words, letters, numbers, logos, Shopify mark, people, giant arrows, or watermark. Avoid generic dashboards, neon, clutter, heavy gradients, and crypto styling.
```

### 6. Service - integrations

```text
Use case: stylized-concept
Asset type: service-page hero - Shopify integrations
Create a realistic commerce-operations scene. Show one dominant online-store hub in the center, connected by clean visible data paths to five recognizable functional modules: payment terminal, parcel/delivery, warehouse inventory, email/marketing message, and accounting document. Small order and stock records should visibly move between the hub and modules. The scene must instantly communicate: one store connected to the systems the business uses.
Match the approved premium 2.5D commerce language, soft studio lighting, crisp modular geometry, matte objects, navy chrome, and Startuok palette.
Composition: wide 3:2; centered square safe area; one hub and five clearly spaced satellites.
Constraints: no readable words, letters, numbers, logos, Shopify mark, people, or watermark. Avoid generic dashboards, neon, clutter, heavy gradients, and crypto styling.
```

### Bonus - homepage social card

```text
Use case: ads-marketing
Asset type: complete 1200 x 630 Open Graph card
Use the approved Startuok logo unchanged at upper left and the approved premium storefront scene on the right. Use a pale architectural studio field, generous safe margins, and a large dark navy geometric sans-serif headline on the left.
Text (verbatim): "Shopify kūrimas, migracija ir integracijos"
Preserve Lithuanian diacritics exactly. Use no other words, logos, metrics, people, or watermark.
```

These assets were created with the built-in ImageGen workflow, then exported into the project as PNG sources and optimized WebP delivery files.

## GitHub Pages work completed

- Preserved the static, build-free architecture.
- Preserved `.nojekyll` and the production `CNAME`.
- Added `.github/workflows/deploy-pages.yml` using the official GitHub Pages artifact workflow.
- Changed web-app manifest `start_url` and `scope` to relative values.
- Reworked 404 assets and navigation to support a repository Pages base path as well as the custom domain.
- Kept canonical URLs, structured data, social URLs, `robots.txt`, and `sitemap.xml` pointed at `https://startuok.online/`, which remains the intended production domain.

## Quality checks

- Eight HTML pages parsed successfully.
- Exactly one H1 per page.
- No duplicate IDs.
- JSON-LD parses successfully.
- No missing local links, assets, fragments, image alternative text, or image dimensions.
- No root-absolute runtime asset/navigation references remain.
- Final browser review at 1440 x 900 and 390 x 844 found no console warnings or errors and no horizontal overflow.
- All three 1536 x 1024 campaign photographs were visually inspected for realistic anatomy/products, clean responsive crops, correct fictional product labels, no unwanted real logos or garbled extra text, and correct loading.
- Ofisera, Glowina, and Topiniai selectors, previous/next desktop arrows, dynamic demo address, `aria-current`, and `aria-hidden` states were tested in the browser. Autoplay is intentionally disabled.
- Homepage copy remains live HTML at desktop and mobile breakpoints; mobile named selectors fit without clipping.
- The three service-page desktop images and three square mobile crops were inspected for message retention and focal-point safety.

## Recommended next phase

1. Replace concepts with authentic case studies as soon as permission exists; keep the same art direction and add verified outcomes only.
2. Add one annotated sample deliverable per service: structure map, migration checklist, integration rules, or handoff guide.
3. Produce a faithful SVG/responsive logo family and measurable clear-space rules.
4. Refactor the accumulated CSS override layers into one maintainable token-driven stylesheet.
5. If Manrope is essential, self-host a licensed variable WOFF2 subset; otherwise continue with the standardized system-font weights.

## V4 realism and glamour update — 2026-08-05

This refinement deliberately keeps the approved Ofisera direction unchanged. Glowina and Topiniai retain their existing layouts and commercial intent, but the product photography now behaves much more like a real merchant campaign.

### Replaced campaign assets

| Store | PNG source | Optimized website asset | Result |
|---|---|---|---|
| Glowina | `assets/storefront-glowina-hero-v4.png` | `assets/storefront-glowina-hero-v4.webp` | Original adult model, realistic cosmetics construction, exact fictional labels, rose-metal reflections, deeper glamour lighting |
| Topiniai | `assets/storefront-topiniai-hero-v4.png` | `assets/storefront-topiniai-hero-v4.webp` | Eight credible, correctly scaled gadgets with visible seams, controls, materials, ports and contact shadows |

The former files remain in the project as rollback sources, while the homepage loads the `-v4.webp` files.

### Glowina fictional packaging

- `VELYSERA` — rose-gold glass face serum with a real dropper, thick glass base and threaded neck.
- `ROSAVENNE` — ivory skincare jar with a separate cap, inner vessel and rose-metal collar.
- `SORELIVA` — transparent berry lip-oil tube with a real wiper/cap proportion.
- `CAVERYNE` — deep-plum fragrance or glow-mist bottle with thick glass and a faceted cap.

These are newly invented working names for the demonstrational artwork. Obvious exact-name beauty collisions found in earlier drafts were removed, but this lightweight web screen is not a legal clearance or a claim of registered ownership. A formal trademark search is still required before commercial use.

The live Glowina wordmark is HTML/CSS rather than baked into the photograph. It now uses a high-contrast italic serif, a restrained rose-metal sparkle, a small `BEAUTY STUDIO` descriptor and a deeper plum/cherry palette. This remains sharp and accessible at both breakpoints.

### Topiniai product construction

1. Palm-size clamshell thermal printer with a paper exit, lid seam, status light and blank roll.
2. Compact jet handheld fan with a circular turbine grille, slim handle, power control and charging port.
3. 475 ml-class portable blender with a transparent threaded jar, carry loop, blade, ribbed motor base and one-button control.
4. Generic smartphone on a folding tripod with a small rectangular magnetic LED light.
5. Vacuum-insulated handled tumbler with steel rim, lid and straw.
6. Aluminum sunset projector with a convex lens, tilting U-bracket, base and power lead.
7. Stainless facial ice roller with a credible axle, chilled metal drum and ergonomic handle.
8. Rechargeable fabric shaver with a perforated steel head, clear lint chamber, switch and USB-C port.

The proportions were grounded in current official product construction references: [Phomemo M02](https://phomemo.com/en-ca/products/m02-portable-printer), [JisuLife Life9](https://jisulife.com.in/products/jisulife-handheld-fan-life9), [BlendJet](https://blendjet.com/), [Ulanzi magnetic phone light](https://www.ulanzi.com/products/ulanzi-mfl01-mini-portable-phone-flash?country=US&currency=USD&variant=48013670908125) and [Ulanzi phone tripod](https://www.ulanzi.com/en-ca/collections/all-products/products/phone-selfie-stick-tripod-m003). Only functional geometry and material logic were referenced; no brand marks, packaging, UI or product photos were copied into the final campaign.

Glowina's campaign energy was benchmarked against the clarity and merchandising rhythm of [OnlyBio](https://onlybio.life/) and [Stars From The Stars](https://stars.pl/), plus the tactile restraint of [Gisou](https://gisou.com/) and [Typology](https://www.typology.com/). The final art direction is original and intentionally avoids their logos, product names and recognisable packaging systems.

### Ready-to-use Glowina prompt

```text
Use case: ads-marketing.
Asset type: wide 3:2 ecommerce beauty hero photograph.

Edit the supplied Glowina hero into an exceptionally credible premium Polish-European beauty-retailer campaign. Preserve the practical composition: an original adult woman on the left half, four large retail beauty products grouped clearly on the right half, ample clean space and a safe crop for a website hero. Make it look like a real high-budget cosmetics campaign photographed in a studio, not CGI and not an illustration.

The model has luminous but realistic skin texture, refined glossy makeup, defined lashes, a rose-wine lip, soft sculpted cheek and glossy Hollywood waves; sophisticated, warm and approachable. Wardrobe: deep-plum satin with one subtle champagne-sequin detail. Set: deep aubergine-to-berry gradient, polished rose-gold mirrored plinth, restrained star-like bokeh, realistic contact shadows and reflections.

Create four physically credible, manufacturable cosmetic packages with seams, caps, pumps, glass thickness and label stock. Front-facing labels contain only these exact short fictional brand names, one per product, with no other visible text: VELYSERA on a rose-gold glass serum dropper; ROSAVENNE on an ivory skincare jar; SORELIVA on a transparent berry lip-oil tube; CAVERYNE on a deep-plum fragrance or glow-mist bottle. Spell each exactly.

No word Glowina inside the photograph. No existing trademarks, competitor logos, watermarks, pseudo-text or extra typography. Use an 85 mm commercial-photography feel, believable material imperfections, correct anatomy and geometry, and subtle depth of field while keeping every label readable. Keep the face and all products inside the central 85% for responsive crops.
```

### Ready-to-use Topiniai prompt

```text
Use case: product-mockup.
Asset type: wide 3:2 social-commerce hero product photograph.

Edit the supplied Topiniai hero without changing its bold cobalt, magenta, lime and deep-slate art direction. Preserve one clean eight-product studio tableau, but rebuild every object with real manufacturing geometry, credible proportions and realistic relative scale. Show exactly: a pocket clamshell thermal printer with a 53 mm blank paper roll; a compact jet handheld fan with a circular turbine grille and slim handle; a 475 ml portable blender with a clear threaded jar, carry loop, stainless blade and ribbed one-button motor base; a generic smartphone on a compact folding tripod with a small rectangular magnetic LED light; a vacuum-insulated handled tumbler with lid and straw; a small aluminum sunset projector with convex lens and tilting bracket; a stainless facial ice roller; and a rechargeable fabric shaver with a perforated steel head and clear lint chamber.

Make this look like a real high-end product shoot, not CGI: visible molded seams, hinges, vents, buttons, charging ports, screw points, glass thickness, brushed metal, soft-touch ABS, fingerprints controlled but not erased, natural contact shadows and physically believable reflections. Products stand securely on plinths or the studio floor; nothing floats. Keep all eight products individually readable and do not duplicate any item.

No real logos, trademarks, labels, readable text, platform icons, watermarks, extra accessories, impossible controls or toy-like geometry. Phone screen may show only a simple abstract magenta-to-cobalt gradient. Use a crisp catalogue lens and even focus so construction details remain visible in a responsive website crop.
```

Both V4 images were produced in the built-in ImageGen editing workflow, visually inspected at original resolution, exported as PNG sources and optimized to WebP for delivery.

### V4 verification

- Static validator: 8 pages, 0 errors, 0 warnings.
- JavaScript syntax check: passed.
- Browser review: 1440 × 900 and 390 × 844.
- Named store controls: Ofisera, Glowina and Topiniai remain usable without autoplay.
- Images: 15 loaded, 0 broken on the homepage test.
- Responsive result: no horizontal overflow at 390 px, all V4 images report their full 1536 × 1024 intrinsic dimensions.
- Browser console: 0 warnings, 0 errors.
