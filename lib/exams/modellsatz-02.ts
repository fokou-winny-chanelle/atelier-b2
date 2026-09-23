import type { Choice, Exam, Question } from "../types";

function q(id: string, number: number, prompt: string, choices: Choice[], answer: string, explanation: string, example = false): Question {
  return { id, number, prompt, choices, answer, explanation, example };
}

const people: Choice[] = [
  { id: "a", text: "Nina" },
  { id: "b", text: "Farid" },
  { id: "c", text: "Thea" },
  { id: "d", text: "Holm" },
];

const sentences: Choice[] = [
  { id: "a", text: "Dort zeigt jemand, der das Gerät kennt, den anderen in Ruhe, woran es liegt." },
  { id: "b", text: "Ersatzteile sind oft teurer als ein neues Gerät, und genau das soll sich ändern." },
  { id: "c", text: "Viele Städte stellen dafür Räume zur Verfügung, die abends und samstags offen sind." },
  { id: "d", text: "Die Gäste müssen den vollen Neupreis bar zahlen, sonst dürfen sie das Café nicht betreten." },
  { id: "e", text: "Wer einmal gesehen hat, wie eine Naht wieder hält, traut sich beim nächsten Mal mehr zu." },
  { id: "f", text: "Die Wartezeit auf einen Termin in der Werkstatt betrug damals oft mehrere Wochen." },
  { id: "g", text: "Trotzdem bleibt das Angebot in kleinen Orten ohne Bahnanschluss selten." },
  { id: "h", text: "Im Profisport ersetzen solche Cafés inzwischen das normale Training." },
];

const opinions: Choice[] = [
  { id: "a", text: "a — Lina, Ulm" },
  { id: "b", text: "b — Marek, Dortmund" },
  { id: "c", text: "c — Sophie, Bern" },
  { id: "d", text: "d — Kenan, Kassel" },
  { id: "e", text: "e — Ruth, Rostock" },
  { id: "f", text: "f — Pia, Innsbruck" },
  { id: "g", text: "g — Armin, Trier" },
  { id: "h", text: "h — Joelle, Aachen" },
];

const headings: Choice[] = [
  { id: "a", text: "a Mitgliedsbeitrag" },
  { id: "b", text: "b Trainingszeiten" },
  { id: "c", text: "c Aufnahme neuer Mitglieder" },
  { id: "d", text: "d Haftung bei Unfällen" },
  { id: "e", text: "e Nutzung der Geräte" },
  { id: "f", text: "f Vereinsfeste" },
  { id: "g", text: "g Kleidung in der Halle" },
  { id: "h", text: "h Fahrten zu Auswärtsspielen" },
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
  { id: "a", text: "Frau Okon, Lehrerin" },
  { id: "b", text: "Herr Vogt, Vater" },
  { id: "c", text: "Frau Celik, Schulleiterin" },
];

