# cleanup-delete-and-commit.ps1
# Startuok — pilno mirusio turinio auditas: sunaikina patvirtintus nenaudojamus failus,
# suformuoja git commit'ą dabartinėje šakoje.
#
# Prieš paleidžiant: PATIKRINKITE, kad styles.css ir script.js jau atnaujinti (tai Claude
# jau padarė tiesiogiai per failų tiltą prieš paruošdamas šį scenarijų).
#
# Paleidimas iš PowerShell:
#   cd C:\Users\labas\Documents\GitHub\startuok
#   .\cleanup-delete-and-commit.ps1

$ErrorActionPreference = "Stop"

# Patikrinam, kad esame git repo šaknyje
if (-not (Test-Path ".git")) {
    Write-Error "Šis scenarijus turi būti paleistas iš repo šaknies (kur yra .git aplankas)."
    exit 1
}

$filesToDelete = @(
    "assets/concept-mobile-checkout.png",
    "assets/concept-mobile-checkout.webp",
    "assets/concept-mobile-checkout-mobile.webp",
    "assets/concept-multi-market.png",
    "assets/concept-multi-market.webp",
    "assets/concept-multi-market-mobile.webp",
    "assets/concept-storefront.png",
    "assets/concept-storefront.webp",
    "assets/concept-storefront-mobile.webp",
    "assets/linkedin-cover-background-v1.png",
    "assets/linkedin-cover-logo-v2.png",
    "assets/linkedin-cover-logo-v2-2x.png",
    "assets/linkedin-cover-v1.png",
    "assets/logos/google-g.png",
    "assets/mockup-glowina-products.png",
    "assets/mockup-glowina-products.webp",
    "assets/mockup-ofisera-products.png",
    "assets/mockup-ofisera-products.webp",
    "assets/mockup-topiniai-products.png",
    "assets/mockup-topiniai-products.webp",
    "assets/startuok-u-icon-white-background-1024.png",
    "assets/startuok-u-icon-white-background-512.png",
    "assets/storefront-topiniai-hero-v4.png",
    "assets/storefront-topiniai-hero-v4.webp",
    "assets/storefront-topiniai-hero-v4-720.webp",
    "assets/storefront-topiniai-hero-v5.png",
    "assets/storefront-topiniai-hero-v5.webp",
    "assets/storefront-topiniai-hero-v5-720.webp",
    "assets/storefront-topiniai-hero-v6.png",
    "assets/storefront-topiniai-hero-v6.webp",
    "assets/storefront-topiniai-hero-v6-720.webp",
    "brandbook/assets/startuok-logo.png",
    "brandbook/design-tokens.css",
    "assets/mockup-glowina-1.webp",
    "assets/mockup-glowina-2.webp",
    "assets/mockup-glowina-3.webp",
    "assets/mockup-glowina-4.webp",
    "assets/mockup-ofisera-1.webp",
    "assets/mockup-ofisera-2.webp",
    "assets/mockup-ofisera-3.webp",
    "assets/mockup-ofisera-4.webp",
    "assets/mockup-topiniai-1.webp",
    "assets/mockup-topiniai-2.webp",
    "assets/mockup-topiniai-3.webp",
    "assets/mockup-topiniai-4.webp",
    "assets/mockup-01.svg",
    "assets/mockup-01-final.svg",
    "assets/mockup-01-mobile.svg",
    "assets/mockup-02.svg",
    "assets/mockup-02-final.svg",
    "assets/mockup-02-mobile.svg",
    "assets/mockup-03.svg",
    "assets/mockup-03-final.svg",
    "assets/mockup-03-mobile.svg",
    "assets/visual-integracijos.svg",
    "assets/visual-integracijos-mobile.svg",
    "assets/visual-integracijos-readable.svg",
    "assets/visual-kurimas.svg",
    "assets/visual-kurimas-mobile.svg",
    "assets/visual-kurimas-final.svg",
    "assets/visual-migracija.svg",
    "assets/visual-migracija-mobile.svg",
    "assets/visual-migracija-readable.svg",
    "assets/og-startuok-legacy.png",
    "assets/storefront-glowina-hero.png",
    "assets/storefront-glowina-hero.webp",
    "assets/storefront-topiniai-hero.png",
    "assets/storefront-topiniai-hero.webp"
)

Write-Host "Trinama $($filesToDelete.Count) failų per 'git rm'..."
$missing = @()
foreach ($f in $filesToDelete) {
    if (Test-Path $f) {
        git rm --quiet -- "$f"
    } else {
        $missing += $f
    }
}

if ($missing.Count -gt 0) {
    Write-Host "`nPastaba: $($missing.Count) failų jau nebuvo (tikriausiai jau ištrinti anksčiau):"
    $missing | ForEach-Object { Write-Host "  - $_" }
}

Write-Host "`nPridedami likę pakeitimai (styles.css, script.js, CLEANUP-LOG.md, šis scenarijus)..."
git add -A

Write-Host "`nGit status prieš commit'ą:"
git status --short

git commit -m "Pilnas mirusio turinio auditas: pašalinti nenaudojami failai, CSS klasės ir JS blokas

- Ištrinta $($filesToDelete.Count) nenaudojamų assets/brandbook failų (žr. CLEANUP-LOG.md)
- styles.css: pašalintos 78 negyvos CSS klasės (nebeatitiko jokio HTML elemento)
- script.js: pašalinta negyva .animated-timeline observer logika
- CLEANUP-LOG.md atnaujintas su galutiniais rezultatais"

Write-Host "`nAtlikta. Peržiūrėkite 'git log -1' ir 'git show --stat' prieš 'git push'."
