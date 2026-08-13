# Startuok brandbook

**Versija:** 2.5
**Data:** 2026-08-13

## 1. Prekės ženklo esmė

**Startuok** kuria, perkelia ir su apskaitos, sandėlio bei kitomis sistemomis sujungia Shopify parduotuves taip, kad jas būtų lengva paleisti, valdyti ir auginti.

**Pozicionavimas:** praktiškas Shopify partneris savarankiškai pradedantiems, kūrėjams ir augančioms įmonėms, kuriems reikia tiesioginio bendravimo, aiškios apimties ir tvarkingo perdavimo - be nereikalingo agentūrinio sluoksnio.

**Pažadas:** apimtis prieš darbus. Matomas progresas. Kontrolė po paleidimo.

**Pagrindinės paslaugos:**

1. Shopify parduotuvės kūrimas.
2. Migracija į Shopify.
3. Shopify integracijos.

## 2. Charakteris ir darbo principas

- Ramus premium, ne demonstratyvus prabangumas.
- Kruopštus ir techniškai tikslus, bet lengvai suprantamas.
- Tiesioginis, lankstus ir žmogiškas.
- Grafinis dizainas padeda suprasti, o ne užpildo tuščią vietą.
- Judesys nukreipia žvilgsnį, bet netrukdo skaityti ar atlikti veiksmą.
- Nenaudojami netikri atsiliepimai, klientų logotipai, apdovanojimai ar rezultatų skaičiai.

## 3. Balso tonas

Rašome trumpai ir konkrečiai. Pirma įvardijame kliento situaciją, tada rezultatą, darbų apimtį ir ribas.

Į skaitytoją kreipiamės **„jūs“**. Pagal situaciją vartojame **„jūsų projektas“**, **„jūsų parduotuvė“** arba **„jūsų veikla“**. Žodis **„verslas“** tinka tik tada, kai kalbama apie būtent įmonei būdingą faktą, o **„komanda“** — tik apie realią žmonių grupę. Bendriniu kliento pavadinimu šių žodžių nenaudojame.

**Naudoti:**

- „Sukuriame Shopify parduotuvę, kurią lengva paleisti, valdyti ir auginti.“
- „Pirma taisyklės. Tada technologija.“
- „Migraciją planuojame kaip kontroliuojamą paleidimą.“
- „Apimtį ir kainą patvirtiname prieš darbus.“

**Vengti:** „revoliucinis“, „unikalus sprendimas kiekvienam“, „maksimaliai optimizuotas“, „pakelsime pardavimus į kitą lygį“, „geriausi rinkoje“.

**Pastabos:** antriniai paaiškinimai, ribos ir išimtys pradedami `*` ir pateikiami mažesniu, ramesniu tekstu.

**Aiškios kalbos principas:** techninį terminą paliekame tik tada, kai jis padeda klientui priimti sprendimą. Pirmą kartą paminėtą siauresnį terminą paaiškiname paprastais žodžiais, pavyzdžiui: „papildomi produktų laukai („metafields“)“.

## 4. Logotipas

Naudojamas originalus `assets/startuok-logo.png`.

- Minimalus rekomenduojamas plotis skaitmenoje: 150 px.
- Palikti aiškią apsauginę zoną aplink logotipą.
- Nekeisti proporcijų, spalvų ar raidžių tarpo.
- Nedėti šešėlių, kontūrų, 3D efektų ar gradientų ant paties logotipo.
- Logotipas nėra dekoratyvinis fonas.

## 5. Spalvų sistema

