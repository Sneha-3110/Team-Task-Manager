import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import heroImage from '../assets/hero.png';

const featureCards = [
  {
    icon: LayoutDashboard,
    title: 'Focused workboards',
    copy: 'See every assigned task, status, and owner without digging through messages.',
  },
  {
    icon: UsersRound,
    title: 'Team clarity',
    copy: 'Admins can assign work to the right member and keep everyone aligned.',
  },
  {
    icon: ShieldCheck,
    title: 'Role-aware access',
    copy: 'Members stay focused on their tasks while admins manage the full flow.',
  },
];

export default function Landing() {
  const user = JSON.parse(localStorage.getItem('user'));
  const primaryPath = user ? '/dashboard' : '/register';

  return (
    <main className="bg-slate-50 text-slate-950">
      <section className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-slate-950 text-white">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-28" />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(2,6,23,.96),rgba(15,23,42,.82)_48%,rgba(13,148,136,.5))]" />

        <div className="relative mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-10">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-cyan-100 backdrop-blur">
              <Sparkles size={16} />
              Team task management that stays calm under pressure
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              TeamManager
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Plan, assign, and track team work from one clean dashboard. Give admins control,
              give members focus, and keep progress visible.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to={primaryPath}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-base font-bold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:-translate-y-0.5 hover:bg-cyan-300"
              >
                {user ? 'Open dashboard' : 'Get started'}
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                Sign in
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 text-sm text-slate-200 sm:grid-cols-3">
              {['Assign faster', 'Track clearly', 'Ship together'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="text-cyan-300" size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/12 bg-white/10 p-4 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
            <div className="rounded-xl bg-slate-950/80 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Today</p>
                  <h2 className="text-2xl font-bold">Project pulse</h2>
                </div>
                <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-semibold text-emerald-200">
                  82% on track
                </div>
              </div>

              <div className="grid gap-3">
                {[
                  ['Design handoff', 'In-Progress', 'Maya', 'bg-blue-400'],
                  ['API review', 'To-Do', 'Aarav', 'bg-amber-300'],
                  ['QA checklist', 'Done', 'Sneha', 'bg-emerald-400'],
                ].map(([title, status, owner, color]) => (
                  <div key={title} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[.06] p-4">
                    <div className="flex items-center gap-3">
                      <span className={`h-3 w-3 rounded-full ${color}`} />
                      <div>
                        <p className="font-semibold text-white">{title}</p>
                        <p className="text-sm text-slate-400">Assigned to {owner}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-200">
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="mb-8">
          <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-teal-700">
            <ClipboardList size={16} />
            Built for daily execution
          </p>
          <h2 className="max-w-2xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            A cleaner way to keep every task moving.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {featureCards.map(({ icon: Icon, title, copy }) => (
            <article key={title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                <Icon size={22} />
              </div>
              <h3 className="text-xl font-bold text-slate-950">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
