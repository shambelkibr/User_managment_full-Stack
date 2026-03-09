const UserTable = ({ users, onEdit, onDelete }) => {
  if (!users.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        No users found.
      </div>
    );
  }

  return (
    <div className="fade-in-up overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_18px_50px_-26px_rgba(15,23,42,0.35)]">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-100/80 text-xs uppercase tracking-[0.14em] text-slate-600">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.user_id}
                className="border-t border-slate-100 transition-colors hover:bg-slate-50/80"
              >
                <td className="px-4 py-3 font-semibold">#{user.user_id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 text-xs font-bold uppercase text-teal-800">
                      {(user.first_name?.[0] || "U") +
                        (user.last_name?.[0] || "N")}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-xs text-slate-500">Member profile</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{user.age}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                    {user.email}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(user.user_id)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(user.user_id)}
                      className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