| Pavadinimas | HEX | Paskirtis |
|---|---:|---|
| Navy | `#06142C` | Tamsios sekcijos, stiprus kontrastas |
| Navy 2 | `#0B2856` | Tamsių gradientų antras taškas |
| Blue | `#0F86FF` | Pagrindinis CTA, aktyvi būsena, nuoroda |
| Blue 2 | `#3157FF` | CTA ir akcentų gradientas |
| Sky | `#69B4FF` | Tamsių sekcijų akcentas |
| Ink | `#07152E` | Antraštės ir pagrindinis tekstas |
| Muted | `#61718B` | Antrinis tekstas |
| Line | `#D9E4F2` | Rėmeliai ir skyrikliai |
| Soft | `#F5F8FD` | Švelnūs sekcijų fonai |
| Soft blue | `#EDF5FF` | Sąveikos ir iliustracijų fonai |
| White | `#FFFFFF` | Pagrindinis fonas |

Mėlyna naudojama prasmingai: vienam pagrindiniam veiksmui, aktyviai būsenai, sekos numeriui arba vienam žodiniam akcentui.

### 5.1. Mygtukų kontrasto taisyklė

Visi CTA mygtukai naudoja tą patį mėlyną gradientą ir baltą tekstą. Balta užpildyto CTA variacija nenaudojama. Antriniam veiksmui naudojama tekstinė nuoroda, o ne konkuruojantis antras mygtukas.

- **CTA paviršius:** Blue / Blue 2 gradientas.
- **CTA tekstas:** tik baltas.
- **Antrinis veiksmas:** tekstinė nuoroda Ink arba Blue spalva, priklausomai nuo fono.

Minimalus teksto ir mygtuko fono kontrastas — 4,5:1.

Taisyklė galioja visoms būsenoms: įprastai, hover, focus, active, disabled, mobiliajame CTA ir tamsiose sekcijose.

**Techninė sąlyga.** Kiekviena `.button` taisyklė kartu nurodo mėlyną `background` ir baltą `color`. Ankstesnė `.button-outline` klasė nelaikoma atskira balta variacija. Antriniams veiksmams naudojama `.text-link` arba semantiškai atitinkama tekstinė nuoroda.

## 6. Tipografija

Šriftų sistema:

