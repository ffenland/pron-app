import type { NextPage } from "next";

import colors

const SignIn: NextPage = () => {
  return (
    <div className="flex justify-center flex-col gap-y-8 mt-5">
      <div className="flex justify-center"></div>
      <div className="flex items-center gap-y-2 justify-center flex-col">
        <span className="flex">안녕하세요 팜팜에 오신 것을 환영합니다.</span>
        <span className="flex">로그인을 해주세요.</span>
      </div>
      <div className="Login mx-auto border-2 p-4 rounded-md">
        <div className="Services w-64 space-y-2 mx-auto">
          <div
            className="Kakao bg-[#fee601] rounded-lg flex items-center h-14 cursor-pointer"
            onClick={() => signIn("kakao")}
          >
            <div className="flex items-center">
              <Image src={kakao_logo} alt="kakaoLogin" width={50} height={50} />
              <span className="text-[#181609] ml-2">카카오로 시작하기</span>
            </div>
          </div>
          <div
            className="Naver bg-[#04c75a] rounded-lg h-14 flex items-center cursor-pointer"
            onClick={() => signIn("naver")}
          >
            <div className="flex items-center">
              <Image src={naver_logo} alt="naverLogin" width={50} height={50} />
              <span className="text-[#f8fff9] ml-2">네이버로 시작하기</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
