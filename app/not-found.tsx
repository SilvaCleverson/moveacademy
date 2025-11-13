import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-deep-night text-[#E5E7EB] flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-sui-blue mb-4">404</h1>
        <h2 className="text-3xl font-bold text-[#E5E7EB] mb-4">Página não encontrada</h2>
        <p className="text-[#CBD5F5] text-lg mb-8">
          A trilha ou missão que você está procurando não existe.
        </p>
        <Link
          href="/trilhas"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-sui-move text-[#020617] font-semibold hover:opacity-90 transition-opacity"
        >
          ← Voltar para Trilhas
        </Link>
      </div>
    </div>
  );
}

