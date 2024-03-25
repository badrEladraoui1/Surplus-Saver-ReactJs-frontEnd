import Header from "../components/UI/Header";

const RootErrorPage = () => {
  return (
    <section className="flex flex-col items-center h-screen">
      <Header />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg">
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
      </div>
    </section>
  );
};

export default RootErrorPage;
