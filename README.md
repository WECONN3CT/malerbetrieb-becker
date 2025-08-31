# Malerbetrieb Becker Website

Moderne, Apple-inspirierte Website für den Malerbetrieb Becker in Bonn.

## 🚀 Features

- **Modernes Apple-Design**: Minimalistisch, elegant und benutzerfreundlich
- **Responsive Design**: Optimiert für alle Geräte (Desktop, Tablet, Mobile)
- **Mehrere Seiten**: Startseite, Leistungen, Projekte, Kontakt
- **Interaktive Elemente**: Projektfilter, Lightbox-Galerie, Kontaktformular
- **SEO-optimiert**: Strukturierte Daten und Meta-Tags

## 📁 Struktur

```
/
├── index.html              # Startseite
├── leistungen.html         # Leistungsübersicht
├── projekte.html           # Projekt-Galerie
├── kontakt.html            # Kontaktseite
├── impressum.html          # Impressum
├── datenschutz.html        # Datenschutzerklärung
├── css/
│   ├── styles.css          # Haupt-Stylesheet
│   ├── projects.css        # Projekte-Seite Styles
│   ├── contact.css         # Kontakt-Seite Styles
│   └── service.css         # Service-Seiten Styles
├── js/
│   ├── main.js             # Haupt-JavaScript
│   └── projects.js         # Projekte-Filter JavaScript
├── leistungen/
│   └── wandgestaltung.html # Beispiel-Leistungsseite
└── images/
    └── [Platzhalter für Bilder]
```

## 🖼️ Benötigte Bilder

Bitte fügen Sie folgende Bilder im `images/` Ordner hinzu:

### Allgemein
- `logo.png` - Ihr Firmenlogo (40x40px empfohlen)
- `hero-maler.jpg` - Hauptbild für die Startseite

### Projekte (für die Galerie)
- `projekt-fassade-1.jpg`, `projekt-fassade-2.jpg` - Fassadenprojekte
- `projekt-wohnung-1.jpg`, `projekt-wohnung-2.jpg` - Innenraumprojekte
- `projekt-renovierung-1.jpg` - Renovierungsprojekt
- `projekt-buero-1.jpg` - Büroprojekt
- `projekt-bad-1.jpg` - Badezimmerprojekt
- `projekt-praxis-1.jpg` - Praxisprojekt

Alle Bilder sollten:
- Hochauflösend sein (mindestens 1200px Breite)
- Im JPG-Format für Fotos oder PNG für Grafiken
- Komprimiert für Web-Performance

## 🚀 GitHub Pages Deployment

### Schritt 1: Repository erstellen
1. Erstellen Sie ein neues Repository auf GitHub
2. Nennen Sie es z.B. `malerbetrieb-becker-website`

### Schritt 2: Code hochladen
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/IHR-USERNAME/malerbetrieb-becker-website.git
git push -u origin main
```

### Schritt 3: GitHub Pages aktivieren
1. Gehen Sie zu Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: / (root)
5. Klicken Sie auf Save

### Schritt 4: Custom Domain (optional)
1. Erstellen Sie eine Datei namens `CNAME` im Root-Verzeichnis
2. Fügen Sie Ihre Domain ein: `www.maler-becker-bonn.de`
3. Konfigurieren Sie DNS bei Ihrem Domain-Provider:
   - A-Records auf GitHub Pages IPs
   - CNAME-Record für www auf `IHR-USERNAME.github.io`

## 📝 Anpassungen

### Farben ändern
Bearbeiten Sie die CSS-Variablen in `css/styles.css`:
```css
:root {
    --primary: #007AFF;
    --secondary: #5AC8FA;
    /* weitere Farben... */
}
```

### Kontaktdaten aktualisieren
Suchen Sie in allen HTML-Dateien nach:
- Telefonnummer: `0176 40497535`
- E-Mail: `info@maler-becker-bonn.de`
- Adresse: `Pappelweg 30, 53177 Bonn`

### Neue Leistungsseiten hinzufügen
1. Kopieren Sie `leistungen/wandgestaltung.html`
2. Benennen Sie die Datei um (z.B. `fassadengestaltung.html`)
3. Passen Sie Inhalt und Meta-Tags an
4. Verlinken Sie die neue Seite in der Navigation

## 🔧 Technische Details

- **HTML5** & **CSS3** mit modernen Features
- **JavaScript** für Interaktivität (Vanilla JS, keine Frameworks)
- **Apple Design System** inspiriertes UI
- **Responsive** mit Mobile-First Ansatz
- **SEO** optimiert mit strukturierten Daten

## 📱 Browser-Kompatibilität

- Chrome (neueste Version)
- Safari (neueste Version)
- Firefox (neueste Version)
- Edge (neueste Version)
- Mobile Browser (iOS Safari, Chrome Mobile)

## 📧 Support

Bei Fragen oder Problemen kontaktieren Sie:
- **E-Mail**: info@maler-becker-bonn.de
- **Telefon**: 0176 40497535

## 📄 Lizenz

© 2024 Malerbetrieb Becker. Alle Rechte vorbehalten.

---

**Hinweis**: Diese Website wurde für den Malerbetrieb Becker entwickelt und ist für den produktiven Einsatz vorbereitet. Bitte fügen Sie Ihre eigenen Bilder hinzu und passen Sie die Inhalte nach Bedarf an.
