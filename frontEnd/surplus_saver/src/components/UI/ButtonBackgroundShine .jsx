/* eslint-disable react/prop-types */
const ButtonBackgroundShine = ({ content, ...props }) => {
  return (
    <button
      {...props}
      className="inline-flex h-12 animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 font-bold"
    >
      {content}
    </button>
  );
};

export default ButtonBackgroundShine;