export const modellsatz02: Exam = {
  id: "ms-02",
  number: 2,
  title: "Modellsatz 2",
  subtitle: "Lernen, Reparieren, Nachrichten",
  lesen: {
    id: "lesen",
    label: "Lesen",
    durationMinutes: 65,
    parts: [
      {
        id: "ms2-l1",
        title: "Teil 1",
        suggestedMinutes: 18,
        exclusive: false,
        instruction:
          "Sie lesen, wie vier Personen über Lernen im Erwachsenenalter sprechen. Auf welche Person treffen die Aussagen zu? Jede Person kann mehrmals gewählt werden.",
        clips: [],
        stimuli: [
          { id: "ms2-a", kicker: "a", title: "Nina", body: "Nach der Arbeit sitze ich noch zwei Stunden im Sprachkurs. Ich bin müde, aber ohne das Zertifikat kann ich die Stelle in der Personalabteilung nicht bekommen. Allein mit einer App schaffe ich die Grammatik nicht. Ich brauche die Lehrerin, die Aufgaben korrigiert, und die festen Termine, sonst schiebe ich alles auf." },
          { id: "ms2-b", kicker: "b", title: "Farid", body: "Klassenzimmer mag ich nicht. Ich höre auf dem Weg zur Arbeit Podcasts auf Spanisch und wiederhole die Sätze leise in der Bahn. Ein Kurs am Abend käme für mich nicht infrage, weil ich dann bei meinen Kindern sein will. Prüfungen interessieren mich nicht. Ich will im Urlaub bestellen, zuhören und ein einfaches Gespräch führen können." },
          { id: "ms2-c", kicker: "c", title: "Thea", body: "Mit 67 habe ich mit dem Klavier angefangen. Leute sagen, das sei zu spät. Das stimmt nicht. Was fehlt, ist nicht die Jugend, sondern die Geduld, jeden Tag zwanzig Minuten zu üben. In einer Gruppe würde ich mich schämen, wenn ich langsamer bin. Deshalb übe ich zu Hause und nehme nur Einzelstunden, in denen niemand sonst zuhört." },
          { id: "ms2-d", kicker: "d", title: "Holm", body: "Ich habe einen Programmierkurs an der Volkshochschule angefangen und nach drei Wochen aufgehört. Die anderen konnten schon mehr, ich kam beim Tempo nicht mit. Seitdem lerne ich mit einem Tutor, einmal pro Woche, in meinem eigenen Rhythmus. Einen Abschluss will ich schon, aber nicht um den Preis, dass ich nichts verstehe." },
        ],
        questions: [
          q("ms2-l-0", 0, "Wer braucht ein Zertifikat für eine konkrete Arbeitsstelle?", people, "a", "Nina a besoin du certificat pour le poste aux ressources humaines.", true),
          q("ms2-l-1", 1, "Wer lernt unterwegs statt in einem Kursraum?", people, "b", "Farid écoute des podcasts dans le train, sur le chemin du travail.", false),
          q("ms2-l-2", 2, "Wer lehnt einen Abendkurs ab, weil die Familie Vorrang hat?", people, "b", "Farid refuse un cours du soir pour être avec ses enfants. Nina, elle, y va.", false),
          q("ms2-l-3", 3, "Wer hält das Alter nicht für das eigentliche Hindernis?", people, "c", "Thea dit qu’il ne manque pas la jeunesse, mais la patience de pratiquer.", false),
          q("ms2-l-4", 4, "Wer übt bewusst jeden Tag eine kurze, feste Zeit?", people, "c", "Thea pratique vingt minutes par jour. Les autres ne décrivent pas ce rituel.", false),
          q("ms2-l-5", 5, "Wer würde sich in einer Lerngruppe schämen?", people, "c", "Thea aurait honte d’être plus lente dans un groupe. Holm a arrêté à cause du rythme, pas par honte.", false),
          q("ms2-l-6", 6, "Wer ist nach der Arbeit müde und lernt trotzdem weiter?", people, "a", "Nina est fatiguée après le travail et reste quand même deux heures en cours.", false),
          q("ms2-l-7", 7, "Wer hat einen Gruppenkurs abgebrochen, weil das Tempo zu hoch war?", people, "d", "Holm a quitté le cours au bout de trois semaines parce qu’il ne suivait pas le rythme.", false),
          q("ms2-l-8", 8, "Wer lernt nach einem Abbruch mit einem Tutor im eigenen Tempo?", people, "d", "Depuis l’abandon, Holm a un tuteur une fois par semaine, à son rythme. Thea n’a pas abandonné un cours.", false),
          q("ms2-l-9", 9, "Wer sagt, dass eine App allein für die Grammatik nicht reicht?", people, "a", "Nina dit qu’une application ne suffit pas pour la grammaire : il lui faut l’enseignante.", false),
        ],
      },
      {
        id: "ms2-l2",
        title: "Teil 2",
        suggestedMinutes: 12,
        exclusive: true,
        instruction: "Sie lesen einen Artikel über Repair-Cafés. Welche Sätze a bis h passen in die Lücken 10 bis 15? Zwei Sätze passen nicht.",
        clips: [],
        stimuli: [
          {
            id: "ms2-l2-text",
            kicker: "Artikel",
            title: "Kaputt, aber noch nicht vorbei",
            body: "Ein Toaster, der nicht mehr springt, landete früher schnell im Müll. In Repair-Cafés versuchen Ehrenamtliche, genau das zu verhindern. [[10]]\n\nDer Andrang ist oft größer als erwartet. [[11]] Manche Gäste kommen eine halbe Stunde vor Öffnung, den defekten Stabmixer in der Tüte.\n\nNicht jedes Gerät wird wieder heil. [[12]] Dann geht es nicht mehr um den Toaster, sondern um die Frage, warum sich Reparieren kaum lohnt.\n\nDer Lerneffekt bleibt trotzdem. [[13]] Beim nächsten Wackelkontakt greifen sie zuerst zum Schraubenzieher und nicht sofort zum Neukauf.\n\nDas Modell trägt sich nicht von allein. [[14]] Ohne diesen Raum müssten die Gruppen in Privatküchen ausweichen, und das schreckt viele ab.\n\nOb die Idee überall ankommt, ist eine andere Frage. [[15]] Wer zwanzig Kilometer fahren muss, um eine Lampe prüfen zu lassen, lässt es oft bleiben.",
          },
        ],
        questions: [
          q("ms2-l-10", 10, "Lücke 10", sentences, "a", "La phrase suivante doit expliquer ce qui se passe dans le café : quelqu’un qui connaît l’appareil montre la panne.", false),
          q("ms2-l-11", 11, "Lücke 11", sentences, "f", "L’affluence s’explique par les longues attentes en atelier classique.", false),
          q("ms2-l-12", 12, "Lücke 12", sentences, "b", "Quand l’objet n’est pas réparé, la phrase utile est celle sur les pièces plus chères que le neuf.", false),
          q("ms2-l-13", 13, "Lücke 13", sentences, "e", "L’effet d’apprentissage : avoir vu une couture tenir donne confiance la fois suivante.", false),
          q("ms2-l-14", 14, "Lücke 14", sentences, "c", "Le modèle a besoin de locaux ouverts le soir et le samedi, fournis par les villes.", false),
          q("ms2-l-15", 15, "Lücke 15", sentences, "g", "La suite parle de la distance. L’offre reste rare dans les petits lieux sans gare.", false),
        ],
      },
      {
        id: "ms2-l3",
        title: "Teil 3",
        suggestedMinutes: 12,
        exclusive: false,
        instruction: "Sie lesen einen Artikel über Betriebsräte und das Dienstfahrrad. Wählen Sie bei den Aufgaben 16 bis 21 die richtige Lösung a, b oder c.",
        clips: [],
        stimuli: [
          {
            id: "ms2-l3-text",
            kicker: "Bericht",
            title: "Das Rad der Firma",
            body: "Die Firma Holtkamp verleiht seit einem Jahr Dienstfahrräder. Wer mindestens drei Tage pro Woche ins Büro kommt, kann ein Rad nutzen und es auch am Wochenende behalten. Das Auto der Firma bleibt für Außentermine reserviert.\n\nGedacht war das Angebot für die Gesundheit. Nach zehn Monaten zeigt die interne Auswertung ein anderes, zusätzliches Bild: Die meisten Nutzerinnen und Nutzer sparen vor allem Geld, nicht Kalorien. Das Bahnticket für die kurze Strecke haben sie gekündigt.\n\nDer Betriebsrat ist nicht gegen das Rad. Er ist gegen die Bedingung mit den drei Bürotagen. Wer zwei Tage vor Ort ist und drei Tage zu Hause arbeitet, bekommt kein Rad, obwohl der Weg an den Präsenztagen derselbe ist. Eine Mitarbeiterin aus der Buchhaltung nennt das eine Strafe für hybrides Arbeiten.\n\nDie Geschäftsführung verteidigt die Regel. Die Räder seien knapp, und wer öfter komme, solle zuerst bedient werden. Eine Ausweitung sei möglich, wenn im nächsten Budget mehr Räder stünden. Einen Rechtsanspruch wolle man nicht.\n\nUnfälle auf dem Arbeitsweg bleiben ein offener Punkt. Die Versicherung zahlt, wenn der direkte Weg genutzt wird. Der Umweg über die Kita ist in der Police nicht enthalten. Der Betriebsrat verlangt dazu eine klare schriftliche Antwort, bevor der Winter beginnt.\n\nBis dahin bleiben 86 von 140 Rädern regelmäßig ausgeliehen. 20 stehen meistens im Keller, weil sie zu klein oder zu groß sind. Die restlichen sind in der Werkstatt.",
          },
        ],
        questions: [
          q("ms2-l-16", 16, "Wer darf ein Dienstfahrrad nutzen?", abc("Jede Person in der Firma, auch ohne Bürotage.", "Wer mindestens drei Tage pro Woche ins Büro kommt.", "Nur die Geschäftsführung."), "b", "La condition est d’être au bureau au moins trois jours par semaine.", false),
          q("ms2-l-17", 17, "Was hat die Auswertung nach zehn Monaten gezeigt?", abc("Die meisten nutzen das Rad vor allem, um Geld zu sparen.", "Die meisten haben deutlich abgenommen.", "Fast niemand nutzt das Angebot."), "a", "Le bilan interne : on économise de l’argent, pas des calories.", false),
          q("ms2-l-18", 18, "Was kritisiert der Betriebsrat?", abc("Dass es überhaupt Dienstfahrräder gibt.", "Die Drei-Tage-Regel für hybrides Arbeiten.", "Dass die Räder auch am Wochenende genutzt werden dürfen."), "b", "Le comité n’est pas contre le vélo, il est contre la condition des trois jours.", false),
          q("ms2-l-19", 19, "Wie reagiert die Geschäftsführung?", abc("Sie schafft die Regel sofort ab.", "Sie will mehr Räder nur prüfen, wenn das nächste Budget es hergibt, ohne Rechtsanspruch.", "Sie gibt jedem hybriden Mitarbeitenden sofort ein Rad."), "b", "Une extension est possible au prochain budget, sans droit automatique.", false),
          q("ms2-l-20", 20, "Wann ist der Unfall auf dem Arbeitsweg versichert?", abc("Auch auf dem Umweg über die Kita.", "Nur auf dem direkten Weg.", "Nur im Winter."), "b", "L’assurance couvre le trajet direct. Le détour par la crèche n’est pas dans le contrat.", false),
          q("ms2-l-21", 21, "Was trifft auf die 140 Räder zu?", abc("Alle sind ständig ausgeliehen.", "86 sind regelmäßig unterwegs, 20 passen oft von der Größe her nicht.", "Die Werkstatt hat alle Räder einbehalten."), "b", "86 sont empruntés régulièrement, 20 restent à la cave à cause de la taille.", false),
        ],
      },
      {
        id: "ms2-l4",
        title: "Teil 4",
        suggestedMinutes: 12,
        exclusive: true,
        instruction: "Sie lesen Meinungen zu Nachrichten in sozialen Netzwerken. Welche Äußerung passt zu welcher Überschrift? Eine Äußerung passt nicht. Äußerung a ist das Beispiel.",
        clips: [],
        stimuli: [
          { id: "ms2-o-a", kicker: "a", title: "Lina, Ulm", body: "Ich erfahre von großen Ereignissen zuerst über eine Story, nicht über die Abendnachrichten. Wenn ich den Absender nicht kenne, lese ich trotzdem weiter, solange die Überschrift stark ist. Geprüft habe ich lange nichts mehr." },
          { id: "ms2-o-b", kicker: "b", title: "Marek, Dortmund", body: "Ich folge drei Redaktionen, deren Namen ich auch im Radio hören würde. Den Rest scrolle ich weg. So bleibt das Netz eine Ergänzung und nicht meine einzige Quelle." },
          { id: "ms2-o-c", kicker: "c", title: "Sophie, Bern", body: "Was mich erschöpft, ist nicht die einzelne Meldung, sondern das Tempo. Kaum habe ich einen Text gelesen, schreit die nächste Überschrift schon nach einer Meinung. Ich schalte die Benachrichtigungen deshalb abends ab." },
          { id: "ms2-o-d", kicker: "d", title: "Kenan, Kassel", body: "In unserer Klasse haben wir gelernt, den Absender und das Datum zu prüfen, bevor wir etwas teilen. Seitdem leite ich viel weniger weiter. Das war konkreter als jede Warnung vor dem bösen Internet." },
          { id: "ms2-o-e", kicker: "e", title: "Ruth, Rostock", body: "Meine Eltern glauben einen Beitrag, weil eine Cousine ihn geschickt hat, nicht weil eine Redaktion ihn geprüft hat. Verwandtschaft ersetzt bei ihnen die Quellenangabe." },
          { id: "ms2-o-f", kicker: "f", title: "Pia, Innsbruck", body: "Ich zahle für zwei Zeitungen, gerade weil ich im Netz so viel Umsonst-Inhalt sehe. Wer nichts bezahlt, darf sich nicht wundern, wenn die gründliche Recherche verschwindet." },
          { id: "ms2-o-g", kicker: "g", title: "Armin, Trier", body: "Ein Vorteil bleibt: Lokale Themen, die in der großen Zeitung nur eine Zeile bekommen, diskutieren bei uns die Nachbarinnen noch am selben Abend. Ohne die Gruppe wüsste ich vom defekten Aufzug im Rathaus nichts." },
          { id: "ms2-o-h", kicker: "h", title: "Joelle, Aachen", body: "Ich fotografiere mein Frühstück und poste es, wenn das Licht gut ist. Nachrichten lese ich dafür lieber auf Papier, ganz ohne Kommentarfunktion." },
        ],
        questions: [
          q("ms2-l-bsp", 0, "Meldungen werden weitergelesen, ohne sie zu prüfen", opinions, "a", "Lina continue de lire sans vérifier depuis longtemps.", true),
          q("ms2-l-22", 22, "Bekannte Mediennamen als Filter", opinions, "b", "Marek ne suit que trois rédactions qu’il entendrait aussi à la radio.", false),
          q("ms2-l-23", 23, "Das Tempo der Meldungen ermüdet", opinions, "c", "Sophie est épuisée par la cadence, pas par une seule information.", false),
          q("ms2-l-24", 24, "Prüfstrategien kann man lernen", opinions, "d", "Kenan a appris en classe à vérifier l’expéditeur et la date avant de partager.", false),
          q("ms2-l-25", 25, "Vertrauen entsteht durch die Person, die sendet", opinions, "e", "Les parents de Ruth croient un message parce qu’une cousine l’a envoyé.", false),
          q("ms2-l-26", 26, "Guter Journalismus braucht zahlende Leserinnen und Leser", opinions, "f", "Pia paie deux journaux pour que l’enquête sérieuse ne disparaisse pas.", false),
          q("ms2-l-27", 27, "Lokale Themen werden schneller sichtbar", opinions, "g", "Armin apprend les sujets locaux, comme l’ascenseur de la mairie, le soir même.", false),
        ],
      },
      {
        id: "ms2-l5",
        title: "Teil 5",
        suggestedMinutes: 6,
        exclusive: true,
        instruction: "Sie lesen Auszüge aus der Ordnung eines Sportvereins. Welche Überschrift passt? Vier Überschriften werden nicht gebraucht.",
        clips: [],
        stimuli: [
          { id: "ms2-idx", kicker: "Inhaltsverzeichnis", title: "Überschriften", body: "a Mitgliedsbeitrag\nb Trainingszeiten\nc Aufnahme neuer Mitglieder\nd Haftung bei Unfällen\ne Nutzung der Geräte\nf Vereinsfeste\ng Kleidung in der Halle\nh Fahrten zu Auswärtsspielen" },
          { id: "ms2-p0", kicker: "Beispiel § 0", title: "Lösung: c", body: "Neue Mitglieder werden nur zum Monatsersten aufgenommen. Eine Anmeldung per Telefon reicht nicht; das Formular muss unterschrieben in der Geschäftsstelle liegen." },
          { id: "ms2-p28", kicker: "§ 28", body: "Hanteln und Matten bleiben nach der Stunde an dem Platz, der an der Wand markiert ist. Defekte Geräte werden nicht weiter benutzt, sondern mit einem Zettel versehen und dem Trainer gemeldet." },
          { id: "ms2-p29", kicker: "§ 29", body: "In der Halle sind Hallenschuhe Pflicht. Straßenschuhe und Stollen sind untersagt. Lange Ketten und offene Ohrringe müssen vor dem Training abgelegt werden." },
          { id: "ms2-p30", kicker: "§ 30", body: "Der Verein haftet nicht für Wertsachen, die in der offenen Garderobe liegen. Bei Sportunfällen greift die vereinbarte Versicherung nur während der offiziellen Trainingszeit und bei vom Verein gemeldeten Wettkämpfen." },
        ],
        questions: [
          q("ms2-l-bsp5", 0, "Beispiel § 0", headings, "c", "Il s’agit seulement de l’admission des nouveaux membres.", true),
          q("ms2-l-28", 28, "§ 28", headings, "e", "Rangement et signalement du matériel : c’est l’usage des appareils.", false),
          q("ms2-l-29", 29, "§ 29", headings, "g", "Chaussures de salle et bijoux : la tenue dans le gymnase.", false),
          q("ms2-l-30", 30, "§ 30", headings, "d", "Objets de valeur et accidents : la responsabilité, pas les horaires d’entraînement.", false),
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
        id: "ms2-h1",
        title: "Teil 1",
        suggestedMinutes: 8,
        exclusive: false,
        instruction: "Sie hören fünf kurze Texte einmal. Lesen Sie zuerst die Aufgaben, dann starten Sie das Audio.",
        stimuli: [
          { id: "ms2-h1-s1", kicker: "Text 1", title: "Aufgaben 1–2", body: "Ein Mann an einem Schalter.", audioId: "ms2-c1" },
          { id: "ms2-h1-s2", kicker: "Text 2", title: "Aufgaben 3–4", body: "Eine Ansage im Museum.", audioId: "ms2-c2" },
          { id: "ms2-h1-s3", kicker: "Text 3", title: "Aufgaben 5–6", body: "Zwei Kolleginnen unterwegs.", audioId: "ms2-c3" },
          { id: "ms2-h1-s4", kicker: "Text 4", title: "Aufgaben 7–8", body: "Ein Arzt spricht mit einer Patientin.", audioId: "ms2-c4" },
          { id: "ms2-h1-s5", kicker: "Text 5", title: "Aufgaben 9–10", body: "Eine Nachbarin bittet um Hilfe.", audioId: "ms2-c5" },
        ],
        clips: [
          { id: "ms2-c1", label: "Text 1", maxPlays: 1, script: "Guten Tag, ich möchte das Paket nicht selbst abholen. Können Sie es morgen an meine Arbeitsstelle schicken, nicht an die alte Adresse auf dem Schein? Die Straße stimmt nicht mehr. Ich zahle den Differenzbetrag gern hier." },
          { id: "ms2-c2", label: "Text 2", maxPlays: 1, script: "Liebe Gäste, der Saal mit den Skizzen schließt heute bereits um 16 Uhr, nicht um 18 Uhr. Der Eingang für die Sonderausstellung bleibt bis 20 Uhr offen. Taschen müssen Sie trotzdem an der Garderobe abgeben, auch wenn Sie nur eine Stunde bleiben." },
          { id: "ms2-c3", label: "Text 3", maxPlays: 1, script: "Ich dachte, die Sitzung ist im dritten Stock. Nein, die wurde in den Besprechungsraum neben der Kantine verlegt, weil oben gestrichen wird. Wir kommen trotzdem pünktlich, wenn wir den Aufzug lassen und die Treppe nehmen." },
          { id: "ms2-c4", label: "Text 4", maxPlays: 1, script: "Das Knie ist nicht gebrochen. Sie sollen diese Woche keine langen Strecken laufen, kurze Wege in der Wohnung sind in Ordnung. Ich verschreibe keine stärkere Tablette. Wenn die Schwellung bis Freitag zunimmt, kommen Sie wieder, nicht erst in einem Monat." },
          { id: "ms2-c5", label: "Text 5", maxPlays: 1, script: "Könnten Sie morgen früh meinen Briefkasten leeren? Ich bin bis Sonntag bei meiner Schwester. Die Pflanzen müssen Sie nicht gießen, das hat der Nachbar von gegenüber schon übernommen. Nur die Post, bitte, damit nichts aus dem Kasten fällt." },
        ],
        questions: [
          q("ms2-h-1", 1, "Der Mann möchte das Paket an eine neue Adresse schicken lassen.", yn, "r", "Il ne veut pas le retirer lui-même et donne une autre adresse, celle du travail.", false),
          q("ms2-h-2", 2, "Wohin soll das Paket?", abc("An die alte Adresse auf dem Schein.", "An seine Arbeitsstelle.", "Er nimmt es sofort mit."), "b", "Il demande l’envoi à son lieu de travail, pas à l’ancienne adresse.", false),
          q("ms2-h-3", 3, "Die Sonderausstellung schließt um 16 Uhr.", yn, "f", "C’est la salle des esquisses qui ferme à 16 h. L’exposition spéciale reste ouverte jusqu’à 20 h.", false),
          q("ms2-h-4", 4, "Was gilt auch für einen kurzen Besuch?", abc("Taschen bleiben an der Garderobe.", "Der Eintritt ist frei.", "Skizzen dürfen mitgenommen werden."), "a", "Les sacs doivent être déposés au vestiaire, même pour une heure.", false),
          q("ms2-h-5", 5, "Die Sitzung findet wie geplant im dritten Stock statt.", yn, "f", "Elle a été déplacée à côté de la cantine parce qu’on peint à l’étage.", false),
          q("ms2-h-6", 6, "Wie wollen die beiden rechtzeitig ankommen?", abc("Mit dem Aufzug.", "Über die Treppe.", "Indem sie die Sitzung verschieben."), "b", "Elles laissent l’ascenseur et prennent l’escalier.", false),
          q("ms2-h-7", 7, "Das Knie ist gebrochen.", yn, "f", "Le médecin dit que le genou n’est pas cassé.", false),
          q("ms2-h-8", 8, "Was soll die Patientin tun?", abc("Diese Woche keine langen Strecken laufen und bei mehr Schwellung bis Freitag wiederkommen.", "Sofort eine stärkere Tablette nehmen.", "Erst in einem Monat wiederkommen."), "a", "Pas de longs trajets, et revenir vendredi si le gonflement augmente. Pas de comprimé plus fort.", false),
          q("ms2-h-9", 9, "Die Nachbarin bittet darum, die Pflanzen zu gießen.", yn, "f", "Les plantes sont déjà prises en charge. Elle demande seulement le courrier.", false),
          q("ms2-h-10", 10, "Was genau soll erledigt werden?", abc("Der Briefkasten soll geleert werden.", "Die Schwester soll abgeholt werden.", "Der Nachbar gegenüber soll informiert werden."), "a", "Vider la boîte aux lettres pour que rien ne dépasse.", false),
        ],
      },
      {
        id: "ms2-h2",
        title: "Teil 2",
        suggestedMinutes: 10,
        exclusive: false,
        instruction: "Sie hören ein Interview über Stadtbäume. Sie hören den Text zweimal.",
        stimuli: [{ id: "ms2-h2-s", kicker: "Interview", title: "Bäume in der Straße", body: "Herr Solmaz spricht über Stadtbäume.", audioId: "ms2-c6" }],
        clips: [{
          id: "ms2-c6",
          label: "Interview",
          maxPlays: 2,
          script: "Moderatorin: Herr Solmaz, warum fallen in heißen Sommern so viele Straßenbäume aus? Solmaz: Nicht nur wegen der Hitze. Die Baumscheiben sind oft zu klein, das Wasser läuft in die Kanalisation, und die Wurzeln stehen unter dem Pflaster wie in einem Topf. Moderatorin: Helfen die Wassersäcke, die Anwohnende um den Stamm legen? Solmaz: Kurzfristig ja. Sie ersetzen aber keine größeren Flächen, in denen Regen versickern kann. Moderatorin: Welche Bäume pflanzen Sie neu? Solmaz: Nicht mehr automatisch die Arten, die wir seit fünfzig Jahren kennen. Wir testen Sorten, die Trockenheit besser aushalten, und schauen fünf Jahre lang, ob sie wirklich bleiben. Moderatorin: Und die Kritik, die Straßen würden dann anders aussehen? Solmaz: Ein einheitliches Bild ist mir weniger wichtig als ein Baum, der in zwanzig Jahren noch steht. Wer Schatten will, muss das akzeptieren.",
        }],
        questions: [
          q("ms2-h-11", 11, "Woran scheitern viele Straßenbäume?", abc("Nur an einzelnen heißen Tagen.", "An zu kleinen Flächen, ablaufendem Wasser und Wurzeln unter dem Pflaster.", "Daran, dass niemand sie gießt."), "b", "Il cite trois causes ensemble, pas seulement la chaleur.", false),
          q("ms2-h-12", 12, "Was sagt er über Wassersäcke?", abc("Sie sind langfristig die beste Lösung.", "Sie helfen kurz, ersetzen aber keine größeren Versickerungsflächen.", "Sie schaden den Wurzeln."), "b", "Utiles à court terme, ils ne remplacent pas une plus grande surface où l’eau s’infiltre.", false),
          q("ms2-h-13", 13, "Welche Bäume werden neu gepflanzt?", abc("Ausschließlich die Arten der letzten fünfzig Jahre.", "Sorten, die Trockenheit besser aushalten und mehrere Jahre beobachtet werden.", "Nur Bäume, die schnell Schatten werfen, ohne Test."), "b", "On teste des variétés plus résistantes à la sécheresse pendant cinq ans.", false),
          q("ms2-h-14", 14, "Wie reagiert er auf die Kritik am veränderten Straßenbild?", abc("Ein einheitliches Bild ist ihm weniger wichtig als ein Baum, der bleibt.", "Er will das alte Bild unter allen Umständen erhalten.", "Er pflanzt deshalb gar keine neuen Bäume."), "a", "L’unité visuelle compte moins qu’un arbre encore debout dans vingt ans.", false),
          q("ms2-h-15", 15, "Wie lange werden neue Sorten beobachtet?", abc("Einen Sommer.", "Fünf Jahre.", "Zwanzig Jahre, bevor sie gepflanzt werden."), "b", "Il dit qu’on regarde pendant cinq ans si elles restent vraiment.", false),
          q("ms2-h-16", 16, "Was müssen Menschen akzeptieren, die Schatten wollen?", abc("Dass das Straßenbild sich verändern kann.", "Dass Wassersäcke verboten werden.", "Dass keine neuen Bäume mehr kommen."), "a", "Qui veut de l’ombre doit accepter un aspect de rue différent.", false),
        ],
      },
      {
        id: "ms2-h3",
        title: "Teil 3",
        suggestedMinutes: 10,
        exclusive: false,
        instruction: "Sie hören ein Gespräch über Hausaufgaben an einer Schule. Sie hören den Text einmal. Wer sagt das?",
        stimuli: [{ id: "ms2-h3-s", kicker: "Gespräch", title: "Hausaufgaben", body: "Drei Personen. Jede Person kann mehrmals gewählt werden.", audioId: "ms2-c7" }],
        clips: [{
          id: "ms2-c7",
          label: "Gespräch",
          maxPlays: 1,
          script: "Okon: Ich gebe weniger Aufgaben mit nach Hause, dafür müssen sie im Unterricht fertig werden. Wer zu Hause kein ruhiges Zimmer hat, soll nicht benachteiligt sein. Vogt: Bei uns am Küchentisch funktioniert das aber. Mein Sohn braucht die Wiederholung abends, sonst ist die Mathearbeit am Freitag verloren. Celik: Die Schule verkürzt die Hausaufgaben auf maximal zwanzig Minuten pro Fach, nicht auf null. Wir wollen Übung, aber kein zweites Schulzimmer am Abend. Okon: Und ich korrigiere lieber kurz und klar als seitenlang. Sonst sehe ich nicht, wer die Aufgabe wirklich verstanden hat. Vogt: Dann sagen Sie mir bitte auch, woran ich abends merke, dass er üben soll. Ohne einen Satz von der Lehrkraft rate ich nur. Celik: Genau dafür steht ab nächster Woche ein Kasten im Elternbrief: was geübt wird, und was die Familie nicht leisten muss.",
        }],
        questions: [
          q("ms2-h-17", 17, "Kinder ohne ruhigen Platz zu Hause dürfen nicht benachteiligt werden.", speakers, "a", "Frau Okon réduit les devoirs pour cette raison.", false),
          q("ms2-h-18", 18, "Abendliche Wiederholung ist für die nächste Arbeit nötig.", speakers, "b", "Herr Vogt dit que son fils a besoin de revoir le soir, sinon le contrôle de maths est perdu.", false),
          q("ms2-h-19", 19, "Hausaufgaben sollen kürzer werden, aber nicht verschwinden.", speakers, "c", "La directrice fixe un maximum de vingt minutes par matière, pas zéro.", false),
          q("ms2-h-20", 20, "Kurze Korrekturen zeigen besser, wer die Aufgabe verstanden hat.", speakers, "a", "C’est Frau Okon qui préfère corriger court et clair.", false),
          q("ms2-h-21", 21, "Eltern brauchen einen klaren Hinweis, was geübt werden soll.", speakers, "b", "Herr Vogt dit que sans une phrase de l’enseignant, il ne fait que deviner.", false),
          q("ms2-h-22", 22, "Ein Hinweis im Elternbrief soll sagen, was geübt wird und was Familien nicht tun müssen.", speakers, "c", "Frau Celik annonce cet encadré dans la lettre aux parents.", false),
        ],
      },
      {
        id: "ms2-h4",
        title: "Teil 4",
        suggestedMinutes: 12,
        exclusive: false,
        instruction: "Sie hören einen Vortrag über secondhand Kleidung. Sie hören den Text zweimal.",
        stimuli: [{ id: "ms2-h4-s", kicker: "Vortrag", title: "Zweite Runde", body: "Frau Albers spricht über gebrauchte Kleidung.", audioId: "ms2-c8" }],
        clips: [{
          id: "ms2-c8",
          label: "Vortrag",
          maxPlays: 2,
          script: "Gebrauchte Kleidung ist nicht automatisch die bessere Wahl. Wenn ein Pullover einmal um die halbe Welt geschickt wird, um dann ungetragen im Lager zu liegen, ist wenig gewonnen. Sinnvoll wird Secondhand, wenn das Stück hier noch getragen wird und ein Neukauf wirklich ausbleibt. Viele Plattformen leben von der Menge. Je schneller ein Teil wieder verkauft wird, desto mehr verdient die Seite, auch wenn niemand das Kleid danach anzieht. Ich rate dazu, zuerst den eigenen Schrank zu leer zu kaufen, nicht den der anderen. Was übrig bleibt, sollte man lieber in eine Annahme vor Ort geben als in einen Container, dessen Weg man nicht kennt. Qualität erkennt man nicht am niedrigen Preis, sondern an Nähten, die sich nicht schon in der Hand auflösen. Und: Ein einzelnes gutes gebrauchtes Teil ersetzt keine Gewohnheit, jede Woche etwas Neues zu bestellen.",
        }],
        questions: [
          q("ms2-h-23", 23, "Secondhand ist nach Frau Albers …", abc("immer die bessere Wahl.", "nicht automatisch besser.", "nur im Luxussegment sinnvoll."), "b", "La première phrase dit que ce n’est pas automatiquement le meilleur choix.", false),
          q("ms2-h-24", 24, "Wann ist gebrauchte Kleidung sinnvoll?", abc("Wenn sie weit transportiert wird und im Lager liegt.", "Wenn sie vor Ort getragen wird und ein Neukauf ausbleibt.", "Wenn sie möglichst oft weiterverkauft wird."), "b", "Utile si la pièce est portée ici et remplace vraiment un achat neuf.", false),
          q("ms2-h-25", 25, "Wovon leben viele Plattformen?", abc("Von wenigen sehr teuren Stücken.", "Von der Menge und vom schnellen Weiterverkauf.", "Von Reparaturwerkstätten."), "b", "Elles gagnent sur le volume et la vitesse de revente.", false),
          q("ms2-h-26", 26, "Wozu rät sie zuerst?", abc("Den eigenen Schrank zu leeren, bevor man den der anderen kauft.", "Jede Woche ein neues gebrauchtes Teil zu bestellen.", "Nur noch Container zu nutzen."), "a", "D’abord vider sa propre armoire, pas acheter celle des autres.", false),
          q("ms2-h-27", 27, "Was soll mit Reststücken passieren?", abc("Sie gehören in einen beliebigen Container.", "Besser in eine Annahme vor Ort, deren Weg man kennt.", "Sie sollen um die halbe Welt geschickt werden."), "b", "Mieux vaut un point de collecte local qu’un conteneur dont on ignore le trajet.", false),
          q("ms2-h-28", 28, "Woran erkennt man Qualität?", abc("Am niedrigen Preis.", "An Nähten, die nicht sofort aufgehen.", "Daran, wie oft das Teil verkauft wurde."), "b", "La qualité se voit aux coutures, pas au prix bas.", false),
          q("ms2-h-29", 29, "Ein einzelnes gutes gebrauchtes Teil …", abc("ersetzt die Gewohnheit, ständig Neues zu bestellen.", "ersetzt diese Gewohnheit nicht.", "macht weitere Käufe unnötig teuer."), "b", "Une seule bonne pièce d’occasion ne remplace pas l’habitude de commander du neuf chaque semaine.", false),
          q("ms2-h-30", 30, "Wenig gewonnen ist, wenn ein Pullover …", abc("vor Ort noch oft getragen wird.", "weit transportiert wird und dann ungetragen im Lager liegt.", "eine kaputte Naht hat und repariert wird."), "b", "Le transport lointain suivi d’un stockage sans usage ne sert à rien.", false),
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
        id: "ms2-s1",
        title: "Teil 1 — Forumsbeitrag",
        minWords: 150,
        situation: "Sie schreiben einen Forumsbeitrag zum Thema Ehrenamt neben dem Beruf. Denken Sie an eine Einleitung und einen Schluss.",
        bullets: [
          "Äußern Sie Ihre Meinung zu ehrenamtlicher Arbeit neben einer vollen Stelle.",
          "Nennen Sie Gründe, warum sich viele Menschen trotzdem engagieren.",
          "Nennen Sie Schwierigkeiten, die dabei entstehen können.",
          "Machen Sie einen Vorschlag, wie Arbeitgeber Engagement erleichtern könnten.",
        ],
        closingNote: "Schreiben Sie mindestens 150 Wörter.",
        coach: "Quatre fonctions : opinion, raisons, difficultés, proposition. Une phrase d’ouverture et une de clôture.",
      },
      {
        id: "ms2-s2",
        title: "Teil 2 — Nachricht",
        minWords: 100,
        situation: "Sie haben einen Platz in einem Abendkurs „Deutsch für den Beruf“ an der Volkshochschule. Der Kurs überschneidet sich jetzt mit einer Schicht. Schreiben Sie eine Nachricht an die Kursleiterin, Frau Abbas.",
        bullets: [
          "Erklären Sie den Terminkonflikt.",
          "Bitten Sie um Verständnis.",
          "Fragen Sie, ob ein späterer Kurs oder ein Platz im nächsten Durchgang möglich ist.",
          "Bedanken Sie sich für die bisherige Teilnahme und nennen Sie, was Ihnen der Kurs gebracht hat.",
        ],
        closingNote: "Mindestens 100 Wörter, höfliche Anrede und Grußformel.",
        coach: "Sehr geehrte Frau Abbas … Mit freundlichen Grüßen. Restez concret sur l’horaire.",
      },
    ],
  },
  sprechen: {
    id: "sprechen",
    label: "Sprechen",
    durationMinutes: 15,
    tasks: [
      {
        id: "ms2-p1",
        title: "Teil 1 — Vortrag",
        minutes: 4,
        situation: "Wählen Sie ein Thema für einen kurzen Vortrag.",
        bullets: [
          "Thema A: Sollten Städte die Innenstädte für private Autos stärker sperren?",
          "Thema B: Ist gemeinsames Essen in der Familie noch wichtig?",
          "Einleitung, Beispiel, Meinung mit Begründung, Schluss.",
        ],
        coach: "Quatre minutes à voix haute. Notes autorisées.",
      },
      {
        id: "ms2-p2",
        title: "Teil 2 — Diskussion",
        minutes: 5,
        situation: "Im Betrieb soll entweder ein Ruhetag mehr oder ein höherer Zuschuss zum Jobticket eingeführt werden. Es ist nur eines von beiden möglich.",
        bullets: [
          "Sagen Sie, was Sie vorziehen, und warum.",
          "Nehmen Sie die andere Seite ernst.",
          "Machen Sie einen Kompromissvorschlag.",
          "Formulieren Sie ein Gegenargument und reagieren Sie darauf.",
        ],
        coach: "Phrases utiles : Einerseits … andererseits … / Ich schlage vor, dass …",
      },
    ],
  },
};
