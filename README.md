# Malerbetrieb Becker Website – Handover & Pflegeanleitung

Dieses Dokument ist die vollständige Übergabe- und Pflegeanleitung für die Website des Malerbetriebs Becker in Bonn. Es richtet sich an Inhaber und Team, die Inhalte aktualisieren und die Seite betreiben möchten – ohne technisches Vorwissen.

## Project Overview

- Zweck: Moderne Firmenwebsite zur Präsentation von Leistungen, Projekten und Kontaktmöglichkeiten. Ziel ist die Gewinnung neuer Anfragen sowie die Stärkung von Vertrauen durch Referenzen und Bewertungen.
- Zielgruppe: Privatkundschaft und Gewerbe in Bonn und Umgebung (Haus-/Wohnungsbesitzer, Hausverwaltungen, Büros, Praxen, kleine Unternehmen).
- Geschäftsziele: Mehr qualifizierte Anfragen, seriöser Auftritt, transparente Darstellung von Leistungen, Projekten und Bewertungen.
- Kontakt Malerbetrieb Becker:
  - Adresse: Pappelweg 30, 53177 Bonn
  - Telefon: 0176 40497535
  - E-Mail: info@maler-becker-bonn.de
  - Öffnungszeiten: Mo–Fr 8:00–18:00, Sa 9:00–14:00

## Technical Specifications

- Technologien: Reines HTML5, CSS3 und Vanilla JavaScript (kein Framework).
- Haupt-Stylesheet: `css/professional.css` (modernes, responsives Layout). Zusätzliche Seiten-Styles s. unten.
- JavaScript: `js/professional.js` (Navigation, Smooth-Scroll, Animationen, Kundenbewertungen-Slider, Galerie-Klick-Verhalten). `js/projects.js` für Projekte-Seite (Filter/Lightbox).
- Responsives Design: Optimiert für Desktop, Tablet, Smartphone (flexible Grids, responsive Bilder, Touch-optimierte Slider-Navigation).
- Browser-Kompatibilität: Aktuelle Versionen von Chrome, Safari, Firefox, Edge inkl. mobiler Browser (iOS Safari, Chrome Mobile).

## File Structure

Wichtige Verzeichnisse und Dateien (Auszug):

```
/
├── index.html                    # Startseite (Hero, Bewertungen, Leistungen, Galerie, Kontakt)
├── projekte.html                 # Projekte-Übersicht (Projektkarten, Filter)
├── kontakt.html                  # Kontaktseite
├── impressum.html                # Impressum
├── datenschutz.html              # Datenschutzerklärung
├── leistungen/                   # Detailseiten zu Leistungen
│   ├── wandgestaltung.html
│   ├── fassadengestaltung.html
│   ├── lackierarbeiten.html
│   ├── spachtelarbeiten.html
│   ├── bodenverlegung.html
│   └── schimmelsanierung.html
├── css/
│   ├── professional.css          # Haupt-Stylesheet (global)
│   ├── projects.css              # Projekte-spezifische Anpassungen
│   ├── projects-spacing-fix.css  # Abstands-/Layout-Korrekturen Projekte
│   └── project-gallery.css       # Ggf. Galerie-spezifische Anpassungen
├── js/
│   └── professional.js           # Haupt-JS (Navigation, Slider, Galerie-Verhalten)
├── pictures/
│   └── leistungen/
│       ├── hero_bild.png        # Aktuelles Hero-Bild auf der Startseite
│       └── heropicture.png      # Alternative/Backup
└── images/
    ├── logo.png                  # Logo
    ├── Leistungen/               # Bilder für Leistungs-Karten (Startseite)
    │   ├── Wandgestaltung.png
    │   ├── Fassadengestaltung.png
    │   ├── Lackierarbeiten.png
    │   ├── Spachtel- und Verputzarbeiten.png
    │   ├── Bodenverlegearbeiten.png
    │   └── Schimmelsanierung.png
    └── Vorher Nacher/            # Vorher/Nachher-Projektbilder (ASCII-Dateinamen)
        ├── fassadenbild-rosa.png
        ├── treppe-neugestaltung.png
        └── ... weitere Bilder
```

- CSS-Hinweis: `professional.css` ist das maßgebliche Stylesheet. Die weiteren CSS-Dateien sind ergänzende, seiten- oder komponentenspezifische Anpassungen (v. a. Projekte-Seite). Bei Änderungen primär `professional.css` verwenden, projektspezifische Details in den jeweiligen CSS-Dateien.
- Bilder: In `images/Leistungen/` liegen die Leistungs-Bilder (Startseite). In `images/Vorher Nacher/` liegen die Vorher/Nachher-Projektbilder. Bitte für Webserver-Kompatibilität nur ASCII-Zeichen in Dateinamen verwenden (keine Umlaute/Leerzeichen, stattdessen Bindestriche).

## Content Management

### Kontaktinformationen aktualisieren
- Startseite `index.html`: Abschnitt „Kontaktieren Sie uns“ (Adresse, Telefon, Öffnungszeiten) bearbeiten.
- Footer: In allen Seiten ist im Footer die Adresse und Kontaktinfo verlinkt – ggf. synchron anpassen.
- Telefonnummer-Links (`tel:`) und E-Mail-Links (`mailto:`) prüfen und aktualisieren.
- Footer-Credit: „Powered by WECONN3CT“ ist ein Link und öffnet in neuem Tab (`<a href="https://www.weconn3ct.app/" target="_blank">`).

