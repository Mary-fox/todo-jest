import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodoList from "./TodoList";

describe("TodoList Component", () => {
  beforeEach(() => {
    // Очищаем localStorage перед каждым тестом
    localStorage.clear();
  });

  test("добавляет новую задачу в список", async () => {
    render(<TodoList />);

    const input = screen.getByLabelText("Введите задачу...");
    const addButton = screen.getByText("Добавить");

    fireEvent.change(input, { target: { value: "Новая задача" } });
    fireEvent.click(addButton);

    expect(await screen.findByText("Новая задача")).toBeInTheDocument();
  });
  test("отмечает задачу как выполненную", async () => {
    render(<TodoList />);
  
    const input = screen.getByLabelText("Введите задачу...");
    const addButton = screen.getByText("Добавить");
    fireEvent.change(input, { target: { value: "Тестовая задача" } });
    fireEvent.click(addButton);
  
    const taskText = await screen.findByText("Тестовая задача");
    expect(taskText).toBeInTheDocument();
  
    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    const lastTaskId = savedTodos[savedTodos.length - 1]?.id;
  
    const checkbox = await screen.findByTestId(`checkbox-${lastTaskId}`);
    fireEvent.click(checkbox);
  
    await waitFor(() => {
      expect(screen.getByTestId(`text-${lastTaskId}`)).toHaveClass("completed");
    });
  });
  
  
test("удаляет задачу из списка", async () => {
  render(<TodoList />);
  const input = screen.getByLabelText("Введите задачу...");
  const addButton = screen.getByText("Добавить");
  fireEvent.change(input, { target: { value: "Удаляемая задача" } });
  fireEvent.click(addButton);

  const taskText = await screen.findByText("Удаляемая задача");
  expect(taskText).toBeInTheDocument();

  const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  const lastTaskId = savedTodos[savedTodos.length - 1]?.id;

  const deleteButton = screen.getByTestId(`delete-button-${lastTaskId}`);
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(screen.queryByText("Удаляемая задача")).not.toBeInTheDocument();
  });
});
  test("сохраняет задачи в localStorage", async () => {
    render(<TodoList />);

    const input = screen.getByLabelText("Введите задачу...");
    const addButton = screen.getByText("Добавить");

    fireEvent.change(input, { target: { value: "Задача для localStorage" } });
    fireEvent.click(addButton);

    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    expect(savedTodos).toEqual([
      { id: expect.any(String), text: "Задача для localStorage", completed: false },
    ]);
  });

  test("загружает задачи из localStorage", async () => {
    const initialTodos = [
      { id: "1", text: "Задача 1", completed: false },
      { id: "2", text: "Задача 2", completed: true },
    ];
    localStorage.setItem("todos", JSON.stringify(initialTodos));

    render(<TodoList />);

    expect(await screen.findByText("Задача 1")).toBeInTheDocument();
    expect(await screen.findByText("Задача 2")).toBeInTheDocument();
  });
});