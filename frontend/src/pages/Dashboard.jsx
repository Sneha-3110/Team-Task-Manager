import { useEffect, useState } from 'react';
import { getTasks, updateTask } from '../api/api';
import TaskCard from '../components/TaskCard';
import { CheckCircle2, ClipboardList, Clock3, LoaderCircle } from 'lucide-react';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const done = tasks.filter((task) => task.status === 'Done').length;
  const inProgress = tasks.filter((task) => task.status === 'In-Progress').length;
  const todo = tasks.filter((task) => task.status === 'To-Do').length;

  useEffect(() => {
    const loadTasks = async () => {
      const { data } = await getTasks();
      setTasks(data);
    };
    loadTasks();
  }, []);

  const handleStatus = async (id, status) => {
    await updateTask(id, status);
    setTasks(tasks.map((task) => (task._id === id ? { ...task, status } : task)));
  };

  return (
    <main className="min-h-[calc(100vh-76px)] bg-slate-50 px-5 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-2xl bg-slate-950 p-7 text-white shadow-xl shadow-slate-200">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">
            Workspace
          </p>
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-black tracking-tight">My Tasks</h1>
              <p className="mt-3 max-w-2xl text-slate-300">
                Review your assigned work, update status, and keep momentum visible.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                ['To-Do', todo, ClipboardList],
                ['Active', inProgress, LoaderCircle],
                ['Done', done, CheckCircle2],
              ].map(([label, value, Icon]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/[.06] px-4 py-3">
                  <Icon className="mx-auto mb-2 text-cyan-300" size={19} />
                  <p className="text-2xl font-black">{value}</p>
                  <p className="text-xs font-semibold text-slate-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onStatusChange={handleStatus} />
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <Clock3 className="mx-auto mb-3 text-slate-400" size={34} />
            <p className="font-semibold text-slate-700">No tasks assigned yet.</p>
            <p className="mt-2 text-sm text-slate-500">
              When an admin assigns work, it will appear here.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
