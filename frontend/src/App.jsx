import { useEffect, useState } from "react";
import LogIn from "./components/Login";
import ToDoCard from "./components/ToDoCard";
import axios from "axios";
import CreateToDo from "./components/CreateToDo";

function App() {
  const [user, setUser] = useState();
  const [todos, setTodos] = useState();

  const getToDos = async () => {
    try {
      if (!user) return;

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/todo/${user.id}`
      );
      setTodos(response.data.todos);
    } catch (error) {
      console.error(error);
      alert("ToDo List를 불러오지 못했습니다.");
    }
  };

  const onClickLogOut = () => {
    setUser(undefined);
  };

  useEffect(() => {
    getToDos();
    console.log(user);
  }, [user]);

  if (!user) {
    return <LogIn setUser={setUser} />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-start items-center pt-16">
      <h1 className="text-4xl font-bold">
        {user.account}님 환영합니다😀{" "}
        <button
          className="ml-4 px-2 py1 bg-pink-200 hover:bg-pink-400 rounded-lg text-gray-50 text-base"
          onClick={onClickLogOut}
        >
          로그아웃
        </button>
      </h1>
      <div>
        <div className="mt-8 text-sm font-semibold">
          If I only had an hour to chop down a tree, I would spend the first 45
          minutes sharpening my axe, Abrabam Lincoln
        </div>
        <div className="text-xs">
          나무 베는데 한 시간이 주어진다면, 도끼를 가는데 45분을 쓰겠다,
          에비브러햄 링컨
        </div>
      </div>
      <CreateToDo userId={user.id} setTodos={setTodos} todos={todos} />
      <div className="mt-16 flex flex-col w-1/2">
        {todos &&
          todos.map((v, i) => {
            return <ToDoCard key={i} todo={v.todo} isDone={v.isDone} />;
          })}
      </div>
    </div>
  );
}

export default App;
