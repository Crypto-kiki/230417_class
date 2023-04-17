import axios from "axios";
import { useState } from "react";

const CreateToDo = ({ userId, setTodos, todos }) => {
  const [todo, setTodo] = useState("");

  const onSubmitCreateToDo = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/todo`,
        {
          todo,
          userId,
        }
      );

      // 새로 추가되는게 위로가도록!
      setTodos([response.data.todo, ...todos]);

      setTodo("");
    } catch (error) {
      console.error(error);
      alert("Todo 생성 중 에러가 발생했습니다.");
    }
  };

  return (
    <form className="flex mt-2" onSubmit={onSubmitCreateToDo}>
      <input
        className="grow border-2 border-pink-200 rounded-lg focus:outline-pink-400 px-2 py-1 text-lg"
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <input
        className="ml-4 px-2 py-1 bg-pink-400 rounded-lg text-gray-50"
        type="submit"
        value="새 투두 생성"
      />
    </form>
  );
};

export default CreateToDo;
