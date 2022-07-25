import classNames from "classnames";
import React from "react";
import styled from "styled-components";

const Header: React.FC = () => (
  <Container>
    <h1>todos</h1>
  </Container>
);

const Container = styled.div.attrs({
  className: classNames("h-36", "flex justify-center items-center", "text-8xl text-red-200 text-transparent-1.2"),
})``;

export default Header;
