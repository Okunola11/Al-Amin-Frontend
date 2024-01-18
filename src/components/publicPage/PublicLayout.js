import PublicHeader from "./PublicHeader";
import PublicHero from "./PublicHero";
import PublicAbout from "./PublicAbout";
import PublicAdmission from "./PublicAdmission";
import PublicPrograms from "./PublicPrograms";
import PublicContact from "./PublicContact";
import PublicFooter from "./PublicFooter";

const PublicLayout = () => {
  return (
    <>
      <PublicHeader />
      <PublicHero />
      <PublicAbout />
      <PublicAdmission />
      <PublicPrograms />
      <PublicContact />
      <PublicFooter />
    </>
  );
};
export default PublicLayout;
