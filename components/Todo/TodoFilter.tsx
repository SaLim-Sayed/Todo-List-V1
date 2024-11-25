import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface TodoFilterProps {
  filter: "all" | "completed" | "incomplete";
  setFilter: (filter: "all" | "completed" | "incomplete") => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({ filter, setFilter }) => {
  return (
    <Select
      label="Filter Tasks"
      placeholder="Select a filter"
      selectedKeys={[filter]}
      value={filter}
      onChange={(value) => setFilter(value.target.value as typeof filter)}
      className="mb-4 max-w-full"
    >
      <SelectItem key="all" value="all">All Tasks</SelectItem>
      <SelectItem key="completed" value="completed">Completed</SelectItem>
      <SelectItem key="incomplete" value="incomplete">Incomplete</SelectItem>
    </Select>
  );
};
