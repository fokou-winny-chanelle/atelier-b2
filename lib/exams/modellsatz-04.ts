import type { Choice, Exam, Question } from "../types";

function q(id: string, number: number, prompt: string, choices: Choice[], answer: string, explanation: string, example = false): Question {
  return { id, number, prompt, choices, answer, explanation, example };
}

const people: Choice[] = [
  { id: "a", text: "Ayla" },
  { id: "b", text: "Ben" },
  { id: "c", text: "Clara" },
  { id: "d", text: "Denis" },
];

const sentences: Choice[] = [
  { id: "a", text: "Viele kommen wegen eines ruhigen Platzes, nicht wegen eines bestimmten Titels." },
  { id: "b", text: "In dieser Statistik fehlen genau die Besuche, bei denen niemand ein Buch mitnimmt." },
  { id: "c", text: "Ein Abend in der Woche bleibt dann über 20 Uhr hinaus geöffnet." },
  { id: "d", text: "Ohne zusätzliches Personal lässt sich dieses Programm nicht seriös anbieten." },
  { id: "e", text: "Für längere Hausarbeiten fehlt vielen zu Hause genau so ein Tisch." },
  { id: "f", text: "Die Ausleihe selbst soll dafür abgeschafft werden." },
  { id: "g", text: "Die meisten Besucher kommen ausschließlich wegen der aktuellen Bestseller." },
  { id: "h", text: "Offen bleibt, welches Amt diese zusätzlichen Stunden bezahlt." },
];

const opinions: Choice[] = [
  { id: "a", text: "a — Elif, Heidelberg" },
  { id: "b", text: "b — Jonas, Linz" },
  { id: "c", text: "c — Petra, Bremen" },
  { id: "d", text: "d — Samir, Bonn" },
  { id: "e", text: "e — Nora, Basel" },
  { id: "f", text: "f — Timo, Erfurt" },
  { id: "g", text: "g — Lara, Graz" },
  { id: "h", text: "h — Cem, Kiel" },
];

const headings: Choice[] = [
  { id: "a", text: "a Eintritt" },
  { id: "b", text: "b Kurse" },
  { id: "c", text: "c Öffnungszeiten" },
  { id: "d", text: "d Garderobe" },
  { id: "e", text: "e Verhalten im Wasser" },
  { id: "f", text: "f Zutritt" },
  { id: "g", text: "g Kinderbereich" },
  { id: "h", text: "h Café" },
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
  { id: "a", text: "Frau Idris, Apothekerin" },
  { id: "b", text: "Herr Böhm, Rentner" },
  { id: "c", text: "Frau Lange, Moderatorin" },
];

