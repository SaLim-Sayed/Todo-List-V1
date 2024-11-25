import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useTodoStore from "../../store/todoStore";
import { Button, Card, Input, Textarea } from "@nextui-org/react";

const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

type TodoFormValues = z.infer<typeof todoSchema>;
interface TodoFormProps {
  setActive: (active: boolean) => void;
}
const TodoForm: React.FC<TodoFormProps> = ({ setActive }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
  });
  const { addTodo } = useTodoStore();

  const onSubmit = (data: TodoFormValues) => {
    addTodo({ ...data, id: Date.now(), completed: false });
    reset();
    setActive(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="   flex w-full justify-center items-center gap-4"
    >
      <Card className=" w-full shadow-lg p-4">
        <div>
          <Input
            {...register("title")}
            placeholder="Title"
            className=" p-2 w-full"
            variant="bordered"
            isInvalid={errors.title ? true : false}
            errorMessage={errors.title?.message}
            size="lg"
            classNames={{
              input: "text-[1.2rem]",
            }}
          />
        </div>
        <div>
          <Textarea
            {...register("description")}
            placeholder="Description"
            className=" p-2 w-full"
            variant="bordered"
            isInvalid={errors.description ? true : false}
            errorMessage={errors.description?.message}
            size="lg"
            classNames={{
              input: "text-[1.2rem]",
            }}
          />
        </div>
        <Button type="submit" className="bg-blue-500 text-white ">
          Add Task
        </Button>
      </Card>
    </form>
  );
};

export default TodoForm;
