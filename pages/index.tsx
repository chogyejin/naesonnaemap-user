import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <div>
        <Link href="/main">시작하기</Link>
      </div>
      <div>
        <Link href="/myPage">내 페이지</Link>
      </div>
    </div>
  );
};

export default Home;
