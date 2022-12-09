import { cls } from "@libs/client/utils";
import * as heroicon from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

const NAVICONCLASS = "h-6 w-6 text-green-400 ddf";

const Layout = ({ title, canGoBack, hasTabBar, children }: LayoutProps) => {
  const router = useRouter();
  const onClick = () => {
    router.back();
  };
  return (
    <div className="w-full">
      <div className="justify-center max-w-2xl w-full text-lg bg-white font-medium py-4 fixed top-0 flex items-center text-gray-700">
        {canGoBack ? (
          <button onClick={onClick} className="absolute left-4">
            <heroicon.ArrowLeftIcon className="h-6 w-6" />
          </button>
        ) : null}
        {title ? <span>{title}</span> : null}
      </div>
      <div className={cls(hasTabBar ? "pb-24" : "", "pt-14")}>{children}</div>
      {hasTabBar ? (
        <nav className="bg-white text-gray-800 border-t fixed bottom-0 py-3 flex justify-around max-w-2xl w-full items-center">
          <Link href={"/"}>
            <a className="flex flex-col items-center">
              <heroicon.BuildingStorefrontIcon className={NAVICONCLASS} />
              <span>직장찾기</span>
            </a>
          </Link>
          <Link href={"/"}>
            <a className="flex flex-col items-center">
              <heroicon.IdentificationIcon className={NAVICONCLASS} />
              <span>직원찾기</span>
            </a>
          </Link>
          <Link href={"/"}>
            <a className="flex flex-col items-center">
              <heroicon.UserGroupIcon className={NAVICONCLASS} />
              <span>커뮤니티</span>
            </a>
          </Link>
          <Link href={"/"}>
            <a className="flex flex-col items-center">
              <heroicon.NewspaperIcon className={NAVICONCLASS} />
              <span>알뜰정보</span>
            </a>
          </Link>
          <Link href={"/"}>
            <a className="flex flex-col items-center">
              <heroicon.Cog6ToothIcon className={NAVICONCLASS} />
              <span>설정</span>
            </a>
          </Link>
        </nav>
      ) : null}
    </div>
  );
};

export default Layout;
