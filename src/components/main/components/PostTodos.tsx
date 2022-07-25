import classNames from "classnames";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { useServices } from "../../../contexts/ServicesContext";
import type { TodoStatus } from "../../../services/todos/dtos/Todo";

const PostToDo: React.FC = () => {
  const queryClient = useQueryClient();

  const { todosService } = useServices();

  const [filter, setFilter] = useState<TodoStatus | undefined>("active");

  const { data } = useQuery(["todos"], todosService.getAllTodos, { enabled: !filter });

  const { data: filteredData } = useQuery(["todos", filter], () => todosService.getAllTodosByStatus(filter!), {
    enabled: !!filter,
  });

  const { mutate: deleteTodo } = useMutation(todosService.deleteTodo, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["todos"]);
    },
  });
  const { mutate: updateTodoStatus } = useMutation(todosService.updateTodoStatus, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["todos"]);
    },
  });

  return (
    <>
      <TodoList>
        {(filter ? filteredData : data)?.map(data => (
          <div
            key={data.id}
            className={classNames("w-[36rem] h-16 p-3", "flex justify-between", "bg-white", "shadow-lg")}
          >
            <div onClick={() => updateTodoStatus({ id: data.id, status: "completed" })}>✔</div>
            <div>{data.content}</div>
            <div onClick={() => deleteTodo(data.id)}>✖</div>
          </div>
        ))}
      </TodoList>
      <Footer>
        <div className={classNames("flex-1")}>
          <p>{data?.length === 1 ? "item left" : "items left"}</p>
        </div>
        <div className={classNames("flex justify-between space-x-5", "box-content")}>
          <div className={classNames("active:border-2 border-gray-500 rounded")} onClick={() => setFilter(undefined)}>
            all
          </div>
          <div className={classNames("active:border-2 border-gray-500 rounded")} onClick={() => setFilter("active")}>
            active
          </div>
          <div className={classNames("active:border-2 border-gray-500 rounded")} onClick={() => setFilter("completed")}>
            completed
          </div>
        </div>
      </Footer>
    </>
  );
};

const TodoList = styled.div.attrs({
  className: classNames(),
})``;

const Footer = styled.div.attrs({
  className: classNames("w-[36rem] h-10 p-3", "flex justify-center", "bg-white shadow-lg", "text-xs text-gray-500"),
})``;

export default observer(PostToDo);