```css
Manrope, "Avenir Next", "Segoe UI Variable", Inter, system-ui,
-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

Šriftų failai svetainėje nekopijuojami. Naudojama sistemos atsarginė seka.

**Desktop (nuo 901 px):**

- H1: `clamp(38px, 4.2vw, 55px)`, svoris `660`, line-height apie `1.045-1.06`.
- H2: `clamp(28px, 3vw, 36px)`, svoris `620`, line-height apie `1.10-1.14`.
- Bazinis H3: 21 px, svoris `600`; išskirtinėse paslaugų kortelėse leidžiama 22-25 px.
- Navigacija: 14 px, svoris `580`.
- Hero paaiškinimas: 18 px; sekcijos paaiškinimas: 17 px; svoris `400`.
- Mygtukai: svoris `660`; tekstinės nuorodos: `620`.
- Eyebrow ir mikrožymos: svoris apie `700`, didžiosios raidės ir padidintas raidžių tarpas.

**Mobile (iki 900 px):**

- H1 svoris `680`, H2 `650`, H3 `620`.
- Iki 680 px: H1 `clamp(38px, 11.4vw, 50px)`, H2 `clamp(29px, 8.6vw, 37px)`.
- Mobilioji navigacija `620`, mygtukai `680`, hero paaiškinimas 16.5 px.
- Pagrindinis tekstas lieka `400`; svarbios žymos nėra ploninamos tiek, kad nukentėtų skaitomumas.

**Visos svetainės taikymas:** tie patys svorio principai naudojami paslaugų puslapiuose, kortelėse, kainose, DUK, klausimyne, formose, privatumo puslapyje, 404, navigacijoje ir poraštėje. 800-900 svoris paliekamas tik pavieniams mažiems simboliams, jei jo reikia kontrastui.

## 7. Maketas, tarpai ir paviršiai

- Turinio plotis: iki 1160 px.
- Horizontalus tarpas: 40 px desktop, 26 px mobile.
- Sekcijos vertikalus tarpas: apie 92 px desktop, 76 px planšetėje ir 64 px mobile. Ilgesnis turinys skaidomas ritmu, o ne dirbtiniu `min-height`.
- Mygtukų kampai: 13 px.
- Įvesties laukų kampai: 11 px.
- Kortelių kampai: 22 px.
- Didelių kompozicijų kampai: 30 px.
- Kortelės šešėlis: lengvas, mėlyno atspalvio, be pilko „purvo“.
- Vienoje sekcijoje vienas aiškus kompozicinis principas.
- Platformų juosta: 10 logotipų vienoje eilėje nuo 1201 px, 5 logotipai 901-1200 px, 3 iki 900 px ir 2 iki 680 px.

## 8. Grafinio dizaino kryptis

Pagrindinė kryptis - realistiškos, bet iliustracinės e. parduotuvės ir sistemų kompozicijos:

- naršyklės langai ir mobilios vitrinos;
- produktų, kolekcijų ir pirkimo kelio elementai;
- duomenų perdavimo, puslapių adresų susiejimo ir sistemų sujungimo vaizdai;
- aiškiai pažymėtos koncepcijos, ne pristatomos kaip klientų darbai;
- švelnios mėlynos šviesos, tinklelis ir mikrodetalės;
- baltas plotas turi išlikti pagrindine dizaino dalimi.

Vengti generinių žmonių nuotraukų, netikrų dashboardų, chaotiškų 3D objektų, neoninių spalvų ir skirtingų iliustracijų stilių viename puslapyje.

## 9. Judesio sistema

Judesys turi paaiškinti hierarchiją ir sąveiką.

- Bazinis easing: `cubic-bezier(.22, 1, .36, 1)`.
- Mikrovaldikliai: 180 ms; kortelių ir būsenų sąveikos: 280 ms; skilčių reveal: 560 ms.
- Reveal naudoja tik `opacity` ir iki 18 px `transform`; kortelių seka — 60 ms.
- Hero elementai pasirodo per maždaug 620 ms, o pagrindinis CTA tampa matomas ne vėliau kaip per 700 ms.
- Kortelių hover: 2-4 px pakilimas, rėmelio ir šešėlio sustiprėjimas.
- Hero kompozicija: subtilus 3D atsakas tik tiksliam žymekliui ir tik dideliame ekrane.
- DUK: sklandus išsiskleidimas ir aiški aktyvi būsena.
- Procesas: aktyvus etapas paryškinamas tik tada, kai jis skaitomas.
- Nenaudoti nuolat pulsuojančių CTA, ilgų intro, stipraus parallax ar efektų ant kiekvienos teksto eilutės.
- `prefers-reduced-motion` palaikymas yra privalomas.
- Turinys privalo likti matomas, jei JavaScript neužsikrauna.
- Mobiliajame ir liečiamuose ekranuose hover transformacijos išjungiamos, kad veiksmui užtektų vieno paspaudimo.

## 10. Numeracija ir emoji

**Numeracija paliekama tik tada, kai rodo tikrą seką:** procesas, migracijos perjungimas, klausimyno progresas.

Sekos numeriai rašomi be nulių priekyje: `1 / 2 / 3`. Dekoratyvinė numeracija nenaudojama paslaugų, rezultatų, „kada verta“ ar kitose lygiavertėse kortelėse.

Emoji naudojami klausimyne kaip greitos orientacijos ir emocinio lengvumo elementai. Jie nėra pagrindinė prekės ženklo iliustracijų sistema ir nenaudojami visose sekcijose.

## 11. Pagrindinio puslapio struktūra

1. Hero su nekintančiu H1 ir koncepcijų grafika.
2. Platformos ir integracijos juosta.
3. Trys paslaugos su situacija, apimtimi ir kainos orientyru vienoje kortelėje.
4. Bendras kainos ribų ir trečiųjų šalių išlaidų paaiškinimas.
5. Matomas klausimyno kvietimas lankytojui, kuris dar nežino tinkamos paslaugos.
6. Bendra skiltis **„Kaip dirbame“**, jungianti projekto eigą ir pirmųjų projektų pasiūlymą.
7. Kompaktiškas kontaktų CTA su „Cal.com“ rezervacija ir tiesiogine el. pašto nuoroda.

Pagrindiniai konversijos CTA veda į `https://cal.com/startuok/shopify-projekto-aptarimas` ir siūlo rezervuoti 20 min. pokalbį. Norintiems rašyti paliekama tiesioginė nuoroda į `labas@startuok.online`, o EmailJS naudojamas tik klausimyno pabaigoje paruoštai atsakymų santraukai išsiųsti. Kainų ir klausimyno mygtukai išlaiko savo konkrečią funkciją.

