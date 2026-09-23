import type { Choice, Exam, Question } from "../types";

const people: Choice[] = [
  { id: "a", text: "Lea" },
  { id: "b", text: "Karim" },
  { id: "c", text: "Svenja" },
  { id: "d", text: "Otto" },
];

function q(
  id: string,
  number: number,
  prompt: string,
  choices: Choice[],
  answer: string,
  explanation: string,
  example = false,
): Question {
  return { id, number, prompt, choices, answer, explanation, example };
}

const sentences: Choice[] = [
  { id: "a", text: "Mehrere Staaten unterstützen ausgewählte Strecken inzwischen mit öffentlichen Mitteln." },
  { id: "b", text: "Tickets über Grenzen hinweg zu kaufen, ist häufig immer noch kompliziert." },
  { id: "c", text: "Billigflüge machten kurze Strecken so preiswert, dass die Nachtzüge nicht mehr konkurrieren konnten." },
  { id: "d", text: "Fachleute weisen darauf hin, dass es noch viel zu wenige Plätze und Abfahrten gibt." },
  { id: "e", text: "Entscheidend ist, ob man im Zug tatsächlich schlafen kann." },
  { id: "f", text: "In den Innenstädten ist das Fahrrad im Berufsverkehr oft schneller als das Auto." },
  { id: "g", text: "Deshalb streichen immer mehr Familien den Urlaub vollständig aus dem Kalender." },
  { id: "h", text: "Für sie gehört das gemeinsame Abteil inzwischen zum Erlebnis der Reise dazu." },
];

const opinions: Choice[] = [
  { id: "a", text: "a — Nora, Kiel" },
  { id: "b", text: "b — Tarik, Essen" },
  { id: "c", text: "c — Helene, Passau" },
  { id: "d", text: "d — Jonas, Bremen" },
  { id: "e", text: "e — Mira, Graz" },
  { id: "f", text: "f — Paul, Lübeck" },
  { id: "g", text: "g — Ines, Freiburg" },
  { id: "h", text: "h — Cem, Mainz" },
];

const headings: Choice[] = [
  { id: "a", text: "a Abschlussprüfung" },
  { id: "b", text: "b Kursinhalte im Detail" },
  { id: "c", text: "c Kursbeginn" },
  { id: "d", text: "d Dauer und Umfang" },
  { id: "e", text: "e Unterrichtsformen" },
  { id: "f", text: "f Voraussetzungen" },
  { id: "g", text: "g Kursziele" },
  { id: "h", text: "h Praktikum im Ausland" },
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
  { id: "a", text: "Herr Pauli, Student" },
  { id: "b", text: "Frau Berg, Rentnerin" },
  { id: "c", text: "Herr Novak, Architekt" },
];

