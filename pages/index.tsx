import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <div>
        <Link href="/main">장소 찾고 등록하기</Link>
      </div>
      <div>
        <Link href="/myPage">등록한 장소 보기</Link>
      </div>
    </div>
  );
};

export default Home;
