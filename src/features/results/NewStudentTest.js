/* 

import { useState } from "react";
import { selectStudentsById } from "../students/studentsApiSlice";
import { useSelector } from "react-redux";

const NewResultSubjects = ({ students }) => {
  const [studentId, setStudentId] = useState(students[0].id);

  const studentData = useSelector((state) =>
    selectStudentsById(state, studentId)
  );

  const PredefinedSubjects = studentData.subjects;
  console.log(PredefinedSubjects);
  const subjectsWithResult = PredefinedSubjects.map((subject) => ({
    name: subject,
    result: "",
  }));

  const [formData, setFormData] = useState({ subjects: subjectsWithResult });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newSubjects = [...formData.subjects];
    newSubjects[index][name] = value;
    setFormData({ ...formData, subjects: newSubjects });
  };

  const studentsOptions = students.map((student) => (
    <option key={student.id} value={student.id}>
      {student.username}
    </option>
  ));

  const onStudentIdChange = (e) => setStudentId(e.target.value);

  const content = (
    <section>
      <h2>Upload Students Result</h2>

      <form>
        <label htmlFor="student">Student name</label>
        <select
          name="student"
          id="student"
          value={studentId}
          onChange={onStudentIdChange}
        >
          {studentsOptions}
        </select>

        <label htmlFor="subjects">Subjects</label>
        {formData.subjects.map((subject, index) => (
          <div key={index}>
            <input type="text" name="name" value={subject.name} readOnly />
            <input
              type="number"
              name="result"
              placeholder="Result"
              value={subject.result}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </section>
  );
  /////
  return content;
};
export default NewResultSubjects;
 */

/* import { useEffect, useState } from "react";
import { selectStudentsById } from "../students/studentsApiSlice";
import { useSelector } from "react-redux";

const NewResultSubjects = ({ students }) => {
  const [studentId, setStudentId] = useState(students[0].id);

  const studentsOptions = students.map((student) => (
    <option key={student.id} value={student.id}>
      {student.username}
    </option>
  ));

  const onStudentIdChange = (e) => setStudentId(e.target.value);

  const studentData = useSelector((state) =>
    selectStudentsById(state, studentId)
  );
  console.log(studentData);

  const classname = studentData.classname;
  console.log(classname);

  const PredefinedSubjects = studentData.subjects;
  console.log(PredefinedSubjects);
  const subjectsWithResult = PredefinedSubjects.map((subject) => ({
    name: subject,
    result: "",
  }));

  useEffect(() => {
    if (studentId) setFormData({ ...formData, subjects: subjectsWithResult });
  }, [studentId]);

  const [formData, setFormData] = useState({ subjects: subjectsWithResult });
  console.log(subjectsWithResult);
  console.log(formData);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newSubjects = [...formData.subjects];
    newSubjects[index][name] = value;
    setFormData({ ...formData, subjects: newSubjects });
  };

  const content = (
    <section>
      <h2>Upload Students Result</h2>

      <form>
        <label htmlFor="student">Student name</label>
        <select
          name="student"
          id="student"
          value={studentId}
          onChange={onStudentIdChange}
        >
          {studentsOptions}
        </select>

        <label htmlFor="subjects">Subjects</label>
        {formData.subjects.map((subject, index) => (
          <div key={index}>
            <input type="text" name="name" value={subject.name} readOnly />
            <input
              type="number"
              name="result"
              placeholder="Result"
              value={subject.result}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </section>
  );

  return content; */
