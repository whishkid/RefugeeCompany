# Offerte Client Tracking Systeem

### A Beautiful Mess (Refugee Company)

**Datum:** 27 februari 2026
**Aan:** Merel Macedo, A Beautiful Mess
**Van:** Bastiaan Oelrich, Human Content

---

## Over A Beautiful Mess

A Beautiful Mess is een horecaconcept en sociale onderneming van Refugee Company, met locaties in Amsterdam, Utrecht en Arnhem. Al meer dan zeven jaar biedt Refugee Company betaalde banen en vrijwilligerswerk aan mensen die ooit naar Nederland zijn gevlucht. Door werkervaring op te doen worden zij economisch onafhankelijker en sterker in de maatschappij. Het woord "vluchteling" wordt bewust doorgestreept — het is geen identiteit, maar een tijdelijke fase in iemands leven.

De missie is helder: samen werken aan werk, talent ontsluiten voor de Nederlandse arbeidsmarkt, en bouwen aan een inclusieve samenleving waarin iedereen ertoe doet.

---

## Aanleiding

A Beautiful Mess heeft behoefte aan een nieuw systeem ter vervanging van het huidige Client Tracking Systeem. Het nieuwe systeem moet het volledige traject van deelnemers bij A Beautiful Mess kunnen vastleggen, van intake tot uitstroom, en de impact die wordt gemaakt meetbaar maken door middel van vragenlijsten. Daarnaast moet het systeem organisaties, vacatures, plaatsingen en activiteiten bijhouden en certificaten en ondertekende documenten kunnen genereren.

---

## Systeemoverzicht

Het systeem wordt opgebouwd rondom de volgende kernonderdelen:

### Gebruikersbeheer
- Gebruikers van het systeem met rolgebaseerde toegang
- Rollen bepalen welke functionaliteiten beschikbaar zijn (bijv. beheerder, begeleider, rapportage)

### Deelnemersbeheer (Cliënten)
- Registratie en beheer van deelnemers
- Vastleggen van persoonlijke gegevens, status en voortgang
- Overzicht van alle activiteiten, projectdeelnames en plaatsingen per deelnemer

### Organisaties
- Bedrijven en contactpersonen waar deelnemers op bezoek kunnen gaan of geplaatst kunnen worden
- Contactgegevens en samenwerkingshistorie

### Vacatures
- Registratie van bekende openstaande vacatures bij organisaties
- Koppeling met plaatsingen

### Locaties & Projecten
- **Locaties** zoals community cafés en andere vaste plekken
- **Projecten** (Prestart, Restart en andere langlopende trajecten) waarbij deelnemers over langere periode begeleid worden

### Activiteiten, Workshops & Evenementen
- Eendagsactiviteiten die plaatsvinden op een locatie, bij een bedrijfsbezoek, of in het kader van een project
- Registratie van deelname per deelnemer

### Vragenlijsten (Questionnaires)
- Elk project én elke activiteit kan een eigen vragenlijst hebben
- Vragenlijsten bevatten meerkeuzevragen en open vragen
- Per vraag instelbaar of deze bij **intake**, **uitstroom**, of **beide** wordt gesteld — zodat voortgang en impact meetbaar worden
- **Meertalig**, inclusief ondersteuning voor RTL-talen (zoals Arabisch, Farsi)
- **AI-ondersteunde vertaling** van vragenlijsten naar de benodigde talen

### Deelnemerplaatsingen
- Vastleggen van een succesvolle plaatsing van een deelnemer bij een organisatie
- Kan gekoppeld zijn aan een vacature, maar ook zonder voorafgaande vacature

### Projectdeelname
- Registratie dat een deelnemer heeft deelgenomen aan een project (meerdere deelnames mogelijk)
- Bijbehorende ingevulde vragenlijsten per deelname

### Certificaten
- Automatisch genereren van deelnamecertificaten voor activiteiten, evenementen en projecten

### Digitale Ondertekening
- Documenten (zoals certificaten) digitaal laten ondertekenen
- Flow: e-mail met link of QR-code → ondertekening op telefoon met getekende handtekening → document wordt ondertekend opgeslagen
- Toepasbaar voor certificaten en overige documenten

### Impact Dashboard
- Overzichtelijk dashboard met statistieken
- Impact per individuele deelnemer
- Geaggregeerde impact over alle deelnemers
- Aantal geholpen mensen, gemiddelde verbetering per vraag of vraagcategorie
- Visuele weergave van voortgang en resultaten

---

## Technische Aanpak

