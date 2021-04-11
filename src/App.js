import { useMemo, useState } from "react";
import { D3Component } from "./components/D3Component";
import styled from "styled-components";
import "./App.css";

const ChartContainer = styled.div`
  /* padding: 30px; */
  width: 100%;
  /* height: 50vh; */
  flex: 1;
  position: relative;
`;

const PageContainer = styled.div`
  padding: 30px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
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
  margin-bottom: 30px;
  align-content: center;

  @media (min-width: 768px) {
    margin-left: 80px;
    width: 400px;
    max-width: 40%;
  }

  label {
    white-space: nowrap;
  }
`;

const InputGroup = styled.div`
  /* margin-bottom: 10px; */
  display: flex;
  flex-direction: column;
`;

function App() {
  const [income, setIncome] = useState(480000);
  const [expense, setExpense] = useState(100000);
  const [allowance, setAllowance] = useState(60000);

  const netIncome = useMemo(() => {
    return income - expense - allowance;
  }, [income, expense, allowance]);

  const [isPullTax, setPullTax] = useState(false);

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

  const taxFinal = useMemo(() => {
    let sumTax = 0;
    let remainingNetIncome = netIncome;
    for (let i in taxBrackets) {
      let bracketRange =
        taxBrackets[i].maxNetIncome - taxBrackets[i].minNetIncome;
      let incomeInBracket = Math.min(remainingNetIncome, bracketRange);
      let taxInBracket = incomeInBracket * taxBrackets[i].taxRate;
      sumTax += taxInBracket;
      remainingNetIncome -= bracketRange;
      if (remainingNetIncome <= 0) break;
    }
    return sumTax;
  }, [netIncome]);

  return (
    <PageContainer>
      <ChartContainer>
        <D3Component
          income={income}
          expense={expense}
          allowance={allowance}
          taxBrackets={taxBrackets}
          isPullTax={isPullTax}
        />
      </ChartContainer>
      <ControlsContainer>
        <label>รายได้</label>
        <input
          type="range"
          min="0"
          max="10000000"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
        <input
          type="number"
          step={10000}
          min={0}
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />

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

        {/* <div>เงินได้สุทธิ</div>
        <div>{netIncome}</div>
        <div>ภาษีที่ต้องเสีย</div>
        <div>
          {taxFinal}
          <br />
          <small>
            คิดเป็น <b>{((taxFinal / income) * 100).toFixed(1)}%</b>{" "}
            ของรายได้ทั้งหมด
          </small>
        </div> */}
        <div style={{ gridColumn: "1 / 3" }}>
          <button
            onClick={() => setPullTax(!isPullTax)}
            style={{ display: "block", width: "100%", gridColumn: "1 / 3" }}
          >
            Tax
          </button>
        </div>
      </ControlsContainer>
    </PageContainer>
  );
}

export default App;
