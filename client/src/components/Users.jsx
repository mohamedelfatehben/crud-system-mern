/* eslint-disable react/prop-types */
import UpdateUserPopup from "./UpdateUserPopup";
import DeleteUserPopup from "./DeleteUserPopup";

function Users({ users, fetchUsers }) {
  return (
    <div className="flex justify-center">
      <table className="table-auto border-collapse mt-5">
        <thead>
          <tr>
            <th className="border border-slate-600 border-collapse p-3 text-left bg-green-600 text-white">
              Name
            </th>
            <th className="border border-slate-600 border-collapse p-3 text-left bg-green-600 text-white">
              Age
            </th>
            <th className="border border-slate-600 border-collapse p-3 text-left bg-green-600 text-white">
              Email
            </th>
            <th className="border border-slate-600 border-collapse p-3 text-left bg-green-600 text-white">
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
                <DeleteUserPopup userId={user._id} fetchUsers={fetchUsers} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
