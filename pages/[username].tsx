import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { Wrapper, Content, Profile, Links } from "../src/components/Containers";
import UserLink from "../src/components/UserLink";
import { firestore } from "../src/utils/admin";
import { UserData } from "../src/utils/interfaces";

interface Link {
  id: string;
  title: string;
  url: string;
}

const Home: NextPage<UserData> = ({ username, links }) => {
  return (
    <Wrapper>
      <Content>
        <Profile>
          <img
            src="https://conscientesorg.files.wordpress.com/2018/10/hey-arnold1jpg.jpg"
            style={{ width: 100, height: 100, borderRadius: 100 }}
          />
          <p>@{username}</p>
          <p style={{ textAlign: "center", maxWidth: "50ch" }}>
            Good to see you my friend. Here&apos;re all the things you&apos;ve
            seen and heard me talking about. Enjoy!
          </p>
        </Profile>
        <Links>
          {links.map((link) => (
            <UserLink key={link.id} title={link.title} url={link.url} />
          ))}
        </Links>
      </Content>
    </Wrapper>
  );
};

export default Home;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<UserData> = async (context) => {
  //
  const { username } = context.params as ParsedUrlQuery;

  const data = (
    await firestore().collection("app").where("username", "==", username).get()
  ).docs;

  if (data.length === 0)
    return {
      redirect: {
        destination: `/create?username=${username}`,
        permanent: false,
      },
    };

  const { links } = data[0].data();

  return {
    props: {
      username: username as string,
      links,
      customTheme: {
        backgroundColor: "12",
        fontFamily: "12",
      },
      theme: "custom",
      uid: "asd",
    },
  };
};
