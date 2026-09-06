const EXPRESSIONS = [
  { id: "grinning-face", character: "😀", name: "Grinning face", type: "Emoji", category: "Emoji", meaning: "Happiness, friendliness, excitement, or a cheerful greeting.", keywords: ["happy", "smile", "cheerful", "hello", "excited"] },
  { id: "winking-face", character: "😉", name: "Winking face", type: "Emoji", category: "Emoji", meaning: "Playfulness, friendly teasing, humor, or a statement that is not entirely serious.", keywords: ["wink", "joke", "teasing", "playful", "flirt"] },
  { id: "face-with-tears-of-joy", character: "😂", name: "Face with tears of joy", type: "Emoji", category: "Emoji", meaning: "Strong laughter or finding something extremely funny.", keywords: ["laugh", "funny", "crying", "joy", "hilarious"] },
  { id: "thinking-face", character: "🤔", name: "Thinking face", type: "Emoji", category: "Emoji", meaning: "Thinking, questioning, considering, or expressing doubt.", keywords: ["think", "question", "wonder", "doubt", "consider"] },
  { id: "ghost", character: "👻", name: "Ghost", type: "Emoji", category: "Emoji", meaning: "A ghost, Halloween, something spooky, or playful silliness.", keywords: ["ghost", "spooky", "halloween", "scary", "silly"] },
  { id: "cat-with-wry-smile", character: "😼", name: "Cat with wry smile", type: "Emoji", category: "Emoji", meaning: "Mischief, confidence, sly humor, or sarcasm expressed as a cat face.", keywords: ["cat", "smirk", "mischief", "sarcastic", "sly"] },
  { id: "t-rex", character: "🦖", name: "T-Rex", type: "Emoji", category: "Emoji", meaning: "A Tyrannosaurus rex, dinosaurs, prehistoric life, or something powerful and old.", keywords: ["dinosaur", "tyrannosaurus", "trex", "prehistoric", "jurassic", "dino"] },
  { id: "sauropod", character: "🦕", name: "Sauropod", type: "Emoji", category: "Emoji", meaning: "A long-necked dinosaur, prehistoric life, or dinosaurs generally.", keywords: ["dinosaur", "long neck", "prehistoric", "jurassic", "dino"] },
  { id: "red-heart", character: "❤️", name: "Red heart", type: "Emoji sequence", category: "Emoji", meaning: "Love, affection, gratitude, or strong emotional support.", keywords: ["love", "heart", "affection", "romance", "support"] },
  { id: "thumbs-up", character: "👍", name: "Thumbs up", type: "Emoji", category: "Emoji", meaning: "Approval, agreement, confirmation, or encouragement.", keywords: ["yes", "approve", "agree", "good", "like", "okay"] },
  { id: "classic-smile", character: ":)", name: "Classic smile", type: "Text emoticon", category: "Emoticons", meaning: "A simple, friendly smile or indication of happiness.", keywords: ["happy", "smile", "friendly", "classic", "colon"] },
  { id: "classic-frown", character: ":(", name: "Classic frown", type: "Text emoticon", category: "Emoticons", meaning: "Sadness, disappointment, or sympathy.", keywords: ["sad", "frown", "unhappy", "disappointed", "colon"] },
  { id: "classic-wink", character: ";)", name: "Classic wink", type: "Text emoticon", category: "Emoticons", meaning: "A joke, friendly teasing, or playful intent.", keywords: ["wink", "joke", "playful", "semicolon", "teasing"] },
  { id: "crying-emoticon", character: ":'(", name: "Crying emoticon", type: "Text emoticon", category: "Emoticons", meaning: "Crying, deep sadness, or being emotionally moved.", keywords: ["cry", "sad", "tears", "emotional"] },
  { id: "happy-kaomoji", character: "^_^", name: "Happy kaomoji", type: "Kaomoji", category: "Kaomoji", meaning: "Happiness, contentment, friendliness, or gentle excitement.", keywords: ["happy", "cute", "smile", "content", "joy"] },
  { id: "shrug-kaomoji", character: "¯\\_(ツ)_/¯", name: "Shrug kaomoji", type: "Kaomoji", category: "Kaomoji", meaning: "Uncertainty, not knowing, indifference, or accepting that something cannot be changed.", keywords: ["shrug", "unknown", "unsure", "whatever", "indifferent"] },
  { id: "table-flip", character: "(╯°□°)╯︵ ┻━┻", name: "Table flip kaomoji", type: "Kaomoji", category: "Kaomoji", meaning: "Intense frustration, anger, or a humorous dramatic reaction.", keywords: ["angry", "frustrated", "rage", "table", "dramatic"] },
  { id: "check-mark", character: "✓", name: "Check mark", type: "Text symbol", category: "Symbols", meaning: "Completed, correct, approved, or selected.", keywords: ["check", "correct", "complete", "yes", "approved"] },
  { id: "warning-sign", character: "⚠️", name: "Warning", type: "Emoji sequence", category: "Symbols", meaning: "Warning, caution, hazard, or important information requiring attention.", keywords: ["warning", "caution", "danger", "alert", "hazard"] },
  { id: "copyright", character: "©", name: "Copyright sign", type: "Text symbol", category: "Symbols", meaning: "Copyright ownership or a copyright notice.", keywords: ["copyright", "legal", "ownership", "rights"] },
  { id: "registered", character: "®", name: "Registered sign", type: "Text symbol", category: "Symbols", meaning: "A registered trademark.", keywords: ["registered", "trademark", "legal", "brand"] },
  { id: "united-states-flag", character: "🇺🇸", name: "Flag of the United States", type: "Emoji sequence", category: "Flags", meaning: "The national flag of the United States of America.", keywords: ["united states", "usa", "american", "america", "us", "flag"] },
  { id: "ireland-flag", character: "🇮🇪", name: "Flag of Ireland", type: "Emoji sequence", category: "Flags", meaning: "The national flag of Ireland.", keywords: ["ireland", "irish", "ie", "eire", "flag"] },
  { id: "canada-flag", character: "🇨🇦", name: "Flag of Canada", type: "Emoji sequence", category: "Flags", meaning: "The national flag of Canada.", keywords: ["canada", "canadian", "ca", "maple leaf", "flag"] }
];

