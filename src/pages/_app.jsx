import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <section className="relative w-screen h-screen">
        <header className="">
          <div className="flex flex-col p-4">
            <h1 className="text-2xl font-bold text-center">E-Wallet</h1>
          </div>
        </header>
        <main className="w-full h-full">
          <Outlet />
        </main>
        <footer className="py-4  absolute bottom-0 w-full">
          <div className="container text-center mx-auto text-xs italic">
            © 2023 BigBank. All rights reserved.
          </div>
        </footer>
      </section>
    </>
  );
}

// export const Loader = async () => {
//   console.log("Entered route");
//   let postsRes = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
//   let postsData = postsRes.data;
//   let usersRes = await axios.get(`https://jsonplaceholder.typicode.com/users/`);
//   let usersData = usersRes.data;
//   return { postsData, usersData };
// };
