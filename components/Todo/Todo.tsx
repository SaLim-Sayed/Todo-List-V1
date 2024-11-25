"use client";
import { Button, Spinner } from "@nextui-org/react";
import React from "react";
import { PiPlus } from "react-icons/pi";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Todo: React.FC = () => {
  const [active, setActive] = React.useState(false);
  return (
    <div>
      <div className="flex justify-between p-2  fixed w-full z-50  items-end bg-orange-200">
        <div className="text-3xl text-purple-900 font-bold">Taskfy</div>
        <Button
          color="secondary"
          onClick={() => setActive(!active)}
          endContent={<PiPlus size={28} />}
        >
          Add Task
        </Button>
      </div>
      <div className="flex flex-col md:flex-row items-start justify-start pt-16 gap-6 ">
        <div className="md:hidden flex  w-full md:w-1/3">
          {active && <TodoForm setActive={setActive} />}
        </div>
        <div className=" w-full md:w-2/3">
          <TodoList />
        </div>
        <div className="hidden md:flex w-full md:w-1/3 ">
          <TodoForm setActive={setActive} />
        </div>
      </div>
    </div>
  );
};

export default Todo;
