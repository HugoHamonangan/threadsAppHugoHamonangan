import React, { useState } from "react";
import Inputs from "../components/Inputs";
import Label from "../components/Label";
import { useDispatch } from "react-redux";
import { asyncAddThread } from "../states/addThreads/action";

const AddThreads = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();

  if (accessToken === null) {
    window.location.href = "/";
    alert("Harus login dulu kalau mau buat Threads");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncAddThread({ title, body, category }));
    setTitle("");
    setBody("");
    setCategory("");
    window.location.href = "/";
  };

  return (
    <div className="md:ml-[8rem] p-5">
      <div className="mb-[10rem] container mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-7">
            <div>
              <Label label="Judul" />
              <Inputs
                id="title"
                placeholder="Masukkan Judul"
                setter={(e) => setTitle(e.target.value)}
                type="text"
                value={title}
              />
            </div>
            <div>
              <Label label="Kategori" />
              <Inputs
                id="Kategori"
                placeholder="Masukkan Kategori"
                setter={(e) => setCategory(e.target.value)}
                type="text"
                value={category}
              />
            </div>
            <div>
              <Label label="Thread" />
              <textarea
                id="thread"
                cols="30"
                rows="6"
                className="border w-full p-3"
                placeholder="Tulis Thread Anda"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 mt-7 hover:bg-blue-600"
          >
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddThreads;
