import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#060816] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.35)] p-8">
        <div className="text-center mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-white/50 mb-3">
            SujeitoPizza
          </p>
          <h1 className="text-3xl font-semibold">
            Preencha os dados para criar sua conta
          </h1>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-white/80">
              Nome
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="seu nome completo..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-pink-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-white/80"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seu email completo..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-pink-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-white/80"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="sua senha completa..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-pink-500"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:opacity-95"
          >
            Criar conta
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/60">
          Já tem uma conta?{' '}
          <Link
            href="/login"
            className="font-semibold text-pink-400 hover:text-pink-300"
          >
            Faça login
          </Link>
        </p>
      </div>
    </main>
  );
}
