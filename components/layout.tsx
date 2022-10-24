import NavBar from "@components/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full">
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
