import React, { SetStateAction } from "react";
import "./progressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepProgressBar = (
    { nowStep,
      setNowStep
     }:{
      nowStep:number;
      setNowStep:React.Dispatch<SetStateAction<number>>
    
}) => {
  var stepPercentage = 0;
  if (nowStep === 1) {
    stepPercentage = 16;
  } else if (nowStep === 2) {
    stepPercentage = 49.5;
  } else if (nowStep === 3) {
    stepPercentage = 82.5;
  } else if (nowStep === 4) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <ProgressBar percent={stepPercentage}>
      <Step>
        {({ accomplished, index }) => (
            <div className="relative group hover:opacity-90 transition-all duration-300" onClick={() => setNowStep(1)}>
              <div
                  className={`indexedStep ${accomplished ? "accomplished" : null}`}
                  
              >
                  
              </div>
              <p className="text-xs text-light underline absolute -bottom-5 -right-5 cursor-pointer group-hover:opacity-80 transition-all duration-300">Preference</p>
            </div>  
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div className="relative group hover:opacity-90 transition-all duration-300" onClick={() => setNowStep(2)}>
          <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
              
          >
              
          </div>
          <p className="text-xs text-light underline absolute -bottom-5 right-[2px] cursor-pointer group-hover:opacity-80 transition-all duration-300">Info</p>
        </div>  
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div className="relative group hover:opacity-90 transition-all duration-300" onClick={() => setNowStep(3)}>
          <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
              
          >
              
          </div>
          <p className="text-xs text-light underline absolute -bottom-5 -right-4 cursor-pointer group-hover:opacity-80 transition-all duration-300">Location</p>
        </div>  
        )}
      </Step>
      <Step>
        {({ accomplished, index }) => (
          <div className="relative group hover:opacity-90 transition-all duration-300" onClick={() => setNowStep(4)}>
          <div
              className={`indexedStep ${accomplished ? "accomplished" : null}`}
              
          >
              
          </div>
          <p className="text-xs text-light underline absolute -bottom-5 -right-6 cursor-pointer group-hover:opacity-80 transition-all duration-300">Compeletion</p>
        </div>  
        )}
      </Step>
    </ProgressBar>
  );
};

export default MultiStepProgressBar;
