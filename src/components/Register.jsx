import React from 'react';
import Label from './Label';
import Inputs from './Inputs';

const Register = ({
  register,
  toggleToLogin,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <>
      <div className="md:ml-[8rem] p-5">
        <div className="mb-[10rem] container mx-auto ">
          <h1 className="text-center font-bold text-2xl mb-7">
            Halaman Register
          </h1>
          <form
            onSubmit={register}
            className="bg-white  rounded px-8 pt-6 pb-8 mb-4 max-w-[40rem] border mx-auto"
          >
            <div className="mb-4">
              <Label label="nama" />
              <Inputs
                id="nama"
                type="text"
                placeholder="Nama Anda"
                value={name}
                setter={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Label label="email" />
              <Inputs
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                setter={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <Label label="password" />
              <Inputs
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                setter={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-5 justify-between">
              <p
                onClick={toggleToLogin}
                className="hover:text-blue-500 cursor-pointer w-fit"
              >
                Already have an account? Login
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none "
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
