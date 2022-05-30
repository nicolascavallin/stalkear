import React, { FC } from "react";

import UserLinkStyle from "./styles";

interface UserLinkProps {
  title: string;
  url: string;
}

const UserLink: FC<UserLinkProps> = ({ title, url }) => {
  return (
    <UserLinkStyle href={url} target="_blank">
      {title}
    </UserLinkStyle>
  );
};

export default UserLink;
