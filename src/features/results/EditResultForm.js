import { useState, useEffect } from "react";
import { useUpdateResultMutation } from "./resultsApiSlice";
import { useDeleteResultMutation } from "./resultsApiSlice";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const EditResultForm = ({ result }) => {
  const { isAdmin, isExecutive } = useAuth();

  const navigate = useNavigate();

  const [updateResult, { isLoading, isSuccess, isError, error }] =
    useUpdateResultMutation();

  const [
    deleteResult,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteResultMutation();

  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(result)));
  // JSON.parse was used because I had to create a deep copy of the object to modify it. Spread operation at
  // <EditResult /> didn't work, it threw an error instead. My research made me understand that happened
  // because the object has many nested arrays and a shallow copy won't work, that's still like a mutation.
  // It feels like a cheat but yeah, stringifying then parsing the object works

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setFormData([{}]);
      navigate("/dash/results");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const handleChange = (e, index) => {
    const { value, name } = e.target;
    const newSubjects = [...formData.subjects];
    newSubjects[index][name] = value;
    setFormData({ ...formData, subjects: newSubjects });
  };

  const canSave = () => {
    return (
      formData.subjects.some((subject) => subject.result === "") || isLoading
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateResult({
      id: result.id,
      subjects: formData.subjects,
      student: result.student,
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteResult({ id: result.id });
  };

  const content = (
    <section className="newResult">
      <p className={isError || isDelError ? "errmsg" : "offscreen"}>
        {error?.data?.message || delError?.data?.message}
      </p>

      <form className="newResult__form" onSubmit={handleSubmit}>
        <h2>Edit Result Form</h2>
        <p className="editResult__p">
          Edit Results for {result.username}, StudentId: {result.studentID}
        </p>
        {formData.subjects.map((subject, index) => (
          <div key={index} className="newResult__div">
            <input
              className="newResult__input"
              type="text"
              name="name"
              value={subject.name}
              readOnly
            />
            <input
              className="newResult__input"
              type="number"
              name="result"
              placeholder="Result"
              value={subject.result}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        ))}
        <button
          type="submit"
          className="newResult__button"
          disabled={canSave()}
        >
          Submit
        </button>
        {(isAdmin || isExecutive) && (
          <button
            type="button"
            onClick={handleDelete}
            className="newResult__button--delete"
          >
            Delete Result
          </button>
        )}
      </form>
    </section>
  );
  return content;
};
export default EditResultForm;
