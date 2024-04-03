import { ToastContainer, toast } from "react-toastify";
export const Layout: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="h-full bg-white antialiased bg-gray-200 text-gray-900 font-sans">
      {children}
      <ToastContainer />
    </div>
  );
};
