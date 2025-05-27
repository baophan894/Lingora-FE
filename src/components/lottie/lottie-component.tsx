import Lottie from 'react-lottie';
import animationData from '../../assets/lottie/animation-banner.json'

const LottieComponent = () => {
  const defaultOptions = {
    loop: true,  // Set to true for continuous looping of the animation
    autoplay: true,  // Start the animation immediately
    animationData: animationData,  // Pass the animation data here
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice', // Adjusts how the animation fits into its container
    },
  };

  return (
    <div className='flex w-full'>  {/* Set the size of the animation */}
      <Lottie
        style={{ height: 300, width: 500, }}
        options={defaultOptions}
      />
    </div>
  );
};

export default LottieComponent;