import * as heroicon from "@heroicons/react/24/outline";
interface ButtonProps {
  type: "floating" | "small" | "medium" | "large";
  title?: string;
  onClick: () => void;
}

const Button = ({ type, title, onClick }: ButtonProps) => {
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
    return (
      <div className="bg-cyan-600 rounded-md">
        <button>{title}</button>
      </div>
    );
  }
};

export default Button;
