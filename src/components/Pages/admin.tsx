import React, { FC, PropsWithChildren } from "react";
import useAuth from "../../context/hook";

import { Content, Wrapper } from "../Containers";
import CreateUsername from "../CreateUsername";

interface AdminPageProps {}

const AdminPage: FC<PropsWithChildren<AdminPageProps>> = ({ children }) => {
  //
  const { user, data, login, logout } = useAuth();

  return (
    <Wrapper>
      <Content>
        <div>
          {!user ? (
            <button onClick={login}> Login </button>
          ) : (
            <button onClick={logout}> Logout </button>
          )}
          <hr />
          {user ? (
            user && data?.username ? (
              <div>
                <p>{data.username}</p>
                <p>link1</p>
                <p>link2</p>
                <p>
                  link3 <button>🔼</button> <button>🔽</button>{" "}
                  <button>remove link</button>
                </p>
                <button>add new link</button>
                <button>change username</button>
              </div>
            ) : (
              <CreateUsername />
            )
          ) : null}
        </div>
      </Content>
    </Wrapper>
  );
};

export default AdminPage;
