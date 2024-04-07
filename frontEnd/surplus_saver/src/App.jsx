import { createBrowserRouter, RouterProvider } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import SignUpPge from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import Root from "./pages/Root";
import RootErrorPage from "./pages/RootErrorPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import NewPostPage from "./pages/NewPostPage";
import ModifyPostPage from "./pages/ModifyPostPage";
import DeletePostPage from "./pages/DeletePostPage";
import PostHistoryPage from "./pages/PostHistoryPage";
import RootRestaurant from "./pages/RootRestaurant";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <RootErrorPage />,
      children: [
        { index: true, element: <LandingPage /> },
        { path: "sign_up", element: <SignUpPge /> },
        { path: "sign_in", element: <SignInPage /> },
        { path: "about", element: <AboutPage /> },
      ],
    },
    {
      path: "/restaurant",
      element: <RootRestaurant />,
      errorElement: <RootErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "newPost", element: <NewPostPage /> },
        { path: "modifyPost/:id", element: <ModifyPostPage /> },
        { path: "deletePost/:id", element: <DeletePostPage /> },
        { path: "myPosts", element: <PostHistoryPage /> },
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
