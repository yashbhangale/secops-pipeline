import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="fixed top-0 inset-x-0 z-20 backdrop-blur bg-white/60 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="inline-block h-8 w-8 rounded-md bg-indigo-600" />
            <span className="font-semibold text-gray-900">AutoCraft</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a className="hover:text-gray-900" href="#models">Models</a>
            <a className="hover:text-gray-900" href="#about">About</a>
            <a className="hover:text-gray-900" href="#contact">Contact</a>
          </nav>
          <a href="#cta" className="hidden sm:inline-flex bg-gray-900 text-white px-4 py-2 rounded-lg">Pre-order</a>
        </div>
      </header>

      {/* Hero */}
      <main className="relative flex items-center justify-center">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop"
            alt="Sports car on road"
            className="h-[85vh] w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-gray-50" />
        </div>

        <section className="pt-28 pb-16 w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200 backdrop-blur">
                New • 2025 Lineup
              </span>
              <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
                Precision engineered. Road ready.
              </h1>
              <p className="mt-4 text-base sm:text-lg text-white/80 max-w-xl">
                Discover the next generation of performance vehicles. Minimal design. Maximum control.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#cta" className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700">
                  Build yours
                </a>
                <a href="#models" className="inline-flex items-center justify-center rounded-lg bg-white/90 px-5 py-3 text-gray-900 ring-1 ring-gray-200 hover:bg-white">
                  Explore models
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Content teaser */}
      <section id="models" className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'https://images.unsplash.com/photo-1517940310602-75f38f1ef5f3?q=80&w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop',
            ].map((src) => (
              <div key={src} className="group relative overflow-hidden rounded-xl bg-gray-100 shadow-sm">
                <img src={src} alt="Car" className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-sm text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} AutoCraft. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a className="hover:text-gray-700" href="#privacy">Privacy</a>
            <a className="hover:text-gray-700" href="#terms">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
