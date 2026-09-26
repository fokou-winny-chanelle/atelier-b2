import type { Choice, Exam, Question } from "../types";

function q(id: string, number: number, prompt: string, choices: Choice[], answer: string, explanation: string, example = false): Question {
  return { id, number, prompt, choices, answer, explanation, example };
}

const people: Choice[] = [
  { id: "a", text: "Mina" },
  { id: "b", text: "Lars" },
  { id: "c", text: "Gül" },
  { id: "d", text: "Henrik" },
];

const sentences: Choice[] = [
  { id: "a", text: "Bei vielen alten Häusern entweicht die Wärme über Fenster und Dach, nicht nur über den Heizkörper." },
  { id: "b", text: "Sie arbeitet deutlich leiser, wenn das Gerät nicht direkt unter einem Schlafzimmerfenster steht." },
  { id: "c", text: "Der Stromverbrauch sinkt nur, wenn das Haus vorher gedämmt wurde." },
  { id: "d", text: "Die Förderung deckt selten die ganze Rechnung." },
  { id: "e", text: "Termine bei Fachbetrieben liegen oft mehrere Monate im Voraus." },
  { id: "f", text: "Alle Gasheizungen müssen noch in diesem Monat ausgebaut werden." },
  { id: "g", text: "Im Sommer kühlt das Gerät jedes Haus so stark, dass man einen Pullover braucht." },
  { id: "h", text: "Viele entscheiden sich trotzdem erst, wenn die alte Heizung wirklich ausfällt." },
];

const opinions: Choice[] = [
  { id: "a", text: "a — Sven, Köln" },
  { id: "b", text: "b — Amira, Wien" },
  { id: "c", text: "c — Holger, Lübeck" },
  { id: "d", text: "d — Pia, Freiburg" },
  { id: "e", text: "e — Yusuf, Dortmund" },
  { id: "f", text: "f — Lena, Bern" },
  { id: "g", text: "g — Otto, Passau" },
  { id: "h", text: "h — Mara, Halle" },
];

const headings: Choice[] = [
  { id: "a", text: "a Pacht" },
  { id: "b", text: "b Wasser" },
  { id: "c", text: "c Gartenhütte" },
  { id: "d", text: "d Wege" },
  { id: "e", text: "e Tiere" },
  { id: "f", text: "f Ruhezeiten" },
  { id: "g", text: "g Besuch" },
  { id: "h", text: "h Verkauf der Ernte" },
];

const yn: Choice[] = [
  { id: "r", text: "Richtig" },
  { id: "f", text: "Falsch" },
];

const abc = (a: string, b: string, c: string): Choice[] => [
  { id: "a", text: a },
  { id: "b", text: b },
  { id: "c", text: c },
];

const speakers: Choice[] = [
  { id: "a", text: "Frau Adler, Schwimmmeisterin" },
  { id: "b", text: "Herr Yusuf, Vater" },
  { id: "c", text: "Frau Pell, Anwohnerin" },
];

