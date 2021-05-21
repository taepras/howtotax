import React from 'react';
import Button from './Button';

const PageNavigator = ({ currentStep, setCurrentStep, stepCount }) => (
  <div style={{ display: 'flex', marginTop: '20px', gap: '20px' }}>
    <Button
      style={{ flexGrow: 1, flexBasis: 0, textAlign: 'center' }}
      onClick={() => setCurrentStep(Math.max(currentStep - 1, -1))}
        // disabled={currentStep === 0}
      secondary
    >
      ย้อนกลับ
    </Button>
    <Button
      style={{ flexGrow: 1, flexBasis: 0, textAlign: 'center' }}
      onClick={() => setCurrentStep(
        Math.min(currentStep + 1, stepCount),
      )}
      disabled={currentStep === stepCount}
    >
      ต่อไป
    </Button>
  </div>
);

export default PageNavigator;
