const LoadingAnimation = ({className,containerClassName}:{
    className?:string;
    containerClassName?:string
  }) => {
      return (
        <div className={`loading-container ${containerClassName}`}>
          <div className={`spinner ${className}`}></div>
        </div>
      );
    };
    
export default LoadingAnimation;