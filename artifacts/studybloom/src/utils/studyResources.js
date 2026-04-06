export const STUDY_RESOURCES = {
  math: {
    websites: [
      { name: "Khan Academy", url: "https://khanacademy.org", desc: "Free comprehensive math courses" },
      { name: "Wolfram Alpha", url: "https://wolframalpha.com", desc: "Computational intelligence" },
      { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu", desc: "Free MIT course materials" },
      { name: "Paul's Online Math Notes", url: "https://tutorial.math.lamar.edu", desc: "Excellent calculus & algebra notes" },
    ],
    youtube: [
      { name: "3Blue1Brown", url: "https://youtube.com/@3blue1brown", desc: "Visual math explanations" },
      { name: "Professor Leonard", url: "https://youtube.com/@ProfessorLeonard", desc: "Calculus lectures" },
      { name: "PatrickJMT", url: "https://youtube.com/@patrickjmt", desc: "Math tutorials" },
    ],
    books: ["Calculus by James Stewart", "Linear Algebra Done Right by Sheldon Axler", "How to Solve It by Polya"],
    tips: ["Practice daily for 30 minutes", "Work through problems before checking solutions", "Form a study group for problem sets", "Use spaced repetition for formulas"],
  },
  physics: {
    websites: [
      { name: "HyperPhysics", url: "http://hyperphysics.phy-astr.gsu.edu", desc: "Physics concept maps" },
      { name: "The Physics Classroom", url: "https://physicsclassroom.com", desc: "Clear physics explanations" },
      { name: "MIT OCW Physics", url: "https://ocw.mit.edu/courses/physics/", desc: "MIT physics courses" },
    ],
    youtube: [
      { name: "Veritasium", url: "https://youtube.com/@veritasium", desc: "Physics & science experiments" },
      { name: "MinutePhysics", url: "https://youtube.com/@minutephysics", desc: "Short physics explanations" },
      { name: "Michel van Biezen", url: "https://youtube.com/@MichelvanBiezen", desc: "Physics problem solving" },
    ],
    books: ["University Physics by Young & Freedman", "Feynman Lectures on Physics", "Physics for Scientists and Engineers by Serway"],
    tips: ["Draw free body diagrams", "Check units in every calculation", "Understand concepts before memorizing formulas", "Solve at least 3 problems per topic"],
  },
  chemistry: {
    websites: [
      { name: "ChemLibreTexts", url: "https://chem.libretexts.org", desc: "Open-source chemistry textbooks" },
      { name: "Royal Society of Chemistry", url: "https://rsc.org", desc: "Chemistry resources & research" },
      { name: "Periodic Table", url: "https://ptable.com", desc: "Interactive periodic table" },
    ],
    youtube: [
      { name: "Tyler DeWitt", url: "https://youtube.com/@TylerDeWitt", desc: "Chemistry made easy" },
      { name: "The Organic Chemistry Tutor", url: "https://youtube.com/@TheOrganicChemistryTutor", desc: "Comprehensive chem tutorials" },
      { name: "Professor Dave Explains", url: "https://youtube.com/@ProfessorDaveExplains", desc: "Science education" },
    ],
    books: ["Chemistry: The Central Science by Brown", "Organic Chemistry by McMurry", "Atkins Physical Chemistry"],
    tips: ["Memorize the periodic table trends", "Practice stoichiometry daily", "Use molecular model kits for 3D structures", "Understand reaction mechanisms step by step"],
  },
  biology: {
    websites: [
      { name: "Khan Academy Biology", url: "https://khanacademy.org/science/biology", desc: "Free biology courses" },
      { name: "NCBI", url: "https://ncbi.nlm.nih.gov", desc: "National Center for Biotechnology Information" },
      { name: "Biology Online", url: "https://biology-online.org", desc: "Biology dictionary & tutorials" },
    ],
    youtube: [
      { name: "Amoeba Sisters", url: "https://youtube.com/@AmoebaSisters", desc: "Fun biology videos" },
      { name: "CrashCourse Biology", url: "https://youtube.com/@crashcourse", desc: "Comprehensive crash courses" },
      { name: "Stated Clearly", url: "https://youtube.com/@statedclearly", desc: "Evolution & genetics explained" },
    ],
    books: ["Campbell Biology by Reece", "Molecular Biology of the Cell by Alberts", "The Selfish Gene by Dawkins"],
    tips: ["Draw and label diagrams", "Use mnemonics for classification", "Connect topics to real diseases/applications", "Review cell processes daily"],
  },
  history: {
    websites: [
      { name: "JSTOR", url: "https://jstor.org", desc: "Academic journals and papers" },
      { name: "History.com", url: "https://history.com", desc: "History articles and videos" },
      { name: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu", desc: "Historical philosophy" },
    ],
    youtube: [
      { name: "Crash Course History", url: "https://youtube.com/@crashcourse", desc: "Engaging history overviews" },
      { name: "OverSimplified", url: "https://youtube.com/@OverSimplified", desc: "Simplified history stories" },
      { name: "Kings and Generals", url: "https://youtube.com/@KingsandGenerals", desc: "Military history" },
    ],
    books: ["Sapiens by Yuval Noah Harari", "Guns Germs and Steel by Jared Diamond", "A People's History of the United States by Howard Zinn"],
    tips: ["Create timelines for each era", "Link events to causes and effects", "Read primary sources", "Practice essay writing with arguments"],
  },
  literature: {
    websites: [
      { name: "Project Gutenberg", url: "https://gutenberg.org", desc: "Free classic books" },
      { name: "SparkNotes", url: "https://sparknotes.com", desc: "Study guides for literature" },
      { name: "Poetry Foundation", url: "https://poetryfoundation.org", desc: "Poetry archive and analysis" },
    ],
    youtube: [
      { name: "The School of Life", url: "https://youtube.com/@theschooloflifetv", desc: "Literature & philosophy" },
      { name: "Crash Course Literature", url: "https://youtube.com/@crashcourse", desc: "Literary analysis" },
      { name: "Like Stories of Old", url: "https://youtube.com/@LikeStoriesofOld", desc: "Storytelling deep dives" },
    ],
    books: ["How to Read Literature Like a Professor by Thomas Foster", "The Norton Anthology of World Literature", "Story by Robert McKee"],
    tips: ["Annotate while reading", "Look for recurring motifs and symbols", "Read secondary criticism", "Practice close reading of passages"],
  },
  economics: {
    websites: [
      { name: "Investopedia", url: "https://investopedia.com", desc: "Economics and finance concepts" },
      { name: "EconLib", url: "https://econlib.org", desc: "Liberty Fund economics library" },
      { name: "Our World in Data", url: "https://ourworldindata.org", desc: "Economic data visualizations" },
    ],
    youtube: [
      { name: "MarginalRevolution University", url: "https://mru.org", desc: "Economics courses" },
      { name: "Crash Course Economics", url: "https://youtube.com/@crashcourse", desc: "Economics fundamentals" },
      { name: "Jacob Clifford", url: "https://youtube.com/@ACDCLeadership", desc: "AP Economics help" },
    ],
    books: ["Principles of Economics by N. Gregory Mankiw", "Freakonomics by Levitt & Dubner", "The Wealth of Nations by Adam Smith"],
    tips: ["Understand supply & demand deeply", "Follow current economic news", "Practice graphing economic models", "Connect theory to real-world examples"],
  },
  default: {
    websites: [
      { name: "Google Scholar", url: "https://scholar.google.com", desc: "Academic papers and articles" },
      { name: "Khan Academy", url: "https://khanacademy.org", desc: "Free courses on many subjects" },
      { name: "Coursera", url: "https://coursera.org", desc: "Online university courses" },
      { name: "edX", url: "https://edx.org", desc: "Free online courses from top universities" },
    ],
    youtube: [
      { name: "Crash Course", url: "https://youtube.com/@crashcourse", desc: "Courses on many subjects" },
      { name: "TED-Ed", url: "https://youtube.com/@TEDed", desc: "Educational animations" },
      { name: "Study To Success", url: "https://youtube.com/@StudyToSuccess", desc: "Study tips and motivation" },
    ],
    books: ["Make It Stick by Brown, Roediger & McDaniel", "A Mind for Numbers by Barbara Oakley", "Deep Work by Cal Newport"],
    tips: ["Use active recall instead of passive re-reading", "Space out your study sessions", "Teach concepts to others", "Take regular breaks using the Pomodoro technique"],
  },
};

export function getResourcesForSubject(subjectName) {
  const name = subjectName.toLowerCase();
  if (name.includes("math") || name.includes("calculus") || name.includes("algebra") || name.includes("statistics") || name.includes("stat")) {
    return STUDY_RESOURCES.math;
  }
  if (name.includes("physics")) return STUDY_RESOURCES.physics;
  if (name.includes("chem")) return STUDY_RESOURCES.chemistry;
  if (name.includes("bio")) return STUDY_RESOURCES.biology;
  if (name.includes("hist")) return STUDY_RESOURCES.history;
  if (name.includes("lit") || name.includes("english") || name.includes("novel") || name.includes("poetry")) return STUDY_RESOURCES.literature;
  if (name.includes("econ") || name.includes("finance") || name.includes("business")) return STUDY_RESOURCES.economics;
  return STUDY_RESOURCES.default;
}
