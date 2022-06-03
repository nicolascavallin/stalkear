import type { NextPage } from "next";

import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";

const Home: NextPage = () => {
  useEffect(() => {
    // getDocs(collection(firestore, "app")).then((res) => {
    //   console.log(res.docs[0].data());
    // });
  }, []);

  return <div>Contact</div>;
};

export default Home;