export const modellsatz04: Exam = {
  id: "ms-04",
  number: 4,
  title: "Modellsatz 4",
  subtitle: "Nebenjob, Bibliothek, Balkon",
  lesen: {
    id: "lesen",
    label: "Lesen",
    durationMinutes: 65,
    parts: [
      {
        id: "ms4-l1",
        title: "Teil 1",
        suggestedMinutes: 18,
        exclusive: false,
        instruction:
          "Sie lesen, wie vier Studierende über einen Nebenjob denken. Auf welche Person treffen die Aussagen zu? Jede Person kann mehrmals gewählt werden. Es gibt nur eine richtige Lösung pro Aussage.",
        clips: [],
        stimuli: [
          {
            id: "ms4-l1-a",
            kicker: "a",
            title: "Ayla",
            body: "Samstags stehe ich um fünf in der Bäckerei. Das Geld brauche ich für die Miete, aber ich bleibe vor allem wegen der Kolleginnen: Wir lachen, auch wenn der Laden voll ist. Seit diesem Semester sind zwei Noten schlechter geworden. Trotzdem kündige ich nicht. Ein reiner Lernalltag ohne diese Menschen würde mir fehlen, auch wenn ich dann mehr für die Prüfungen tun könnte.",
          },
          {
            id: "ms4-l1-b",
            kicker: "b",
            title: "Ben",
            body: "Meine Eltern zahlen die Miete, und ich habe einen Nebenjob abgelehnt. Nicht weil ich Arbeit grundsätzlich falsch finde, sondern weil dieses Semester die Prüfungen entscheidet. Ein Job am Abend würde mir genau die Stunden nehmen, die ich für Wiederholung brauche. Nach dem Abschluss sehe ich das anders. Bis dahin hat das Studium Vorrang, und ich sage das auch laut, wenn Kommilitonen mich faul nennen.",
          },
          {
            id: "ms4-l1-c",
            kicker: "c",
            title: "Clara",
            body: "Ich arbeite zwölf Stunden pro Woche im Labor meiner Fakultät. Es ist schlecht bezahlt, und donnerstags bin ich zu müde für den Sport. Trotzdem ist es kein beliebiger Job: Ich sehe, wie die Geräte wirklich benutzt werden, und das steht später im Lebenslauf. Eine Stelle an der Kasse hätte ich nicht angenommen. Müdigkeit tausche ich nur gegen Erfahrung im Fach.",
          },
          {
            id: "ms4-l1-d",
            kicker: "d",
            title: "Denis",
            body: "Nachts liefere ich Essen aus. Pro Stunde verdiene ich mehr als in den meisten Cafés, und das merke ich auf dem Konto. Der Preis ist der Schlaf: Vor zwei Uhr nachts liege ich selten schon im Bett. Nach den Prüfungen im Juli höre ich auf, das habe ich mir fest vorgenommen. Bis dahin rechne ich jede Schicht, statt sie als Treffen mit Kollegen zu sehen.",
          },
        ],
        questions: [
          q("ms4-l-0", 0, "Wer arbeitet früh am Samstag in einer Bäckerei?", people, "a", "Ayla commence à cinq heures le samedi à la boulangerie. C’est l’exemple.", true),
          q("ms4-l-1", 1, "Wer hat einen Nebenjob abgelehnt, weil die Prüfungen Vorrang haben?", people, "b", "Ben a refusé un job : ce semestre, les examens décident. Ayla, elle, continue.", false),
          q("ms4-l-2", 2, "Wer arbeitet bewusst im eigenen Studienfach?", people, "c", "Clara est au laboratoire de sa faculté. Un job de caisse, elle l’aurait refusé.", false),
          q("ms4-l-3", 3, "Wessen Schlaf leidet unter der Arbeit?", people, "d", "Denis est rarement déjà au lit avant deux heures du matin. La fatigue de Clara concerne le sport, pas le sommeil.", false),
          q("ms4-l-4", 4, "Wessen Noten sind schlechter geworden, ohne dass die Person kündigt?", people, "a", "Deux notes d’Ayla ont baissé, et elle ne démissionne pas. Ben n’a pas de job.", false),
          q("ms4-l-5", 5, "Wer muss die Miete nicht selbst verdienen?", people, "b", "Les parents de Ben paient le loyer. Ayla, elle, travaille pour le sien.", false),
          q("ms4-l-6", 6, "Wer akzeptiert Müdigkeit nur, wenn der Job zur späteren Laufbahn passt?", people, "c", "Clara échange la fatigue contre une expérience dans sa matière, pas contre n’importe quel salaire.", false),
          q("ms4-l-7", 7, "Wer will nach den Prüfungen mit der Nachtarbeit aufhören?", people, "d", "Denis s’arrête après les examens de juillet. Ce n’est pas une envie vague.", false),
          q("ms4-l-8", 8, "Für wen ist das Team ein Grund zu bleiben, nicht nur das Geld?", people, "a", "Ayla reste surtout pour les collègues. Denis compte les heures, il ne parle pas d’équipe.", false),
          q("ms4-l-9", 9, "Wer sagt offen, dass ein Job jetzt die Lernzeit stehlen würde?", people, "b", "Ben dit qu’un job du soir prendrait les heures de révision. Il le dit même si on le traite de paresseux.", false),
        ],
      },
      {
        id: "ms4-l2",
        title: "Teil 2",
        suggestedMinutes: 12,
        exclusive: true,
        instruction:
          "Sie lesen einen Artikel über Stadtbibliotheken. Welche Sätze a bis h passen in die Lücken 10 bis 15? Zwei Sätze passen nicht. Jeder Satz darf nur einmal verwendet werden.",
        clips: [],
        stimuli: [
          {
            id: "ms4-l2-text",
            kicker: "Artikel",
            title: "Mehr als ein Regal",
            body: "Stadtbibliotheken verleihen noch immer Bücher. Wer nur diese Zahl liest, versteht das Haus aber nur zur Hälfte. [[10]]\n\nStudierende sitzen dort an langen Tischen mit Laptops, Rentner lesen Zeitung. [[11]] Diese Hausarbeiten lagen früher zwischen den Töpfen. Die Bibliothek wird so zum Arbeitsplatz, nicht nur zur Ausleihe.\n\nDeshalb ändern einige Häuser ihre Uhr. [[12]] Wer schichtarbeitet, erreicht einen Schalter um zehn Uhr morgens oft nicht.\n\nSchwieriger ist das Angebot jenseits der Bücher. Lesepatenschaften und Hilfe beim Ausfüllen von Formularen werden nachgefragt. [[13]] Ehrenamtliche können eine Lücke füllen, aber nicht die ganze Woche tragen.\n\nDie Leitung weiß, dass längere Abende Geld kosten. [[14]] Ein gut besuchter Saal überzeugt den Stadtrat leichter als ein leeres Regal.\n\nOb das Modell bleibt, hängt vom nächsten Haushalt ab, und der liest vor allem eine Statistik. [[15]] Solange die Städte nur die Ausleihzahlen melden, wirkt die Bibliothek kleiner, als sie ist.",
          },
        ],
        questions: [
          q("ms4-l-10", 10, "Lücke 10", sentences, "a", "Juste avant, compter seulement les prêts ne dit pas tout. La phrase dit qu’on vient pour un endroit calme, pas pour un titre. Le paragraphe suivant nomme alors qui s’assoit là.", false),
          q("ms4-l-11", 11, "Lücke 11", sentences, "e", "« Diese Hausarbeiten » juste après n’a de sens que si la phrase parle des devoirs. « Genau so ein Tisch » renvoie aux longues tables de la phrase d’avant.", false),
          q("ms4-l-12", 12, "Lücke 12", sentences, "c", "Ils changent l’horaire. La phrase dit qu’un soir dépasse 20 h. La suite explique pourquoi : le travail posté rate le guichet de 10 h.", false),
          q("ms4-l-13", 13, "Lücke 13", sentences, "d", "La suite dit que les bénévoles ne portent pas toute la semaine. Ce programme exige donc du personnel en plus.", false),
          q("ms4-l-14", 14, "Lücke 14", sentences, "h", "Les soirées coûtent. La phrase demande quel service paie ces heures. La salle pleine, juste après, est l’argument devant le conseil.", false),
          q("ms4-l-15", 15, "Lücke 15", sentences, "b", "« Diese Statistik » renvoie au budget, juste avant. Elle oublie les visites sans livre. La phrase suivante dit que les villes ne publient que les prêts.", false),
        ],
      },
      {
        id: "ms4-l3",
        title: "Teil 3",
        suggestedMinutes: 12,
        exclusive: false,
        instruction:
          "Sie lesen einen Text über Balkonregeln in einem Mietshaus. Wählen Sie bei den Aufgaben 16 bis 21 die richtige Lösung a, b oder c. Es gibt nur eine richtige Lösung.",
        clips: [],
        stimuli: [
          {
            id: "ms4-l3-text",
            kicker: "Artikel",
            title: "Der Balkon ist kein Garten",
            body: "Im Haus an der Uferstraße dürfen Mieterinnen und Mieter auf dem Balkon Kräuter in Kästen ziehen. Ein Hochbeet mit Erde direkt auf dem Boden ist verboten, weil das Gewicht die Platte belasten kann. Die Hausverwaltung hat das nach einem Riss im zweiten Stock so festgelegt.\n\nGegossen werden darf täglich, aber nicht nach 21 Uhr, und nicht so, dass Wasser auf den Balkon darunter tropft. Zwei Beschwerden kamen genau deshalb: Nicht der Duft der Pflanzen störte, sondern die nasse Wäsche eine Etage tiefer.\n\nGrillen mit Kohle ist untersagt. Ein Elektrogrill ist erlaubt, wenn er nicht am Geländer festgeschraubt wird und der Rauchmelder frei bleibt. Die Verwaltung prüft das einmal im Jahr, nicht bei jedem Besuch.\n\nWer die Kästen entfernt, muss die Haken wieder schließen. Offene Löcher in der Fassade gelten als Schaden, auch wenn die Pflanzen selbst nichts gekostet haben. Für den Rückbau reicht eine E-Mail an die Verwaltung; ein Handwerker der Firma kommt innerhalb von zehn Tagen.",
          },
        ],
        questions: [
          q("ms4-l-16", 16, "Was ist auf dem Balkon erlaubt?", abc("Kräuter in Kästen.", "Ein Hochbeet mit Erde auf dem Boden.", "Ein Kohlegrill am Geländer."), "a", "Les plantes en jardinières sont permises. Le bac plein de terre au sol est interdit à cause du poids.", false),
          q("ms4-l-17", 17, "Warum ist das Hochbeet verboten?", abc("Weil der Duft die Nachbarn stört.", "Weil das Gewicht die Balkonplatte beschädigen kann.", "Weil Kräuter grundsätzlich nicht erlaubt sind."), "b", "L’interdiction vient du poids après une fissure, pas de l’odeur.", false),
          q("ms4-l-18", 18, "Worüber haben sich Nachbarn beschwert?", abc("Über den Duft der Kräuter.", "Über Wasser auf der Wäsche darunter.", "Über den Elektrogrill."), "b", "Deux plaintes visaient le linge mouillé à l’étage d’en dessous, pas le parfum.", false),
          q("ms4-l-19", 19, "Der Elektrogrill …", abc("ist verboten.", "ist erlaubt, wenn er nicht festgeschraubt ist und der Rauchmelder frei bleibt.", "darf nur mit Kohle betrieben werden."), "b", "Le grill électrique est permis sous deux conditions. Le charbon, lui, est interdit.", false),
          q("ms4-l-20", 20, "Was gilt als Schaden?", abc("Die Pflanzen selbst.", "Offene Löcher in der Fassade nach dem Abbau.", "Eine E-Mail an die Verwaltung."), "b", "Les trous ouverts dans la façade comptent comme un dégât, même si les plantes n’ont rien coûté.", false),
          q("ms4-l-21", 21, "Wie schnell kommt der Handwerker?", abc("Noch am selben Abend.", "Innerhalb von zehn Tagen nach einer E-Mail.", "Nur bei der jährlichen Prüfung."), "b", "Un courriel suffit, et l’artisan de la régie vient dans les dix jours. Le contrôle annuel concerne le grill.", false),
        ],
      },
      {
        id: "ms4-l4",
        title: "Teil 4",
        suggestedMinutes: 12,
        exclusive: true,
        instruction:
          "Sie lesen Meinungen zum Pflichtpraktikum im Studium. Welche Äußerung passt zu welcher Überschrift? Eine Äußerung passt nicht. Die Äußerung a ist das Beispiel und kann nicht noch einmal verwendet werden.",
        clips: [],
        stimuli: [
          { id: "ms4-l4-a", kicker: "a", title: "Elif, Heidelberg", body: "Erst im Praktikum habe ich gemerkt, dass der Beruf anders aussieht als im Seminar. Die Akten, die Pausen, die Sprache am Telefon: Das steht in keinem Lehrbuch. Danach wusste ich, dass ich genau das machen will." },
          { id: "ms4-l4-b", kicker: "b", title: "Jonas, Linz", body: "Drei Monate ohne Lohn kann ich mir nicht leisten. Wenn die Hochschule ein Praktikum verlangt, muss sie auch sagen, wer die Miete zahlt. Sonst können nur die teilnehmen, deren Eltern das tragen." },
          { id: "ms4-l4-c", kicker: "c", title: "Petra, Bremen", body: "In unserer Abteilung heißen die Praktikanten Hilfe und machen die Arbeit einer halben Stelle. Lernen steht auf dem Papier, auf dem Schreibtisch liegt die Post. Das ist keine Ausbildung, das ist ein Loch in der Personaldecke." },
          { id: "ms4-l4-d", kicker: "d", title: "Samir, Bonn", body: "Ich hätte keinen Platz gefunden, wenn das Büro für Praktika nicht angerufen hätte. Eine Liste mit geprüften Betrieben wäre für alle fairer als die Suche über den Cousin. Die Hochschule kennt die seriösen Adressen besser als ich." },
          { id: "ms4-l4-e", kicker: "e", title: "Nora, Basel", body: "Drei Monate mitten im Semester sprengen den Plan. Ich kann nicht gleichzeitig Klausuren schreiben und volle Tage im Betrieb sein. Ein kürzeres Praktikum in den Ferien würde denselben Einblick geben, ohne das Jahr zu zerreißen." },
          { id: "ms4-l4-f", kicker: "f", title: "Timo, Erfurt", body: "Nach dem Praktikum hat mich derselbe Betrieb übernommen. Nicht wegen der Note, sondern weil sie mich schon kannten. Ohne diese Monate hätte ich die Stelle nicht bekommen, das hat die Chefin später gesagt." },
          { id: "ms4-l4-g", kicker: "g", title: "Lara, Graz", body: "Ein Semester in Lissabon war wunderbar, aber es hat mich nicht gelehrt, wie ein deutsches Büro funktioniert. Reisen und Praktikum sind zwei verschiedene Dinge. Wer nur den Stempel im Pass hat, kennt den Beruf noch nicht." },
          { id: "ms4-l4-h", kicker: "h", title: "Cem, Kiel", body: "Wer nie in einem echten Betrieb war, versteht die Vorlesung nur zur Hälfte. Die Beispiele bleiben abstrakt. Ich verteidige die Pflicht nicht wegen des Scheins, sondern weil der Alltag sonst unsichtbar bleibt." },
        ],
        questions: [
          q("ms4-l-bsp4", 0, "Das Praktikum zeigt den Beruf, wie er wirklich ist", opinions, "a", "Elif découvre le métier hors du séminaire : dossiers, pauses, téléphone. C’est l’exemple.", true),
          q("ms4-l-22", 22, "Ohne Bezahlung bleibt das Praktikum ungerecht", opinions, "b", "Jonas parle du loyer : sans salaire, seuls ceux dont les parents paient peuvent participer.", false),
          q("ms4-l-23", 23, "Praktikanten ersetzen fehlendes Personal", opinions, "c", "Petra décrit un demi-poste déguisé en apprentissage. Le trou dans l’effectif est le sujet.", false),
          q("ms4-l-24", 24, "Die Hochschule soll Plätze vermitteln", opinions, "d", "Samir n’a eu une place que parce que le bureau des stages a appelé. Il veut une liste de lieux sérieux.", false),
          q("ms4-l-25", 25, "Die Dauer kollidiert mit den Prüfungen", opinions, "e", "Nora ne peut pas passer des examens et être au bureau à plein temps. Elle propose les vacances.", false),
          q("ms4-l-26", 26, "Aus dem Praktikum wurde die Stelle", opinions, "f", "Timo a été embauché par la même entreprise parce qu’on le connaissait déjà.", false),
          q("ms4-l-27", 27, "Ohne Betrieb bleibt die Theorie blind", opinions, "h", "Cem défend l’obligation parce que le quotidien reste invisible, pas pour le tampon du certificat.", false),
        ],
      },
      {
        id: "ms4-l5",
        title: "Teil 5",
        suggestedMinutes: 6,
        exclusive: true,
        instruction:
          "Sie lesen Auszüge aus der Ordnung eines Hallenbads. Welche Überschrift passt zu welchem Paragraphen? Vier Überschriften werden nicht gebraucht. Die Überschrift zum Beispiel kann nicht noch einmal verwendet werden.",
        clips: [],
        stimuli: [
          {
            id: "ms4-l5-index",
            kicker: "Inhaltsverzeichnis",
            title: "Überschriften",
            body: "a Eintritt\nb Kurse\nc Öffnungszeiten\nd Garderobe\ne Verhalten im Wasser\nf Zutritt\ng Kinderbereich\nh Café",
          },
          {
            id: "ms4-l5-0",
            kicker: "Beispiel § 0",
            title: "Lösung: c",
            body: "Das Bad ist dienstags bis freitags von 6:30 bis 21:30 Uhr geöffnet. Samstags schließt es um 18 Uhr. Montags bleibt es für den technischen Dienst geschlossen.",
          },
          {
            id: "ms4-l5-28",
            kicker: "§ 28",
            body: "Kinder unter acht Jahren dürfen nur mit einer Begleitperson ins Bad. Erwachsene ohne Schwimmnachweis dürfen nur das Nichtschwimmerbecken benutzen. Gruppen ab zehn Personen melden sich zwei Tage vorher an.",
          },
          {
            id: "ms4-l5-29",
            kicker: "§ 29",
            body: "Vom Beckenrand springen ist nur in der ausgewiesenen Zone erlaubt. Unter Wasser tauchen, sodass das Aufsichtspersonal die Person nicht sieht, ist untersagt. Bei Gewitter wird das Bad sofort geräumt.",
          },
          {
            id: "ms4-l5-30",
            kicker: "§ 30",
            body: "Eine Einzelkarte gilt zwei Stunden und kostet 6 Euro, ermäßigt 4 Euro. Zehnerkarten sind nicht übertragbar. Wer die Karte verliert, kauft eine neue; ein Ersatz wird nicht ausgestellt.",
          },
        ],
        questions: [
          q("ms4-l-bsp5", 0, "Beispiel § 0", headings, "c", "Le paragraphe ne donne que les jours et les heures. C’est « Öffnungszeiten ».", true),
          q("ms4-l-28", 28, "§ 28", headings, "f", "Enfants, adultes sans brevet et groupes de dix : ce sont les conditions d’entrée, pas seulement l’espace enfants.", false),
          q("ms4-l-29", 29, "§ 29", headings, "e", "Saut, plongée et orage concernent la conduite dans l’eau, pas le vestiaire.", false),
          q("ms4-l-30", 30, "§ 30", headings, "a", "Prix, durée et carte perdue : c’est le droit d’entrée, pas les cours.", false),
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
        id: "ms4-h1",
        title: "Teil 1",
        suggestedMinutes: 8,
        exclusive: false,
        instruction:
          "Sie hören fünf kurze Texte. Sie hören jeden Text einmal. Zu jedem Text gibt es zwei Aufgaben. Lesen Sie die Aufgaben zuerst, starten Sie dann das Audio. Eine Wiedergabe ist nicht wiederholbar.",
        stimuli: [
          { id: "ms4-h1-s1", kicker: "Text 1", title: "Aufgaben 1–2", body: "Eine Frau sucht einen Schirm.", audioId: "ms4-h-c1" },
          { id: "ms4-h1-s2", kicker: "Text 2", title: "Aufgaben 3–4", body: "Eine Ansage in der Apotheke.", audioId: "ms4-h-c2" },
          { id: "ms4-h1-s3", kicker: "Text 3", title: "Aufgaben 5–6", body: "Eine Sprachnachricht an den Chor.", audioId: "ms4-h-c3" },
          { id: "ms4-h1-s4", kicker: "Text 4", title: "Aufgaben 7–8", body: "Eine Durchsage am Bahnhof.", audioId: "ms4-h-c4" },
          { id: "ms4-h1-s5", kicker: "Text 5", title: "Aufgaben 9–10", body: "Ein Mann erklärt ein Rezept.", audioId: "ms4-h-c5" },
        ],
        clips: [
          { id: "ms4-h-c1", label: "Text 1", maxPlays: 1, script: "Ich habe den blauen Schirm nicht verloren. Er steht noch im Café an der Ecke, neben der Garderobe. Die Bedienung hat ihn gesehen. Ich hole ihn nach der Vorlesung ab, nicht jetzt, weil ich sonst zu spät komme." },
          { id: "ms4-h-c2", label: "Text 2", maxPlays: 1, script: "Die Apotheke ist heute bis 18 Uhr geöffnet. Der Notdienst beginnt nicht hier, sondern in der Marktstraße, ab 18 Uhr. Sonntags hat diese Filiale morgens von 10 bis 12 Uhr offen. Rezepte können Sie auch dann abgeben." },
          { id: "ms4-h-c3", label: "Text 3", maxPlays: 1, script: "Die Chorprobe ist nicht ausgefallen. Sie findet nur nicht im Saal statt, sondern im Foyer, weil der Saal gestrichen wird. Wir fangen eine halbe Stunde später an, um 19 Uhr statt um 18:30. Die Noten bleiben dieselben." },
          { id: "ms4-h-c4", label: "Text 4", maxPlays: 1, script: "Der Regionalzug nach Kiel kommt heute mit etwa zwanzig Minuten Verspätung an, nicht mit einer Stunde. Grund ist eine Signalstörung bei Neumünster. Der Anschluss nach Flensburg wartet nicht. Bitte prüfen Sie die Anzeige am Gleis 4." },
          { id: "ms4-h-c5", label: "Text 5", maxPlays: 1, script: "Für die Suppe brauchen Sie keine Sahne. Das Rezept nimmt Milch und am Ende einen Löffel Zitrone. Die Kartoffeln kommen zuerst ins Wasser, das Gemüse erst nach zehn Minuten. Salz geben Sie ganz zum Schluss dazu, nicht am Anfang." },
        ],
        questions: [
          q("ms4-h-1", 1, "Der Schirm ist gestohlen worden.", yn, "f", "Le parapluie est encore au café, à côté du vestiaire. Il n’a donc pas été volé.", false),
          q("ms4-h-2", 2, "Wann holt sie den Schirm?", abc("Sofort.", "Nach der Vorlesung.", "Morgen früh im Fundbüro."), "b", "Elle le récupère après le cours, sinon elle serait en retard.", false),
          q("ms4-h-3", 3, "Diese Apotheke hat sonntags geschlossen.", yn, "f", "Le dimanche, cette pharmacie est ouverte de 10 h à 12 h.", false),
          q("ms4-h-4", 4, "Wo ist der Notdienst ab 18 Uhr?", abc("In dieser Filiale.", "In der Marktstraße.", "Nur sonntags hier."), "b", "Le service de garde commence dans la Marktstraße, pas dans cette pharmacie.", false),
          q("ms4-h-5", 5, "Die Probe fällt aus.", yn, "f", "La répétition a lieu, mais dans le foyer, pas dans la salle.", false),
          q("ms4-h-6", 6, "Wann beginnt die Probe?", abc("Um 18:30 Uhr im Saal.", "Um 19 Uhr im Foyer.", "Sie wird auf nächste Woche verschoben."), "b", "Une demi-heure plus tard, à 19 h, dans le foyer. Les partitions ne changent pas.", false),
          q("ms4-h-7", 7, "Der Zug hat eine Stunde Verspätung.", yn, "f", "Le retard est d’environ vingt minutes, pas d’une heure.", false),
          q("ms4-h-8", 8, "Was soll man tun?", abc("Am Gleis 4 auf die Anzeige schauen.", "Auf den Anschluss nach Flensburg warten.", "Nach Neumünster zurückfahren."), "a", "La correspondance pour Flensburg n’attend pas. Il faut regarder l’affichage au quai 4.", false),
          q("ms4-h-9", 9, "Die Suppe wird mit Sahne gemacht.", yn, "f", "La recette prend du lait et un peu de citron, pas de crème.", false),
          q("ms4-h-10", 10, "Wann kommt das Salz dazu?", abc("Ganz am Anfang.", "Zusammen mit den Kartoffeln.", "Ganz zum Schluss."), "c", "Le sel arrive à la fin. Les légumes, eux, après dix minutes.", false),
        ],
      },
      {
        id: "ms4-h2",
        title: "Teil 2",
        suggestedMinutes: 10,
        exclusive: false,
        instruction:
          "Sie hören ein Radiointerview. Sie hören den Text zweimal. Markieren Sie bei den Aufgaben 11 bis 16 die richtige Lösung a, b oder c.",
        stimuli: [
          { id: "ms4-h2-s", kicker: "Interview", title: "Blutspende", body: "Herr Aydin spricht über Blutspenden.", audioId: "ms4-h-c6" },
        ],
        clips: [
          {
            id: "ms4-h-c6",
            label: "Interview",
            maxPlays: 2,
            script: "Moderatorin: Herr Aydin, warum fehlen Blutspenden? Aydin: Nicht weil die Menschen gleichgültiger geworden sind. Viele wollen spenden, schaffen es aber nicht in den Öffnungszeiten. Wer schichtarbeitet, steht um acht nicht in der Schlange. Moderatorin: Hilft eine App? Aydin: Sie erinnert, sie ersetzt aber keinen Termin am Abend. Zwei Städte haben donnerstags bis 20 Uhr geöffnet, und dort steigen die Zahlen. Moderatorin: Wer darf nicht spenden? Aydin: Wer eine Erkältung hat, wartet. Nicht zwei Tage, sondern bis die Symptome weg sind und der Arzt nichts anderes sagt. Ein Schnupfen ist kein kleiner Formfehler. Moderatorin: Und die Angst vor der Nadel? Aydin: Die ist real. Wir sagen nicht, dass es gar nicht piekst. Wir sagen, dass es kurz ist und dass man danach sitzen bleibt, mindestens zehn Minuten, nicht zwei. Moderatorin: Was bringt wenig? Aydin: Einmal im Jahr eine große Kampagne und danach wieder Schweigen. Besser sind feste Termine im Betrieb, einmal im Quartal.",
          },
        ],
        questions: [
          q("ms4-h-11", 11, "Warum bleiben Spenden aus?", abc("Weil die Menschen gleichgültig geworden sind.", "Weil viele die Öffnungszeiten nicht erreichen.", "Weil die App die Spende verbietet."), "b", "Les gens veulent donner, mais les horaires ne vont pas avec le travail posté.", false),
          q("ms4-h-12", 12, "Was leistet die App?", abc("Sie ersetzt den Termin.", "Sie erinnert nur.", "Sie öffnet die Zentren bis 20 Uhr."), "b", "L’application rappelle. Ce sont deux villes qui ouvrent jusqu’à 20 h, pas l’application.", false),
          q("ms4-h-13", 13, "Wer eine Erkältung hat, …", abc("wartet zwei Tage und spendet dann.", "wartet, bis die Symptome weg sind.", "darf mit einem Schnupfen trotzdem spenden."), "b", "On attend la fin des symptômes, pas un délai fixe de deux jours. Un rhume n’est pas un détail.", false),
          q("ms4-h-14", 14, "Was sagt er über die Nadel?", abc("Es piekst gar nicht.", "Es ist kurz, und man bleibt danach sitzen.", "Man muss zwei Minuten sitzen."), "b", "Il ne nie pas la piqûre. Elle est brève, et on reste assis au moins dix minutes, pas deux.", false),
          q("ms4-h-15", 15, "Wie lange soll man nach der Spende sitzen?", abc("Zwei Minuten.", "Zehn Minuten.", "Einen ganzen Abend."), "b", "Au moins dix minutes. Deux minutes est le chiffre qu’il écarte.", false),
          q("ms4-h-16", 16, "Was hält er für wirksamer als eine Jahreskampagne?", abc("Schweigen nach der Kampagne.", "Feste Termine im Betrieb, einmal im Quartal.", "Nur die App."), "b", "Une grande campagne suivie de silence sert peu. Mieux : un rendez-vous au travail, une fois par trimestre.", false),
        ],
      },
      {
        id: "ms4-h3",
        title: "Teil 3",
        suggestedMinutes: 10,
        exclusive: false,
        instruction:
          "Sie hören ein Gespräch über eine Nachbarschafts-App. Sie hören den Text einmal. Wer sagt das? Aufgaben 17 bis 22. Jede Person kann mehrmals die richtige Antwort sein.",
        stimuli: [
          { id: "ms4-h3-s", kicker: "Gespräch", title: "Nachrichten aus dem Haus", body: "Drei Personen sprechen. Jede Person kann mehrmals gewählt werden.", audioId: "ms4-h-c7" },
        ],
        clips: [
          {
            id: "ms4-h-c7",
            label: "Gespräch",
            maxPlays: 1,
            script: "Idris: Ich arbeite in der Apotheke im Haus und nutze die App, wenn etwas fehlt, zum Beispiel ein Medikament am Sonntag. Dann frage ich, bevor ich durch die halbe Stadt fahre. Böhm: Mich stören die Fotos von falsch geparkten Autos. Das ist kein Hinweis, das ist eine Anklage, und ich will damit nichts zu tun haben. Lange: Die Moderation löscht Beleidigungen, aber nicht jede Kritik. Wer einen Ton will wie in einer amtlichen Mitteilung, ist in der falschen App. Idris: Was ich nicht tue: private Diagnosen. Ich sage, wo die Notapotheke ist, ich behandle niemanden über den Chat. Böhm: Ein Aushang im Flur würde mir reichen. Die App setzt voraus, dass ich das Telefon immer dabei habe, und das will ich mit siebzig nicht. Lange: Trotzdem erreichen wir über die App Menschen, die den Zettel an der Tür nie lesen, weil sie spät nach Hause kommen.",
          },
        ],
        questions: [
          q("ms4-h-17", 17, "Die App hilft, bevor man durch die Stadt fährt.", speakers, "a", "Frau Idris demande dans l’immeuble avant de traverser la ville pour un médicament.", false),
          q("ms4-h-18", 18, "Fotos von Falschparkern gehen zu weit.", speakers, "b", "Herr Böhm parle d’accusation, pas d’un simple avis. C’est lui qui refuse ces photos.", false),
          q("ms4-h-19", 19, "Nicht jede kritische Bemerkung wird gelöscht.", speakers, "c", "Frau Lange dit que la modération enlève les insultes, pas toute critique.", false),
          q("ms4-h-20", 20, "Über den Chat wird niemand behandelt.", speakers, "a", "Idris refuse les diagnostics privés. Elle indique seulement la pharmacie de garde.", false),
          q("ms4-h-21", 21, "Ein Zettel im Flur würde genügen.", speakers, "b", "Böhm préférerait une affiche dans le couloir. Il ne veut pas avoir le téléphone sur lui.", false),
          q("ms4-h-22", 22, "Wer spät nach Hause kommt, sieht den Zettel oft nicht.", speakers, "c", "Lange dit que l’application touche ceux qui ne lisent jamais le papier sur la porte.", false),
        ],
      },
      {
        id: "ms4-h4",
        title: "Teil 4",
        suggestedMinutes: 12,
        exclusive: false,
        instruction:
          "Sie hören einen kurzen Vortrag über Erwachsene, die ein Instrument lernen. Sie hören den Text zweimal. Wählen Sie bei den Aufgaben 23 bis 30 die richtige Lösung a, b oder c.",
        stimuli: [
          { id: "ms4-h4-s", kicker: "Vortrag", title: "Spät anfangen", body: "Frau Herbst spricht über Musikunterricht im Erwachsenenalter.", audioId: "ms4-h-c8" },
        ],
        clips: [
          {
            id: "ms4-h-c8",
            label: "Vortrag",
            maxPlays: 2,
            script: "Viele Erwachsene glauben, ein Instrument lohne sich nur vor dem zehnten Lebensjahr. Das stimmt für eine Solokarriere oft, für das eigene Spiel nicht. Wer mit vierzig anfängt, wird selten Profimusiker und kann trotzdem in einem Laienensemble mitspielen. Der häufigste Abbruch passiert nicht nach einem Jahr, sondern nach sechs bis acht Wochen, wenn die erste Neugier weg ist und die Finger noch nicht gehorchen. Tägliche zehn Minuten bringen mehr als ein zweistündiger Block am Sonntag. Der lange Block fühlt sich ernsthaft an und vergisst sich bis zur nächsten Woche. Noten lesen ist am Anfang langsamer als das Gehör. Wer nur nach dem Ohr spielt, kommt schnell zu einem Lied und bleibt dann oft bei diesem einen Stück. Ein Lehrer ist keine Garantie. Er verhindert aber, dass man eine falsche Haltung monatelang übt. Mieten statt kaufen ist am Anfang klug: Wer nach zwei Monaten aufhört, hat kein teures Instrument im Schrank. Wer bleibt, kann später kaufen, wenn die Größe und der Klang wirklich passen. Mein Rat ist nicht Talent. Mein Rat ist ein fester Termin, der in der Woche schon steht, bevor die Müdigkeit entscheidet.",
          },
        ],
        questions: [
          q("ms4-h-23", 23, "Ein Beginn mit vierzig …", abc("führt in der Regel zur Solokarriere.", "schließt ein Laienensemble nicht aus.", "ist für jedes Spiel zu spät."), "b", "Une carrière de soliste est souvent trop tard. Jouer dans un ensemble amateur reste possible.", false),
          q("ms4-h-24", 24, "Wann brechen die meisten ab?", abc("Nach einem Jahr.", "Nach sechs bis acht Wochen.", "Noch vor der ersten Stunde."), "b", "L’abandon le plus fréquent arrive quand la curiosité tombe, pas au bout d’un an.", false),
          q("ms4-h-25", 25, "Was bringt mehr?", abc("Zehn Minuten am Tag.", "Zwei Stunden nur am Sonntag.", "Gar keine Übung in der ersten Woche."), "a", "Dix minutes par jour valent plus qu’un long bloc du dimanche, qui se fait oublier.", false),
          q("ms4-h-26", 26, "Nur nach dem Gehör zu spielen …", abc("ersetzt das Notenlesen vollständig.", "führt schnell zu einem Lied und oft nicht weiter.", "ist am Anfang immer langsamer als Noten."), "b", "L’oreille donne vite un morceau, puis on reste souvent sur celui-là. Les notes sont plus lentes au début.", false),
          q("ms4-h-27", 27, "Ein Lehrer …", abc("garantiert den Erfolg.", "verhindert monatelang falsche Haltungen.", "ist nur für Kinder sinnvoll."), "b", "Le professeur ne garantit pas la réussite. Il empêche de répéter une mauvaise posture pendant des mois.", false),
          q("ms4-h-28", 28, "Warum zuerst mieten?", abc("Weil ein Kauf nach zwei Monaten Abbruch teuer im Schrank steht.", "Weil Mieten immer billiger bleibt als Kaufen.", "Weil gekaufte Instrumente verboten sind."), "a", "Si on arrête après deux mois, l’instrument acheté reste cher et inutile. Acheter plus tard reste possible.", false),
          q("ms4-h-29", 29, "Wann soll man kaufen?", abc("Am ersten Tag.", "Später, wenn Größe und Klang passen.", "Nie."), "b", "On achète ensuite, quand la taille et le son conviennent vraiment.", false),
          q("ms4-h-30", 30, "Wozu rät Frau Herbst?", abc("Auf Talent zu warten.", "Einen festen Termin in die Woche zu legen.", "Nur am Sonntag zwei Stunden zu üben."), "b", "Le conseil n’est pas le talent. C’est un créneau déjà placé dans la semaine, avant la fatigue.", false),
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
        id: "ms4-w1",
        title: "Teil 1 — Forumsbeitrag",
        minWords: 150,
        situation: "Sie schreiben einen Forumsbeitrag für Studierende zum Thema Nebenjob neben dem Studium. Denken Sie an eine Einleitung und einen Schluss.",
        bullets: [
          "Äußern Sie Ihre Meinung zu einem Nebenjob während des Semesters.",
          "Nennen Sie Gründe, warum viele trotzdem arbeiten.",
          "Nennen Sie Risiken für das Lernen.",
          "Machen Sie einen Vorschlag, wie man Arbeit und Studium begrenzen kann.",
        ],
        closingNote: "Schreiben Sie mindestens 150 Wörter.",
        coach: "Une entrée, quatre points, une fin. Relie avec trotzdem, deshalb, außerdem. Ne recopie pas les puces mot à mot.",
      },
      {
        id: "ms4-w2",
        title: "Teil 2 — Nachricht",
        minWords: 100,
        situation: "Sie arbeiten samstags in der Bäckerei Krume. Vor den Prüfungen möchten Sie im Mai nur noch jeden zweiten Samstag arbeiten. Schreiben Sie eine Nachricht an die Inhaberin, Frau Krume.",
        bullets: [
          "Erklären Sie, warum Sie die Samstage reduzieren möchten.",
          "Nennen Sie den Zeitraum.",
          "Machen Sie einen konkreten Vorschlag, welche Samstage Sie bleiben können.",
          "Bitten Sie um eine kurze Rückmeldung bis Freitag.",
        ],
        closingNote: "Mindestens 100 Wörter, höfliche Anrede und Grußformel.",
        coach: "Sehr geehrte Frau Krume, quatre points dans l’ordre, Mit freundlichen Grüßen et ton nom. Donne des dates, pas seulement une demande vague.",
      },
    ],
  },
  sprechen: {
    id: "sprechen",
    label: "Sprechen",
    durationMinutes: 15,
    tasks: [
      {
        id: "ms4-p1",
        title: "Teil 1 — Vortrag",
        minutes: 4,
        situation: "Wählen Sie ein Thema für einen kurzen Vortrag.",
        bullets: [
          "Thema A: Sollten Städte kleine Kinos finanziell unterstützen?",
          "Thema B: Ist ein Nebenjob während der Ausbildung sinnvoll?",
          "Einleitung, Beispiel, begründete Meinung, Schluss.",
        ],
        coach: "Parle environ quatre minutes. Tes notes restent un brouillon, pas le discours écrit.",
      },
      {
        id: "ms4-p2",
        title: "Teil 2 — Diskussion",
        minutes: 5,
        situation: "Die Stadt kann nur eines bezahlen: längere Öffnungszeiten der Bibliothek oder ein Reparaturcafé im leerstehenden Laden.",
        bullets: [
          "Wählen Sie eine Seite und begründen Sie sie.",
          "Zeigen Sie, wer die andere Seite braucht.",
          "Schlagen Sie einen Kompromiss vor.",
          "Reagieren Sie auf einen Einwand.",
        ],
        coach: "Entraîne : Da haben Sie recht, allerdings … / Ich schlage vor, dass …",
      },
    ],
  },
};
