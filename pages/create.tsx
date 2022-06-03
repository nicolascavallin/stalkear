import type { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const {
    query: { username },
  } = useRouter();

  return (
    <div>
      CREATE
      <p>{username} is available</p>
    </div>
  );
};

export default Home;
