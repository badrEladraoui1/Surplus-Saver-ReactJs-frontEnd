const Loading = () => {
  return (
    <section className="flex gap-3">
      <h1 className="text-3xl font-bold mb-4 text-yellow text-center">
        Loading{" "}
      </h1>
      <span className="loading loading-infinity loading-lg"></span>
    </section>
  );
};

export default Loading;
