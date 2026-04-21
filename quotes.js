// Curated quotes library - psychologically meaningful, not generic motivation
const quotes = [
  { text: "The privilege of a lifetime is to become who you truly are.", author: "Carl Jung", tags: ["identity", "growth"] },
  { text: "The curious paradox is that when I accept myself just as I am, then I can change.", author: "Carl Rogers", tags: ["self-compassion", "growth"] },
  { text: "Everything can be taken from a man but one thing: the last of the human freedoms—to choose one's attitude in any given set of circumstances.", author: "Viktor Frankl", tags: ["inner strength", "freedom"] },
  { text: "The desire to be loved is the desire to be understood.", author: "Irvin Yalom", tags: ["loneliness", "connection"] },
  { text: "Love is not simply a feeling; it is an act of will, a decision to commit oneself fully to another person.", author: "Erich Fromm", tags: ["love", "commitment"] },
  { text: "We suffer more often in imagination than in reality.", author: "Seneca", tags: ["anxiety", "perspective"] },
  { text: "It's not what happens to you, but how you react to it that matters.", author: "Epictetus", tags: ["resilience", "control"] },
  { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche", tags: ["purpose", "strength"] },
  { text: "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.", author: "Albert Camus", tags: ["freedom", "rebellion"] },
  { text: "To understand everything is to forgive everything.", author: "Buddha", tags: ["compassion", "understanding"] },
  { text: "Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.", author: "Rumi", tags: ["self-awareness", "love"] },
  { text: "The wound is the place where the Light enters you.", author: "Rumi", tags: ["growth", "healing"] },
  { text: "Knowing others is intelligence; knowing yourself is true wisdom.", author: "Lao Tzu", tags: ["self-awareness", "wisdom"] },
  { text: "The unexamined life is not worth living.", author: "Socrates", tags: ["reflection", "meaning"] },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle", tags: ["discipline", "growth"] },
  { text: "No man ever steps in the same river twice, for it's not the same river and he's not the same man.", author: "Heraclitus", tags: ["change", "impermanence"] },
  { text: "The mind is everything. What you think you become.", author: "Buddha", tags: ["mind", "transformation"] },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson", tags: ["inner strength", "potential"] },
  { text: "You have power over your mind—not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius", tags: ["control", "stoicism"] },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela", tags: ["resilience", "perseverance"] },
  { text: "In the depth of winter, I finally learned that within me there lay an invincible summer.", author: "Albert Camus", tags: ["hope", "inner strength"] },
  { text: "Freedom is not worth having if it does not include the freedom to make mistakes.", author: "Mahatma Gandhi", tags: ["freedom", "growth"] },
  { text: "The only person you are destined to become is the person you decide to be.", author: "Ralph Waldo Emerson", tags: ["choice", "identity"] },
  { text: "Life is not a problem to be solved, but a reality to be experienced.", author: "Søren Kierkegaard", tags: ["presence", "acceptance"] },
  { text: "Anxiety is the dizziness of freedom.", author: "Søren Kierkegaard", tags: ["anxiety", "freedom"] },
  { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson", tags: ["authenticity", "courage"] },
  { text: "The meeting of two personalities is like the contact of two chemical substances: if there is any reaction, both are transformed.", author: "Carl Jung", tags: ["connection", "growth"] },
  { text: "Who looks outside, dreams; who looks inside, awakes.", author: "Carl Jung", tags: ["self-awareness", "awakening"] },
  { text: "I am not what happened to me, I am what I choose to become.", author: "Carl Jung", tags: ["choice", "identity"] },
  { text: "The shoe that fits one person pinches another; there is no recipe for living that suits all cases.", author: "Carl Jung", tags: ["individuality", "wisdom"] },
  { text: "When we are no longer able to change a situation, we are challenged to change ourselves.", author: "Viktor Frankl", tags: ["adaptation", "growth"] },
  { text: "Those who have a 'why' to live, can bear with almost any 'how'.", author: "Viktor Frankl", tags: ["purpose", "resilience"] },
  { text: "Between stimulus and response there is a space. In that space is our power to choose our response.", author: "Viktor Frankl", tags: ["choice", "freedom"] },
  { text: "The good life is a process, not a state of being. It is a direction not a destination.", author: "Carl Rogers", tags: ["growth", "journey"] },
  { text: "What we fear doing most is usually what we most need to do.", author: "Tim Ferriss", tags: ["fear", "courage"] },
  { text: "Courage is not the absence of fear, but action in spite of it.", author: "Mark Twain", tags: ["courage", "fear"] },
  { text: "The cave you fear to enter holds the treasure you seek.", author: "Joseph Campbell", tags: ["fear", "growth"] },
  { text: "Peace comes from within. Do not seek it without.", author: "Buddha", tags: ["peace", "inner strength"] },
  { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha", tags: ["presence", "focus"] },
  { text: "Three things cannot be long hidden: the sun, the moon, and the truth.", author: "Buddha", tags: ["truth", "wisdom"] },
  { text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.", author: "Buddha", tags: ["self-compassion", "love"] },
  { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates", tags: ["humility", "wisdom"] },
  { text: "Wonder is the beginning of wisdom.", author: "Socrates", tags: ["curiosity", "wisdom"] },
  { text: "Be kind, for everyone you meet is fighting a hard battle.", author: "Plato", tags: ["compassion", "empathy"] },
  { text: "Wise men speak because they have something to say; fools because they have to say something.", author: "Plato", tags: ["wisdom", "silence"] },
  { text: "The first and greatest victory is to conquer yourself.", author: "Plato", tags: ["self-control", "discipline"] },
  { text: "It is better to be hated for what you are than to be loved for what you are not.", author: "André Gide", tags: ["authenticity", "courage"] },
  { text: "Man is condemned to be free; because once thrown into the world, he is responsible for everything he does.", author: "Jean-Paul Sartre", tags: ["freedom", "responsibility"] },
  { text: "Hell is other people.", author: "Jean-Paul Sartre", tags: ["relationships", "existence"] },
  { text: "Existence precedes essence.", author: "Jean-Paul Sartre", tags: ["existence", "identity"] },
  { text: "The absurd is the essential concept and the first truth.", author: "Albert Camus", tags: ["absurdism", "truth"] },
  { text: "Real generosity toward the future lies in giving all to the present.", author: "Albert Camus", tags: ["presence", "generosity"] },
  { text: "In the midst of winter, I found there was, within me, an invincible summer.", author: "Albert Camus", tags: ["resilience", "hope"] },
  { text: "Silence is the language of God, all else is poor translation.", author: "Rumi", tags: ["silence", "spirituality"] },
  { text: "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray.", author: "Rumi", tags: ["passion", "guidance"] },
  { text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", author: "Rumi", tags: ["wisdom", "change"] },
  { text: "Stop acting so small. You are the universe in ecstatic motion.", author: "Rumi", tags: ["potential", "identity"] },
  { text: "The quieter you become, the more you are able to hear.", author: "Rumi", tags: ["silence", "awareness"] }
];

function getDailyQuote() {
  const now = new Date();
  // Use day of year for rotation (0-365)
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  // Simple rotation with modulo to avoid repetition within short periods
  const index = dayOfYear % quotes.length;
  return quotes[index];
}

module.exports = { quotes, getDailyQuote };
