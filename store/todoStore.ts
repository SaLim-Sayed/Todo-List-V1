import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define the Todo interface
export interface TodoProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

// Define the possible filter values
type Filter = 'all' | 'completed' | 'incomplete';

// Define the TodoState interface
interface TodoState {
  todos: TodoProps[];
  filter: Filter;
  addTodo: (todo: TodoProps) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, title: string, description: string) => void; // New method for updating todos

  setFilter: (filter: Filter) => void;
}

// Create the Zustand store with persistence using localStorage
const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      filter: 'all',
      addTodo: (todo) =>
        set((state) => ({ todos: [...state.todos, todo] })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: !todo.completed }
              : todo
          ),
        })),
        updateTodo: (id, title, description) =>
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, title, description } : todo
            ),
          })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      setFilter: (filter) => set({ filter }),
    }),
    {
      name: 'todo-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useTodoStore;

