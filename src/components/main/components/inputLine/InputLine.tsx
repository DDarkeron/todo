import classNames from "classnames";
import React, { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { useServices } from "../../../../contexts/ServicesContext";

interface InputLineProps {
  className?: string;
}

const InputLine: React.FC<InputLineProps> = ({ className }) => {
  const queryClient = useQueryClient();

  const { todosService } = useServices();

  const [value, setValue] = useState<string>("");

  const { mutate: createTodo } = useMutation(todosService.createTodo, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["todos"]);
    },
  });

  const changeHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  const onKeyUp = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        createTodo({ content: value });
      }
    },
    [value],
  );

  return (
    <Container className={className}>
      <input
        type="text"
        className={classNames("w-[28rem] h-12", "outline-none")}
        value={value}
        placeholder="What needs to be done?"
        onChange={changeHandler}
        onKeyPress={onKeyUp}
      />
    </Container>
  );
};

const Container = styled.div.attrs({
  className: classNames("flex justify-center items-center", "border-1 border-transparent"),
})``;

export default InputLine;
