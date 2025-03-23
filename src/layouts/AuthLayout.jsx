import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      <div className="w-[40%] bg-[url('https://picsum.photos/800/1200')] bg-cover bg-center"></div>
      <div className="flex w-[60%] flex-col items-center justify-center p-5">
        <Outlet /> {/* Ushbu joyda Login yoki Register sahifasi ko‘rinadi */}
      </div>
    </div>
  );
}

export default AuthLayout;
