import { cls } from "@libs/client/utils";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

const Layout = ({ title, canGoBack, hasTabBar, children }: LayoutProps) => {
  return (
    <div className="w-full">
      <div
        className={cls(
          !canGoBack ? "justify-center" : "",
          "max-w-3xl w-full text-lg bg-white font-medium py-4 fixed top-0 flex items-center text-gray-700"
        )}
      >
        <span>{title}</span>
      </div>
      {children}
      {hasTabBar ? <nav></nav> : null}
    </div>
  );
};

export default Layout;
