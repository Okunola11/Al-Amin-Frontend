import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import useTitle from "../../hooks/useTitle";
import { PulseLoader } from "react-spinners";

const UsersList = () => {
  useTitle("Al Amin: Employee List");

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  let content;
  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = users;

    const tableData = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;

    content = (
      <table className="table">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th">
              Name
            </th>
            <th scope="col" className="table__th">
              Employee ID
            </th>
            <th scope="col" className="table__th">
              Roles
            </th>
            <th scope="col" className="table__th">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    );
  }
  return content;
};
export default UsersList;
