import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserContextProvider from "./contexts/UserContext";

import LandingPage from "./pages/LandingPage";
import SignUpPge from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import Root from "./pages/Root";
import RootErrorPage from "./pages/RootErrorPage";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/RestoHomePage";
import NewPostPage from "./pages/NewPostPage";
import ModifyPostPage from "./pages/ModifyPostPage";
import DeletePostPage from "./pages/DeletePostPage";
import PostHistoryPage from "./pages/PostHistoryPage";
import RootRestaurant from "./pages/RootRestaurant";
// import HomePageConsumer from "./pages/HomePageConsumer";
import RootConsumer from "./pages/RootConsumer";
import ConsumerSavedPosts from "./pages/ConsumerSavedPosts";

import ProtectedRoute from "./protection/ProtectedRoute";

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
        {
          index: true,
          element: (
            <ProtectedRoute accessRole="ROLE_RESTAURANT">
              <HomePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "newPost",
          element: (
            <ProtectedRoute accessRole="ROLE_RESTAURANT">
              <NewPostPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "modifyPost/:id",
          element: (
            <ProtectedRoute accessRole="ROLE_RESTAURANT">
              <ModifyPostPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "deletePost/:id",
          element: (
            <ProtectedRoute accessRole="ROLE_RESTAURANT">
              <DeletePostPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "myPosts",
          element: (
            <ProtectedRoute accessRole="ROLE_RESTAURANT">
              <PostHistoryPage />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/consumer",
      element: <RootConsumer />,
      errorElement: <RootErrorPage />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute accessRole="ROLE_CONSUMER">
              <HomePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "savedPosts",
          element: (
            <ProtectedRoute accessRole="ROLE_CONSUMER">
              <ConsumerSavedPosts />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <main>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </main>
  );
};

export default App;
