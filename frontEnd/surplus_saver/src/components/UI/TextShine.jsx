/* eslint-disable react/prop-types */
const TextShine = ({ content, className }) => {
  return (
    <span
      className={` inline-flex animate-background-shine bg-[linear-gradient(110deg,#939193,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-transparent ${className}`}
    >
      {content}
    </span>
  );
};

export default TextShine;
