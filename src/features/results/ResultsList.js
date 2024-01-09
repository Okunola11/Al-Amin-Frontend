import { useGetResultsQuery } from "./resultsApiSlice";
import Result from "./Result";

const ResultsList = () => {
  const {
    data: results,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetResultsQuery();

  let content;
  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error}</p>;
  }

  if (isSuccess) {
    const { ids } = results;

    const tableData = ids?.length
      ? ids.map((resultId) => <Result key={resultId} resultId={resultId} />)
      : null;

    content = <main>{tableData}</main>;
  }
  return content;
};
export default ResultsList;