### Technologiestack

| Component        | Technologie                        |
|------------------|------------------------------------|
| Framework        | SvelteKit                          |
| Database         | Neon (serverless PostgreSQL)        |
| ORM              | Drizzle                            |
| Authenticatie    | BetterAuth                         |
| Hosting          | Vercel                             |

### Hosting & Beheer

De applicatie wordt gehost op **Vercel** met een **Neon** database. A Beautiful Mess kan zelf eigenaar zijn van de Vercel- en Neon-accounts (aanbevolen), of het beheer aan ons overlaten. De verwachte maandelijkse hostingkosten bedragen circa **€50**.

---

## Onze Werkwijze

Human Content heeft jarenlange ervaring in het bouwen van maatwerksoftware, van kleinschalige tools tot complexe systemen. Wij hebben een bewezen track record in het opzetten van greenfield-applicaties.

Voor dit project zetten wij een combinatie in van **AI-ondersteunde ontwikkeling** en handmatig programmeerwerk waar nodig. Wij zijn zeer bedreven in het effectief inzetten van AI voor een groot deel van het ontwikkelwerk, en sturen bij waar het gaat om performance, gebruiksvriendelijkheid en correctheid. De resultaten die wij hiermee behalen overtreffen keer op keer onze eigen verwachtingen — wij verwachten dan ook een indrukwekkende hoeveelheid functionaliteit op te leveren binnen het gestelde budget.

---

## Planning

| Fase                          | Duur       | Inzet              |
|-------------------------------|------------|---------------------|
| **Fase 1 — Bouw & eerste versie** | 6–8 weken  | 16 uur per week     |
| **Fase 2 — Feedback & afronding** | 6–8 weken  | 8 uur per week      |

- Na **fase 1** is er een werkende eerste versie beschikbaar om te bespreken en bij te sturen
- In **fase 2** wordt op basis van uw feedback het systeem verfijnd en afgerond
- De exacte duur van fase 2 hangt af van de hoeveelheid gewenste bijsturing

---

## Investering

Wij werken op basis van **nacalculatie** tegen ons uurtarief van **€100 per uur exclusief BTW**.

| Onderdeel                     | Berekening              | Bedrag          |
|-------------------------------|-------------------------|-----------------|
| Fase 1 — Bouw & eerste versie | 8 weken × 16 uur × €100 | €12.800         |
| Fase 2 — Feedback & afronding | 8 weken × 8 uur × €100  | €6.400          |
| **Totaal geschat**            |                         | **€19.200**     |

*Alle bedragen exclusief BTW.*

Dit budget is een schatting op basis van het geschetste functiepakket. Gezien de snelheid van AI-ondersteunde ontwikkeling kan het totaal lager uitvallen. Mocht er een hard budgetplafond zijn, dan verkennen wij graag samen welke functionaliteiten daarbinnen mogelijk zijn.

---

## Risicogarantie

Wij begrijpen dat een investering als deze spannend kan zijn, zeker wanneer de uitkomst nog onzeker voelt. Daarom bieden wij de volgende garantie:

> **Mocht u binnen 3 maanden besluiten om niet door te gaan met de software, dan brengen wij maximaal €5.000 in rekening voor het tot dan toe verrichte werk.**

Hiermee beperken wij uw risico en tonen wij ons vertrouwen in het eindresultaat.

---

## Onderhoud & SLA

De **eerste zes maanden na oplevering** is onderhoud inbegrepen.

Daarna bieden wij een Service Level Agreement aan:

| SLA                           | Kosten                  |
|-------------------------------|-------------------------|
| **Kwartaal-SLA**              | €1.000 per kwartaal     |

De SLA omvat:
- Beschikbaarheid op afroep bij problemen
- Performance-optimalisaties
- Updates benodigd voor compatibiliteit met nieuwere browserversies
- Gegarandeerd behoud van het uurtarief van €100 voor nieuwe functionaliteiten

---

## Over Human Content

Human Content is gespecialiseerd in het ontwerpen en bouwen van websites en maatwerkwebapplicaties. Met jarenlange ervaring in diverse technologieën en projecten van uiteenlopende omvang leveren wij betrouwbare, schaalbare oplossingen die aansluiten bij de behoeften van onze opdrachtgevers.

---

## Contact

**Bastiaan Oelrich**
Human Content

---

Wij kijken ernaar uit om samen met A Beautiful Mess een systeem te bouwen dat het mooie werk dat jullie doen nog beter zichtbaar en meetbaar maakt.
