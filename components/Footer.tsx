"use client";

export default function Footer() {
  const commitHash = process.env.NEXT_PUBLIC_COMMIT_HASH;

  if (!commitHash) return null;

  return (
    <footer className="bg-move-navy/80 backdrop-blur-sm border-t border-sui-blue/25 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="text-xs text-sui-blue/40 font-mono flex items-center gap-2">
          <span>Commit:</span>
          <span className="text-sui-blue/60" title={`Commit hash: ${commitHash}`}>
            {commitHash.substring(0, 7)}
          </span>
        </div>
      </div>
    </footer>
  );
}

