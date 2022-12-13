import { defaultMaxListeners } from "events";
import type { NextPage } from "next";
import { FieldErrors, useForm } from "react-hook-form";

interface SignInForm {
  username: string;
  email: string;
  password: string;
  errors?: string;
}
// errors : global Error에 대한 설정을 하기위한 name

const SignIn: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    reset,
  } = useForm<SignInForm>({ mode: "onChange" });

  const onValid = (data: SignInForm) => {
    console.log("Valid!");
    // global error를 설정
    setError("errors", { message: "Backend Error" });
    // 특정 field에 error를 설정
    setError("username", { message: "넘나 구려요." });
    reset();
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };
  return (
    <div className="bg-pink-300">
      <form onSubmit={handleSubmit(onValid, onInvalid)}>
        <input
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 5,
              message: "The username should be longer than 5 characters.",
            },
          })}
          type="text"
          placeholder="Username"
          required
          minLength={5}
        />
        {errors.username?.message}
        <input
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
              message: "이메일 형식이 아닙니다.",
            },
            validate: {
              notGmail: (value) =>
                // !value.includes("@gmail.com") ? true : "Gmail is not allowed.",
                !value.includes("@gmail.com") || "Gmail is not allowed.",
            },
          })}
          type="email"
          placeholder="Email"
          required
        />
        {errors.email?.message}
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Passoword"
          required
        />
        <input type="submit" value="Create Account" />
      </form>
    </div>
  );
};

export default SignIn;
