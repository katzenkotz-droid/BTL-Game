# BEAT THEM – Beat the Leis · Beat Carla · Beat Tanne

Comic-Timing-Boxspiel im C64-Stil von Bert. Läuft als Web-App über GitHub Pages
(https://katzenkotz-droid.github.io/BTL-Game/), als Android-App (TWA/APK aus PWABuilder,
lädt die Seite) und am PC im Browser.

## Zusammenarbeit
- Bert arbeitet auf **Deutsch**. Antworten auf Deutsch, einfach und direkt.
- **Erst reden, dann bauen**: Bei neuen Ideen zuerst kurz Vorschlag machen und auf sein Okay warten.
  Klare Fehler-Meldungen/kleine Korrekturen dürfen direkt umgesetzt werden.
- Bert testet vor allem auf dem **Android-Handy (Querformat)** und am Windows-PC.
- Vor dem Push: im Headless-Chrome (Playwright) Screenshots der betroffenen Zustände ansehen
  und auf JS-Fehler prüfen. Nach dem Push kurz sagen, was neu ist.
- **Push direkt auf `main`** – GitHub Pages veröffentlicht von `main` / root.

## Dateien
| Datei | Zweck |
| --- | --- |
| `index.html` | das komplette Spiel (Canvas 800×600, Grafik, Sound per WebAudio, Logik) |
| `sw.js` | Service Worker, network-first mit `cache:'no-cache'`, offline aus Cache |
| `version.json` | aktuelle Versionsnummer – die App prüft sie beim Start und zeigt „Neue Version“ |
| `manifest.webmanifest` | Name, Icons, `display: fullscreen`, `orientation: landscape` |
| `icons/` | App-Icons (192, 512, maskable) |

Zweites Repo `katzenkotz-droid.github.io`: `.well-known/assetlinks.json` (Android-App-Verknüpfung,
Paket `io.github.katzenkotz_droid.twa`), `.nojekyll`, `index.html` (Weiterleitung per `location.replace`).

## Bei JEDEM Update: Versionsnummer an 3 Stellen gleich hochzählen
1. `index.html`: `const APP_VERSION='X.Y';`
2. `sw.js`: `const CACHE = 'btl-vX.Y';`
3. `version.json`: `{"version": "X.Y"}`

Die heruntergeladene PC-Datei braucht keine Extras – `index.html` läuft auch per Doppelklick
(Service Worker/Update-Check nur auf github.io aktiv).

## Spiel – feste Regeln und Werte
- **Timing-Balken**: Marker läuft **zufällig rechts → links oder links → rechts** (auch im Training),
  vorher kurz ein blauer Richtungspfeil (0,35 s, Schläge in der Zeit zählen nicht). **Grün in der Mitte = Volltreffer** (schmal),
  **Gelb links/rechts = schwacher Treffer**, dazwischen Lücken (= Block). Zonen in Sekunden (`LV`-Tabelle).
- **Passender Handschuh**: Marker von rechts + rechter Handschuh (bzw. links/links) → Volltreffer −14 statt −12,
  schwach −5 statt −4, „PASST!“ +100 Punkte. Neutral (Leertaste/Tippen/Mitte) = normal, keine Strafe.
- **Kondition**: Start 100 pro Level, **keine Erholung im Kampf**. Volltreffer 0, schwach −3, daneben −10.
- **Gegner-Lebenspunkte** 100: Volltreffer −12, schwach −4, Superschlag −60.
- **60 s pro Level**. Verlieren nur über Kondition oder Zeit. Keine Gegenangriffe als Spielmechanik –
  bei Fehlschlag nur **optischer Gegenschlag** (links/rechts, Gerade/Haken/Aufwärtshaken, klein, leichtes Wackeln).
- **Finales K.O.**: Ausholen (Windmühle) → Zeitlupe → Bildschirm zerspringt → Ringrichter zählt bis 10.
- **5 Level + Ultra-Modus** (Ultra heimlich unschlagbar: winzige Zonen, 85 % „knapp geblockt“,
  Gegner regeneriert, K.O. nach 20–40 s – soll wie Pech wirken).
- **Minispiele** vor jedem Level (7 Stück, zufällig): Trainer-Kombo, Kopfrechnen, Schiebepuzzle,
  Seilspringen, Hütchen, Panzerschlacht, Ork-Lauf – jeweils mit Carla-Küchenversion.
  „ÜBERSPRINGEN“ startet direkt den Kampf. Gewinn: Superschlag oder Extra-Kondition,
  **gilt nur für den nächsten Kampf** (nicht gespeichert, ungenutzt = weg), **max. 1 Bonus pro Kampf**.
  Nach Bonus-Aktivierung 1,6 s Pause, bevor der Balken weiterläuft.
