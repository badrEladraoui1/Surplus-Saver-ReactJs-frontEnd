import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import SignUpPge from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import Root from "./pages/Root";
import RootErrorPage from "./pages/RootErrorPage";
import AboutPage from "./pages/AboutPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <RootErrorPage />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/sign_up", element: <SignUpPge /> },
        { path: "/sign_in", element: <SignInPage /> },
        { path: "/about", element: <AboutPage /> },
      ],
    },
  ]);

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