## 12. Paslaugų puslapių principas

Kiekvienas paslaugos puslapis kalba tik apie savo paslaugą:

- konkretus rezultatas;
- kada paslauga tinka;
- darbų apimtis ir ribos;
- ką gauna klientas ir ko reikia iš jo;
- nuoroda į vieną bendrą DUK centrą navigacijoje ir poraštėje;
- pagrindinis rezervavimo kalendoriaus CTA ir antrinė tiesioginė el. pašto nuoroda.

Pagrindiniame puslapyje techninės detalės nedubliuojamos.

Paslaugos ir kainos pagrindiniame puslapyje pateikiamos vienoje skiltyje. Kiekviena kortelė atsako į keturis klausimus: kam paslauga tinka, kokia pradinė vertė, kas į ją įtraukiama ir kur rasti detalią apimtį.

## 13. Kainodara

- Kainos rodomos pagal realią paslaugą ir projekto etapus.
- Pirmiausia rodomas aiškus visos paslaugos kainos orientyras ir svarbiausia į jį įtraukta apimtis.
- Mokėjimų etapai paaiškinami be dirbtinio kainos dalijimo, kol nėra patvirtinta konkreti projekto apimtis.
- Etapinis mokėjimas turi atitikti realią sutarties ir darbų eigą.
- Galutinė apimtis, kaina ir trečiųjų šalių išlaidos patvirtinamos raštu.
- Kainos neslepiamos, bet didelė suma nepateikiama be konteksto.

## 14. Pirmųjų klientų pasiūlymas

Pirmiems 3 sutartį pasirašiusiems klientams:

- 15 % nuolaida Startuok projekto darbams;
- 30 dienų pagalba po paleidimo;
- tiesioginis bendravimas su projektą vykdančiu žmogumi;
- lanksti apimtis ir mokėjimas etapais.

Nuolaida netaikoma Shopify planui, temoms, programėlėms ar kitų tiekėjų mokesčiams. Mainais prašoma atviro grįžtamojo ryšio ir, abiem pusėms sutikus, leidimo pristatyti projektą kaip darbų pavyzdį.

## 15. SEO standartas

Kiekvienas indeksuojamas puslapis privalo turėti:

- unikalų, aiškų `title`;
- unikalų meta aprašymą;
- vieną H1;
- canonical URL;
- Open Graph ir Twitter kortelės duomenis;
- prasmingą socialinį 1200 x 630 vaizdą;
- `lang="lt"` ir `inLanguage: lt-LT`;
- semantišką antraščių hierarchiją;
- prasmingus vaizdų `alt` tekstus;
- struktūrinius duomenis pagal turinį: Organization, WebSite, WebPage, Service, FAQPage, BreadcrumbList ar ContactPage;
- vidines nuorodas į susijusią paslaugą ir kitą veiksmą;
- įtraukimą į `sitemap.xml` ir tinkamas `robots` direktyvas.

404 puslapis turi `noindex,follow`. Struktūriniai duomenys turi sutapti su matomu turiniu.

## 16. Prieinamumas ir kokybės kontrolė

