import { ToastContainer, toast } from "react-toastify";
import NavbarSection from "@/components/organisms/Navbar";
import FooterSection from "../organisms/Footer";
export const LayoutDashboard: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="bg-white scrollbar-thumb-gray-700 scrollbar-track-gray-800 scrollbar-thumb-rounded-full flex h-full flex-col items-center justify-center">
      <div className="mt-12 flex h-full w-[80%] flex-col md:w-[80rem]">
        <NavbarSection />
        <main className="md:flex-center mb-12 mt-20 w-full flex-col-reverse items-start justify-between sm:mt-16 md:flex-row md:items-center">
          {children}
          <ToastContainer />
        </main>
        <FooterSection />
      </div>
    </div>
  );
};
