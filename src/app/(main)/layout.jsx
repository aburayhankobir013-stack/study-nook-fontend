import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";

export default function MainLayoutPage ({children}) {
  return (
    <>
    {/* Navbar section */}
      <>
        <NavBar />
      </>
      {/* Main section */}
      <>
        {children}
      </>
      {/* Footer section */}
      <>
        <Footer />
      </>
    </>
  );
}