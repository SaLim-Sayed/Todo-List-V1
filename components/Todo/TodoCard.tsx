import React from "react";
import { Card, CardHeader, Checkbox, Button } from "@nextui-org/react";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { GiCheckMark } from "react-icons/gi";
import { cn } from "@/libs/cn";
import useTodoStore, { TodoProps } from "@/store/todoStore";

interface TodoCardProps {
  todo: TodoProps;
  onEdit: () => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({ todo, onEdit }) => {
  const { toggleTodo, deleteTodo } = useTodoStore();

  return (
    <Card
      title={todo.completed ? "Completed" : "Incomplete"}
      className={cn(
        "items-center shadow-2xl cursor-pointer text-teal-900",
        todo.completed && "bg-orange-100"
      )}
    >
      <div className="flex w-full items-start">
        <div className="flex flex-col w-full justify-start">
          <CardHeader className="bg-gray-100">
            <div className="flex w-full items-start">
              <Checkbox
                isSelected={todo.completed}
                color="primary"
                onChange={() => toggleTodo(todo.id)}
              />
              <div className="text-lg font-bold">{todo.title}</div>
            </div>
            <div className="flex">
              {todo.completed && (
                <Button className="text-green-500" isIconOnly variant="light">
                  <GiCheckMark size={24} />
                </Button>
              )}
              <Button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500"
                isIconOnly
                variant="light"
              >
                <BiTrash size={24} />
              </Button>
              <Button
                onClick={onEdit}
                className="text-green-500"
                isIconOnly
                variant="light"
              >
                <BiEditAlt size={24} />
              </Button>
            </div>
          </CardHeader>
          <div className="flex w-[97%] justify-between border bg-white m-2 rounded-md p-2">
            <div>{todo.description}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
