import { useEffect, useState } from "react";
import { useCreateNewResultMutation } from "./resultsApiSlice";
import { useNavigate } from "react-router-dom";

const NewResultForm = ({ subjectsWithResult, studentId }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ subjects: subjectsWithResult });

  const [createNewResult, { isLoading, isSuccess, isError, error }] =
    useCreateNewResultMutation();

  useEffect(() => {
    if (subjectsWithResult?.length)
      setFormData({ subjects: subjectsWithResult });
  }, [subjectsWithResult]);

  useEffect(() => {
    if (isSuccess) {
      setFormData([{}]);
      navigate("/dash/results");
    }
  }, [isSuccess, navigate]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newSubjects = [...formData.subjects];
    newSubjects[index][name] = value;
    setFormData({ ...formData, subjects: newSubjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNewResult({ student: studentId, subjects: formData.subjects });
  };

  const canSave = () => {
    return (
      formData.subjects.some((subject) => subject.result === "") || isLoading
    );
  };

  let content;
  if (subjectsWithResult?.length) {
    content = (
      <form onSubmit={handleSubmit} className="newResult__form">
        <p className={isError ? "errmsg" : "offscreen"}>
          {error?.data?.message}
        </p>

        <label htmlFor="subjects">Subjects</label>
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
        <button className="newResult__button" disabled={canSave()}>
          Submit
        </button>
      </form>
    );
  } else {
    content = null;
  }

  return content;
};
export default NewResultForm;
