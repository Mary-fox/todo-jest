import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {PaperStyled,TitleStyled ,TaskItemStyled} from "./TodoList.styled"



const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<{ id: string; text: string; completed: boolean }[]>([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (task.trim()) {
      const newTodo = { id: uuidv4(), text: task, completed: false };
      setTodos([...todos, newTodo]);
      setTask("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <PaperStyled>
      <TitleStyled>Список задач</TitleStyled>
      <input
        aria-label="Введите задачу..."
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTodo}>Добавить</button>
      <ul>
        {todos.map((todo) => (
          <TaskItemStyled key={todo.id} completed={todo.completed}>
            <span data-testid={`text-${todo.id}`} className={todo.completed ? "completed" : ""}>
              {todo.text}
            </span>
            <input
              type="checkbox"
              data-testid={`checkbox-${todo.id}`}
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <button
              data-testid={`delete-button-${todo.id}`}
              onClick={() => deleteTodo(todo.id)}
            >
              ❌
            </button>
          </TaskItemStyled>
        ))}
      </ul>
    </PaperStyled>
  );
};

export default TodoList;