- **Keine Bildschirm-Blitze** bei Treffern (nur Wackeln + Effekte). Blitz nur beim finalen K.O.

## Figuren
- **Leis** (Karikatur aus Berts Foto): lange Haare mit Mittelscheitel, Brille, rundes Gesicht, Kapuzenpulli.
  Haare L1–3 **schulterlang**, ab grau/weiß lang. Altert pro Level: **Haare dunkelbraun → braun-grau → graubraun → grau → weiß**, wird breiter, Glatze ab Level 5,
  Narbe ab Level 4. Handschuhe pro Level: Rot, Blau gestreift, Gelb Blitz, Grün Flammen, Gold Nieten,
  Ultra Schwarz mit glühenden Totenköpfen – wachsend.
- **Carla**: hellblonder Bob mit Pony (**bleibt blond**), runde braune Brille, Strickschal, Schürze ab Level 2,
  Lockenwickler ab Level 3. **Nur Küchengeräte, keine Boxhandschuhe/Topflappen**:
  L1 Deckel+Kochlöffel, L2 Schneebesen+Kochlöffel, L3 Deckel+Schneebesen, L4 Deckel+Pfanne,
  L5 Mixer+Nudelholz, Ultra Pfanne+Staubsauger. Arena: rosa Comic-Küche, Huhn statt Katze im Leerlauf.
- Treffer-Effekte: blaues Auge, kaputtes Brillenglas, dicke Lippe (dunkelrot-violett unter dem Mund),
  ausgeschlagene Zähne (max. 3, sichtbare Lücken), Beulen/Pflaster; bei Carla zusätzlich Mehl, Ei, Lockenwickler.

- **Tanne** (Unfallchirurg, aus Berts Foto): Kopf wie **umgedrehte schlanke Birne**, **Augen immer offen** (nur K.O. Kreuzchen),
  **schmales, hageres Gesicht**, schmales Kinn, große Ohren,
  **dünner Stoppel-Vollbart wie Sean Connery** (kein Spitzbart, Oberlippe schwach, um den Mund dichter), **immer grüner OP-Kittel + OP-Mütze**,
  Lupenbrille ab L4, Mundschutz ab L4, Ultra mit Stirnlampe. Haare werden braun-grau, Bart dichter/länger.
  Waffen = Chirurgie-Werkzeug: L1 Reflexhammer+Schraubenzieher, L2 Pinzette+Skalpell, L3 Schraubenzieher+Hüftknochen,
  L4 Hüftknochen+Akkubohrer, L5 Knochenhammer+Knochensäge, Ultra Säge+Bohrer. Arena: OP-Saal (Röntgenbild, EKG, OP-Lampe).
  Leerlauf-Gag: Skelett, dem der Kopf abfällt. Minispiele mit OP-Varianten (Herz-Takt, Bakterien-Jagd, Klinik-Flur …).

## Training (Boxbirne)
- Knopf „🥊 TRAINING“ (Taste T) im Titel. Stufe 1–5 / Ultra wählbar, gleicher Timing-Balken wie im Kampf.
- Kein Zeitlimit, keine Kondition, kein Gegenschlag, kein Highscore.
- Statistik: Schläge, passender Handschuh %, Voll/Schwach/Daneben, Serie, beste Serie, Quote, Ø Abweichung in ms.
- Nach 50 Treffern reißt die Kette, die Birne fliegt weg → Ergebnis (NOCHMAL / MENÜ). Esc/✕ = Ergebnis.

## Bedienung
- PC: Leertaste/Klick = Schlag (neutral), linke/rechte Shift-Taste oder linke/rechte Maustaste = linker/rechter Handschuh, S/K = Bonus, M = Ton, P = Pause, Esc/Strg+C = Abbrechen (mit J/N).
- Handy: große Schlag-Tasten mit Handschuh in den Seitenrändern (= linker/rechter Handschuh), darunter S/K; Tippen überall = Schlag.
- Startbildschirm: Titel „BEAT THEM“, Gegnerwahl LEIS/CARLA/TANNE (Pfeile oder 1-2-3), großer ▶ START-Knopf, links roter BEENDEN-Knopf (Röhren-TV-Aus), rechts großer orangener TRAINING-Knopf.
