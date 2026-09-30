export default function ArticleDisclaimer({ sources = [], disclaimerNote }) {
  const hasSources = Array.isArray(sources) && sources.length > 0;
  const hasDisclaimer = Boolean(disclaimerNote);

  if (!hasSources && !hasDisclaimer) return null;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
      {hasSources && (
        <div className="space-y-2">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
            Editorial Standards &amp; Sources
          </h3>
          <ul className="space-y-1">
            {sources.map((source, index) => (
              <li key={source.url || source.name || index} className="text-xs text-slate-500 leading-relaxed">
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-teal hover:underline"
                  >
                    {source.name}
                  </a>
                ) : (
                  <span className="font-semibold text-slate-600">{source.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasDisclaimer && (
        <p className="text-xs text-slate-400 italic leading-relaxed">{disclaimerNote}</p>
      )}
    </div>
  );
}
