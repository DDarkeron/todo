import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Main from "./main/Main";

const App: React.VFC = () => (
  <Container>
    <Header />
    <Main />
    <Footer>
      <span className={classNames("flex justify-center items-center", "text-xs", "text-gray-400")}>
        Double-click to edit a todo
      </span>
      <span className={classNames("flex justify-center items-center", "text-xs", "text-gray-400")}>
        Created by &nbsp;
        <a href="https://github.com/DDarkeron" className={classNames("hover:underline")}>
          DDarkeron
        </a>
      </span>
    </Footer>
  </Container>
);
const Container = styled.div.attrs({
  className: classNames(
    "w-screen h-screen",
    "flex flex-col",
    "bg-gray-100",
    "border-solid",
    "border-black-500",
    "outline",
  ),
})``;

const Footer = styled.div.attrs({
  className: classNames("mt-6"),
})``;
export default observer(App);
