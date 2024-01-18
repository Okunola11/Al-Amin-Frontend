import { useGetStudentsQuery } from "./studentsApiSlice";
import Student from "./Student";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const StudentsList = () => {
  useTitle("Al Amin: Students List");

  const { usernum, isAdmin, isExecutive } = useAuth();

  const {
    data: students,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetStudentsQuery();

  let content;
  if (isLoading) content = <p>Loading</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = students;

    let filteredIds;
    if (isAdmin || isExecutive) {
      filteredIds = [...ids];
    } else {
      filteredIds = ids.filter((id) => entities[id].teachernum === usernum);
    }

    const tableData = filteredIds?.length
      ? filteredIds.map((studentId) => (
          <Student key={studentId} studentId={studentId} />
        ))
      : null;

    content = (
      <table className="table table--students">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th student__name">
              Name
            </th>
            <th scope="col" className="table__th student__id">
              Student ID
            </th>
            <th scope="col" className="table__th student__class">
              Class
            </th>
            <th scope="col" className="table__th student__courses">
              Courses
            </th>
            <th scope="col" className="table__th student__teacher">
              Class Teacher
            </th>
            <th scope="col" className="table__th student__edit">
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
export default StudentsList;
