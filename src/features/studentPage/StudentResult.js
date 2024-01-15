import useAuth from "../../hooks/useAuth";
import { useGetResultsQuery } from "../results/resultsApiSlice";

const StudentResult = () => {
  const { usernum } = useAuth();

  const {
    data: results,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetResultsQuery();

  let content;
  if (isLoading) content = <p>Loading...</p>;

  if (isError) content = <p>{error?.data?.message}</p>;

  if (isSuccess) {
    const { ids, entities } = results;

    const filteredId = ids.filter((id) => entities[id].studentID === usernum);
    console.log(filteredId);
    const resultData = entities[filteredId];
    console.log(resultData);

    content = (
      <>
        <p className="report-p">
          Student Report Sheet for{" "}
          <span className="report-name">{resultData.username}</span>
        </p>
        <table className="table table--result">
          <thead className="table__thead">
            <tr>
              <th className="table__th">Subject</th>
              <th className="table__th">Score</th>
              <th className="table__th">Grade</th>
              <th className="table__th">Standing</th>
            </tr>
          </thead>
          <tbody>
            {resultData.subjects.map((subject) => (
              <tr key={subject._id}>
                <td className="table__cell">{subject.name}</td>
                <td className="table__cell">{subject.result}</td>
                <td className="table__cell">{subject.grade}</td>
                <td className={`table__cell ${subject.standing}`}>
                  {subject.standing}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
  return content;
};
export default StudentResult;
