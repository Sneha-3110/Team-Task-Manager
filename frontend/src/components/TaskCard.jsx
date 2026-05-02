import { CalendarDays, UserRound } from 'lucide-react';

const TaskCard = ({ task, onStatusChange }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Done':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'In-Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <article className="flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="min-w-0 text-lg font-black text-slate-900">{task.title}</h3>
        <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${getStatusStyles(task.status)}`}>
          {task.status}
        </span>
      </div>

      <p className="mb-5 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
        {task.description || 'No description provided.'}
      </p>

      <div className="mt-auto flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <UserRound size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
              Assigned To
            </span>
            <span className="text-sm font-semibold text-slate-700">
              {task.assignedTo?.name || 'Unassigned'}
            </span>
          </div>
        </div>

        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          className="cursor-pointer rounded-lg border border-slate-200 bg-slate-50 p-2 text-sm font-semibold text-slate-700 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
        >
          <option value="To-Do">To-Do</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {task.dueDate && (
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-rose-600">
          <CalendarDays size={15} />
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </div>
      )}
    </article>
  );
};

export default TaskCard;
