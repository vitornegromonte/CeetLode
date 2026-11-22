import { NavLink, Route, Routes } from "react-router-dom";

function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800">
        <nav className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4" aria-label="Primary">
          <NavLink className="font-semibold" to="/">
            CeetLode
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-sky-300" : "text-slate-400"
            }
            to="/progress"
          >
            Progress
          </NavLink>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
    </div>
  );
}

function ExerciseLibrary() {
  return (
    <AppLayout>
      <h1 className="text-3xl font-semibold">Exercise library</h1>
    </AppLayout>
  );
}

function Progress() {
  return (
    <AppLayout>
      <h1 className="text-3xl font-semibold">Progress</h1>
    </AppLayout>
  );
}

function NotFound() {
  return (
    <AppLayout>
      <h1 className="text-3xl font-semibold">Page not found</h1>
    </AppLayout>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<ExerciseLibrary />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
