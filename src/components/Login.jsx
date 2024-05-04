import React from 'react';
import Label from './Label';
import Inputs from './Inputs';

const Login = ({
  onLogin,
  emailLogin,
  passwordLogin,
  setEmailLogin,
  setPasswordLogin,
  toggleToRegister,
}) => {
  return (
    <>
      <div className="md:ml-[8rem] p-5">
        <div className="mb-[10rem] container mx-auto ">
          <h1 className="text-center font-bold text-2xl mb-7">Halaman Login</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onLogin({ emailLogin, passwordLogin });
            }}
            className="bg-white  rounded px-8 pt-6 pb-8 mb-4 max-w-[40rem] border mx-auto"
          >
            <div className="mb-4">
              <Label label="email" />
              <Inputs
                id="email"
                type="email"
                placeholder="Email"
                value={emailLogin}
                setter={(e) => setEmailLogin(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <Label label="password" />
              <Inputs
                id="password"
                type="password"
                placeholder="Password"
                value={passwordLogin}
                setter={(e) => setPasswordLogin(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-5 justify-between">
              <p
                onClick={toggleToRegister}
                className="hover:text-blue-500 cursor-pointer w-fit"
              >
                Don't have an account? Register
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none "
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
