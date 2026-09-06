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
    subgroup: "Horse and Equine Expressions",
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
    subgroup: "Horse and Equine Expressions",
    keywords: ["horse", "arabian", "equine", "smile", "friendly", "breed"]
  },
  {
    id: "appaloosa-celebrating",
    imageSrc: "assets/appaloosacelebrating.png",
    name: "Appaloosa celebrating",
    meaning: "A spotted Appaloosa celebrating success or exciting news.",
    subgroup: "Horse and Equine Expressions",
    keywords: ["horse", "appaloosa", "spotted", "equine", "celebrate", "confetti", "breed"]
  },
  {
    id: "friesian-horse-laughing",
    imageSrc: "assets/friesianlaughing.png",
    name: "Friesian horse laughing",
    meaning: "A black Friesian horse laughing with joyful amusement.",
    subgroup: "Horse and Equine Expressions",
    keywords: ["horse", "friesian", "black horse", "equine", "laugh", "joy", "breed"]
  },
  {
    id: "clydesdale-welcoming",
    imageSrc: "assets/clydesdalewelcoming.png",
    name: "Clydesdale welcoming",
    meaning: "A friendly Clydesdale offering a warm and reassuring welcome.",
    subgroup: "Horse and Equine Expressions",
    keywords: ["horse", "clydesdale", "draft horse", "equine", "welcome", "friendly", "breed"]
  },
  {
    id: "shetland-pony-excited",
    imageSrc: "assets/shetlandponyexcited.png",
    name: "Shetland pony excited",
    meaning: "An eager Shetland pony expressing delighted excitement.",
    subgroup: "Horse and Equine Expressions",
    keywords: ["horse", "pony", "shetland", "equine", "excited", "delighted", "breed"]
  },
  {
    id: "dino-winking",
    imageSrc: "assets/dinowinking.png",
    name: "Dino winking",
    meaning: "The Open Door Dino sharing a playful, mischievous wink.",
    subgroup: "Dino Expressions",
    keywords: ["dino", "dinosaur", "wink", "winking", "playful", "mischievous"]
  },
  {
    id: "dino-sending-love",
    imageSrc: "assets/dinosendinglove.png",
    name: "Dino sending love",
    meaning: "The Open Door Dino sharing love, affection, or heartfelt support.",
    subgroup: "Dino Expressions",
    keywords: ["dino", "dinosaur", "love", "heart", "affection", "support", "caring"]
  },
  {
    id: "dino-surprised",
    imageSrc: "assets/dinosurprised.png",
    name: "Dino surprised",
    meaning: "The Open Door Dino reacting with sudden surprise or amazement.",
    subgroup: "Dino Expressions",
    keywords: ["dino", "dinosaur", "surprised", "amazed", "shocked", "unexpected"]
  },
  {
    id: "dino-sad",
    imageSrc: "assets/dinosad.png",
    name: "Dino feeling sad",
    meaning: "The Open Door Dino expressing sadness, sympathy, or disappointment.",
    subgroup: "Dino Expressions",
    keywords: ["dino", "dinosaur", "sad", "tear", "crying", "sympathy", "disappointed"]
  },
  {
    id: "dino-sleepy",
    imageSrc: "assets/dinosleepy.png",
    name: "Dino sleepy",
    meaning: "The Open Door Dino feeling tired, drowsy, or ready to rest.",
    subgroup: "Dino Expressions",
    keywords: ["dino", "dinosaur", "sleepy", "tired", "drowsy", "rest"]
  },
  {
    id: "dino-frustrated",
    imageSrc: "assets/dinofrustrated.png",
    name: "Dino frustrated",
    meaning: "The Open Door Dino expressing annoyance, frustration, or impatience.",
    subgroup: "Dino Expressions",
    keywords: ["dino", "dinosaur", "frustrated", "annoyed", "impatient", "grumpy"]
  },
  {
    id: "border-collie-curious",
    imageSrc: "assets/bordercolliecurious.png",
    name: "Border collie curious",
    meaning: "An alert Border collie showing friendly curiosity and interest.",
    subgroup: "Dog Expressions",
    keywords: ["dog", "border collie", "collie", "curious", "question", "interested", "breed"]
  },
  {
    id: "poodle-excited",
    imageSrc: "assets/poodleexcited.png",
    name: "Poodle excited",
    meaning: "A white poodle expressing bright, delighted excitement.",
    subgroup: "Dog Expressions",
    keywords: ["dog", "poodle", "excited", "delighted", "happy", "curly", "breed"]
  },
  {
    id: "pug-surprised",
    imageSrc: "assets/pugsurprised.png",
    name: "Pug surprised",
    meaning: "A pug reacting with wide-eyed surprise or amazement.",
    subgroup: "Dog Expressions",
    keywords: ["dog", "pug", "surprised", "amazed", "shocked", "breed"]
  },
  {
    id: "bulldog-grumpy",
    imageSrc: "assets/bulldoggrumpy.png",
    name: "Bulldog grumpy",
    meaning: "A lovable English bulldog expressing a distinctly grumpy mood.",
    subgroup: "Dog Expressions",
    keywords: ["dog", "bulldog", "english bulldog", "grumpy", "annoyed", "pout", "breed"]
  },
  {
    id: "husky-singing",
    imageSrc: "assets/huskysinging.png",
    name: "Husky singing",
    meaning: "A Siberian husky singing or howling with joyful enthusiasm.",
    subgroup: "Dog Expressions",
    keywords: ["dog", "husky", "siberian husky", "singing", "howling", "joy", "breed"]
  },
  {
    id: "mustang-proud",
    imageSrc: "assets/mustangproud.png",
    name: "Mustang feeling proud",
    meaning: "A confident mustang expressing pride, dignity, or accomplishment.",
    subgroup: "Horse and Equine Expressions",
    keywords: ["horse", "mustang", "proud", "confidence", "accomplishment", "equine", "breed"]
  },
  {
    id: "haflinger-laughing",
    imageSrc: "assets/haflingerlaughing.png",
    name: "Haflinger laughing",
    meaning: "A chestnut Haflinger horse laughing with cheerful delight.",
    subgroup: "Horse and Equine Expressions",
    keywords: ["horse", "haflinger", "laughing", "joy", "happy", "equine", "breed"]
  },
  {
    id: "paint-horse-sending-love",
    imageSrc: "assets/paintsendinglove.png",
    name: "Paint horse sending love",
    meaning: "A Paint horse sharing affection, appreciation, or heartfelt support.",
    subgroup: "Horse and Equine Expressions",
    keywords: ["horse", "paint horse", "pinto", "love", "heart", "affection", "equine", "breed"]
  },
  {
    id: "zebra-surprised",
    imageSrc: "assets/zebrasurprised.png",
    name: "Zebra surprised",
    meaning: "A zebra reacting with wide-eyed surprise or amazement.",
    subgroup: "Horse and Equine Expressions",
    keywords: ["zebra", "equine", "horse family", "surprised", "amazed", "shocked"]
  },
  {
    id: "oak-tree-smiling",
    imageSrc: "assets/oaktreesmiling.png",
    name: "Oak tree smiling",
    meaning: "A sturdy oak tree offering a warm, welcoming smile.",
    subgroup: "Plant Expressions",
    keywords: ["oak", "tree", "plant", "smile", "happy", "friendly", "nature"]
  },
  {
    id: "sunflower-laughing",
    imageSrc: "assets/sunflowerlaughing.png",
    name: "Sunflower laughing",
    meaning: "A bright sunflower laughing with cheerful joy.",
    subgroup: "Plant Expressions",
    keywords: ["sunflower", "flower", "plant", "laugh", "joy", "happy", "nature"]
  },
  {
    id: "rose-blushing",
    imageSrc: "assets/roseblushing.png",
    name: "Rose blushing",
    meaning: "A red rose expressing bashfulness, affection, or a shy compliment.",
    subgroup: "Plant Expressions",
    keywords: ["rose", "flower", "plant", "blush", "shy", "bashful", "love"]
  },
  {
    id: "cactus-celebrating",
    imageSrc: "assets/cactuscelebrating.png",
    name: "Cactus celebrating",
    meaning: "A cheerful cactus celebrating success or exciting news.",
    subgroup: "Plant Expressions",
    keywords: ["cactus", "plant", "celebrate", "party", "success", "confetti", "desert"]
  },
  {
    id: "weeping-willow-tears",
    imageSrc: "assets/weepingwillowtears.png",
    name: "Weeping willow shedding tears",
    meaning: "A weeping willow expressing sadness, sympathy, or emotional support.",
    subgroup: "Plant Expressions",
    keywords: ["willow", "weeping willow", "tree", "plant", "tears", "crying", "sad", "sympathy"]
  },
  {
    id: "daisy-excited",
    imageSrc: "assets/daisyexcited.png",
    name: "Daisy excited",
    meaning: "A white daisy expressing bright, delighted excitement.",
    subgroup: "Plant Expressions",
    keywords: ["daisy", "flower", "plant", "excited", "delighted", "happy"]
  },
  {
    id: "houseplant-sleepy",
    imageSrc: "assets/houseplantsleepy.png",
    name: "Houseplant sleepy",
    meaning: "A leafy houseplant feeling peaceful, tired, or ready to rest.",
    subgroup: "Plant Expressions",
    keywords: ["houseplant", "plant", "potted plant", "sleepy", "tired", "rest"]
  },
  {
    id: "tulip-sending-love",
    imageSrc: "assets/tulipsendinglove.png",
    name: "Tulip sending love",
    meaning: "A pink tulip sharing love, affection, or heartfelt appreciation.",
    subgroup: "Plant Expressions",
    keywords: ["tulip", "flower", "plant", "love", "heart", "affection", "appreciation"]
  },
  {
    id: "fern-surprised",
    imageSrc: "assets/fernsurprised.png",
    name: "Fern surprised",
    meaning: "A green fern reacting with sudden surprise or amazement.",
    subgroup: "Plant Expressions",
    keywords: ["fern", "plant", "surprised", "amazed", "shocked", "nature"]
  },
  {
    id: "sprout-determined",
    imageSrc: "assets/sproutdetermined.png",
    name: "Sprout feeling determined",
    meaning: "A young sprout expressing determination, resolve, and readiness to grow.",
    subgroup: "Plant Expressions",
    keywords: ["sprout", "seedling", "plant", "determined", "resolve", "growth", "motivated"]
  }
];
