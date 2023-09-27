import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <section className="relative w-screen h-screen">
        <header className="h-1/6">
          <div className="flex flex-col p-4">
            <h1 className="text-2xl font-bold text-center">E-Wallet</h1>
          </div>
        </header>
        <main className="h-4/6">
          <Outlet />
        </main>
        <footer className="py-4 absolute bottom-0 w-full h-1/6 flex justify-center items-end">
          <div className="container text-center mx-auto text-xs italic">
            © 2023 BigBank. All rights reserved.
          </div>
        </footer>
      </section>
    </>
  );
}