- Matomas klaviatūros fokusas.
- Veikiantis „Skip to content“ elementas.
- Mobilus meniu su teisingomis ARIA būsenomis.
- Mygtukai ir laukai turi aiškias žymas.
- DUK veikia klaviatūra.
- Kontrastas ir pagrindinis šriftas išlieka patogūs.
- Visi CTA mygtukai patikrinti pagal 5.1 taisyklę: mėlynas gradientas, baltas tekstas ir bent 4,5:1 kontrastas.
- Nėra horizontalaus slinkimo 360 px ekrane.
- Animacijos naudoja daugiausia `transform` ir `opacity`.
- Tikrinama 390 px, planšetė ir 1280-1440 px darbalaukis.
- Tikrinamos vidinės nuorodos, JSON-LD, unikalūs ID, vienas H1, forma ir klausimyno eiga.
- Poraštės autorinės teisės visada vienoje eilutėje: `© [einamieji metai] Startuok`. Metai svetainėje atnaujinami automatiškai, o `Startuok` gali būti šiek tiek tamsesnis už metus.

Techniniai kintamieji pateikti faile `brandbook/design-tokens.css`.

## 17. Tekstų kūrimo standartas

### 17.1. Privaloma informacijos seka

Kiekviena paslaugos skiltis turi atsakyti į klausimus tokia tvarka:

1. Kokia kliento situacija?
2. Koks konkretus rezultatas?
3. Kas bus padaryta?
4. Ko reikės iš jūsų?
5. Kokios ribos, priklausomybės ar rizikos?
6. Koks kitas veiksmas?

### 17.2. Sakinių taisyklės

- Viename sakinyje viena pagrindinė mintis.
- Pirmenybė teikiama veiksmažodžiui: „susiejame puslapių adresus“, o ne „atliekamas URL susiejimas“.
- Vengiama abstrakčių žodžių be paaiškinimo: „objektai“, „sluoksnis“, „architektūra“, „sprendimo lygis“, „gyvas startas“.
- Jei techninis terminas būtinas, iš karto įvardijamas jo praktinis rezultatas.
- Antraštė turi būti suprantama ir be po ja esančios pastraipos.
- CTA prasideda aiškiu veiksmu: „Susisiekti dėl projekto“, „Peržiūrėti kainų orientyrus“, „Siųsti užklausą“.
- Nežadami pardavimų, SEO pozicijų, terminų ar rezultatų garantai, kurių negalima pagrįsti.

### 17.3. Rekomenduojami pakeitimai

| Vengti | Naudoti |
|---|---|
| komanda / jūsų verslas / verslo atstovai | jūs, jūsų projektas, jūsų parduotuvė, jūsų veikla |
| pagrindiniai ekranai | svarbiausi puslapiai |
| mobilus pirkimo kelias suskaidytas | apsipirkti telefonu nepatogu |
| apimtis pagal ekranus | aiški darbų apimtis |
| gyvas perjungimas | galutinis perjungimas |
| migracijos inventorius | perkeliamų duomenų ir funkcijų sąrašas |
| tema padengia poreikį | tema atitinka poreikį |
| duomenų kontraktas | duomenų taisyklių aprašas |
| eksploatuojamas procesas | veikiantis ir stebimas procesas |
| metafields | papildomi produktų laukai („metafields“) |
| API jungtis | individualiai kuriama sistemų jungtis; API galima paaiškinti skliaustuose |
| URL / 301 nukreipimai | puslapių adresai / nuolatiniai nukreipimai |

### 17.4. Ko negalima sugalvoti

Be aiškaus šaltinio negalima pridėti:

- klientų, partnerių ar atliktų projektų pavadinimų;
- pardavimų, konversijos, greičio ar SEO rezultatų;
- kainų, terminų, nuolaidų ar palaikymo sąlygų;
- techninių integracijų, kurių galimybės nepatikrintos;
- sertifikatų, apdovanojimų, atsiliepimų ar rinkos lyderystės teiginių;
- teisinių, privatumo ar saugumo pažadų.

## 18. Tekstų generavimo užduoties šablonas

Šį šabloną naudoti kuriant arba atnaujinant svetainės tekstus:

