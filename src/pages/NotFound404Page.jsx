import React from "react";

const NotFound404Page = () => {
  const path = window.location.pathname;

  return (
    <div className="fixed top-0 w-full h-screen bg-red-800 z-30 flex justify-center items-center">
      <h1 className="text-2xl font-bold text-white">
        Maaf, Halaman <span className="text-yellow-500">"{path}"</span> Tidak
        Ditemukan
      </h1>
    </div>
  );
};

export default NotFound404Page;
