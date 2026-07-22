# Startuok puslapių atnaujinimai

Atnaujinta 2026-07-22.

## Kas pakeista

- Perkurti paslaugų puslapių hero blokai, kad vizualiai atkartotų pagrindinio puslapio kryptį: gradientai, „browser“ kortelės, aiškūs CTA ir pasitikėjimo punktai.
- Perrašyti per ilgi ir abstraktūs H1 bei paslaugų tekstai.
- Kūrimo puslapyje aiškiau atskirta apimtis, darbo eiga, kainos logika ir kliento atsakomybės.
- Migracijos puslapyje pridėtas duomenų audito, bandomosios migracijos, 301 nukreipimų ir kontroliuoto paleidimo planas.
- Integracijų puslapyje atskirta programėlė, individualus API ryšys ir paprastas rankinis procesas; pabrėžtas realaus užsakymo testavimas.
- Privatumo puslapis išplėstas: duomenų kategorijos, tikslai, teisiniai pagrindai, saugojimo kriterijai, gavėjai, perdavimas už EEE ribų, techniniai žurnalai, teisės ir skundo galimybė.
- Visuose paslaugų puslapiuose suvienodinta navigacija, aktyvaus puslapio būsena, footer, mobilus CTA ir vidinės nuorodos.
- Atnaujinti SEO pavadinimai, aprašymai, Open Graph duomenys, breadcrumbs ir Service struktūriniai duomenys.

## Būtina padaryti prieš viešinant

1. Faile `privatumas.html` pakeisti bendrinį duomenų valdytojo aprašymą pilnais rekvizitais: vardu / juridinio asmens pavadinimu, kodu ir adresu. Vieta pažymėta HTML komentaru `PRIEŠ VIEŠINANT`.
2. Patikrinti, ar realus hostingo, el. pašto ir kitų paslaugų teikėjų sąrašas atitinka privatumo tekste nurodytas kategorijas.
3. Jeigu vėliau diegiama Google Analytics, Meta Pixel, reklaminiai ar nebūtini slapukai, prieš juos aktyvuojant įdiegti sutikimų mechanizmą ir atnaujinti privatumo informaciją.
4. Prieš paleidimą realiame domene atlikti bandomąjį kontaktinės formos ir visų CTA nuorodų patikrinimą telefone bei kompiuteryje.

## Techninė pastaba

Kontaktinė forma ir toliau duomenų į svetainės serverį nesiunčia. Ji naršyklėje paruošia `mailto:` laišką ir, kai leidžia naršyklė, nukopijuoja jo tekstą į vietinę iškarpinę.

## Antras dizaino suvienodinimas

Visi vidiniai HTML puslapiai perstatyti ant tos pačios vizualinės sistemos kaip pagrindinis puslapis:

- vienoda navigacija ir hero proporcijos;
- ta pati naršyklės kortelės estetika;
- vienodi tarpai, kortelės, tamsūs proceso blokai, DUK ir kontaktų sekcijos;
- sukurti keturi individualūs, bet bendros stilistikos SVG vizualai;
- pašalintas atskiros `service-*` struktūros pojūtis;
- patikrintas 1440 px ir 390 px išdėstymas, horizontalus persislinkimas, vaizdų įkėlimas ir mobilus meniu.
