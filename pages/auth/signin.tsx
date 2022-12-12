import type { NextPage } from "next";
import { useForm } from "react-hook-form";

const SignIn: NextPage = () => {
  const { register } = useForm();
  return (
    <div className="bg-pink-300">
      <form>
        <input {...register} type="text" />
      </form>
    </div>
  );
};
