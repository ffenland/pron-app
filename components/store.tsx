import Image from "next/image";
import Link from "next/link";

interface StoreProps {
  id: string;
  title?: string;
  address?: string;
  image?: string;
}

const Store = ({ id, title, address, image }: StoreProps) => {
  return (
    <Link href={`/stores/${id}`}>
      <a className="flex m-4 p-4 rounded-md items-center shadow-md shadow-gray-400 cursor-pointer hover:bg-slate-100">
        <div className="IMAGE rounded-md flex">
          <Image
            className="rounded-md"
            src="https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fapis.naver.com%2Fplace%2Fpanorama%2Fthumbnail%2F13177608%2F0%3Fwidth%3D800%26height%3D400%26msgpad%3D1670564217379%26md%3DClgI3FOl%252B9WJxYu8ozf%252Bx5d7cpU%253D"
            width={120}
            height={120}
            alt="Store Image"
            objectFit="cover"
          />
        </div>
        <div className="BASICINFO space-y-2 flex-1 ml-3 flex flex-col truncate">
          <span className="text-lg">가게이름</span>
          <span className="text-sm">
            ㄻㄴㅇㄻㅇㄴㄹㄴㅁㅇsadfasdfasdfasdㄻㄴㅇㄹㄴㅁㅇㄻㄴㅇㄻ 서울시
            영등포구 여의도동
          </span>
          <span className="text-sm">베이글, 아아맛집 간략한정보</span>
        </div>
        <div className="SEEKINFO space-y-2 flex-1 ml-3 flex flex-col truncate">
          <span className="text-lg">정규근무</span>
          <span>월~금</span>
          <span>연차 없음</span>
        </div>
      </a>
    </Link>
  );
};

export default Store;