export const modellsatz01: Exam = {
  id: "ms-01",
  number: 1,
  title: "Modellsatz 1",
  subtitle: "Wohnen, Nachtzüge, Licht in der Stadt",
  lesen: {
    id: "lesen",
    label: "Lesen",
    durationMinutes: 65,
    parts: [
      {
        id: "ms1-l1",
        title: "Teil 1",
        suggestedMinutes: 18,
        exclusive: false,
        instruction:
          "Sie lesen in einem Forum, wie vier Personen über Wohnen in der Stadt und auf dem Land denken. Auf welche Person treffen die Aussagen zu? Jede Person kann mehrmals gewählt werden. Es gibt nur eine richtige Lösung pro Aussage.",
        clips: [],
        stimuli: [
          {
            id: "ms1-l1-a",
            kicker: "a",
            title: "Lea",
            body: "Ich lebe in einer kleinen Wohnung in der Innenstadt, und das ist eine bewusste Entscheidung. Zur Arbeit, zum Einkaufen und zu Freunden gehe ich zu Fuß oder nehme das Rad; mein Auto habe ich vor einem Jahr verkauft. Die Miete ist hoch, und ich ärgere mich jeden Monat darüber, aber ich bleibe. Wenn ich morgens keinen Stau sehe, weil ich gar nicht erst ins Auto steige, fühlt sich der Tag leichter an. Lärm gibt es, ja. Trotzdem möchte ich diese kurzen Wege nicht gegen ein günstigeres Zimmer am Stadtrand tauschen.",
          },
          {
            id: "ms1-l1-b",
            kicker: "b",
            title: "Karim",
            body: "Vor zwei Jahren sind wir aus der Stadt weggezogen, weil wir die Miete nicht mehr tragen konnten. Das Haus im Umland ist ruhiger und günstiger, aber ich pendle täglich: morgens vierzig Minuten mit dem Zug, abends noch einmal. Diese Strecke empfinde ich inzwischen als echte Belastung. Unter der Woche bin ich vor allem unterwegs und kaum noch zu Hause. Am Wochenende erhole ich mich, doch ich merke, dass ich dieses Pendeln auf Dauer nicht durchhalte.",
          },
          {
            id: "ms1-l1-c",
            kicker: "c",
            title: "Svenja",
            body: "Unser Haus liegt am Rand eines Dorfes. Der Garten bedeutet mir mehr als ein kurzer Weg zur Arbeit; ich verbringe dort fast jede freie Stunde. Wenn im Dorf jemand krank wird, klingeln die Nachbarn und bringen etwas zu essen vorbei. Das ist hier selbstverständlich und nicht die Ausnahme. Was ich vermisse, sind Konzerte, ein Kino und ab und zu eine Ausstellung. Dafür fahre ich etwa einmal im Monat in die nächste Stadt. Die Ruhe am Abend möchte ich trotzdem nicht mehr hergeben.",
          },
          {
            id: "ms1-l1-d",
            kicker: "d",
            title: "Otto",
            body: "Seit ich fast nur noch im Homeoffice arbeite, spielt der Arbeitsweg für mich kaum eine Rolle. Ich könnte an vielen Orten wohnen, solange die Internetverbindung stabil ist. Im Moment lebe ich in einer Mittelstadt, weil Arztpraxen, Bahn und Geschäfte gut erreichbar sind. Langfristig möchte ich aber wieder näher bei meinen Eltern leben, die im Norden wohnen. Ob das dann eher Stadt oder Land wird, ist mir weniger wichtig als die Nähe zur Familie.",
          },
        ],
        questions: [
          q("ms1-l-0", 0, "Wer erledigt alltägliche Wege meist zu Fuß oder mit dem Fahrrad?", people, "a", "Lea dit qu’elle va au travail, faire les courses et voir des amis à pied ou à vélo.", true),
          q("ms1-l-1", 1, "Wer empfindet das tägliche Pendeln als Belastung?", people, "b", "Karim décrit le trajet quotidien comme une vraie charge, « echte Belastung ».", false),
          q("ms1-l-2", 2, "Wer ist wegen der Miete aus der Stadt weggezogen?", people, "b", "Karim a quitté la ville parce que le loyer n’était plus supportable. Lea, elle, reste malgré le loyer.", false),
          q("ms1-l-3", 3, "Für wen ist der eigene Garten wichtiger als ein kurzer Arbeitsweg?", people, "c", "Svenja dit que le jardin compte plus pour elle qu’un trajet court vers le travail.", false),
          q("ms1-l-4", 4, "Wer beschreibt Hilfe unter Nachbarn als etwas Normales?", people, "c", "Svenja dit que l’aide entre voisins est évidente, pas une exception.", false),
          q("ms1-l-5", 5, "Wer ärgert sich über die hohe Miete, bleibt aber in der Stadt?", people, "a", "Lea se plaint du loyer chaque mois, mais elle reste en ville. Karim, lui, est parti.", false),
          q("ms1-l-6", 6, "Wer vermisst kulturelle Angebote am Wohnort?", people, "c", "Svenja regrette les concerts, le cinéma et les expositions. Elle va en ville une fois par mois pour ça.", false),
          q("ms1-l-7", 7, "Für wen spielt der Arbeitsweg wegen der Arbeit von zu Hause fast keine Rolle?", people, "d", "Otto travaille presque uniquement en télétravail, donc le trajet ne compte presque plus.", false),
          q("ms1-l-8", 8, "Wer möchte künftig wieder näher bei der Familie wohnen?", people, "d", "Otto veut se rapprocher de ses parents dans le nord. Le lieu exact compte moins que la famille.", false),
          q("ms1-l-9", 9, "Wer hat das eigene Auto abgeschafft?", people, "a", "Lea a vendu sa voiture il y a un an. Les autres ne le disent pas.", false),
        ],
      },
      {
        id: "ms1-l2",
        title: "Teil 2",
        suggestedMinutes: 12,
        exclusive: true,
        instruction:
          "Sie lesen einen Artikel über Nachtzüge in Europa. Welche Sätze a bis h passen in die Lücken 10 bis 15? Zwei Sätze passen nicht. Jeder Satz darf nur einmal verwendet werden.",
        clips: [],
        stimuli: [
          {
            id: "ms1-l2-text",
            kicker: "Artikel",
            title: "Wieder unterwegs in der Nacht",
            body: "Nachtzüge waren in Europa lange selbstverständlich. Man stieg abends ein und war morgens in einer anderen Stadt, ohne einen halben Tag zu verlieren. In den neunziger Jahren änderte sich das Bild. [[10]]\n\nViele Verbindungen wurden gestrichen. Bahnhöfe, die nachts früher belebt waren, wirkten plötzlich leer. Erst in den letzten Jahren kehrt das Interesse zurück. [[11]]\n\nTrotzdem reicht es nicht, alte Waggons wieder auf die Schiene zu stellen. [[12]] Wer einmal in einem engen, lauten Abteil wach gelegen hat, bucht den Zug kein zweites Mal.\n\nAuch die Organisation hinkt hinter dem Wunsch der Fahrgäste her. [[13]] Eine einzige durchgehende Fahrkarte wäre für die meisten wichtiger als ein günstiger Preis allein.\n\nJunge Reisende entdecken die Nachtzüge dennoch neu. [[14]] Sie erzählen davon in sozialen Netzwerken, und diese Bilder überzeugen oft mehr als jede Werbekampagne.\n\nOb aus dem Nischenangebot ein verlässliches Netz wird, ist offen. [[15]] Solange nur wenige Abfahrten pro Woche möglich sind, bleibt das Flugzeug für viele die einfachere Wahl.",
          },
        ],
        questions: [
          q("ms1-l-10", 10, "Lücke 10", sentences, "c", "Le trou suit le changement des années 1990 : les vols low cost ont rendu les trains de nuit non compétitifs.", false),
          q("ms1-l-11", 11, "Lücke 11", sentences, "a", "Après le retour de l’intérêt, la phrase qui suit parle du soutien public des États.", false),
          q("ms1-l-12", 12, "Lücke 12", sentences, "e", "Le paragraphe insiste sur le fait de vraiment dormir : un compartiment bruyant fait renoncer au train.", false),
          q("ms1-l-13", 13, "Lücke 13", sentences, "b", "La phrase suivante réclame un seul billet continu. Le trou porte donc sur la réservation transfrontalière.", false),
          q("ms1-l-14", 14, "Lücke 14", sentences, "h", "« Für sie » renvoie aux jeunes voyageurs, pour qui le compartiment partagé fait partie du voyage.", false),
          q("ms1-l-15", 15, "Lücke 15", sentences, "d", "La suite parle du trop petit nombre de départs. C’est exactement le manque de places et de circulations.", false),
        ],
      },
      {
        id: "ms1-l3",
        title: "Teil 3",
        suggestedMinutes: 12,
        exclusive: false,
        instruction:
          "Sie lesen einen Zeitungsartikel. Wählen Sie bei den Aufgaben 16 bis 21 die richtige Lösung a, b oder c.",
        clips: [],
        stimuli: [
          {
            id: "ms1-l3-text",
            kicker: "Zeitung",
            title: "Die Stadt dimmt das Licht",
            body: "Die Stadt Lindenfeld macht ein Experiment: Ab 23 Uhr werden viele Straßenlaternen dunkler, aber nicht ausgeschaltet. An Kreuzungen, Haltestellen und vor Schulen bleibt das Licht hell. Die Verwaltung nennt zwei Gründe. Der Stromverbrauch soll sinken, und Insekten, die nachts um grelle Lampen kreisen, sollen geschont werden.\n\nGeschäftsleute in den Einkaufsstraßen haben protestiert. Sie fürchten, dass sich abends weniger Menschen vor die Schaufenster trauen. Eine Buchhändlerin sagte, ihre Kundschaft komme oft erst nach der Arbeit, also genau dann, wenn das Licht schwächer werde.\n\nDie Stadt hat darauf mit einem Kompromiss geantwortet, nicht mit einem Rückzieher. Gedimmt wird erst nach 23 Uhr. Vorher bleiben die Straßen im gewohnten Licht. Die hellen Punkte an Kreuzungen werden nicht angetastet.\n\nEine Biologin der nahen Hochschule begleitet den Versuch. Sie sagt, schon wenige dunklere Stunden reichten manchen Insekten, um weniger oft an Lampen zu sterben. Von einer geretteten Artenvielfalt will sie trotzdem nicht sprechen: Dafür sei ein Jahr zu kurz.\n\nDie Polizei hat die ersten sechs Monate ausgewertet. Im Testviertel gab es nicht mehr Einbrüche und nicht mehr Unfälle als im Jahr davor. Das Sicherheitsgefühl der Anwohnenden ist damit nicht automatisch erklärt. In einer Umfrage sagten 41 Prozent, sie fühlten sich nach 23 Uhr unsicherer, auch wenn nichts passiert sei.\n\nIm nächsten Jahr sollen drei weitere Viertel dazukommen. Der Bürgermeister spricht von einer Stromersparnis von 18 Prozent im Testgebiet. Ob das Gefühl der Unsicherheit sinkt, will die Stadt mit Begleitspaziergängen und besseren Markierungen an den Gehwegen prüfen, nicht mit noch helleren Lampen.",
          },
        ],
        questions: [
          q("ms1-l-16", 16, "Die Stadt Lindenfeld …", abc("schaltet nachts alle Laternen aus.", "macht viele Laternen nach 23 Uhr dunkler, lässt sie aber an.", "beleuchtet nur noch die Einkaufsstraßen."), "b", "Le texte dit que les lampadaires sont atténués après 23 h, pas éteints.", false),
          q("ms1-l-17", 17, "Warum verändert die Stadt die Beleuchtung?", abc("Um Strom zu sparen und Insekten zu schonen.", "Um mehr Touristen in die Altstadt zu holen.", "Um neue Lampen verkaufen zu können."), "a", "Les deux raisons nommées sont la baisse de consommation et la protection des insectes.", false),
          q("ms1-l-18", 18, "Wer protestiert gegen das Experiment?", abc("Die Polizei.", "Geschäftsleute in den Einkaufsstraßen.", "Die Biologin der Hochschule."), "b", "Ce sont les commerçants qui ont protesté, pas la police ni la biologiste.", false),
          q("ms1-l-19", 19, "Worin besteht der Kompromiss?", abc("Die Laternen bleiben die ganze Nacht hell.", "Das Experiment wird sofort beendet.", "Gedimmt wird erst nach 23 Uhr, Kreuzungen bleiben hell."), "c", "L’atténuation commence seulement après 23 h, et les carrefours restent éclairés.", false),
          q("ms1-l-20", 20, "Was hat die Polizei festgestellt?", abc("Im Testviertel gab es nicht mehr Einbrüche und Unfälle als zuvor.", "Die Unfälle haben deutlich zugenommen.", "Einbrüche passieren jetzt vor allem vor Schulen."), "a", "Sur six mois, ni les cambriolages ni les accidents n’ont augmenté.", false),
          q("ms1-l-21", 21, "Was ist für das nächste Jahr geplant?", abc("Alle Lampen wieder heller zu stellen.", "Drei weitere Viertel in den Versuch aufzunehmen.", "Die Einkaufsstraßen komplett dunkel zu lassen."), "b", "L’année suivante, trois quartiers supplémentaires rejoignent l’essai.", false),
        ],
      },
      {
        id: "ms1-l4",
        title: "Teil 4",
        suggestedMinutes: 12,
        exclusive: true,
        instruction:
          "Sie lesen Meinungen zur Vier-Tage-Woche. Welche Äußerung passt zu welcher Überschrift? Eine Äußerung passt nicht. Die Äußerung a ist das Beispiel und kann nicht noch einmal verwendet werden.",
        clips: [],
        stimuli: [
          { id: "ms1-l4-a", kicker: "a", title: "Nora, Kiel", body: "Ich hole die Kinder früher aus der Schule ab und muss dafür nicht mehr den ganzen Freitag im Büro sitzen. Die kürzere Woche rettet bei uns nicht den Lohn, aber sie rettet die Nachmittage. Beruf und Familie passen so endlich in denselben Kalender." },
          { id: "ms1-l4-b", kicker: "b", title: "Tarik, Essen", body: "Wer kürzer arbeitet, liefert nicht automatisch weniger. In unserem Team sind die endlosen Besprechungen weggefallen, und die Ergebnisse am Monatsende sind gleich geblieben. Wir schaffen dasselbe, nur ohne den Leerlauf." },
          { id: "ms1-l4-c", kicker: "c", title: "Helene, Passau", body: "In der Pflege geht das nicht. Patientinnen und Patienten brauchen auch am fünften Tag Betreuung. Ein Modell, das für alle Berufe gelten soll, ist eine Illusion. Wer am Bett arbeitet, kann den Freitag nicht einfach streichen." },
          { id: "ms1-l4-d", kicker: "d", title: "Jonas, Bremen", body: "Bei uns wurden vier Tage beschlossen, aber die Aufgabenliste ist dieselbe geblieben. Man arbeitet dichter, nicht weniger. Abends bin ich leerer als in der alten Fünf-Tage-Woche, weil alles in weniger Zeit gepresst wird." },
          { id: "ms1-l4-e", kicker: "e", title: "Mira, Graz", body: "Seit der Umstellung schlafe ich besser, und ich melde mich montags nicht mehr krank. Das allein ist für mich der Gewinn. Über Produktivität können andere streiten; ich merke den Unterschied im Körper." },
          { id: "ms1-l4-f", kicker: "f", title: "Paul, Lübeck", body: "Die Kundschaft ruft auch freitags an. Wenn dann niemand abhebt, verlieren wir Aufträge. Die Erreichbarkeit muss geklärt sein, bevor man die kurze Woche feiert. Sonst sparen wir Stunden und verlieren Menschen." },
          { id: "ms1-l4-g", kicker: "g", title: "Ines, Freiburg", body: "Ich bin dabei, solange das Gehalt bleibt. Eine kürzere Woche bei weniger Lohn ist für mich nur ein versteckter Stellenabbau. Weniger Tage dürfen nicht automatisch weniger Geld bedeuten." },
          { id: "ms1-l4-h", kicker: "h", title: "Cem, Mainz", body: "Das Wichtigste an meinem Arbeitsplatz ist ein höhenverstellbarer Schreibtisch und ein zweiter Bildschirm. Ob ich vier oder fünf Tage komme, ist mir egal, solange die Ausstattung stimmt." },
        ],
        questions: [
          q("ms1-l-bsp4", 0, "Beruf und Familie unter einen Hut bringen", opinions, "a", "Nora parle des enfants, des après-midis et du calendrier commun entre travail et famille.", true),
          q("ms1-l-22", 22, "Gleiche Ergebnisse in kürzerer Zeit", opinions, "b", "Tarik dit que les résultats du mois restent les mêmes, sans le temps perdu en réunions.", false),
          q("ms1-l-23", 23, "Manche Berufe lassen sich nicht verkürzen", opinions, "c", "Helene parle des soins : on ne peut pas supprimer le cinquième jour auprès des patients.", false),
          q("ms1-l-24", 24, "Dieselbe Arbeit auf weniger Tage zu pressen, schadet", opinions, "d", "Jonas décrit la même charge comprimée sur quatre jours, et une fatigue plus grande le soir.", false),
          q("ms1-l-25", 25, "Der Körper profitiert", opinions, "e", "Mira parle de sommeil et de lundis sans arrêt maladie : le gain est physique.", false),
          q("ms1-l-26", 26, "Die Erreichbarkeit für die Kundschaft bleibt eine offene Frage", opinions, "f", "Paul craint les appels du vendredi sans personne pour répondre.", false),
          q("ms1-l-27", 27, "Weniger Stunden dürfen nicht weniger Lohn bedeuten", opinions, "g", "Ines accepte la semaine courte seulement si le salaire reste le même.", false),
        ],
      },
      {
        id: "ms1-l5",
        title: "Teil 5",
        suggestedMinutes: 6,
        exclusive: true,
        instruction:
          "Sie lesen Auszüge aus der Kursordnung einer Volkshochschule. Welche Überschrift passt zu welchem Paragraphen? Vier Überschriften werden nicht gebraucht. Die Überschrift zum Beispiel kann nicht noch einmal verwendet werden.",
        clips: [],
        stimuli: [
          {
            id: "ms1-l5-index",
            kicker: "Inhaltsverzeichnis",
            title: "Überschriften",
            body: "a Abschlussprüfung\nb Kursinhalte im Detail\nc Kursbeginn\nd Dauer und Umfang\ne Unterrichtsformen\nf Voraussetzungen\ng Kursziele\nh Praktikum im Ausland",
          },
          {
            id: "ms1-l5-0",
            kicker: "Beispiel § 0",
            title: "Lösung: c",
            body: "Neue Kurse starten ausschließlich im September. Ein Einstieg im laufenden Monat ist nicht vorgesehen.",
          },
          {
            id: "ms1-l5-28",
            kicker: "§ 28",
            body: "Die Teilnahme setzt einen Abschluss der Sekundarstufe II voraus. Außerdem müssen Teilnehmende vor Kursbeginn Sprachkenntnisse auf dem Niveau B1 in Deutsch nachweisen. Über Ausnahmen entscheidet die Kursleitung schriftlich.",
          },
          {
            id: "ms1-l5-29",
            kicker: "§ 29",
            body: "Der Kurs dauert vier Monate und umfasst 120 Unterrichtsstunden. Wer beruflich stark eingebunden ist, kann auf Antrag nur die Hälfte der Stunden pro Woche belegen. Die Gesamtdauer verlängert sich dann entsprechend.",
          },
          {
            id: "ms1-l5-30",
            kicker: "§ 30",
            body: "Der Unterricht findet als Seminar, als Werkstatt und als begleitetes Selbststudium auf der Lernplattform statt. Die Dozentinnen und Dozenten legen fest, welche Einheiten vor Ort stattfinden müssen.",
          },
        ],
        questions: [
          q("ms1-l-bsp5", 0, "Beispiel § 0", headings, "c", "Le paragraphe exemple ne parle que du mois de début, donc « Kursbeginn ».", true),
          q("ms1-l-28", 28, "§ 28", headings, "f", "Diplôme et niveau B1 sont des conditions d’accès, pas le contenu du cours.", false),
          q("ms1-l-29", 29, "§ 29", headings, "d", "Quatre mois et 120 heures décrivent la durée et le volume, pas les objectifs.", false),
          q("ms1-l-30", 30, "§ 30", headings, "e", "Séminaire, atelier et autoformation : ce sont les formes d’enseignement.", false),
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
        id: "ms1-h1",
        title: "Teil 1",
        suggestedMinutes: 8,
        exclusive: false,
        instruction:
          "Sie hören fünf kurze Texte. Sie hören jeden Text einmal. Zu jedem Text gibt es zwei Aufgaben. Lesen Sie die Aufgaben zuerst, starten Sie dann das Audio. Eine Wiedergabe ist nicht wiederholbar.",
        stimuli: [
          { id: "ms1-h1-s1", kicker: "Text 1", title: "Aufgaben 1–2", body: "Eine junge Frau spricht über das Lesen.", audioId: "ms1-h-c1" },
          { id: "ms1-h1-s2", kicker: "Text 2", title: "Aufgaben 3–4", body: "Eine Journalistin spricht über das Bezahlen.", audioId: "ms1-h-c2" },
          { id: "ms1-h1-s3", kicker: "Text 3", title: "Aufgaben 5–6", body: "Eine Studentin erzählt von einem Praktikum.", audioId: "ms1-h-c3" },
          { id: "ms1-h1-s4", kicker: "Text 4", title: "Aufgaben 7–8", body: "Ein Moderator spricht über den Straßenverkehr.", audioId: "ms1-h-c4" },
          { id: "ms1-h1-s5", kicker: "Text 5", title: "Aufgaben 9–10", body: "Zwei Freunde sprechen über eine Abgabe.", audioId: "ms1-h-c5" },
        ],
        clips: [
          { id: "ms1-h-c1", label: "Text 1", maxPlays: 1, script: "Ich habe schon als Kind viel gelesen, aber richtig wichtig wurde es im Studium. Nicht wegen der Prüfungen. Beim Romanlesen brauche ich meine eigene Fantasie: Der Autor beschreibt eine Straße, und ich sehe eine ganz andere. Genau das fehlt mir, wenn ich nur kurze Nachrichten lese." },
          { id: "ms1-h-c2", label: "Text 2", maxPlays: 1, script: "Im heutigen Beitrag geht es um das Bezahlen im Alltag. In vielen Ländern wird immer seltener mit Scheinen und Münzen bezahlt. Die Menschen bestellen weiter im Internet, aber an der Kasse halten sie eher die Karte hin als das Portemonnaie." },
          { id: "ms1-h-c3", label: "Text 3", maxPlays: 1, script: "Ich habe ein Praktikum bei einem Gericht gemacht. Kaffee kochen musste ich kaum. Ich durfte bei Verhandlungen zuhören und Protokolle vorbereiten. Für mein Jurastudium war das sehr nützlich. Ob ich später wirklich im Gericht arbeiten will, weiß ich noch nicht." },
          { id: "ms1-h-c4", label: "Text 4", maxPlays: 1, script: "Heute geht es um Sicherheit im Straßenverkehr, genauer um Fahrräder. In der Stadt, über die wir berichten, diskutiert der Rat über Nummernschilder für Räder. Die Polizei erhofft sich davon, dass Fahrerinnen und Fahrer nach einem Unfall leichter zu finden sind. Viele Radfahrer finden die Idee übertrieben." },
          { id: "ms1-h-c5", label: "Text 5", maxPlays: 1, script: "Wir müssen bis Freitag noch ein Thema abgeben, und ich habe immer noch keins. Der Professor hat gesagt, der Aufsatz darf nicht nur eine Zusammenfassung sein. Hast du nicht letzte Woche etwas über Schlaf und Lernen gelesen? Das könnten wir als Thema nehmen. Jeder schreibt natürlich seinen eigenen Text." },
        ],
        questions: [
          q("ms1-h-1", 1, "Die Frau erklärt, warum Literatur für sie wichtig ist.", yn, "r", "Elle explique pourquoi la littérature compte pour elle : l’imagination, pas les examens.", false),
          q("ms1-h-2", 2, "Welche Meinung hat die Frau über das Lesen von Romanen?", abc("Dafür braucht sie ihre Fantasie.", "Dafür hat sie im Studium keine Zeit.", "Kurze Nachrichten ersetzen für sie den Roman."), "a", "Elle dit explicitement qu’un roman exige sa propre imagination.", false),
          q("ms1-h-3", 3, "Die Journalistin sagt, dass Barzahlung seltener wird.", yn, "r", "Elle dit qu’on paie de moins en moins avec des billets et des pièces.", false),
          q("ms1-h-4", 4, "Was wird immer seltener gemacht?", abc("Im Internet bestellt.", "Mit Bargeld bezahlt.", "Mit der Karte gezahlt."), "b", "Les commandes en ligne continuent. Ce qui diminue, c’est le paiement en espèces.", false),
          q("ms1-h-5", 5, "Die Frau hat ein Praktikum bei einem Gericht gemacht.", yn, "r", "La première phrase le dit directement.", false),
          q("ms1-h-6", 6, "Die Frau fand ihre Aufgaben …", abc("vor allem wegen des Kaffeekochens unangenehm.", "nützlich für ihr Studium.", "bereits als Entscheidung für den Beruf im Gericht."), "b", "Elle juge le stage utile pour ses études de droit, sans décider de sa carrière.", false),
          q("ms1-h-7", 7, "Es geht um Sicherheit im Straßenverkehr.", yn, "r", "Le modérateur annonce le sujet dès la première phrase.", false),
          q("ms1-h-8", 8, "Nummernschilder für Fahrräder sollen …", abc("in dieser Stadt schon Pflicht sein.", "helfen, Personen nach einem Unfall zu finden.", "von der Polizei abgelehnt werden."), "b", "La police espère retrouver plus facilement les cyclistes après un accident.", false),
          q("ms1-h-9", 9, "Die beiden brauchen noch …", abc("ein Thema für einen Aufsatz.", "eine Wohnung für das nächste Semester.", "einen Termin beim Professor am Freitag."), "a", "Ils doivent encore rendre un sujet de dissertation avant vendredi.", false),
          q("ms1-h-10", 10, "Der Professor möchte keinen Aufsatz, der …", abc("nur zusammenfasst.", "zu zweit geschrieben wird.", "über Schlaf und Lernen geht."), "a", "Le professeur a dit que la dissertation ne doit pas être un simple résumé.", false),
        ],
      },
      {
        id: "ms1-h2",
        title: "Teil 2",
        suggestedMinutes: 10,
        exclusive: false,
        instruction:
          "Sie hören ein Radiointerview. Sie hören den Text zweimal. Markieren Sie bei den Aufgaben 11 bis 16 die richtige Lösung a, b oder c.",
        stimuli: [
          { id: "ms1-h2-s", kicker: "Interview", title: "Lebensmittel im Müll", body: "Frau Heller spricht über Lebensmittelverschwendung.", audioId: "ms1-h-c6" },
        ],
        clips: [
          {
            id: "ms1-h-c6",
            label: "Interview",
            maxPlays: 2,
            script: "Moderator: Frau Heller, warum landen so viele Lebensmittel im Müll? Heller: Der größte Teil entsteht nicht im Restaurant, sondern zu Hause. Wir kaufen zu viel, weil große Packungen billiger wirken, und werfen dann weg, was wir nicht schaffen. Moderator: Ist das Bewusstsein nicht gewachsen? Heller: Doch. Viele junge Leute planen besser und retten übrig gebliebenes Essen über Apps. Geändert hat sich vor allem der Blick, nicht immer die Menge im Müll. Moderator: Was hilft wirklich? Heller: Kleinere Verpackungen, auch wenn das einzelne Stück dann teurer ist. Und ein fester Tag in der Woche, an dem Reste gegessen werden. Verbote bringen wenig, Gewohnheiten schon. Moderator: Und die Geschäfte? Heller: Manche senken abends die Preise. Das ist sinnvoll, ersetzt aber nicht die Planung zu Hause. Wer hungrig einkauft, nimmt trotzdem zu viel mit.",
          },
        ],
        questions: [
          q("ms1-h-11", 11, "Wo entsteht nach Frau Heller der größte Teil der Verschwendung?", abc("In Restaurants.", "In privaten Haushalten.", "In der Landwirtschaft."), "b", "Elle dit que la plus grande part naît à la maison, pas au restaurant.", false),
          q("ms1-h-12", 12, "Was sagt sie über viele junge Leute?", abc("Sie werfen heute mehr weg als früher.", "Sie retten eher Essen, aber die Müllmenge sinkt nicht immer.", "Sie kaufen keine großen Packungen mehr."), "b", "Le regard a changé, pas forcément la quantité jetée.", false),
          q("ms1-h-13", 13, "Was hält sie für wirksamer als Verbote?", abc("Höhere Steuern auf Lebensmittel.", "Kleinere Packungen und feste Gewohnheiten.", "Sonntags geschlossene Supermärkte."), "b", "Elle oppose les interdictions, peu utiles, aux petits conditionnements et aux habitudes.", false),
          q("ms1-h-14", 14, "Was sagt sie über Abendrabatte im Geschäft?", abc("Sie sind unsinnig.", "Sie helfen, ersetzen aber nicht die Planung zu Hause.", "Sie sind der wichtigste Grund für weniger Müll."), "b", "Les réductions du soir sont utiles, mais ne remplacent pas la planification à la maison.", false),
          q("ms1-h-15", 15, "Warum kaufen Menschen zu viel?", abc("Weil große Packungen günstig wirken und weil sie hungrig einkaufen.", "Weil sie das Mindesthaltbarkeitsdatum nicht kennen.", "Weil die Geschäfte Ware verschenken."), "a", "Les deux raisons dites dans l’interview sont le prix apparent des gros paquets et les courses faites en ayant faim.", false),
          q("ms1-h-16", 16, "Was bringt laut Frau Heller wenig?", abc("Reste an einem festen Tag zu essen.", "Verbote.", "Kleinere Verpackungen."), "b", "Elle dit clairement : les interdictions servent peu.", false),
        ],
      },
      {
        id: "ms1-h3",
        title: "Teil 3",
        suggestedMinutes: 10,
        exclusive: false,
        instruction:
          "Sie hören ein Gespräch über Wohngemeinschaften. Sie hören den Text einmal. Wer sagt das? Aufgaben 17 bis 22.",
        stimuli: [
          { id: "ms1-h3-s", kicker: "Gespräch", title: "Wohnen mit anderen", body: "Drei Personen sprechen. Jede Person kann mehrmals die richtige Antwort sein.", audioId: "ms1-h-c7" },
        ],
        clips: [
          {
            id: "ms1-h-c7",
            label: "Gespräch",
            maxPlays: 1,
            script: "Pauli: Ich bin Student und zahle für ein Zimmer fast so viel wie früher für eine ganze Wohnung. Deshalb wohne ich mit vier anderen. Allein könnte ich das Viertel nicht bezahlen. Berg: Gemeinschaft ist schön, aber ich brauche einen Raum, in den niemand einfach hineinkommt. Auch mit siebzig will ich die Tür zumachen können. Novak: Ein gemeinsamer Garten ersetzt keinen guten Grundriss. Wenn die Küche zu klein ist, streitet man, egal wie nett der Hof ist. Pauli: Was ich an gemischten Wohngemeinschaften schätze: Ältere bringen Ruhe hinein, wenn man ihnen wirklich zuhört und nicht nur das Zimmer vermietet. Berg: Genau, und für mich ist es praktisch. Die Jüngeren erklären mir das Onlinebanking, ich koche dafür an zwei Abenden. Novak: Trotzdem sollte die Wohnung so geplant sein, dass Rückzug möglich ist. Sonst hilft auch die netteste Nachbarschaft nichts.",
          },
        ],
        questions: [
          q("ms1-h-17", 17, "Er oder sie wohnt aus finanziellen Gründen mit anderen zusammen.", speakers, "a", "Pauli dit qu’il ne pourrait pas payer le quartier seul.", false),
          q("ms1-h-18", 18, "Man braucht einen Raum, in den nicht jede Person einfach hineinkommt.", speakers, "b", "Frau Berg veut pouvoir fermer sa porte, même à soixante-dix ans.", false),
          q("ms1-h-19", 19, "Ein Garten ersetzt keine gut geplante Wohnung.", speakers, "c", "Novak, l’architecte, dit qu’un jardin commun ne remplace pas un bon plan.", false),
          q("ms1-h-20", 20, "Ältere können eine Wohngemeinschaft ruhiger machen, wenn man sie ernst nimmt.", speakers, "a", "C’est Pauli qui le dit, pas Frau Berg elle-même.", false),
          q("ms1-h-21", 21, "Jüngere und Ältere können sich praktisch helfen.", speakers, "b", "Frau Berg décrit l’échange : banque en ligne contre cuisine.", false),
          q("ms1-h-22", 22, "Ohne Möglichkeit zum Rückzug nützt auch eine nette Nachbarschaft wenig.", speakers, "c", "Novak insiste sur la possibilité de se retirer.", false),
        ],
      },
      {
        id: "ms1-h4",
        title: "Teil 4",
        suggestedMinutes: 12,
        exclusive: false,
        instruction:
          "Sie hören einen kurzen Vortrag über Arbeitstechniken. Sie hören den Text zweimal. Wählen Sie bei den Aufgaben 23 bis 30 die richtige Lösung a, b oder c.",
        stimuli: [
          { id: "ms1-h4-s", kicker: "Vortrag", title: "Besser arbeiten", body: "Herr Kranz spricht über Konzentration und Pausen.", audioId: "ms1-h-c8" },
        ],
        clips: [
          {
            id: "ms1-h-c8",
            label: "Vortrag",
            maxPlays: 2,
            script: "Nach einer Unterbrechung brauchen die meisten Menschen etwa fünfzehn Minuten, bis sie wieder in der Aufgabe sind. Nicht zwanzig, und nicht zwei. Diese Viertelstunde verliert man still. Ich nenne manche Besprechungen leere Kalorien: Sie füllen den Tag, aber es wird nichts entschieden. Wer konzentriert arbeitet, ist danach müde. Das ist kein Zeichen von Scheitern, sondern von Anstrengung. Mehrere Dinge gleichzeitig zu tun verschlechtert das Ergebnis. Es fühlt sich produktiv an und ist es nicht. Ein externes Gedächtnis entsteht, wenn man Aufgaben aufschreibt, statt sie im Kopf zu behalten. Gesetzliche Pausen finde ich nicht übertrieben. Wer sie streicht, arbeitet nicht schneller, sondern ungenauer. Zeitdruck führt bei den meisten nicht zu brillanten Ideen, sondern zu Fehlern. Mein Rat: Legen Sie zwei feste Zeiten am Tag für E-Mails fest. Dazwischen bleibt der Posteingang zu.",
          },
        ],
        questions: [
          q("ms1-h-23", 23, "Nach einer Unterbrechung braucht man etwa …", abc("fünfzehn Minuten, um wieder in die Aufgabe zu finden.", "zwanzig Minuten für jede E-Mail.", "zwei Minuten, dann ist man wieder konzentriert."), "a", "Il dit environ quinze minutes, et il écarte explicitement vingt et deux minutes.", false),
          q("ms1-h-24", 24, "Was meint Herr Kranz mit „leeren Kalorien“?", abc("Besprechungen, die den Tag füllen, ohne dass etwas entschieden wird.", "Essen am Schreibtisch.", "Informationen, die zu kompliziert sind."), "a", "La métaphore vise les réunions qui remplissent la journée sans décision.", false),
          q("ms1-h-25", 25, "Konzentriertes Arbeiten …", abc("ist ein Zeichen, dass man gescheitert ist.", "macht müde, weil es anstrengt.", "sollte man vermeiden."), "b", "La fatigue est le signe de l’effort, pas de l’échec.", false),
          q("ms1-h-26", 26, "Mehrere Dinge gleichzeitig zu tun …", abc("verbessert das Ergebnis.", "ändert nichts.", "verschlechtert das Ergebnis."), "c", "Le multitâche donne une impression de productivité et dégrade le résultat.", false),
          q("ms1-h-27", 27, "Ein externes Gedächtnis entsteht, indem man …", abc("Aufgaben aufschreibt.", "noch mehr Termine annimmt.", "Pausen streicht."), "a", "La mémoire externe, c’est écrire les tâches au lieu de les garder en tête.", false),
          q("ms1-h-28", 28, "Gesetzliche Pausen findet Herr Kranz …", abc("übertrieben.", "unnütz.", "nicht übertrieben."), "c", "Il dit qu’il ne les trouve pas excessives. Les supprimer rend le travail moins précis.", false),
          q("ms1-h-29", 29, "Zeitdruck führt meistens zu …", abc("besonders guten Ideen.", "Fehlern.", "längeren Pausen."), "b", "La pression du temps produit des erreurs, pas des idées brillantes.", false),
          q("ms1-h-30", 30, "Wozu rät Herr Kranz?", abc("E-Mails den ganzen Tag sofort zu beantworten.", "Zwei feste Zeiten am Tag für E-Mails zu legen.", "Den Posteingang gar nicht mehr zu öffnen."), "b", "Deux créneaux fixes, et la boîte reste fermée entre les deux.", false),
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
        id: "ms1-s1",
        title: "Teil 1 — Forumsbeitrag",
        minWords: 150,
        situation:
          "Sie schreiben einen Forumsbeitrag für junge Erwachsene zum Thema Bildschirmzeit am Abend. Denken Sie an eine Einleitung und einen Schluss.",
        bullets: [
          "Äußern Sie Ihre Meinung zur Bildschirmzeit direkt vor dem Schlafen.",
          "Nennen Sie Gründe, warum viele Menschen abends trotzdem lange auf das Handy sehen.",
          "Nennen Sie andere Möglichkeiten, den Abend zu beenden.",
          "Nennen Sie Vorteile dieser anderen Möglichkeiten.",
        ],
        closingNote:
          "Bei der Bewertung zählen die Inhaltspunkte, die sprachliche Korrektheit und die Verknüpfung der Sätze. Schreiben Sie mindestens 150 Wörter.",
        coach:
          "Introduction, quatre points, puis une phrase de conclusion. Reliez les idées avec deshalb, trotzdem, außerdem, zum einen … zum anderen.",
      },
      {
        id: "ms1-s2",
        title: "Teil 2 — Nachricht",
        minWords: 100,
        situation:
          "Sie haben bei der Fahrradvermietung Radwerk ein Rad für das Wochenende geliehen. Am Samstag ist die Kette gerissen. Schreiben Sie eine Nachricht an die Inhaberin, Frau Krüger.",
        bullets: [
          "Beschreiben Sie, was passiert ist.",
          "Bitten Sie um Verständnis, weil Sie das Rad nicht wie geplant zurückbringen konnten.",
          "Machen Sie einen Vorschlag, wie es am Montag weitergehen soll.",
          "Fragen Sie, ob ein Ersatzrad möglich ist.",
        ],
        closingNote: "Schreiben Sie mindestens 100 Wörter. Achten Sie auf eine höfliche Anrede und eine passende Schlussformel.",
        coach:
          "Message semi-formel : Sehr geehrte Frau Krüger, quatre points dans un ordre logique, Mit freundlichen Grüßen et ton nom.",
      },
    ],
  },
  sprechen: {
    id: "sprechen",
    label: "Sprechen",
    durationMinutes: 15,
    tasks: [
      {
        id: "ms1-p1",
        title: "Teil 1 — Vortrag",
        minutes: 4,
        situation: "Wählen Sie ein Thema und halten Sie einen kurzen Vortrag. Decken Sie die Punkte ab, dann würden Sie im echten Examen mit einer Partnerin oder einem Partner darüber sprechen.",
        bullets: [
          "Thema A: Welche Rolle spielt Musik im Alltag von Erwachsenen?",
          "Thema B: Sollte jede Schülerin und jeder Schüler eine zweite Fremdsprache lernen?",
          "Einleitung: Worum geht es, und warum ist das Thema wichtig?",
          "Eigene Erfahrung oder ein konkretes Beispiel.",
          "Ihre Meinung mit Begründung.",
          "Schluss: ein Blick nach vorn oder eine offene Frage.",
        ],
        coach: "Parle à voix haute pendant environ quatre minutes. Tes notes servent de brouillon, comme pendant la préparation.",
      },
      {
        id: "ms1-p2",
        title: "Teil 2 — Diskussion",
        minutes: 5,
        situation: "Die Stadt hat Geld für genau ein Projekt. Diskutieren Sie: ein neues Jugendzentrum oder längere Öffnungszeiten der Bibliothek?",
        bullets: [
          "Sagen Sie, welches Projekt Sie bevorzugen, und begründen Sie.",
          "Gehen Sie auf Menschen ein, die das andere Projekt brauchen.",
          "Machen Sie einen Vorschlag, wie man vielleicht beiden Seiten etwas geben kann.",
          "Reagieren Sie auf ein Gegenargument, das Sie selbst formulieren.",
        ],
        coach: "Entraîne les tours de parole : Da haben Sie recht, allerdings … / Ich sehe das anders, weil …",
      },
    ],
  },
};
