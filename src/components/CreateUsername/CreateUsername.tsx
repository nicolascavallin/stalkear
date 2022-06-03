import useAuth from "@/context/hook";
import React, { FC, FormEvent, FormEventHandler, useState } from "react";

const CreateUsername: FC = () => {
  //
  const { setUsername } = useAuth();

  const [input, setInput] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUsername(input);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          placeholder="username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">crear usuario</button>
      </form>
    </div>
  );
};

export default CreateUsername;