```text
Užduotis: parašyti arba patikslinti [puslapio / skilties pavadinimas] tekstą Startuok svetainei.

Paslauga: [Shopify parduotuvės kūrimas / migracija / integracijos / kita]
Tikslinė situacija: [ką klientas turi dabar ir kas neveikia]
Norimas rezultatas: [ką klientas turi suprasti arba atlikti]
Patvirtinti faktai: [paslaugos, darbai, ribos, kainos, terminai]
Negalima keisti: [maketas, HTML struktūra, CTA, nuorodos ar kiti elementai]

Rašymo taisyklės:
- išlaikyk ramų, konkretų ir žmogišką Startuok toną;
- pirmiausia įvardyk situaciją, tada rezultatą, darbų apimtį ir ribas;
- į skaitytoją kreipkis „jūs“; pagal situaciją vartok „jūsų projektas“, „jūsų parduotuvė“ arba „jūsų veikla“;
- venk agentūrinių klišių ir nepaaiškinto techninio žargono;
- techninį terminą paaiškink paprastais žodžiais;
- viename sakinyje pateik vieną pagrindinę mintį;
- neišgalvok faktų, kainų, terminų, rezultatų ar garantijų;
- išlaikyk panašų teksto ilgį, kad nesikeistų maketas.

Pateik:
1. galutinį tekstą;
2. trumpą pakeitimų paaiškinimą;
3. neaiškių arba nepatvirtintų faktų sąrašą;
4. jei tai HTML puslapis, atnaujintus meta aprašymus ir su matomu turiniu sutampantį JSON-LD.
```

### 18.1. Teksto patikros sąrašas

Prieš publikuojant patikrinti:

- ar antraštė suprantama be papildomo konteksto;
- ar aišku, ką gaus klientas;
- ar „apimtis“ visur reiškia „darbų apimtį“;
- ar „verslas“ arba „komanda“ nevartojami kaip bendrinis kliento pavadinimas;
- ar techniniai terminai paaiškinti;
- ar nėra nepagrįstų pažadų;
- ar CTA aiškiai nurodo veiksmą;
- ar vienintelio DUK centro matomas tekstas sutampa su jo JSON-LD;
- ar meta ir socialinių kortelių aprašymai atitinka puslapį;
- ar teksto pakeitimai nesugadino mobiliojo ir darbalaukio maketo.

## 19. El. laiškų šablonai

Šis skyrius apibrėžia, kaip Startuok atrodo klientui siunčiamuose automatiniuose laiškuose (pvz. patvirtinimas po klausimyno ar projekto formos). Vidiniai pranešimai (pvz. užklausos pranešimas sau, `labas@startuok.online`) šio šablono nenaudoja — jiems pakanka paprasto teksto, nes juos mato tik Startuok pusė.

### 19.1. Kada naudojama

Klientui automatiškai išsiunčiamas laiškas iš karto po to, kai jis palieka kontaktą klausimyne arba projekto formoje. Tikslas — patvirtinti, kad užklausa gauta, ir sumažinti nerimą laukiant atsakymo. Tai nėra rinkodaros laiškas.

### 19.2. Struktūra

1. Logotipas (be jokių papildomų elementų aplink).
2. Eyebrow žyma didžiosiomis raidėmis, pvz. „UŽKLAUSA GAUTA“.
3. Trumpa, asmeniška antraštė su kliento vardu: „Ačiū, {{name}}.“
4. Viena pastraipa be pažadų dėl konkretaus termino (žr. 17.4).
5. Vienas švelnaus fono akcentas su projekto kryptimi (pvz. rekomenduojama paslauga iš klausimyno arba pasirinkta paslauga iš formos).
6. Neprivaloma antrinė nuoroda (pvz. į DUK) — ne mygtukas, o tekstinė nuoroda, kad išliktų vienas ramus akcentas.
7. Plona poraštė: „Startuok · el. paštas · Privatumo informacija“.

