import { useState, useEffect } from "react";
import { CLASS } from "../../config/class";
import { SUBJECTS } from "../../config/subjects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCheck,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useUpdateStudentMutation } from "./studentsApiSlice";
import { useNavigate } from "react-router-dom";

const username_REGEX = /^(?=(?:\S*\s?\S*){2,3}$)[a-zA-Z\s]{10,25}$/;
const userId_REGEX = /^[a-zA-Z0-9]{4}[/][a-zA-Z0-9-_]{3,7}$/;
const password_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,23}$/;

const EditStudentForm = ({ student, teachers }) => {
  const [updateResult, { isLoading, isSuccess, isError, error }] =
    useUpdateStudentMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(student.username);
  const [validUsername, setValidUsername] = useState(false);

  const [userId, setUserId] = useState(student.usernum);
  const [validUserId, setValidUserId] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);

  const [classname, setClassname] = useState(student.classname);

  const [subjects, setSubjects] = useState(student.subjects);

  const [teacherId, setTeacherId] = useState(student.teacher);

  useEffect(() => {
    const validUser = username_REGEX.test(username);
    setValidUsername(validUser);
  }, [username]);

  useEffect(() => {
    setValidUserId(userId_REGEX.test(userId));
  }, [userId]);

  useEffect(() => {
    const ValidPwd = password_REGEX.test(password);
    setValidPassword(ValidPwd);
    const matchPwd = password === matchPassword;
    setValidMatchPassword(matchPwd);
  }, [password, matchPassword]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setUserId("");
      setPassword("");
      setMatchPassword("");
      setSubjects([]);
      setClassname("");
      setTeacherId("");
      navigate("/dash/students");
    }
  }, [isSuccess, navigate]);

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onMatchChange = (e) => setMatchPassword(e.target.value);
  const onUserIdChange = (e) => setUserId(e.target.value);
  const onClassnameChange = (e) => setClassname(e.target.value);
  const onTeacherIdChange = (e) => setTeacherId(e.target.value);

  const subjectsOption = SUBJECTS.map((subject) => (
    <option key={subject} value={subject}>
      {subject}
    </option>
  ));

  const onSubjectsChange = (e) => {
    const options = [...e.target.selectedOptions];
    const value = options.map((option) => option.value);
    setSubjects(value);
  };

  const classnameOptions = CLASS.map((classname) => (
    <option key={classname} value={classname}>
      {classname}
    </option>
  ));

  const teacherOptions = teachers.map((teacher) => (
    <option key={teacher.id} value={teacher.id}>
      {teacher.username}
    </option>
  ));

  const canSave =
    [validUsername, validUserId, subjects.length, classname, teacherId].every(
      Boolean
    ) && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateResult({
      id: student.id,
      username,
      usernum: userId,
      password,
      subjects,
      classname,
      teacher: teacherId,
    });
  };

  const content = (
    <section className="newUser">
      <p className={isError ? "errmsg" : "offscreen"}>{error?.data.message}</p>

      <form className="form" onSubmit={handleSubmit}>
        <h2>Edit Student</h2>

        <label className="form__label" htmlFor="username" aria-live="assertive">
          Employee Name
          <span className={validUsername ? "valid" : "hide"}>
            {<FontAwesomeIcon icon={faCheck} />}
          </span>
          <span className={!validUsername && username ? "invalid" : "hide"}>
            {<FontAwesomeIcon icon={faTimes} />}
          </span>
        </label>
        <input
          className="form__input"
          type="text"
          id="username"
          value={username}
          onChange={onUsernameChange}
          required
          autoComplete="off"
        />
        <p
          className={username && !validUsername ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} /> <br />
          10 to 25 characters.
          <br />
          Two or three words
          <br />
          Letters only. A space allowed between
          <br />
        </p>

        <label className="form__label" htmlFor="userId" aria-live="assertive">
          Student ID
          <span className={validUserId ? "valid" : "hide"}>
            {<FontAwesomeIcon icon={faCheck} />}
          </span>
          <span className={!validUserId && userId ? "invalid" : "hide"}>
            {<FontAwesomeIcon icon={faTimes} />}
          </span>
        </label>
        <input
          className="form__input"
          type="text"
          id="userId"
          value={userId}
          onChange={onUserIdChange}
          required
          autoComplete="off"
        />
        <p className={userId && !validUserId ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} /> <br />
          8 to 12 characters.
          <br />
          Must be in line with the organization's standards
          <br />
          starts with a 4 digit or letter a / and other digit or letter
          <br />
        </p>

        <label className="form__label" htmlFor="password" aria-live="assertive">
          Password
          <span className={validPassword ? "valid" : "hide"}>
            {<FontAwesomeIcon icon={faCheck} />}
          </span>
          <span className={!validPassword && password ? "invalid" : "hide"}>
            {<FontAwesomeIcon icon={faTimes} />}
          </span>
        </label>
        <input
          className="form__input"
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
        />
        <p
          className={password && !validPassword ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} /> <br />
          8 to 23 characters <br />
          Must include a uppercase, lowercase letters, a number and special
          characters <br />
          Allowed special characters: ! @ # $ %
        </p>

        <label
          className="form__label"
          htmlFor="matchPassword"
          aria-live="assertive"
        >
          Confirm Password
          <span
            className={validMatchPassword && validPassword ? "valid" : "hide"}
          >
            {<FontAwesomeIcon icon={faCheck} />}
          </span>
          <span
            className={!validMatchPassword && password ? "invalid" : "hide"}
          >
            {<FontAwesomeIcon icon={faTimes} />}
          </span>
        </label>
        <input
          className="form__input"
          type="password"
          id="matchPassword"
          value={matchPassword}
          onChange={onMatchChange}
        />
        <p
          className={
            validPassword && matchPassword && !validMatchPassword
              ? "instructions"
              : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} /> <br />
          Must be the same as Password
        </p>

        <label
          className="form__roles form__label"
          htmlFor="classname"
          aria-live="assertive"
        >
          Class
        </label>
        <select
          className="form__input--roles"
          name="classname"
          id="classname"
          value={classname}
          onChange={onClassnameChange}
          required
        >
          <option>{""}</option>
          {classnameOptions}
        </select>

        <label
          className="form__roles form__label"
          htmlFor="subjects"
          aria-live="assertive"
        >
          Subjects
        </label>
        <select
          className="form__input--roles"
          name="subjects"
          id="subjects"
          multiple={true}
          value={subjects}
          onChange={onSubjectsChange}
          required
        >
          {subjectsOption}
        </select>

        <label
          className="form__roles form__label"
          htmlFor="teacherId"
          aria-live="assertive"
        >
          Class Teacher
        </label>
        <select
          className="form__input--roles"
          name="teacherId"
          id="teacherId"
          value={teacherId}
          onChange={onTeacherIdChange}
          required
        >
          {teacherOptions}
        </select>

        <div className="button__container">
          <div className="form__button">
            <button disabled={!canSave}>Edit Student</button>
          </div>
        </div>
      </form>
    </section>
  );
  return content;
};
export default EditStudentForm;
