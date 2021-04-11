import { useEffect, useMemo, useState } from "react";
import { D3Component } from "./components/D3Component";
import styled, { css } from "styled-components";
import "./App.css";
import { numberWithCommas } from "./utils/display";
import { useNetIncome, useTaxCalculation } from "./utils/TaxCalculation";
import StoryIndicator from "./components/StoryIndicator";

const ChartContainer = styled.div`
  /* padding: 30px; */
  width: 100%;
  /* height: 50vh; */
  flex: 1;
  position: relative;
  transition: all 0.2s;
`;

const SideContainer = styled.div`
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @media (min-width: 768px) {
    height: auto;
    margin-left: 80px;
    width: 400px;
    max-width: 40%;
    justify-content: center;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  transition: all 0.5s;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  ${(props) => {
    switch (props.status) {
      case -1:
        return css`
          transform: translateX(-100px);
          opacity: 0;
          pointer-events: none;
        `;
        break;
      case 1:
        return css`
          transform: translateX(100px);
          opacity: 0;
          pointer-events: none;
        `;
        break;
      default:
        return css`
          /* transform: translateX(-100px):  */
          /* opacity: 0; */
          /* pointer-events: none; */
        `;
        break;
    }
  }}
`;

const ContentContainer = styled.div`
  /* height: 200px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  position: relative;

  @media (min-width: 768px) {
    height: 240px;
    flex-grow: 0;
  }
`;

const PageContainer = styled.div`
  padding: 30px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  gap: 10px;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 50px;
  }
`;

const ControlsContainer = styled.div`
  /* margin-top: 30px; */
  display: grid;
  grid-template-columns: auto auto 80px;
  column-gap: 10px;
  row-gap: 15px;
  flex-direction: column;
  /* margin-bottom: 30px; */
  align-content: center;

  label {
    white-space: nowrap;
  }
`;

const InputGroup = styled.div`
  /* margin-bottom: 10px; */
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  border: none;
  border-radius: 4px;
  padding: 4px 8px;

  ${props => props.secondary ? css`
    border: 1px white solid;
    background-color: transparent;
    color: white;
  ` : css`
    background-color: white;
  `}

  ${props => props.disabled && css`
    opacity: 0.4;
  `}
`

