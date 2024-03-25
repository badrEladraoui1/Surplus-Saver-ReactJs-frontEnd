import { Outlet } from "react-router-dom";
import Header from "../components/UI/Header";

const Root = () => {
  return (
    <section>
      <Header />
      <main>
        <Outlet />
      </main>
    </section>
  );
};

export default Root;
