/* eslint-disable react/prop-types */
import UpdateUserPopup from "./UpdateUserPopup";
import DeleteUserPopup from "./DeleteUserPopup";

function UsersTable({ users, fetchUsers }) {
  return (
    <div className="flex justify-center max-w-full overflow-x-auto">
      <table className="min-w-full divide-y border-collapse mt-5">
        <thead className="bg-green-600">
          <tr>
            <th className="border border-slate-600 border-collapse p-3 text-center text-white">
              Name
            </th>
            <th className="border border-slate-600 border-collapse p-3 text-center text-white">
              Age
            </th>
            <th className="border border-slate-600 border-collapse p-3 text-center text-white">
              Email
            </th>
            <th className="border border-slate-600 border-collapse p-3 text-center text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="bg-white hover:bg-slate-100">
              <td className="border border-slate-700 border-collapse p-2 text-nowrap">
                {user.name}
              </td>
              <td className="border border-slate-700 border-collapse p-2 text-nowrap">
                {user.age}
              </td>
              <td className="border border-slate-700 border-collapse p-2 text-nowrap">
                {user.email}
              </td>
              <td className="border border-slate-700 border-collapse p-2 text-nowrap flex gap-x-1">
                <UpdateUserPopup user={user} fetchUsers={fetchUsers} />
                <DeleteUserPopup
                  userId={user._id}
                  name={user.name}
                  fetchUsers={fetchUsers}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
