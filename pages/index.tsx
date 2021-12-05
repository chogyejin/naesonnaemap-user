import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <div>홈</div>
      <Link href="/main">시작하기</Link>
    </div>
  );
};

export default Home;
