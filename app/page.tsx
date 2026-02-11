import TodoApp from "./components/TodoApp";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4">
      <TodoApp />
    </div>
  );
}
