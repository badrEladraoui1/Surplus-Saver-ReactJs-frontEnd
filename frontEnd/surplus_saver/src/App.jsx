import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserContextProvider from "./contexts/UserContext";

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
import RootConsumer from "./pages/RootConsumer";
import ConsumerSavedPosts from "./pages/ConsumerSavedPosts";
import RootAdmin from "./pages/RootAdmin";
import AdminLogin from "./pages/AdminLogin";
import AdminUsers from "./pages/AdminUsers";
import AdminPosts from "./pages/AdminPosts";
import AdminChoices from "./pages/AdminChoices";
import AdminReports from "./pages/AdminReports";
import NewAdmin from "./pages/NewAdmin";
import InterestRequestsPage from "./pages/InterestRequestsPage";
import InterestsFeedbacks from "./pages/InterestsFeedbacks";
import FeedbacksRestau from "./pages/FeedbacksRestau";

import ProtectedRoute from "./protection/ProtectedRoute";
import Profile from "./pages/Profile";

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
            <ProtectedRoute tokenRef="token" accessRole="ROLE_RESTAURANT">
              <HomePage restaurant={true} />
            </ProtectedRoute>
          ),
        },
        {
          path: "newPost",
          element: (
            <ProtectedRoute tokenRef="token" accessRole="ROLE_RESTAURANT">
              <NewPostPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "modifyPost/:id",
          element: (
            <ProtectedRoute tokenRef="token" accessRole="ROLE_RESTAURANT">
              <ModifyPostPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "deletePost/:id",
          element: (
            <ProtectedRoute tokenRef="token" accessRole="ROLE_RESTAURANT">
              <DeletePostPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "myPosts",
          element: (
            <ProtectedRoute tokenRef="token" accessRole="ROLE_RESTAURANT">
              <PostHistoryPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "interest_requests",
          element: (
            <ProtectedRoute tokenRef="token" accessRole="ROLE_RESTAURANT">
              <InterestRequestsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute tokenRef="token" accessRole="ROLE_RESTAURANT">
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "post_feedbacks",
          element: (
            <ProtectedRoute tokenRef="token" accessRole="ROLE_RESTAURANT">
              <FeedbacksRestau />
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
            <ProtectedRoute tokenRef="token" accessRole="ROLE_CONSUMER">
              <HomePage consumer={true} />
            </ProtectedRoute>
          ),
        },
        {
          path: "savedPosts",
          element: (
            <ProtectedRoute tokenRef="token" accessRole="ROLE_CONSUMER">
              <ConsumerSavedPosts />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute tokenRef="token" accessRole="ROLE_CONSUMER">
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "interests_feedbacks",
          element: (
            <ProtectedRoute tokenRef="token" accessRole="ROLE_CONSUMER">
              <InterestsFeedbacks />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: "/admin",
      element: <RootAdmin />,
      errorElement: <RootErrorPage />,
      children: [
        {
          index: true,
          element: (
            // <ProtectedRoute tokenRef={"admin_token"} accessRole="ROLE_ADMIN">
            <AdminLogin />
            // </ProtectedRoute>
          ),
        },
        {
          path: "choices",
          element: (
            <ProtectedRoute tokenRef="admin_token" accessRole="ROLE_ADMIN">
              <AdminChoices />
            </ProtectedRoute>
          ),
        },
        {
          path: "users",
          element: (
            <ProtectedRoute tokenRef="admin_token" accessRole="ROLE_ADMIN">
              <AdminUsers />
            </ProtectedRoute>
          ),
        },
        {
          path: "posts",
          element: (
            <ProtectedRoute tokenRef="admin_token" accessRole="ROLE_ADMIN">
              <AdminPosts />
            </ProtectedRoute>
          ),
        },
        {
          path: "reports",
          element: (
            <ProtectedRoute tokenRef="admin_token" accessRole="ROLE_ADMIN">
              <AdminReports />
            </ProtectedRoute>
          ),
        },
        {
          path: "choices",
          element: (
            <ProtectedRoute tokenRef="admin_token" accessRole="ROLE_ADMIN">
              <AdminChoices />
            </ProtectedRoute>
          ),
        },
        {
          path: "newAdmin",
          element: <NewAdmin />,
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
