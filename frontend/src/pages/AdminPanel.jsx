import { useEffect, useState } from 'react';
import { createTask, getMembers } from '../api/api';
import { ClipboardPlus, UsersRound } from 'lucide-react';

export default function AdminPanel() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', assignedTo: '' });
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [memberError, setMemberError] = useState('');

  useEffect(() => {
    const loadMembers = async () => {
      setIsLoadingMembers(true);
      setMemberError('');
      try {
        const { data } = await getMembers();
        setMembers(data);
        if (data.length) {
          setForm((current) => ({ ...current, assignedTo: data[0]._id }));
        }
      } catch (err) {
        console.error('Member Load Error:', err.response?.data || err.message);
        setMemberError(err.response?.data?.msg || 'Could not load members. Restart the backend and try again.');
      } finally {
        setIsLoadingMembers(false);
      }
    };

    loadMembers();
  }, []);

  const handleCreate = async () => {
    try {
      await createTask(form);
      alert('Task Created!');
      setForm({
        title: '',
        description: '',
        assignedTo: members[0]?._id || '',
      });
    } catch (err) {
      console.error('Task Create Error:', err.response?.data || err.message);
      alert(err.response?.data?.msg || 'Task creation failed!');
    }
  };

  return (
    <main className="min-h-[calc(100vh-76px)] bg-slate-50 px-5 py-10">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <section className="rounded-2xl bg-slate-950 p-7 text-white shadow-xl shadow-slate-200">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
            <UsersRound size={25} />
          </div>
          <h1 className="text-3xl font-black tracking-tight">Admin Panel</h1>
          <p className="mt-3 leading-7 text-slate-300">
            Create clear tasks, assign them to members, and keep the whole workspace moving.
          </p>
          <div className="mt-8 rounded-xl border border-white/10 bg-white/[.06] p-4">
            <p className="text-sm text-slate-400">Available members</p>
            <p className="mt-1 text-3xl font-black text-cyan-300">{members.length}</p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
              <ClipboardPlus size={23} />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tight text-slate-950">Create New Task</h2>
              <p className="text-sm text-slate-500">Add the details your teammate needs to start.</p>
            </div>
          </div>

          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="mb-4 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
            placeholder="Task Title"
          />
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mb-4 min-h-32 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
            placeholder="Task Description"
          />
          <select
            value={form.assignedTo}
            onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
            className="mb-4 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
            disabled={isLoadingMembers || !members.length}
          >
            {isLoadingMembers ? (
              <option value="">Loading members...</option>
            ) : members.length ? (
              members.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name} ({member.email})
                </option>
              ))
            ) : (
              <option value="">No members found</option>
            )}
          </select>

          {memberError && <p className="mb-4 text-sm text-red-600">{memberError}</p>}
          {!isLoadingMembers && !memberError && !members.length && (
            <p className="mb-4 text-sm text-slate-600">
              No Member users exist yet. Register at least one account with the Member role.
            </p>
          )}

          <button
            onClick={handleCreate}
            disabled={!form.title || !form.assignedTo}
            className="w-full rounded-xl bg-teal-600 py-3 font-bold text-white shadow-lg shadow-teal-100 transition hover:-translate-y-0.5 hover:bg-teal-700 disabled:translate-y-0 disabled:bg-slate-300 disabled:shadow-none"
          >
            Create Task
          </button>
        </section>
      </div>
    </main>
  );
}
