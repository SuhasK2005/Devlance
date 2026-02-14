/**
 * Loading spinner component
 */
const LoadingSpinner = ({ size = "medium", fullScreen = false, message }) => {
  const sizeClasses = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4",
  };

  const spinner = (
    <div className={`flex flex-col items-center gap-3`}>
      <div
        className={`${sizeClasses[size]} border-cyan-400 border-t-transparent rounded-full animate-spin`}
      ></div>
      {message && <p className="text-gray-400 text-sm">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
