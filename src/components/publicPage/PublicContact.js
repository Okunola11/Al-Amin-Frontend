const PublicContact = () => {
  const content = (
    <section id="contact" className="public-contact public-section">
      <div className="about-container">
        <h2>Contact Us</h2>
        <p>Get in touch with us for any inquiries or assistance.</p>
      </div>
      <form action="" className="form form--public">
        <label htmlFor="subject" className="form__label">
          Subject
        </label>
        <input
          className="form__input"
          type="text"
          id="subject"
          minLength="3"
          maxLength="60"
          placeholder="Your Subject"
          required
        />
        <label htmlFor="message" className="form__label">
          Message
        </label>
        <textarea
          className="form__input"
          name="message"
          id=""
          cols="30"
          rows="10"
          placeholder="Your Message"
          required
        ></textarea>
        <button className="form__button">Submit</button>
      </form>
    </section>
  );

  return content;
};
export default PublicContact;
