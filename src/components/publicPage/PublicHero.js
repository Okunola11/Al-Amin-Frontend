const PublicHero = () => {
  const content = (
    <section id="home" className="public-hero public-section">
      <div className="public-hero__content">
        <h2>
          Welcome to <span className="nowrap">AL AMIN</span> School
        </h2>
        <p>Discover a world of knowledge and opportunities.</p>
        <a href="#about" className="cta-button">
          Learn More
        </a>
      </div>
    </section>
  );

  return content;
};
export default PublicHero;