### 19.3. Spalvos ir šriftai el. laiškuose

El. pašto programos (ypač Outlook darbalaukyje) nepalaiko CSS kintamųjų (`var(--startuok-...)`) ir dažnai apkarpo `<style>` bei web šriftus. Todėl šablone spalvos įrašomos tiesiai HEX kodais iš `design-tokens.css`, o ne per kintamuosius:

- Antraštė ir pagrindinis tekstas: Ink `#07152E`.
- Antrinis / poraštės tekstas: Muted `#61718B`.
- Eyebrow ir nuorodos: Blue `#0F86FF`.
- Akcento fonas: Soft blue `#EDF5FF`.
- Rėmelis: Line `#D9E4F2`.
- Fonas už kortelės: Soft `#F5F8FD`.

Šriftų šeima ta pati, kas svetainėje (`Manrope, "Avenir Next", "Segoe UI Variable", Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`). Kadangi svetainė ir taip Manrope failų nekopijuoja ir remiasi sistemos šriftais, el. laiškas atrodo nuosekliai be jokio kompromiso.

### 19.4. Ko nedaryti el. laiškuose

- Jokios judesio sistemos (9 skyrius) — el. pašto programos animacijų nerodo.
- Jokių dekoratyvinių gradientų fone — nevienodai atvaizduojama tarp programų.
- Tik vienas logotipas, jokių šešėlių ar kontūrų ant jo (4 skyrius galioja ir čia).
- Ne daugiau nei vienas ryškus akcentas per laišką (11 skyriaus principas: mėlyna naudojama prasmingai).
- Jokių nepagrįstų terminų pažadų („per 24 val.“ ir pan.), nebent tai patvirtintas realus SLA.

### 19.5. Techniniai reikalavimai

- `<meta name="color-scheme" content="light">` ir `<meta name="supported-color-schemes" content="light">` privalomi, kad tamsaus režimo pašto programos neapverstų spalvų — svetainė taip pat visada šviesi (`content="light"`).
- Maketas — lentelėmis (`<table>`), stiliai — inline, ne išoriniame `<style>` bloke, dėl Outlook suderinamumo.
- Logotipas kviečiamas iš viešo `https://startuok.online/assets/...` URL, ne kaip base64 — dauguma pašto programų blokuoja įterptus (base64) vaizdus.
- Kampų apvalinimas (`border-radius`) naudojamas kaip ir svetainėje (kortelė 22px, akcento blokas 11px), žinant, kad senesnis Outlook desktop jį ignoruos ir tiesiog parodys stačiakampį — tai priimtina degradacija.

### 19.6. Kintamieji (merge fields)

| Kintamasis | Reikšmė |
|---|---|
| `{{name}}` | Kliento vardas |
| `{{service}}` | Rekomenduojama (iš klausimyno) arba pasirinkta (formoje) paslaugos kryptis — tas pats kintamasis naudojamas ir vidiniame pranešimo šablone (žr. `email/template-a-pranesimas.txt`), kad abu šablonai gautų tą pačią reikšmę iš vieno siuntimo iškvietimo. |

### 19.7. Šaltinio failai

Klientui skirtas laiškas (Šablonas B): `email/patvirtinimo-laiskas.html`. Vidinis pranešimo laiškas (Šablonas A) turi du variantus — `email/template-a-pranesimas.txt` (paprastas tekstas) ir `email/template-a-pranesimas.html` (tos pačios struktūros HTML, patogesnis kopijuoti tiesiai į EmailJS HTML/Code Editor). Abu variantai naudoja tuos pačius kintamuosius, tad galima rinktis bet kurį. Visi failai įklijuojami į siuntimo įrankio šablono redaktorių tiksliai tokie, kokie yra — kintamieji pakeičiami automatiškai siuntimo metu. To Email, Reply To ir Subject laukai nustatomi atskirai EmailJS šablono nustatymuose, ne HTML turinyje — reikšmės nurodytos `.txt` faile.
