import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import InputLine from "./components/inputLine/InputLine";
import PostTodos from "./components/PostTodos";

const Main: React.FC = () => (
  <Container className={classNames("flex flex-col items-center", "space-y-0.5", "border-solid border-black-500")}>
    <InputLine className={classNames("w-[36rem] h-16", "p-3", "bg-white", "shadow-lg")} />
    <PostTodos />
  </Container>
);

const Container = styled.div.attrs({
  className: classNames(),
})``;

export default observer(Main);