### Projektbilder hinzufügen/ersetzen
- Bilder in `images/Vorher Nacher/` ablegen. Dateinamen URL-sicher (z. B. `terrassenfenster-neu-gestaltet.png`).
- In `projekte.html` die entsprechende Projektkarte duplizieren/anpassen:
  - Bildpfad in `<img src="...">`
  - Titel `<h3>...</h3>`, Ort, Beschreibung
  - Kategorie über `data-category` (z. B. `fassade`, `lackierung`, `spachtel`, `komplett`) damit Filter funktionieren.
- Auf der Startseite `index.html` können ausgewählte Vorher/Nachher-Bilder in der Galerie-Sektion gezeigt werden (Bilder anklickbar → führen zu `projekte.html`).

### Leistungsbeschreibungen anpassen
- Startseite `index.html` → Abschnitt „Unsere Leistungen“: Titel, Beschreibungstexte und Bilder pro Karte anpassen.
- Detailseiten unter `leistungen/` (z. B. `leistungen/wandgestaltung.html`) enthalten ausführliche Inhalte und FAQs – Texte direkt in den Dateien ändern.
- Auf Leistungsseiten verlinken Buttons zur Kontaktseite mit relativem Pfad `../kontakt.html`.

### Google Reviews Integration
- HTML-Struktur: In `index.html` existiert die Sektion „Was unsere Kunden sagen“ mit `reviews-track` und mehreren `review-card` Einträgen, inkl. Navigation (`reviews-prev`, `reviews-next`).
- Verhalten: In `js/professional.js` wird der Slider initialisiert (Scrollen um 4 Karten, Navigation per Buttons, Keyboard-Unterstützung, responsives Snap-Verhalten).
- „Mehr Google Bewertungen ansehen“-Button verweist auf den Google-Suchergebnis-Link und öffnet in neuem Tab (`target="_blank"`).
- Neue Bewertungen können als weitere `article.review-card` Elemente ergänzt werden (gleiche Struktur). Achten Sie auf kurze, prägnante Texte.

## Page Descriptions

- `index.html` – Startseite mit:
  - Hero-Bereich (Bild `pictures/leistungen/hero_bild.png`, USP-Checkmarks, CTAs „Jetzt anrufen“ und „Kostenlose Erstberatung“)
  - Kundenbewertungen (Slider)
  - Unsere Leistungen (6 Karten)
  - Vorher & Nachher (kleine Galerie – Karten verlinken auf `projekte.html`)
  - Kontakt (Adresse, Telefon, Öffnungszeiten, Formular)
- `projekte.html` – Projekte-Übersicht als Kartenraster mit Filtern (Kategorien über `data-category`). Einheitliche Kartengrößen, Bilddarstellung optimiert.
- `leistungen/*.html` – Detailseiten zu einzelnen Leistungen (Inhalte und FAQs pflegbar).
- `kontakt.html` – Kontaktinfos und ggf. Formular (falls separat genutzt).
- `impressum.html`, `datenschutz.html` – Rechtliche Seiten (Logo-Pfad auf `images/logo.png`).

### Navigation
- Auf der Startseite führen die Navigationslinks zu Sektionen (`#home`, `#services`/`#leistungen`, `#gallery`, `#contact`).
- Auf Unterseiten verlinkt „Leistungen“ zurück zur Startseite + Sektion (z. B. `index.html#leistungen`).
- Buttons in `leistungen/*.html` verlinken auf `../kontakt.html`. Auf der Startseite verlinken CTAs auf `#contact` bzw. `kontakt.html`.

## Maintenance Instructions

### Backup
- Einfachste Variante: Gesamten Projektordner kopieren (lokal oder ZIP), oder das Git-Repository clonen/archivieren.
- In GitHub: „Download ZIP“ oder ein Release anlegen.

### Hosting (Empfehlung)
- Statisches Hosting reicht aus (keine Server-Skripte notwendig). Optionen:
  - GitHub Pages (bereits eingerichtet, `.nojekyll` vorhanden; Deploy per Workflow).
  - Alternativ: Netlify, Vercel, klassisches Webhosting (Apache/Nginx) – einfach die Dateien hochladen.

### Updates in Zukunft
- Bilder austauschen/ergänzen: s. Content Management oben (ASCII-Dateinamen!).
- Texte anpassen: Direkt in den HTML-Dateien; auf konsistente Formate (Umlaute, Sonderzeichen) achten.
- Styles: Kleinere Anpassungen in `css/professional.css`. Projekte-spezifische Layoutdetails in `css/projects.css` bzw. ergänzenden CSS-Dateien.
- Footer-Credit-Styling: Klasse `footer-credit-text` ist im `css/professional.css` definiert (kleine, dezente Schrift rechts unten). Der Text ist verlinkt und öffnet in neuem Tab.
- JavaScript: `js/professional.js` – für Slider/Interaktionen. Änderungen behutsam und getestet ausrollen.

## Business Information (Stand: aktuell)

- Malerbetrieb Becker – Maler- und Lackierermeister Steven Becker
- Adresse: Pappelweg 30, 53177 Bonn
- Telefon: 0176 40497535
- E-Mail: info@maler-becker-bonn.de
- Einsatzgebiet: Bonn und Umgebung
- Öffnungszeiten: Mo–Fr 8:00–18:00, Sa 9:00–14:00

---

Bei Fragen oder Änderungswünschen gerne melden. Die Website ist bewusst ohne Frameworks aufgebaut, damit sie langfristig leicht wartbar und unabhängig von speziellen Build-Prozessen bleibt.