function App() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [enableTransition, setEnableTransition] = useState(true);
  const [currentNarrativeStep, setCurrentNarrativeStep] = useState(0);

  const [isPullTax, setPullTax] = useState(false);
  const [isActivateTax, setActivateTax] = useState(false);

  const taxBrackets = [
    {
      minNetIncome: 0,
      maxNetIncome: 150000,
      taxRate: 0,
    },
    {
      minNetIncome: 150000,
      maxNetIncome: 300000,
      taxRate: 0.05,
    },
    {
      minNetIncome: 300000,
      maxNetIncome: 500000,
      taxRate: 0.1,
    },
    {
      minNetIncome: 500000,
      maxNetIncome: 750000,
      taxRate: 0.15,
    },
    {
      minNetIncome: 750000,
      maxNetIncome: 1000000,
      taxRate: 0.2,
    },
    {
      minNetIncome: 1000000,
      maxNetIncome: 2000000,
      taxRate: 0.25,
    },
    {
      minNetIncome: 2000000,
      maxNetIncome: 5000000,
      taxRate: 0.3,
    },
    {
      minNetIncome: 5000000,
      maxNetIncome: 999999999999,
      taxRate: 0.35,
    },
  ];

  const netIncome = useNetIncome(income, expense, allowance);
  const taxFinal = useTaxCalculation(netIncome, taxBrackets);

  const [narrativeSteps, _] = useState([
    <>
      <p>คำนวณภาษีเงินได้บุคคลธรรมดา</p>
      <ControlsContainer>
        <label>รายได้ต่อปี</label>
        <input
          type="range"
          min="0"
          max="10000000"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          onMouseDown={() => setEnableTransition(false)}
          onMouseUp={() => setEnableTransition(true)}
        />
        <input
          type="number"
          step={10000}
          min={0}
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
      </ControlsContainer>
    </>,

    <>
      <p>ค่าลดหย่อน default 100,000 บาท</p>
      <ControlsContainer>
        <label>ค่าใช้จ่าย</label>
        <input
          type="range"
          min="0"
          max="1000000"
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        />
        <input
          type="number"
          step={10000}
          min={0}
          value={expense}
          onChange={(e) => setExpense(e.target.value)}
        />
      </ControlsContainer>
    </>,

    <>
      <p>ค่าลดหย่อน default 60,000 บาท</p>
      <ControlsContainer>
        <label>ค่าลดหย่อน</label>
        <input
          type="range"
          min="0"
          max="1000000"
          value={allowance}
          onChange={(e) => setAllowance(e.target.value)}
        />
        <input
          type="number"
          step={10000}
          min={0}
          value={allowance}
          onChange={(e) => setAllowance(e.target.value)}
        />
      </ControlsContainer>
    </>,

    <>
      <p>
        "ภาษีเงินได้บุคคลธรรมดา" คิดจาก "
        <span style={{ color: "#0af" }}>เงินได้สุทธิ</span>"
      </p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1, textAlign: "center" }}>
          <small>รายได้</small>
          <br />
          <small>{numberWithCommas(income)}</small>
        </div>
        <div>-</div>
        <div style={{ flexGrow: 1, textAlign: "center" }}>
          <small>ค่าใช้จ่าย</small>
          <br />
          <small>{numberWithCommas(expense)}</small>
        </div>
        <div>-</div>
        <div style={{ flexGrow: 1, textAlign: "center" }}>
          <small>ลดหย่อน</small>
          <br />
          <small>{numberWithCommas(allowance)}</small>
        </div>
        <div>=</div>
        <div style={{ flexGrow: 1, textAlign: "center" }}>
          <small style={{ color: "#0af" }}>เงินได้สุทธิ</small>
          <br />
          <b>{numberWithCommas(netIncome)} ฿</b>
        </div>
        {/* <div style={{ flexGrow: 1, flexBasis: 0, textAlign: "center" }}>
          <small>ภาษี</small>
          <br />
          <b>{numberWithCommas(Math.ceil(taxFinal))} ฿</b>
        </div> */}
      </div>
    </>,

    <>
      <p>
        เมื่อคำนวณ "เงินได้สุทธิ" แล้ว จะต้องนำไปเข้า "
        <span style={{ color: "#f90" }}>ขั้นบันไดภาษี</span>"
        เพื่อคำนวณภาษีออกมา
      </p>

      <p>สีส้มคือสัดส่วนภาษีที่คุณต้องเสีย</p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1, flexBasis: 0, textAlign: "center" }}>
          <small style={{ color: "#0af" }}>เงินได้สุทธิ</small>
          <br />
          {numberWithCommas(netIncome)} ฿
        </div>
        <div>🠖</div>
        <div style={{ flexGrow: 1, flexBasis: 0, textAlign: "center" }}>
          <small style={{ color: "#f90" }}>ภาษี</small>
          <br />
          <b>{numberWithCommas(Math.ceil(taxFinal))} ฿</b>
        </div>
      </div>
    </>,
  ]);

  useEffect(() => {
    if (currentNarrativeStep == 1) {
      if (expense == 0) setExpense(100_000);
    }

    if (currentNarrativeStep == 1) {
      if (allowance == 0) setAllowance(60_000);
    }

    if (currentNarrativeStep == 4) {
      setActivateTax(true);
    } else {
      setActivateTax(false);
    }
  }, [currentNarrativeStep, allowance, expense]);

  return (
    <PageContainer>
      <StoryIndicator
        currentStep={currentNarrativeStep}
        totalSteps={narrativeSteps.length}
        style={{marginBottom: '20px'}}
      />
      <ChartContainer>
        <D3Component
          income={income}
          expense={expense}
          allowance={allowance}
          taxBrackets={taxBrackets}
          isPullTax={isPullTax}
          setPullTax={setPullTax}
          enableTransition={enableTransition}
          isActivateTax={isActivateTax}
        />
      </ChartContainer>
      <SideContainer>
        <ContentContainer>
          {narrativeSteps.map((step, i) => (
            <>
              <Step status={Math.sign(i - currentNarrativeStep)}>{step}</Step>
            </>
          ))}
        </ContentContainer>
        <div style={{ display: "flex", marginTop: "20px", gap: "20px" }}>
          <Button
            style={{ flexGrow: 1, flexBasis: 0, textAlign: "center" }}
            onClick={() =>
              setCurrentNarrativeStep(Math.max(currentNarrativeStep - 1, 0))
            }
            disabled={currentNarrativeStep === 0}
            secondary
          >
            ย้อนกลับ
          </Button>
          <Button
            style={{ flexGrow: 1, flexBasis: 0, textAlign: "center" }}
            onClick={() =>
              setCurrentNarrativeStep(
                Math.min(currentNarrativeStep + 1, narrativeSteps.length - 1)
              )
            }
            disabled={currentNarrativeStep === narrativeSteps.length - 1}
          >
            ต่อไป
          </Button>
        </div>
      </SideContainer>
    </PageContainer>
  );
}

export default App;
