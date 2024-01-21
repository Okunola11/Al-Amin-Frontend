const PublicAdmission = () => {
  const content = (
    <section id="admissions" className="public-admissions public-section">
      <div className="about-container">
        <h2>Admissions</h2>
        <p>Enroll your child and be part of our learning community.</p>
        <h3>Admissions ongoing into: </h3>
        <div className="admissions-div">
          <div className="admissions-list">
            <ul>
              <li>Creche</li>
              <li>Kindergaten</li>
              <li>Nursery</li>
              <li>Pry 1 - 6</li>
            </ul>
          </div>

          <div className="admissions-list">
            <ul>
              <li>JSS 1</li>
              <li>JSS 2</li>
              <li>SSS 1</li>
              <li>SSS 2</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );

  return content;
};
export default PublicAdmission;
