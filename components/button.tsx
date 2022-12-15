import * as heroicon from "@heroicons/react/24/outline";
import { cls } from "@libs/client/utils";
interface ButtonProps {
  type?: "floating" | "small" | "medium" | "large";
  title?: string;
  onClick?: () => void;
}

const Button = ({ type = "medium", title, onClick }: ButtonProps) => {
  const sizeRef = {
    large: "py-4 text-base",
    medium: "py-3 text-sm ",
    small: "py-2 text-sm ",
  };

  if (type === "floating") {
    return (
      <div className="max-w-2xl mx-auto w-full fixed bottom-20 flex justify-end p-5">
        <button
          onClick={onClick}
          className="bg-cyan-600 text-white h-10 w-10 flex justify-center items-center rounded-full shadow-md shadow-slate-800"
        >
          <heroicon.PlusIcon className="h-8 w-8" />
        </button>
      </div>
    );
  } else {
    const sizeCls = sizeRef[type];
    return (
      <div
        className={cls(
          "w-full bg-cyan-500 hover:bg-cyan-600 text-white px-4 border border-transparent rounded-md shadow-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:outline-none cursor-pointer",
          sizeCls
        )}
      >
        <button>{title}</button>
      </div>
    );
  }
};

export default Button;
