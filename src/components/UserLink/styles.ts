import styled from "styled-components";

export default styled.a`
  width: 100%;
  background: #ccc;
  padding: 8px;
  text-align: center;
  transition: background 0.125s ease;
  &:hover {
    background: #999;
    cursor: pointer;
  }
`;
