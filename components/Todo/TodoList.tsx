import React, { useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import useTodoStore, { TodoProps } from "@/store/todoStore";
import { TodoFilter } from "./TodoFilter";

import { TodoEditModal } from "./TodoEditModal";
import { TodoCard } from "./TodoCard";

const TodoList: React.FC = () => {
  const { todos, setFilter, filter } = useTodoStore();
  const [editingTodo, setEditingTodo] = useState<TodoProps | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEdit = (todo: TodoProps) => {
    setEditingTodo(todo);
    onOpen();
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  return (
    <div className="p-4 space-y-4 w-full text-teal-900">
      <TodoFilter filter={filter} setFilter={setFilter} />
      <div className="space-y-2">
        {filteredTodos.map((todo,idx) => (
          <TodoCard key={idx} todo={todo} onEdit={() => handleEdit(todo)} />
        ))}
      </div>
      {editingTodo && (
        <TodoEditModal isOpen={isOpen} onClose={onClose} todo={editingTodo} />
      )}
    </div>
  );
};

export default TodoList;
