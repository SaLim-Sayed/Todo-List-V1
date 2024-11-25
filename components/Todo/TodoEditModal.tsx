import React, { useEffect } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useTodoStore, { TodoProps } from "@/store/todoStore";
import { TodoFormData, todoSchema } from "./schema";

interface TodoEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: TodoProps;
}

export const TodoEditModal: React.FC<TodoEditModalProps> = ({
  isOpen,
  onClose,
  todo,
}) => {
  const { updateTodo } = useTodoStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
  });
 
  useEffect(() => {
    if (isOpen) {
      reset({
        title: todo.title,
        description: todo.description,
      });
    }
  }, [isOpen, todo, reset]);

  const handleSave = (data: TodoFormData) => {
    updateTodo(todo.id, data.title, data.description);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader>
          <h3>Edit Todo</h3>
        </ModalHeader>
        <ModalBody>
          <form className="flex flex-col gap-4">
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Title"
                  fullWidth
                  isInvalid={!!errors.title}
                  errorMessage={errors.title?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  fullWidth
                  rows={4}
                  isInvalid={!!errors.description}
                  errorMessage={errors.description?.message}
                />
              )}
            />
          </form>
        </ModalBody>
        <ModalFooter className="flex justify-center w-full">
          <Button color="danger" onClick={handleCancel}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit(handleSave)}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
