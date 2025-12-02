# Firebase Installatie Instructies

## Stap 1: Maak een Firebase Project

1. Ga naar [Firebase Console](https://console.firebase.google.com)
2. Klik op "Add project" of "Project toevoegen"
3. Geef je project een naam (bijv. "Oefenvragen Examen Radar")
4. Volg de stappen om het project aan te maken

## Stap 2: Voeg een Web App toe

1. In je Firebase project dashboard, klik op het web icoon (</>)
2. Geef je app een nickname (bijv. "Quiz App")
3. Kopieer de Firebase configuration object

## Stap 3: Maak een Realtime Database

1. Ga naar "Realtime Database" in het linker menu
2. Klik op "Create Database"
3. Selecteer een locatie (bijv. europe-west1 voor Europa)
4. Kies "Start in test mode" voor ontwikkeling
5. Klik op "Enable"

## Stap 4: Configureer Database Security Rules

Ga naar het "Rules" tabblad en vervang de regels met:

\`\`\`json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
\`\`\`

**BELANGRIJK:** Deze regels geven iedereen lees- en schrijftoegang. Dit is geschikt voor een interne oefentool, maar niet voor productie met gevoelige data.

Voor een veiligere versie met username-based access control en quiz progress:

\`\`\`json
{
  "rules": {
    "users": {
      "$username": {
        ".read": true,
        ".write": true
      }
    },
    "quizResults": {
      ".read": true,
      ".write": true,
      ".indexOn": ["username", "completedAt"]
    },
    "quizProgress": {
      "$username": {
        ".read": true,
        ".write": true
      }
    }
  }
}
\`\`\`

**Belangrijk:** Klik op "Publish" om de regels actief te maken!

## Stap 5: Voeg Environment Variables toe

Voeg de volgende environment variables toe aan je Vercel project (in de "Vars" sectie van de sidebar):

- `NEXT_PUBLIC_FIREBASE_API_KEY` - Je Firebase API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` - Je auth domain (meestal: your-project.firebaseapp.com)
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` - Je Firebase project ID
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` - Je storage bucket (meestal: your-project.appspot.com)
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` - Je messaging sender ID
- `NEXT_PUBLIC_FIREBASE_APP_ID` - Je Firebase app ID
- `NEXT_PUBLIC_FIREBASE_DATABASE_URL` - Je Realtime Database URL (bijv: https://your-project-default-rtdb.europe-west1.firebasedatabase.app)

Je vindt deze waarden in Firebase Console > Project Settings > General > Your apps

## Wat wordt er bijgehouden?

De app slaat de volgende data op voor elke voltooide quiz:

- Username
- Reeks naam en ID
- Score en percentage
- Alle gegeven antwoorden
- Timestamp
- Shuffle instellingen

## Statistieken

Gebruikers kunnen hun statistieken zien:

- Totaal aantal gemaakte quizzen
- Gemiddelde score
- Beste score
- Progressie per reeks

## Database Structuur

De Realtime Database gebruikt deze structuur:

\`\`\`
users/
  └── [username]/
      ├── createdAt: timestamp
      └── lastActive: timestamp

quizResults/
  └── [auto-generated-id]/
      ├── username: "stijn laurent"
      ├── seriesId: 1
      ├── seriesName: "Reeks 1"
      ├── score: 42
      ├── totalQuestions: 50
      ├── percentage: 84
      ├── completedAt: timestamp
      ├── shuffleQuestions: true
      └── shuffleAnswers: false

quizProgress/
  └── [username]/
      ├── seriesId: 1
      ├── currentQuestionIndex: 15
      ├── userAnswers: {...}
      ├── shuffleQuestions: true
      ├── shuffleAnswers: false
      └── lastUpdated: timestamp
\`\`\`

## Username Systeem

De app gebruikt een simpel username systeem zonder wachtwoorden:
- Gebruikers vullen alleen een naam in (minimaal 3 tekens)
- De username wordt opgeslagen in localStorage
- Alle quiz resultaten worden gekoppeld aan de username
- Ideaal voor oefenomgevingen en interne tools