const OPEN_DOOR_EXPRESSIONS = [
  {
    id: "dino-smiling",
    imageSrc: "assets/dinosmiling.png",
    name: "Dino smiling",
    meaning: "A warm, friendly smile from the Open Door Dino.",
    subgroup: "Dino Expressions",
    keywords: ["dino", "dinosaur", "smile", "happy", "friendly", "welcome"]
  },
  {
    id: "dino-laughing",
    imageSrc: "assets/dinolaughing.png",
    name: "Dino laughing",
    meaning: "The Open Door Dino laughing with joyful amusement.",
    subgroup: "Dino Expressions",
    keywords: ["dino", "dinosaur", "laugh", "laughing", "joy", "funny", "happy"]
  },
  {
    id: "dino-thinking",
    imageSrc: "assets/dinothinking.png",
    name: "Dino thinking",
    meaning: "The Open Door Dino pausing to think, question, or consider.",
    subgroup: "Dino Expressions",
    keywords: ["dino", "dinosaur", "think", "thinking", "question", "consider", "curious"]
  },
  {
    id: "dino-celebrating",
    imageSrc: "assets/dinocelebrating.png",
    name: "Dino celebrating",
    meaning: "The Open Door Dino celebrating success, congratulations, or exciting news.",
    subgroup: "Dino Expressions",
    keywords: ["dino", "dinosaur", "celebrate", "party", "congratulations", "success", "confetti"]
  },
  {
    id: "horse-smiling",
    imageSrc: "assets/horsesmiling.png",
    name: "Horse smiling",
    meaning: "A friendly horse smiling warmly.",
    subgroup: "Horse Expressions",
    keywords: ["horse", "pony", "equine", "smile", "happy", "friendly"]
  },
  {
    id: "dog-smiling",
    imageSrc: "assets/dogsmiling.png",
    name: "Golden retriever smiling",
    meaning: "A cheerful golden retriever sharing a happy, affectionate smile.",
    subgroup: "Dog Expressions",
    keywords: ["dog", "puppy", "golden retriever", "retriever", "canine", "smile", "happy", "friendly", "pet", "breed"]
  },
  {
    id: "labrador-retriever-laughing",
    imageSrc: "assets/labradorlaughing.png",
    name: "Labrador retriever laughing",
    meaning: "A black Labrador retriever laughing with joyful, playful energy.",
    subgroup: "Dog Expressions",
    keywords: ["dog", "puppy", "black lab", "labrador", "retriever", "laugh", "happy", "pet", "breed"]
  },
  {
    id: "german-shepherd-thinking",
    imageSrc: "assets/germanshepherdthinking.png",
    name: "German shepherd thinking",
    meaning: "A German shepherd thoughtfully considering a question or idea.",
    subgroup: "Dog Expressions",
    keywords: ["dog", "german shepherd", "alsatian", "thinking", "consider", "curious", "pet", "breed"]
  },
  {
    id: "beagle-celebrating",
    imageSrc: "assets/beaglecelebrating.png",
    name: "Beagle celebrating",
    meaning: "A joyful beagle celebrating good news with cheerful excitement.",
    subgroup: "Dog Expressions",
    keywords: ["dog", "beagle", "hound", "celebrate", "party", "confetti", "pet", "breed"]
  },
  {
    id: "dachshund-winking",
    imageSrc: "assets/dachshundwinking.png",
    name: "Dachshund winking",
    meaning: "A playful dachshund giving a friendly, mischievous wink.",
    subgroup: "Dog Expressions",
    keywords: ["dog", "dachshund", "sausage dog", "wiener dog", "wink", "playful", "pet", "breed"]
  },
  {
    id: "arabian-horse-smiling",
    imageSrc: "assets/arabianhorsesmiling.png",
    name: "Arabian horse smiling",
    meaning: "A graceful Arabian horse sharing a warm, friendly smile.",
    subgroup: "Horse Expressions",
    keywords: ["horse", "arabian", "equine", "smile", "friendly", "breed"]
  },
  {
    id: "appaloosa-celebrating",
    imageSrc: "assets/appaloosacelebrating.png",
    name: "Appaloosa celebrating",
    meaning: "A spotted Appaloosa celebrating success or exciting news.",
    subgroup: "Horse Expressions",
    keywords: ["horse", "appaloosa", "spotted", "equine", "celebrate", "confetti", "breed"]
  },
  {
    id: "friesian-horse-laughing",
    imageSrc: "assets/friesianlaughing.png",
    name: "Friesian horse laughing",
    meaning: "A black Friesian horse laughing with joyful amusement.",
    subgroup: "Horse Expressions",
    keywords: ["horse", "friesian", "black horse", "equine", "laugh", "joy", "breed"]
  },
  {
    id: "clydesdale-welcoming",
    imageSrc: "assets/clydesdalewelcoming.png",
    name: "Clydesdale welcoming",
    meaning: "A friendly Clydesdale offering a warm and reassuring welcome.",
    subgroup: "Horse Expressions",
    keywords: ["horse", "clydesdale", "draft horse", "equine", "welcome", "friendly", "breed"]
  },
  {
    id: "shetland-pony-excited",
    imageSrc: "assets/shetlandponyexcited.png",
    name: "Shetland pony excited",
    meaning: "An eager Shetland pony expressing delighted excitement.",
    subgroup: "Horse Expressions",
    keywords: ["horse", "pony", "shetland", "equine", "excited", "delighted", "breed"]
  }
];
