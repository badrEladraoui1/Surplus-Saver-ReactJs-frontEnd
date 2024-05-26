import Lottie from "react-lottie";
import emptyAnimation from "../../assets/pfa_empty_anim.json";

const EmptyAnim = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: emptyAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default EmptyAnim;