export const modellsatz05: Exam = {
  id: "ms-05",
  number: 5,
  title: "Modellsatz 5",
  subtitle: "Weggehen, Heizung, Wochenmarkt",
  lesen: {
    id: "lesen",
    label: "Lesen",
    durationMinutes: 65,
    parts: [
      {
        id: "ms5-l1",
        title: "Teil 1",
        suggestedMinutes: 18,
        exclusive: false,
        instruction:
          "Sie lesen, wie vier Personen über ein Jahr an einem anderen Ort denken. Auf welche Person treffen die Aussagen zu? Jede Person kann mehrmals gewählt werden. Es gibt nur eine richtige Lösung pro Aussage.",
        clips: [],
        stimuli: [
          {
            id: "ms5-l1-a",
            kicker: "a",
            title: "Mina",
            body: "Die Firma schickt mich für zwölf Monate nach Lissabon. Mein Partner bleibt hier, wir sehen uns am Bildschirm und alle sechs Wochen persönlich. Die Stelle danach ist dieselbe, das hat die Chefin schriftlich bestätigt. Ich gehe nicht, um auszuwandern, sondern weil das Projekt dort sitzt. Die Sprache lerne ich nebenher, sie ist nicht der Grund.",
          },
          {
            id: "ms5-l1-b",
            kicker: "b",
            title: "Lars",
            body: "Mir wurde ein Jahr in einer anderen Filiale angeboten, und ich habe abgelehnt. Meine Eltern werden älter, und ein Jahr Abwesenheit ist für mich zu lang. Nicht die Arbeit schreckt mich ab, sondern die Entfernung. Ein Monat wäre gegangen. Wer mich deshalb unflexibel nennt, kennt die Arzttermine nicht, die ich gerade übernehme.",
          },
          {
            id: "ms5-l1-c",
            kicker: "c",
            title: "Gül",
            body: "Ich habe ein Studienjahr in Lyon gemacht. Die ersten zwei Monate war ich einsam, obwohl der Kurs voll war. Danach wurde die Sprache wirklich besser, nicht durch die Grammatikstunden allein, sondern durch die WG. Ich würde es wieder tun. Ein reiner Urlaub hätte mir diesen Sprung nicht gegeben.",
          },
          {
            id: "ms5-l1-d",
            kicker: "d",
            title: "Henrik",
            body: "Ich bin nicht ins Ausland gegangen. Ich arbeite ein Jahr aus einer anderen deutschen Stadt, weil meine Partnerin dort eine Stelle hat. Fachlich ändert sich wenig, ich habe dieselben Termine. Was fehlt, ist die Küche im Büro: die kurzen Gespräche, die in keiner Videokonferenz vorkommen. Im Dezember komme ich für zwei Wochen zurück, mehr ist nicht geplant.",
          },
        ],
        questions: [
          q("ms5-l-0", 0, "Wer wird von der Firma für ein Jahr in eine andere Stadt geschickt?", people, "a", "Mina part douze mois à Lisbonne pour le projet de l’entreprise. C’est l’exemple.", true),
          q("ms5-l-1", 1, "Wer hat ein Jahr in einer anderen Filiale abgelehnt?", people, "b", "Lars a refusé. Un mois aurait été possible, un an non, à cause de ses parents.", false),
          q("ms5-l-2", 2, "Wessen Sprache hat sich durch den Alltag in einer WG verbessert?", people, "c", "Gül progresse grâce à la colocation, pas seulement grâce au cours de grammaire.", false),
          q("ms5-l-3", 3, "Wer bleibt im selben Land und wechselt trotzdem den Ort?", people, "d", "Henrik ne part pas à l’étranger. Il travaille depuis une autre ville allemande.", false),
          q("ms5-l-4", 4, "Wessen Partner oder Partnerin bleibt am alten Ort?", people, "a", "Le partenaire de Mina reste. Henrik, lui, suit sa partenaire qui a déjà le poste là-bas.", false),
          q("ms5-l-5", 5, "Wer war am Anfang einsam, obwohl viele Menschen im Kurs waren?", people, "c", "Gül était seule les deux premiers mois, même si le cours était plein.", false),
          q("ms5-l-6", 6, "Wer findet ein ganzes Jahr Abwesenheit zu lang für die Familie?", people, "b", "Lars parle des parents âgés et des rendez-vous médicaux, pas d’une peur du travail.", false),
          q("ms5-l-7", 7, "Wem fehlen die kurzen Gespräche neben der eigentlichen Arbeit?", people, "d", "Henrik parle de la cuisine du bureau, absente des visioconférences. Le travail lui-même ne change pas.", false),
          q("ms5-l-8", 8, "Wer kehrt danach auf dieselbe Stelle zurück?", people, "a", "La cheffe de Mina a confirmé par écrit que le poste ensuite est le même.", false),
          q("ms5-l-9", 9, "Wer würde den Aufenthalt wiederholen?", people, "c", "Gül dit qu’elle le referait. Un simple voyage ne lui aurait pas donné ce saut.", false),
        ],
      },
      {
        id: "ms5-l2",
        title: "Teil 2",
        suggestedMinutes: 12,
        exclusive: true,
        instruction:
          "Sie lesen einen Artikel über Wärmepumpen in Altbauten. Welche Sätze a bis h passen in die Lücken 10 bis 15? Zwei Sätze passen nicht. Jeder Satz darf nur einmal verwendet werden.",
        clips: [],
        stimuli: [
          {
            id: "ms5-l2-text",
            kicker: "Artikel",
            title: "Wärme aus der Luft",
            body: "Wärmepumpen gelten als Ersatz für alte Heizungen. In einem unsanierten Haus aus den fünfziger Jahren ist der Tausch aber kein einfacher Gerätewechsel. [[10]]\n\nWer die Pumpe einbaut und die Fenster lässt, wie sie sind, heizt oft die Straße mit. [[11]] Erst die Dämmung macht aus dem neuen Gerät eine Ersparnis.\n\nAuch der Standort entscheidet über den Ärger mit den Nachbarn. [[12]] Ein leises Summen nachts unter dem offenen Fenster reicht für eine Beschwerde.\n\nDie Rechnung überrascht viele Haushalte. [[13]] Was die Förderung nicht trägt, muss der Eigentümer trotzdem zahlen, oft in Raten.\n\nDazu kommt die Wartezeit. [[14]] Wer im Oktober anruft, weil die Heizung schon kalt bleibt, hört häufig einen Termin im Frühjahr.\n\nDer Austausch läuft deshalb selten als ruhiger Plan. [[15]] Bis dahin bleibt die alte Anlage im Keller, auch wenn sie teuer und laut ist.",
          },
        ],
        questions: [
          q("ms5-l-10", 10, "Lücke 10", sentences, "a", "Le trou explique pourquoi une vieille maison n’est pas un simple changement d’appareil : la chaleur part par les fenêtres et le toit.", false),
          q("ms5-l-11", 11, "Lücke 11", sentences, "c", "La phrase suivante dit que l’isolation transforme l’appareil en économie. Le trou dit que la consommation ne baisse qu’après isolation.", false),
          q("ms5-l-12", 12, "Lücke 12", sentences, "b", "Le paragraphe parle du lieu et des voisins. La pompe est plus silencieuse loin de la fenêtre de la chambre.", false),
          q("ms5-l-13", 13, "Lücke 13", sentences, "d", "La suite parle de ce que l’aide ne couvre pas. La subvention paie rarement toute la facture.", false),
          q("ms5-l-14", 14, "Lücke 14", sentences, "e", "Octobre et un rendez-vous au printemps : les délais des artisans se comptent en mois.", false),
          q("ms5-l-15", 15, "Lücke 15", sentences, "h", "Beaucoup n’agissent que quand l’ancienne chaudière tombe vraiment en panne. L’ancienne reste donc à la cave.", false),
        ],
      },
      {
        id: "ms5-l3",
        title: "Teil 3",
        suggestedMinutes: 12,
        exclusive: false,
        instruction:
          "Sie lesen einen Text über den Wochenmarkt in einer Kleinstadt. Wählen Sie bei den Aufgaben 16 bis 21 die richtige Lösung a, b oder c. Es gibt nur eine richtige Lösung.",
        clips: [],
        stimuli: [
          {
            id: "ms5-l3-text",
            kicker: "Artikel",
            title: "Samstag auf dem Platz",
            body: "Der Wochenmarkt auf dem Kirchplatz findet samstags von 8 bis 13 Uhr statt. Eine Verlängerung bis 15 Uhr hat der Stadtrat abgelehnt, nicht weil die Händler sie nicht wollten, sondern weil der Platz um 14 Uhr für den Busverkehr frei sein muss.\n\nStände mit Lebensmitteln brauchen eine Kühlung, wenn die Ware nicht am selben Morgen geerntet wurde. Brot und Äpfel ohne Kühlung bleiben erlaubt. Fleisch nur mit nachgewiesener Kühlkette, sonst schließt die Kontrolle den Stand sofort, nicht erst am nächsten Samstag.\n\nDie Gebühr beträgt 12 Euro pro laufendem Meter. Vereine, die an einem Samstag Kuchen verkaufen, zahlen die Hälfte, höchstens zweimal im Jahr. Ein wöchentlicher Kuchenstand zum vollen Preis ist damit nicht gemeint.\n\nMusik ist bis 12 Uhr leise erlaubt. Danach nur noch ohne Verstärker, weil die Wohnungen direkt am Platz liegen. Wer dagegen verstößt, wird einmal verwarnt und beim zweiten Mal für vier Wochen ausgeschlossen.",
          },
        ],
        questions: [
          q("ms5-l-16", 16, "Warum endet der Markt um 13 Uhr?", abc("Weil die Händler früher gehen wollen.", "Weil der Platz um 14 Uhr für Busse frei sein muss.", "Weil sonntags ein zweiter Markt beginnt."), "b", "Les commerçants voulaient rester. Le conseil a refusé à cause des bus à 14 h.", false),
          q("ms5-l-17", 17, "Was darf ohne Kühlung verkauft werden?", abc("Jedes Fleisch.", "Brot und Äpfel.", "Nur Ware vom Vortag."), "b", "Le pain et les pommes restent sans froid. La viande exige une chaîne du froid prouvée.", false),
          q("ms5-l-18", 18, "Wann schließt die Kontrolle einen Fleischstand?", abc("Sofort, wenn die Kühlkette fehlt.", "Erst am nächsten Samstag.", "Nie, wenn der Stand die Gebühr gezahlt hat."), "a", "La fermeture est immédiate, pas reportée au samedi suivant.", false),
          q("ms5-l-19", 19, "Was zahlen Vereine für einen Kuchenstand?", abc("Immer die volle Gebühr.", "Die Hälfte, höchstens zweimal im Jahr.", "Nichts, so oft sie wollen."), "b", "La moitié, et au plus deux fois par an. Un stand de gâteau chaque semaine n’entre pas dans cette règle.", false),
          q("ms5-l-20", 20, "Musik mit Verstärker …", abc("ist den ganzen Vormittag verboten.", "ist bis 12 Uhr leise erlaubt.", "ist nach 12 Uhr weiter erlaubt."), "b", "Jusqu’à midi, une musique douce est permise. Après, plus d’amplificateur.", false),
          q("ms5-l-21", 21, "Was passiert beim zweiten Verstoß?", abc("Eine zweite Verwarnung.", "Ausschluss für vier Wochen.", "Eine höhere Gebühr für einen Meter."), "b", "Le premier écart est un avertissement. Le deuxième exclut pendant quatre semaines.", false),
        ],
      },
      {
        id: "ms5-l4",
        title: "Teil 4",
        suggestedMinutes: 12,
        exclusive: true,
        instruction:
          "Sie lesen Meinungen zur gemeinsamen Mittagspause im Betrieb. Welche Äußerung passt zu welcher Überschrift? Eine Äußerung passt nicht. Die Äußerung a ist das Beispiel und kann nicht noch einmal verwendet werden.",
        clips: [],
        stimuli: [
          { id: "ms5-l4-a", kicker: "a", title: "Sven, Köln", body: "Seit wir um zwölf zusammen essen, kenne ich die Leute aus der anderen Abteilung. Vorher haben wir uns nur Mails geschrieben. Die Pause hat uns zu einem Haus gemacht, nicht die Weihnachtsfeier." },
          { id: "ms5-l4-b", kicker: "b", title: "Amira, Wien", body: "Ich nutze die Mittagszeit für einen Arzttermin oder die Apotheke. Wenn alle gleichzeitig Pause machen, ist genau dann alles geschlossen oder überfüllt. Meine Erledigungen passen nicht in ein gemeinsames Zeitfenster." },
          { id: "ms5-l4-c", kicker: "c", title: "Holger, Lübeck", body: "In der Produktion kann nicht die ganze Schicht den Raum verlassen. Jemand muss an der Anlage bleiben. Eine Pause für alle klingt gerecht und legt die Linie still." },
          { id: "ms5-l4-d", kicker: "d", title: "Pia, Freiburg", body: "Ich esse lieber allein und lese. Das ist keine Ablehnung der Kollegen. Nach drei Stunden Gesprächen brauche ich zwanzig Minuten ohne Frage. Wer das als unsozial liest, verwechselt Ruhe mit Ablehnung." },
          { id: "ms5-l4-e", kicker: "e", title: "Yusuf, Dortmund", body: "Das Essen aus der Kantine ist nicht das Problem. Das Problem ist, dass die Pause als Arbeitszeit gilt und wir trotzdem Mails beantworten sollen. Gemeinsam ja, aber dann liegt das Telefon in der Schublade." },
          { id: "ms5-l4-f", kicker: "f", title: "Lena, Bern", body: "Neue Kollegen finden so schneller einen Ansprechpartner. In der ersten Woche habe ich am Tisch mehr gelernt als in der Einführung. Ein Organigramm ersetzt dieses Essen nicht." },
          { id: "ms5-l4-g", kicker: "g", title: "Otto, Passau", body: "Unser Betriebsausflug im Juni war zu teuer und zu lang. Acht Stunden Programm für ein Team, das sich schon kennt, bringt nichts. Kürzer und näher wäre klüger gewesen." },
          { id: "ms5-l4-h", kicker: "h", title: "Mara, Halle", body: "Wer kleine Kinder hat, isst oft später, weil der Kindergarten um zwölf schließt und nicht um eins. Eine feste gemeinsame Pause um zwölf schließt genau diese Eltern aus. Gleitend bis 13 Uhr wäre für uns fair." },
        ],
        questions: [
          q("ms5-l-bsp4", 0, "Die gemeinsame Pause verbindet Abteilungen", opinions, "a", "Sven connaît enfin l’autre service. La pause a fait la maison, pas la fête de Noël. Exemple.", true),
          q("ms5-l-22", 22, "Private Erledigungen kollidieren mit der gleichen Uhrzeit", opinions, "b", "Amira utilise le midi pour le médecin. Si tout le monde s’arrête ensemble, tout est fermé ou plein.", false),
          q("ms5-l-23", 23, "Nicht jeder Arbeitsplatz kann gleichzeitig leer sein", opinions, "c", "Holger : toute l’équipe ne peut pas quitter la ligne. Une pause pour tous arrête la production.", false),
          q("ms5-l-24", 24, "Allein essen heißt nicht, die Kollegen abzulehnen", opinions, "d", "Pia lit seule après trois heures de paroles. Le calme n’est pas un rejet.", false),
          q("ms5-l-25", 25, "Gemeinsam nur, wenn die Arbeit wirklich pausiert", opinions, "e", "Yusuf veut le téléphone dans le tiroir. Manger ensemble tout en répondant aux courriels n’est pas une pause.", false),
          q("ms5-l-26", 26, "Neue Leute orientieren sich am Tisch schneller", opinions, "f", "Lena a plus appris à table la première semaine que pendant l’accueil officiel.", false),
          q("ms5-l-27", 27, "Eine feste Uhr schließt Eltern aus", opinions, "h", "Mara : la crèche ferme à midi. Une pause fixe à cette heure exclut ces parents.", false),
        ],
      },
      {
        id: "ms5-l5",
        title: "Teil 5",
        suggestedMinutes: 6,
        exclusive: true,
        instruction:
          "Sie lesen Auszüge aus der Ordnung eines Kleingartenvereins. Welche Überschrift passt zu welchem Paragraphen? Vier Überschriften werden nicht gebraucht. Die Überschrift zum Beispiel kann nicht noch einmal verwendet werden.",
        clips: [],
        stimuli: [
          {
            id: "ms5-l5-index",
            kicker: "Inhaltsverzeichnis",
            title: "Überschriften",
            body: "a Pacht\nb Wasser\nc Gartenhütte\nd Wege\ne Tiere\nf Ruhezeiten\ng Besuch\nh Verkauf der Ernte",
          },
          {
            id: "ms5-l5-0",
            kicker: "Beispiel § 0",
            title: "Lösung: c",
            body: "Die Hütte darf höchstens 12 Quadratmeter groß sein und nicht als Wohnung genutzt werden. Ein fester Wasseranschluss in der Hütte ist nicht vorgesehen. Die Farbe der Außenwand legt der Vorstand fest.",
          },
          {
            id: "ms5-l5-28",
            kicker: "§ 28",
            body: "Gegossen wird aus der gemeinsamen Zisterne. Der Hahn ist von 7 bis 20 Uhr geöffnet. Wer einen eigenen Schlauch über Nacht liegen lässt, zahlt eine Pauschale von 15 Euro, auch wenn kein Wasser gelaufen ist.",
          },
          {
            id: "ms5-l5-29",
            kicker: "§ 29",
            body: "Motorgeräte sind werktags von 13 bis 15 Uhr und ganztägig an Sonn- und Feiertagen untersagt. Gespräche über den Zaun sind davon nicht berührt. Beschwerden gehen an den Vorstand, nicht an die Nachbarparzelle direkt in der Nacht.",
          },
          {
            id: "ms5-l5-30",
            kicker: "§ 30",
            body: "Hühner und Bienen sind nach schriftlicher Zustimmung erlaubt, Hunde nur angeleint und nicht dauerhaft. Katzen der Pächter gelten nicht als Vereinstiere. Wildtiere dürfen nicht gefüttert werden.",
          },
        ],
        questions: [
          q("ms5-l-bsp5", 0, "Beispiel § 0", headings, "c", "Taille de la cabane, pas de logement : c’est « Gartenhütte », pas l’eau.", true),
          q("ms5-l-28", 28, "§ 28", headings, "b", "Citerne, robinet et tuyau laissé la nuit : il s’agit de l’eau, pas du loyer.", false),
          q("ms5-l-29", 29, "§ 29", headings, "f", "Horaires sans machines et dimanches : ce sont les heures de calme, pas les allées.", false),
          q("ms5-l-30", 30, "§ 30", headings, "e", "Poules, abeilles, chiens et animaux sauvages : le paragraphe parle des animaux.", false),
        ],
      },
    ],
  },
  hoeren: {
    id: "hoeren",
    label: "Hören",
    durationMinutes: 40,
    parts: [
      {
        id: "ms5-h1",
        title: "Teil 1",
        suggestedMinutes: 8,
        exclusive: false,
        instruction:
          "Sie hören fünf kurze Texte. Sie hören jeden Text einmal. Zu jedem Text gibt es zwei Aufgaben. Lesen Sie die Aufgaben zuerst, starten Sie dann das Audio. Eine Wiedergabe ist nicht wiederholbar.",
        stimuli: [
          { id: "ms5-h1-s1", kicker: "Text 1", title: "Aufgaben 1–2", body: "Eine Ansage in einer Zahnarztpraxis.", audioId: "ms5-h-c1" },
          { id: "ms5-h1-s2", kicker: "Text 2", title: "Aufgaben 3–4", body: "Ein Anruf in einer Werkstatt.", audioId: "ms5-h-c2" },
          { id: "ms5-h1-s3", kicker: "Text 3", title: "Aufgaben 5–6", body: "Eine Wetterwarnung für Wanderer.", audioId: "ms5-h-c3" },
          { id: "ms5-h1-s4", kicker: "Text 4", title: "Aufgaben 7–8", body: "Zwei Kollegen sprechen über einen Drucker.", audioId: "ms5-h-c4" },
          { id: "ms5-h1-s5", kicker: "Text 5", title: "Aufgaben 9–10", body: "Eine Frau plant einen Geburtstag.", audioId: "ms5-h-c5" },
        ],
        clips: [
          { id: "ms5-h-c1", label: "Text 1", maxPlays: 1, script: "Ihr Termin morgen um neun bleibt bestehen. Wir verschieben nicht auf Donnerstag. Bitte kommen Sie zehn Minuten früher, weil ein neues Formular ausgefüllt werden muss. Die Kontrolle dauert dann nicht länger als sonst." },
          { id: "ms5-h-c2", label: "Text 2", maxPlays: 1, script: "Das Rad ist fertig, aber der Gepäckträger war nicht im Auftrag. Den können wir morgen montieren, heute Abend nicht mehr. Abholen können Sie das Rad trotzdem heute bis 18 Uhr, nur eben ohne Träger." },
          { id: "ms5-h-c3", label: "Text 3", maxPlays: 1, script: "Oberhalb von 1.200 Metern gibt es am Nachmittag Gewitter, nicht schon am Vormittag. Wanderungen, die vor elf Uhr zurück sind, können bleiben. Wer den Grat plant, soll umkehren. Der Weg im Tal ist nicht gesperrt." },
          { id: "ms5-h-c4", label: "Text 4", maxPlays: 1, script: "Der Drucker im dritten Stock klemmt nur beim beidseitigen Druck. Einseitig funktioniert er. Die Technik kommt nicht heute, sondern morgen früh. Bis dahin nutzen wir das Gerät im Erdgeschoss, nicht das in der Personalabteilung, das ist für Verträge reserviert." },
          { id: "ms5-h-c5", label: "Text 5", maxPlays: 1, script: "Wir feiern nicht im Restaurant. Die Wohnung ist zu klein, deshalb nehmen wir den Gemeindesaal, aber nur bis 21 Uhr, nicht bis Mitternacht. Kuchen bringt jede Person selbst mit. Getränke organisiere ich, damit nicht zehn Flaschen Limonade ankommen und kein Wasser." },
        ],
        questions: [
          q("ms5-h-1", 1, "Der Termin wird auf Donnerstag verschoben.", yn, "f", "Le rendez-vous de demain à neuf heures reste. On ne le décale pas à jeudi.", false),
          q("ms5-h-2", 2, "Warum soll sie früher kommen?", abc("Weil die Kontrolle länger dauert.", "Weil ein neues Formular ausgefüllt werden muss.", "Weil der Termin auf neun Uhr vorgezogen wird."), "b", "Dix minutes plus tôt pour un nouveau formulaire. Le contrôle ne dure pas plus longtemps.", false),
          q("ms5-h-3", 3, "Das Rad kann heute noch nicht abgeholt werden.", yn, "f", "On peut le prendre aujourd’hui jusqu’à 18 h, mais sans le porte-bagages.", false),
          q("ms5-h-4", 4, "Was fehlt heute noch?", abc("Die Reparatur insgesamt.", "Der Gepäckträger.", "Das Vorderrad."), "b", "Le porte-bagages n’était pas dans la commande. Il sera monté demain, pas ce soir.", false),
          q("ms5-h-5", 5, "Das Gewitter kommt schon am Vormittag.", yn, "f", "Les orages sont l’après-midi, au-dessus de 1 200 mètres, pas le matin.", false),
          q("ms5-h-6", 6, "Welche Tour kann bleiben?", abc("Der Grat am Nachmittag.", "Eine Wanderung, die vor elf Uhr zurück ist.", "Jede Route oberhalb von 1.200 Metern."), "b", "Les sorties rentrées avant 11 h peuvent rester. La crête doit faire demi-tour. La vallée n’est pas fermée.", false),
          q("ms5-h-7", 7, "Der Drucker druckt gar nicht mehr.", yn, "f", "Le recto seul fonctionne. Seule l’impression des deux côtés bloque.", false),
          q("ms5-h-8", 8, "Welches Gerät soll man bis morgen nutzen?", abc("Den Drucker in der Personalabteilung.", "Den Drucker im Erdgeschoss.", "Den im dritten Stock, beidseitig."), "b", "Le rez-de-chaussée, pas celui des ressources humaines, réservé aux contrats.", false),
          q("ms5-h-9", 9, "Die Feier findet im Restaurant statt.", yn, "f", "Pas au restaurant. La salle communale, et seulement jusqu’à 21 h.", false),
          q("ms5-h-10", 10, "Was organisiert die Frau selbst?", abc("Den Kuchen für alle.", "Die Getränke.", "Die Miete bis Mitternacht."), "b", "Chacun apporte un gâteau. Elle s’occupe des boissons, pour qu’il y ait de l’eau.", false),
        ],
      },
      {
        id: "ms5-h2",
        title: "Teil 2",
        suggestedMinutes: 10,
        exclusive: false,
        instruction:
          "Sie hören ein Radiointerview. Sie hören den Text zweimal. Markieren Sie bei den Aufgaben 11 bis 16 die richtige Lösung a, b oder c.",
        stimuli: [
          { id: "ms5-h2-s", kicker: "Interview", title: "Ausbildung abbrechen", body: "Frau Nowak spricht über Abbrüche in der Ausbildung.", audioId: "ms5-h-c6" },
        ],
        clips: [
          {
            id: "ms5-h-c6",
            label: "Interview",
            maxPlays: 2,
            script: "Moderator: Frau Nowak, warum brechen so viele die Ausbildung ab? Nowak: Selten wegen der Theorie in der Schule. Häufig, weil der Betrieb anders war als auf der Website. Wer drei Monate nur fegt, geht. Moderator: Ist das immer die Schuld des Betriebs? Nowak: Nicht immer. Manche erwarten vom ersten Tag an Verantwortung, die erst im zweiten Jahr kommt. Dann fühlen sie sich unterfordert und nennen es Langeweile. Beides führt zum Abbruch, aber aus verschiedenen Gründen. Moderator: Was hilft in den ersten Wochen? Nowak: Eine feste Ansprechperson, nicht zehn. Und ein Gespräch nach vier Wochen, nicht erst nach der Probezeit. Vier Wochen sind früh genug, um etwas zu ändern. Moderator: Sollen Eltern eingreifen? Nowak: Zuhören ja. Den Vertrag kündigen, ohne die junge Person zu fragen, nein. Die Unterschrift ist die ihre. Moderator: Und ein Wechsel des Betriebs? Nowak: Der ist besser als ein kompletter Ausstieg, wenn der Beruf stimmt und nur die Stelle nicht. Die Kammer kennt freie Plätze. Ein Neustart in einem anderen Beruf ist der langsamere Weg.",
          },
        ],
        questions: [
          q("ms5-h-11", 11, "Der häufigste Grund für den Abbruch ist …", abc("die Theorie in der Berufsschule.", "ein Betrieb, der anders ist als versprochen.", "zu viel Verantwortung am ersten Tag, in jedem Fall."), "b", "Rarement la théorie. Souvent l’entreprise ne correspond pas au site. Balayer pendant trois mois fait partir.", false),
          q("ms5-h-12", 12, "Unterforderung …", abc("kommt nie vor.", "kann auch zum Abbruch führen, aus einem anderen Grund als Überforderung.", "ist immer die Schuld der Eltern."), "b", "Certains attendent trop tôt une responsabilité du deuxième année, s’ennuient, et partent pour une autre raison.", false),
          q("ms5-h-13", 13, "Was soll es in den ersten Wochen geben?", abc("Zehn verschiedene Ansprechpersonen.", "Eine feste Person und ein Gespräch nach vier Wochen.", "Das erste Gespräch erst nach der Probezeit."), "b", "Une seule personne de référence, et un entretien après quatre semaines, pas à la fin de l’essai.", false),
          q("ms5-h-14", 14, "Vier Wochen sind …", abc("zu spät für jede Änderung.", "früh genug, um noch etwas zu ändern.", "erst der Beginn der Probezeit, ohne Gespräch."), "b", "Quatre semaines suffisent pour changer quelque chose. Ce n’est pas trop tard.", false),
          q("ms5-h-15", 15, "Was dürfen Eltern?", abc("Den Vertrag ohne Rücksprache kündigen.", "Zuhören, aber nicht allein kündigen.", "Die Unterschrift ersetzen."), "b", "Écouter oui. Résilier sans demander à la personne, non. La signature est la sienne.", false),
          q("ms5-h-16", 16, "Ein Wechsel des Betriebs …", abc("ist immer schlechter als ein neuer Beruf.", "ist besser als ein kompletter Ausstieg, wenn der Beruf stimmt.", "ist von der Kammer verboten."), "b", "Changer de lieu vaut mieux que tout quitter si le métier convient. Un autre métier est le chemin plus lent.", false),
        ],
      },
      {
        id: "ms5-h3",
        title: "Teil 3",
        suggestedMinutes: 10,
        exclusive: false,
        instruction:
          "Sie hören ein Gespräch über Lärm am Freibad. Sie hören den Text einmal. Wer sagt das? Aufgaben 17 bis 22. Jede Person kann mehrmals die richtige Antwort sein.",
        stimuli: [
          { id: "ms5-h3-s", kicker: "Gespräch", title: "Sommer am Becken", body: "Drei Personen sprechen. Jede Person kann mehrmals gewählt werden.", audioId: "ms5-h-c7" },
        ],
        clips: [
          {
            id: "ms5-h-c7",
            label: "Gespräch",
            maxPlays: 1,
            script: "Adler: Ab 19 Uhr senken wir die Musik, nicht weil der Badebetrieb endet, sondern weil die Häuser hinter der Hecke Schlafzimmer zur Anlage haben. Yusuf: Mein Sohn lernt dort schwimmen. Wenn um 19 Uhr Schluss wäre, kämen wir unter der Woche gar nicht an, ich habe bis 17 Uhr Dienst. Pell: Ich wohne im zweiten Stock und höre die Ansagen, nicht die Kinder. Die Ansage alle zehn Minuten ist lauter als das Plantschen. Adler: Die Ansage können wir kürzen. Das Wasser und die Aufsicht bleiben bis 20 Uhr, das habe ich mit der Stadt so vereinbart. Yusuf: Eine Stunde reicht uns. Hauptsache, das Becken ist unter der Woche nach der Arbeit noch offen. Pell: Wenn die Musik um 19 Uhr leiser wird und die Ansage wegfällt, schlafe ich. Den Badebetrieb selbst will ich nicht abschaffen.",
          },
        ],
        questions: [
          q("ms5-h-17", 17, "Die Musik wird leiser, weil Schlafzimmer zur Anlage zeigen.", speakers, "a", "Frau Adler baisse la musique à 19 h à cause des chambres derrière la haie.", false),
          q("ms5-h-18", 18, "Ein früheres Ende um 19 Uhr würde den Besuch unter der Woche unmöglich machen.", speakers, "b", "Herr Yusuf finit à 17 h. Si la piscine fermait à 19 h, ils n’arriveraient pas en semaine.", false),
          q("ms5-h-19", 19, "Die Ansagen stören mehr als die Kinder.", speakers, "c", "Frau Pell entend les annonces, pas les enfants. L’annonce toutes les dix minutes est plus forte que l’eau.", false),
          q("ms5-h-20", 20, "Aufsicht und Wasser bleiben bis 20 Uhr.", speakers, "a", "Adler a convenu avec la ville que l’eau et la surveillance restent jusqu’à 20 h.", false),
          q("ms5-h-21", 21, "Eine Stunde nach der Arbeit genügt.", speakers, "b", "Yusuf dit qu’une heure leur suffit, pourvu que le bassin soit ouvert après le travail.", false),
          q("ms5-h-22", 22, "Der Badebetrieb soll bleiben, der Lärm nicht.", speakers, "c", "Pell veut dormir si la musique baisse et si l’annonce disparaît. Elle ne veut pas fermer la piscine.", false),
        ],
      },
      {
        id: "ms5-h4",
        title: "Teil 4",
        suggestedMinutes: 12,
        exclusive: false,
        instruction:
          "Sie hören einen kurzen Vortrag darüber, wie Städte Straßen benennen. Sie hören den Text zweimal. Wählen Sie bei den Aufgaben 23 bis 30 die richtige Lösung a, b oder c.",
        stimuli: [
          { id: "ms5-h4-s", kicker: "Vortrag", title: "Namen auf dem Schild", body: "Herr Vogt spricht über Straßennamen.", audioId: "ms5-h-c8" },
        ],
        clips: [
          {
            id: "ms5-h-c8",
            label: "Vortrag",
            maxPlays: 2,
            script: "Ein Straßenname ist kein Schmuck. Er muss von der Leitstelle verstanden werden, auch am Telefon, auch mit Akzent. Deshalb vermeiden neue Namen Wörter, die sich nur durch einen Buchstaben unterscheiden. Nicht „Bachweg“ und „Dachweg“ in derselben Siedlung. Umbenennungen sind selten und teuer: Jede Adresse auf Briefen, in Verträgen und auf Schildern ändert sich. Ein beschlossener neuer Name gilt nicht am nächsten Morgen. Die Schilder kommen oft erst nach mehreren Monaten, und bis dahin gelten beide Namen in den Formularen. Frauen sind auf den Schildern vieler Städte noch in der Minderheit. Das ändert sich, aber nicht, indem man nur Vornamen aus Romanen nimmt. Die Kommission prüft, ob die Person einen Bezug zur Stadt hat oder eine Leistung, die man in zwei Sätzen erklären kann. Lebende Personen werden bei uns nicht genommen. Nicht aus Mangel an Respekt, sondern weil eine spätere Debatte sonst das Schild wieder abreißt. Mein Vorschlag für Bürgerinnen und Bürger: Nicht zehn Namen schicken, sondern einen, mit einer Quelle. Eine Liste ohne Beleg landet unten im Stapel.",
          },
        ],
        questions: [
          q("ms5-h-23", 23, "Ein guter Name muss …", abc("vor allem schön klingen.", "am Telefon eindeutig sein.", "aus einem Roman stammen."), "b", "Le central doit comprendre le nom au téléphone, même avec un accent. Ce n’est pas un ornement.", false),
          q("ms5-h-24", 24, "Warum kein Bachweg neben dem Dachweg?", abc("Weil sie sich nur durch einen Buchstaben unterscheiden.", "Weil beide schon historisch verboten sind.", "Weil sie zu lang für das Schild sind."), "a", "On évite les noms qui ne diffèrent que d’une lettre dans le même quartier.", false),
          q("ms5-h-25", 25, "Eine Umbenennung …", abc("ist billig und sofort sichtbar.", "ändert Briefe, Verträge und Schilder und kostet.", "betrifft nur das Schild, nicht die Post."), "b", "C’est rare et cher : chaque adresse change sur le courrier, les contrats et les plaques.", false),
          q("ms5-h-26", 26, "Wann gilt der neue Name auf dem Schild?", abc("Am nächsten Morgen.", "Oft erst nach mehreren Monaten.", "Nie, die alten Schilder bleiben für immer."), "b", "Les plaques arrivent souvent après plusieurs mois. En attendant, les deux noms valent sur les formulaires.", false),
          q("ms5-h-27", 27, "Frauen auf den Schildern …", abc("sind in vielen Städten noch in der Minderheit.", "dürfen nicht mehr genannt werden.", "sind schon überall die Mehrheit."), "a", "Elles restent minoritaires sur les plaques de beaucoup de villes. Cela change, mais pas n’importe comment.", false),
          q("ms5-h-28", 28, "Die Kommission achtet darauf, …", abc("dass der Name aus einem Roman schön klingt.", "dass die Person einen Bezug zur Stadt hat oder eine Leistung, die man kurz erklären kann.", "dass nur Vornamen verwendet werden."), "b", "Un lien avec la ville, ou un apport qu’on explique en deux phrases. Pas seulement un prénom de roman.", false),
          q("ms5-h-29", 29, "Lebende Personen …", abc("werden bevorzugt.", "werden nicht genommen, damit das Schild nicht später wieder abgenommen wird.", "müssen selbst zustimmen und erscheinen dann sofort."), "b", "On ne prend pas de personnes vivantes, pour qu’un débat ultérieur n’arrache pas la plaque.", false),
          q("ms5-h-30", 30, "Was soll man einreichen?", abc("Zehn Namen ohne Quelle.", "Einen Namen mit einer Quelle.", "Nur einen Roman als Beleg."), "b", "Un seul nom, avec une source. Une liste sans preuve finit en bas de la pile.", false),
        ],
      },
    ],
  },
  schreiben: {
    id: "schreiben",
    label: "Schreiben",
    durationMinutes: 75,
    tasks: [
      {
        id: "ms5-w1",
        title: "Teil 1 — Forumsbeitrag",
        minWords: 150,
        situation: "Sie schreiben einen Forumsbeitrag zum Thema Wahlalter 16. Denken Sie an eine Einleitung und einen Schluss.",
        bullets: [
          "Äußern Sie Ihre Meinung dazu, ob Jugendliche mit 16 wählen dürfen sollten.",
          "Nennen Sie ein Argument der Gegenseite.",
          "Nehmen Sie zu diesem Argument Stellung.",
          "Machen Sie einen Vorschlag, wie sich junge Leute vor der ersten Wahl informieren können.",
        ],
        closingNote: "Schreiben Sie mindestens 150 Wörter.",
        coach: "Entrée, quatre mouvements, fin. Nomme l’argument adverse avant d’y répondre : Zwar …, aber …",
      },
      {
        id: "ms5-w2",
        title: "Teil 2 — Nachricht",
        minWords: 100,
        situation: "Sie singen im Chor „TonArt“. Zwei Proben im Mai fallen für Sie aus, weil Sie die Pflege eines Elternteils übernehmen. Schreiben Sie eine Nachricht an die Leiterin, Frau Berg.",
        bullets: [
          "Nennen Sie die beiden Daten, an denen Sie fehlen.",
          "Erklären Sie den Grund kurz und sachlich.",
          "Fragen Sie, ob Sie die Stücke selbst nacharbeiten sollen.",
          "Sagen Sie, dass Sie beim Konzert im Juni dabei sein möchten.",
        ],
        closingNote: "Mindestens 100 Wörter, höfliche Anrede und Grußformel.",
        coach: "Sehr geehrte Frau Berg, dates précises, Mit freundlichen Grüßen et ton nom. Le motif reste bref.",
      },
    ],
  },
  sprechen: {
    id: "sprechen",
    label: "Sprechen",
    durationMinutes: 15,
    tasks: [
      {
        id: "ms5-p1",
        title: "Teil 1 — Vortrag",
        minutes: 4,
        situation: "Wählen Sie ein Thema für einen kurzen Vortrag.",
        bullets: [
          "Thema A: Ist ein Jahr im Ausland nach der Schule sinnvoll?",
          "Thema B: Sollten Betriebe eine gemeinsame Mittagspause festlegen?",
          "Einleitung, Beispiel, begründete Meinung, Schluss.",
        ],
        coach: "Parle environ quatre minutes à voix haute. Les notes ne sont pas le discours.",
      },
      {
        id: "ms5-p2",
        title: "Teil 2 — Diskussion",
        minutes: 5,
        situation: "Der Betrieb kann nur eines bezuschussen: Sprachkurse am Abend oder die Mitgliedschaft im Sportverein.",
        bullets: [
          "Wählen Sie eine Seite und begründen Sie sie.",
          "Nehmen Sie die andere Seite ernst.",
          "Schlagen Sie einen Kompromiss vor.",
          "Reagieren Sie auf einen Einwand.",
        ],
        coach: "Entraîne : Einerseits … andererseits … / Ich schlage vor, dass …",
      },
    ],
  },
};
