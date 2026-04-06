import { useState } from "react";
import { useData } from "../context/DataContext";
import { getResourcesForSubject } from "../utils/studyResources";

function ResourceCard({ item, type }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card p-4 hover-lift flex items-start gap-3 group"
    >
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 bg-primary-light">
        {type === "website" ? "🌐" : type === "youtube" ? "▶️" : "📕"}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body font-semibold text-text-color text-sm group-hover:text-primary-color transition-colors">{item.name}</p>
        {item.desc && <p className="text-xs text-muted-color mt-0.5">{item.desc}</p>}
      </div>
      <span className="text-primary-color opacity-0 group-hover:opacity-100 transition-opacity text-sm">→</span>
    </a>
  );
}

function ResourceDrawer({ subject, onClose }) {
  const resources = getResourcesForSubject(subject.name);

  const copyStudyPlan = () => {
    const text = `
📚 STUDY PLAN FOR: ${subject.name}
${subject.semester ? `Semester: ${subject.semester}` : ""}
${subject.examDate ? `Exam Date: ${new Date(subject.examDate + "T00:00:00").toLocaleDateString()}` : ""}

🌐 RECOMMENDED WEBSITES:
${resources.websites.map((w) => `• ${w.name} (${w.url})`).join("\n")}

📺 YOUTUBE CHANNELS:
${resources.youtube.map((y) => `• ${y.name} (${y.url})`).join("\n")}

📚 BOOKS:
${resources.books.map((b) => `• ${b}`).join("\n")}

💡 STUDY TIPS:
${resources.tips.map((t) => `• ${t}`).join("\n")}

${subject.topics?.length ? `📝 TOPICS TO COVER:\n${subject.topics.map((t) => `• ${t}`).join("\n")}` : ""}
    `.trim();
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-bg-color rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-bg-color border-b border-border-color p-5 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="font-display text-xl font-bold text-text-color">✨ AI Study Resources</h2>
            <p className="text-sm text-muted-color font-body">for {subject.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={copyStudyPlan} className="btn-ghost text-sm flex items-center gap-1.5">
              📋 Copy Plan
            </button>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-hover-color text-muted-color transition-colors">
              ✕
            </button>
          </div>
        </div>

        <div className="p-5 space-y-6">
          <div>
            <h3 className="font-display font-semibold text-text-color mb-3 flex items-center gap-2">
              🌐 Recommended Websites
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {resources.websites.map((w, i) => (
                <ResourceCard key={i} item={w} type="website" />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-text-color mb-3 flex items-center gap-2">
              📺 YouTube Channels
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {resources.youtube.map((y, i) => (
                <ResourceCard key={i} item={y} type="youtube" />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-text-color mb-3">📚 Recommended Books</h3>
            <div className="space-y-2">
              {resources.books.map((book, i) => (
                <div key={i} className="card p-3 flex items-center gap-3">
                  <span className="text-xl">📕</span>
                  <p className="font-body text-sm text-text-color">{book}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-text-color mb-3">💡 Study Tips</h3>
            <div className="space-y-2">
              {resources.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-surface-color">
                  <span className="text-primary-color font-bold text-sm flex-shrink-0">{i + 1}.</span>
                  <p className="font-body text-sm text-text-color">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {subject.topics?.length > 0 && (
            <div>
              <h3 className="font-display font-semibold text-text-color mb-3">📝 Topics to Cover</h3>
              <div className="flex flex-wrap gap-2">
                {subject.topics.map((topic, i) => (
                  <span key={i} className="topic-tag">{topic}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Resources({ initialSubject, onClearSubject }) {
  const { subjects } = useData();
  const [selected, setSelected] = useState(initialSubject || null);

  if (subjects.length === 0) {
    return (
      <div className="page-enter">
        <h1 className="font-display text-3xl font-bold text-text-color mb-2">AI Study Resources</h1>
        <p className="text-muted-color font-body mb-8">Add subjects in the Syllabus page first to get personalized resources.</p>
        <div className="card p-12 text-center">
          <span className="text-5xl block mb-4">✨</span>
          <h3 className="font-display text-xl font-semibold text-text-color mb-2">No subjects yet</h3>
          <p className="text-muted-color font-body">Go to Syllabus to add your subjects!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-3xl font-bold text-text-color">AI Study Resources</h1>
        <p className="text-muted-color font-body text-sm mt-1">Click any subject to get personalized study materials</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => {
          const resources = getResourcesForSubject(subject.name);
          return (
            <button
              key={subject.id}
              onClick={() => setSelected(subject)}
              className="card p-5 text-left hover-lift group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-lg">
                  🔮
                </div>
                <div>
                  <h3 className="font-display font-semibold text-text-color text-sm group-hover:text-primary-color transition-colors">
                    {subject.name}
                  </h3>
                  <p className="text-xs text-muted-color font-body">{subject.semester}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-color font-body">
                <span>{resources.websites.length} websites</span>
                <span>·</span>
                <span>{resources.youtube.length} channels</span>
                <span>·</span>
                <span>{resources.books.length} books</span>
              </div>
              <p className="text-xs text-primary-color mt-2 font-body opacity-0 group-hover:opacity-100 transition-opacity">
                View resources ✨
              </p>
            </button>
          );
        })}
      </div>

      {selected && (
        <ResourceDrawer
          subject={selected}
          onClose={() => { setSelected(null); onClearSubject?.(); }}
        />
      )}
    </div>
  );
}
