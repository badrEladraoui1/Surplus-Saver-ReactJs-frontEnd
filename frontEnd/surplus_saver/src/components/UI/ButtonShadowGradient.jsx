/* eslint-disable react/prop-types */
const ButtonShadowGradient = ({ content, ...props }) => {
  return (
    <button
      {...props}
      className="relative inline-flex h-12 w-full items-center justify-center rounded-md bg-white px-6 font-medium text-gray-950 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
    >
      <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
      {content}
    </button>
  );
};

export default ButtonShadowGradient;
