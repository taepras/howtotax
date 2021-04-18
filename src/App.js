import { useEffect, useMemo, useState } from "react";
import { D3Component } from "./components/D3Component";
import styled, { css } from "styled-components";
import "./App.css";
import { numberWithCommas } from "./utils/display";
import { useNetIncome, useTaxCalculation } from "./utils/TaxCalculation";
import StoryIndicator from "./components/StoryIndicator";
import ScrollBox from "./components/ScrollBox";

import { taxBrackets } from "./data/TaxBrackets";
import { theme } from "./theme";

const ChartContainer = styled.div`
  /* padding: 30px; */
  width: 100%;
  margin-top: 10px;
  /* height: 50vh; */
  flex: 1;
  position: relative;
  transition: all 0.2s;
`;

const SideContainer = styled.div`
  height: 220px;
  /* overflow-y: auto; */
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @media (min-width: 480px) {
    height: auto;
    margin-left: 80px;
    width: 40%;
    min-width: 300px;
    max-width: 400px;
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

const StepOnly = styled.div`
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

  @media (min-width: 480px) {
    min-height: 240px;
    flex-grow: 0;
  }
`;

const PageContainer = styled.div`
  padding: 30px;
  /* padding-top: 15px; */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow: hidden;

  @media (min-width: 480px) {
    flex-direction: row;
    padding: 50px;
  }
`;

const ControlsContainer = styled.div`
  /* margin-top: 30px; */
  display: flex;
  /* grid-template-columns: auto auto 80px; */
  /* column-gap: 10px; */
  /* row-gap: 15px; */
  gap: 0.5rem;
  flex-direction: column;
  /* margin-bottom: 30px; */
  align-content: center;

  label {
    white-space: nowrap;
  }
`;

const ControlsGrid = styled.div`
  /* margin-top: 30px; */
  display: grid;
  grid-template-columns: auto auto 80px;
  column-gap: 10px;
  row-gap: 5px;
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
  font-family: "Bai Jamjuree", sans-serif;

  ${(props) =>
    props.secondary
      ? css`
          border: 1px white solid;
          background-color: transparent;
          color: white;
        `
      : css`
          background-color: white;
        `}

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.4;
    `}
`;

function NetIncomeEquation({ income, expense, allowance, highlight = {} }) {
  const netIncome = useNetIncome(income, expense, allowance);
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
      <div style={{ flexGrow: 1, textAlign: "center" }}>
        <small style={{ color: highlight.income ? theme.colors.incomeText : theme.colors.textMuted }}>
          รายได้
        </small>
        <br />
        <small
          style={{
            fontWeight: highlight.income ? "bold" : "normal",
            color: highlight.income ? theme.colors.text : theme.colors.textMuted,
          }}
        >
          {Math.round(income).toLocaleString()}
        </small>
      </div>
      <div style={{ color: theme.colors.textMuted }}>−</div>
      <div style={{ flexGrow: 1, textAlign: "center" }}>
        <small style={{ color: highlight.expense ? theme.colors.expenseText : theme.colors.textMuted }}>
          ค่าใช้จ่าย
        </small>
        <br />
        <small
          style={{
            fontWeight: highlight.expense ? "bold" : "normal",
            color: highlight.expense ? theme.colors.text : theme.colors.textMuted,
          }}
        >
          {Math.round(expense).toLocaleString()}
        </small>
      </div>
      <div style={{ color: theme.colors.textMuted }}>−</div>
      <div style={{ flexGrow: 1, textAlign: "center" }}>
        <small style={{ color: highlight.allowance ? theme.colors.allowanceText : theme.colors.textMuted }}>
          ลดหย่อน
        </small>
        <br />
        <small
          style={{
            fontWeight: highlight.allowance ? "bold" : "normal",
            color: highlight.allowance ? theme.colors.text : theme.colors.textMuted,
          }}
        >
          {Math.round(allowance).toLocaleString()}
        </small>
      </div>
      <div style={{ color: theme.colors.textMuted }}>=</div>
      <div style={{ flexGrow: 1, textAlign: "center" }}>
        <small style={{ color: highlight.netIncome ? theme.colors.incomeText : theme.colors.textMuted }}>
          เงินได้สุทธิ
        </small>
        <br />
        <small
          style={{
            fontWeight: highlight.netIncome ? "bold" : "normal",
            color: highlight.netIncome ? theme.colors.text : theme.colors.textMuted,
          }}
        >
          {Math.round(netIncome).toLocaleString()}
        </small>
      </div>
    </div>
  );
}

function App() {
  // income stated & computed numbers
  const [salary, setSalary] = useState(360_000);
  const [incomeFreelance, setIncomeFreelance] = useState(0);
  const [incomeMerchant, setIncomeMerchant] = useState(0);
  const [enableIncome, setEnableIncome] = useState(false);
  const salaryDisplay = useMemo(() => (enableIncome ? salary : 0), [
    enableIncome,
    salary,
  ]);
  const incomeFreelanceDisplay = useMemo(
    () => (enableIncome ? incomeFreelance : 0),
    [enableIncome, incomeFreelance]
  );
  const incomeMerchantDisplay = useMemo(
    () => (enableIncome ? incomeMerchant : 0),
    [enableIncome, incomeMerchant]
  );
  const income = useMemo(
    () => (+salaryDisplay + +incomeFreelanceDisplay + +incomeMerchantDisplay : 0),
    [salaryDisplay, incomeMerchantDisplay, incomeFreelanceDisplay]
  );

  // expense stated & computed numbers
  const [enableExpense, setEnableExpense] = useState(false);
  const expense40_1_2 = useMemo(
    () =>
      enableExpense ? Math.min((+salary + +incomeFreelance) * 0.5, 100_000) : 0,
    [salary, incomeFreelance, enableExpense]
  );
  const expense40_8 = useMemo(
    () => (enableExpense ? incomeMerchant * 0.6 : 0),
    [incomeMerchant, enableExpense]
  );
  const expense = useMemo(
    () => (enableExpense ? +expense40_1_2 + +expense40_8 : 0),
    [expense40_1_2, expense40_8, enableExpense]
  );

  // allowance stated & computed numbers
  const [enableAllowance, setEnableAllowance] = useState(false);
  const [allowance, setAllowance] = useState(60_000);
  const allowanceDisplay = useMemo(() => (enableAllowance ? allowance : 0), [
    allowance,
    enableAllowance,
  ]);

  const [isGroupIncome, setGroupIncome] = useState(false);

  const netIncome = useNetIncome(income, expense, allowanceDisplay);
  const taxFinal = useTaxCalculation(netIncome, taxBrackets);

  const [enableTransition, setEnableTransition] = useState(true);
  const [currentNarrativeStep, setCurrentNarrativeStep] = useState(-1);

  // display parameters
  const [isPullTax, setPullTax] = useState(false);
  const [isActivateTax, setActivateTax] = useState(false);
  const [showBrackets, setShowBrackets] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(true);

  const narrativeSteps = [
    <>
      <p style={{ textAlign: "center" }}>
        "<span style={{ color: theme.colors.taxText }}>ภาษีเงินได้บุคคลธรรมดา</span>" คิดจาก "
        <span style={{ color: theme.colors.incomeText }}>เงินได้สุทธิ</span>"
        ซึ่งคำนวณจากรายได้ของเราหลังจากหักค่าใช้จ่ายแล้ว
      </p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1, textAlign: "center" }}>
          <span style={{ color: theme.colors.incomeText }}>เงินได้สุทธิ</span>
        </div>
        <div>=</div>
        <div style={{ flexGrow: 1, textAlign: "center" }}>
          <span>รายได้</span>
        </div>
        <div>−</div>
        <div style={{ flexGrow: 1, textAlign: "center" }}>
          <span>ค่าใช้จ่าย</span>
        </div>
        <div>−</div>
        <div style={{ flexGrow: 1, textAlign: "center" }}>
          <span>ค่าลดหย่อน</span>
        </div>

        {/* <div style={{ flexGrow: 1, flexBasis: 0, textAlign: "center" }}>
          <small>ภาษี</small>
          <br />
          <b>{numberWithCommas(Math.ceil(taxFinal))} </b>
        </div> */}
      </div>
    </>,

    <>
      <ControlsContainer>
        <div style={{ display: "flex" }}>
          <label style={{ flexGrow: 1 }}>เงินเดือน (ทั้งปี รวมโบนัส)</label>
          <input
            type="number"
            step={10_000}
            min={0}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            style={{ width: "80px" }}
          />
        </div>
        <input
          type="range"
          min="0"
          max="10000000"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          onMouseDown={() => setEnableTransition(false)}
          onTouchDown={() => setEnableTransition(false)}
          onMouseUp={() => setEnableTransition(true)}
          onTouchUp={() => setEnableTransition(false)}
        />
      </ControlsContainer>
      {/* <small style={{ marginLeft: "auto", color: theme.colors.textMuted }}>
        เงินเดือน &times; 12 = {numberWithCommas(income)} บาท/ปี
      </small> */}
      <NetIncomeEquation
        income={income}
        expense={expense}
        allowance={allowanceDisplay}
        highlight={{ income: true }}
      />
    </>,

    <>
      <p style={{ textAlign: "center" }}>
        มีรายได้จากฟรีแลนซ์/ขายของด้วยหรือเปล่า?
      </p>
      <ControlsGrid>
        <label style={{ flexGrow: 1 }}>
          <small>
            ฟรีแลนซ์ <span style={{ color: theme.colors.textMuted }}>/ ปี</span>
          </small>
        </label>
        <input
          type="range"
          min="0"
          max="1000000"
          value={incomeFreelance}
          onChange={(e) => setIncomeFreelance(e.target.value)}
          onMouseDown={() => setEnableTransition(false)}
          onTouchDown={() => setEnableTransition(false)}
          onMouseUp={() => setEnableTransition(true)}
          onTouchUp={() => setEnableTransition(false)}
        />
        <div>
          <input
            type="number"
            step={10000}
            min={0}
            value={incomeFreelance}
            onChange={(e) => setIncomeFreelance(e.target.value)}
            style={{ width: "80px" }}
          />
        </div>

        <label style={{ flexGrow: 1 }}>
          <small>
            ขายของ <span style={{ color: theme.colors.textMuted }}>/ ปี</span>
          </small>
        </label>
        <input
          type="range"
          min="0"
          max="1000000"
          value={incomeMerchant}
          onChange={(e) => setIncomeMerchant(e.target.value)}
          onMouseDown={() => setEnableTransition(false)}
          onTouchDown={() => setEnableTransition(false)}
          onMouseUp={() => setEnableTransition(true)}
          onTouchUp={() => setEnableTransition(false)}
        />
        <div>
          <input
            type="number"
            step={10000}
            min={0}
            value={incomeMerchant}
            onChange={(e) => setIncomeMerchant(e.target.value)}
            style={{ width: "80px" }}
          />
        </div>
      </ControlsGrid>
      <NetIncomeEquation
        income={income}
        expense={expense}
        allowance={allowanceDisplay}
        highlight={{ income: true }}
      />
    </>,

    <>
      <p style={{ textAlign: "center" }}>
        <span style={{ color: theme.colors.expenseText }}>ค่าใช้จ่าย</span>ที่หักได้ คิดจาก
        <span style={{ color: theme.colors.incomeText }}>รายได้</span>แต่ละประเภท
      </p>
      <p
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          columnGap: "10px",
          marginBottom: 0
        }}
      >
        <span style={{ textAlign: "right" }}>เงินเดือน</span>
        <span>นับเป็น "เงินได้ประเภทที่ 1"</span>
        <span style={{ textAlign: "right" }}>เงินจากฟรีแลนซ์</span>
        <span>นับเป็น "เงินได้ประเภทที่ 2"</span>
        <span style={{ textAlign: "right" }}>เงินจากขายของ</span>
        <span>นับเป็น "เงินได้ประเภทที่ 8"</span>
      </p>
      {/* <p style={{ textAlign: "center", color: theme.colors.textMuted }}>
        *ตามประมวลรัษฎากร มาตรา 40
      </p> */}
    </>,

    <>
      <p style={{ textAlign: "center" }}>แล้วหัก<span style={{ color: theme.colors.expenseText }}>ค่าใช้จ่าย</span>ได้เท่าไหร่?</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          columnGap: "10px",
          rowGap: "10px",
        }}
      >
        <span style={{ textAlign: "right" }}>
          เงินเดือน {incomeFreelance > 0 && "+ ฟรีแลนซ์"}
        </span>
        <span>
          หักได้ 50% ของรายได้
          <br />
          (ไม่เกิน 100,000 บาท)
        </span>
        {incomeMerchant > 0 && (
          <>
            <span style={{ textAlign: "right" }}>ขายของ</span>
            <span>หักได้อย่างน้อย 60%</span>
          </>
        )}
      </div>
    </>,

    <>
      <p style={{ textAlign: "center", marginBottom: 0 }}>
        ดังนั้น คุณหัก<span style={{ color: theme.colors.expenseText }}>ค่าใช้จ่าย</span>ได้รวม
        <br />
        <b style={{ color: theme.colors.expenseText }}>{Math.round(expense).toLocaleString()}</b> บาท
      </p>
      <NetIncomeEquation
        income={income}
        expense={expense}
        allowance={allowanceDisplay}
        highlight={{ expense: true }}
      />
    </>,

    <>
      <p style={{ textAlign: "center" }}>
        นอกจาก<span style={{ color: theme.colors.expenseText }}>ค่าใช้จ่าย</span>แล้ว ก็หัก
        <span style={{ color: theme.colors.allowanceText }}>ค่าลดหย่อน</span>ได้อีก
      </p>
      <p style={{ textAlign: "center", marginBottom: 0 }}>
        ซึ่งค่าลดหย่อนมาจากสิ่งต่างๆ ที่เราทำ เช่น
        <br /> ค่าเบี้ยประกันต่างๆ เงินบริจาค ฯลฯ
      </p>
    </>,

    <>
      {/* <p>ลดหย่อนส่วนตัวได้ 60,000 บาท</p> */}
      <ControlsContainer>
        <div style={{ display: "flex" }}>
          <label style={{ flexGrow: 1 }}>ค่าลดหย่อน</label>
          <input
            type="number"
            step={10000}
            min={0}
            value={allowance}
            onChange={(e) => setAllowance(e.target.value)}
            style={{ width: "80px" }}
          />
        </div>
        <input
          type="range"
          min="0"
          max="1000000"
          value={allowance}
          onChange={(e) => setAllowance(e.target.value)}
          onMouseDown={() => setEnableTransition(false)}
          onTouchDown={() => setEnableTransition(false)}
          onMouseUp={() => setEnableTransition(true)}
          onTouchUp={() => setEnableTransition(false)}
        />
      </ControlsContainer>
      <small style={{ marginLeft: "auto", color: theme.colors.textMuted }}>
        ลดหย่อนส่วนตัวได้ 60,000 บาท
      </small>
      <NetIncomeEquation
        income={income}
        expense={expense}
        allowance={allowanceDisplay}
        highlight={{ allowance: true }}
      />
    </>,

    <>
      <p style={{ textAlign: "center", marginBottom: 0 }}>
        ดังนั้น "<span style={{ color: theme.colors.text }}>เงินได้สุทธิ</span>" ของคุณคือ
        <br />
        <b style={{ color: theme.colors.incomeText }}>{Math.round(netIncome).toLocaleString()}</b> บาท
      </p>
      <NetIncomeEquation
        income={income}
        expense={expense}
        allowance={allowanceDisplay}
        highlight={{ netIncome: true }}
      />
    </>,

    <>
      <p style={{ textAlign: "center", marginBottom: 0 }}>
        เมื่อได้ "<span style={{ color: theme.colors.incomeText }}>เงินได้สุทธิ</span>" แล้ว
        <br />
        จะต้องนำตัวเลขที่ได้ไปเข้า "
        <span style={{ color: theme.colors.taxText }}>ขั้นบันไดภาษี</span>"
        <br />
        เพื่อคำนวณภาษีที่จะต้องจ่าย
      </p>
    </>,

    <>
      <p style={{ textAlign: "center" }}>
        ดังนั้น <span style={{ color: theme.colors.text }}>ภาษีเงินได้บุคคลธรรมดา</span>
        <br />
        ที่คุณจะต้องเสียคือ{" "}
        <b style={{ color: theme.colors.taxText }}>
          {Math.ceil(taxFinal).toLocaleString()}
        </b>{" "}
        บาท
      </p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexGrow: 1, flexBasis: 0, textAlign: "center" }}>
          <small style={{ color: theme.colors.textMuted }}>รายได้</small>
          <br />
          <span style={{ color: theme.colors.textMuted }}>{income.toLocaleString()}</span>
        </div>
        <div style={{ color: theme.colors.textMuted }}>→</div>
        <div style={{ flexGrow: 1, flexBasis: 0, textAlign: "center" }}>
          <small style={{ color: theme.colors.textMuted }}>เงินได้สุทธิ</small>
          <br />
          <span style={{ color: theme.colors.textMuted }}>{netIncome.toLocaleString()}</span>
        </div>
        <div style={{ color: theme.colors.textMuted }}>→</div>
        <div style={{ flexGrow: 1, flexBasis: 0, textAlign: "center" }}>
          <small style={{ color: theme.colors.taxText }}>ภาษี</small>
          <br />
          <b>{Math.ceil(taxFinal).toLocaleString()} </b>
        </div>
      </div>
    </>,

    // <div
    //   style={{
    //     flexGrow: 1,
    //     display: "flex",
    //     flexDirection: "column",
    //     // position: "absolute",
    //     // top: 0,
    //     // left: 0,
    //     // right: 0,
    //     // bottom: 0,
    //     overflowY: 'auto',
    //     overflowX: 'hidden',
    //   }}
    // >
    <ScrollBox style={{height: '500px'}}>
      <p style={{ marginBottom: "0.5rem" }}>
        <b>ลองปรับตัวเลขดู</b>
      </p>
      <div style={{ margin: "1rem  0 0.5rem", fontWeight: "bold", color: theme.colors.incomeText, display: 'flex' }}>
        <div style={{flexGrow: 1}}>รายได้</div>
        <div>{income.toLocaleString()} บาท</div>
      </div>
      <ControlsGrid>
        <label style={{ flexGrow: 1 }}>
          <small>เงินเดือน</small>
        </label>
        <input
          type="range"
          min="0"
          max="1000000"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          onMouseDown={() => setEnableTransition(false)}
          onTouchDown={() => setEnableTransition(false)}
          onMouseUp={() => setEnableTransition(true)}
          onTouchUp={() => setEnableTransition(false)}
        />
        <div>
          <input
            type="number"
            step={10000}
            min={0}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            style={{ width: "80px" }}
          />
        </div>

        <label style={{ flexGrow: 1 }}>
          <small>ฟรีแลนซ์</small>
        </label>
        <input
          type="range"
          min="0"
          max="1000000"
          value={incomeFreelance}
          onChange={(e) => setIncomeFreelance(e.target.value)}
          onMouseDown={() => setEnableTransition(false)}
          onTouchDown={() => setEnableTransition(false)}
          onMouseUp={() => setEnableTransition(true)}
          onTouchUp={() => setEnableTransition(false)}
        />
        <div>
          <input
            type="number"
            step={10000}
            min={0}
            value={incomeFreelance}
            onChange={(e) => setIncomeFreelance(e.target.value)}
            style={{ width: "80px" }}
          />
        </div>

        <label style={{ flexGrow: 1 }}>
          <small>ขายของ</small>
        </label>
        <input
          type="range"
          min="0"
          max="1000000"
          value={incomeMerchant}
          onChange={(e) => setIncomeMerchant(e.target.value)}
          onMouseDown={() => setEnableTransition(false)}
          onTouchDown={() => setEnableTransition(false)}
          onMouseUp={() => setEnableTransition(true)}
          onTouchUp={() => setEnableTransition(false)}
        />
        <div>
          <input
            type="number"
            step={10000}
            min={0}
            value={incomeMerchant}
            onChange={(e) => setIncomeMerchant(e.target.value)}
            style={{ width: "80px" }}
          />
        </div>
        {/* <small
          style={{
            display: "block",
            gridColumn: "1 / -1",
            textAlign: "right",
            marginLeft: "auto",
            color: theme.colors.textMuted,
            marginTop: "-10px",
          }}
        >
          เงินเดือน &times; 12 = รายได้ <b>{numberWithCommas(income)}</b> บาท/ปี
        </small> */}
      </ControlsGrid>

      <div style={{ margin: "1rem 0 0.5rem", fontWeight: "bold", color: theme.colors.expenseText, display: 'flex' }}>
        <div style={{flexGrow: 1}}>ค่าใช้จ่าย</div>
        <div>{expense.toLocaleString()} บาท</div>
      </div>
      <ControlsGrid>
        <label style={{ flexGrow: 1 }}>
          <small>คิดจากเงินเดือน + ฟรีแลนซ์</small>
        </label>
        <div style={{ gridColumn: "2 / -1" }}>
          <small>
            หักได้ {Math.round(expense40_1_2).toLocaleString()} บาท
          </small>
        </div>

        <label style={{ flexGrow: 1 }}>
          <small>คิดจากขายของ</small>
        </label>
        <div style={{ gridColumn: "2 / -1" }}>
          <small>หักได้ {Math.round(expense40_8).toLocaleString()} บาท</small>
        </div>
      </ControlsGrid>
      <div style={{ margin: "1rem  0 0.5rem", fontWeight: "bold", color: theme.colors.allowanceText, display: 'flex' }}>
        <div style={{flexGrow: 1}}>ค่าลดหย่อน</div>
        <div>{allowance.toLocaleString()} บาท</div>
      </div>
      <p style={{ margin: "1rem 0 0.5rem", fontWeight: "bold", color: theme.colors.allowanceText }}>
        ค่าลดหย่อน
      </p>
      <ControlsGrid>
        <label style={{ flexGrow: 1 }}>
          <small>ค่าลดหย่อน</small>
        </label>
        <input
          type="range"
          min="60000"
          max="1000000"
          value={allowance}
          onChange={(e) => setAllowance(e.target.value)}
          onMouseDown={() => setEnableTransition(false)}
          onTouchDown={() => setEnableTransition(false)}
          onMouseUp={() => setEnableTransition(true)}
          onTouchUp={() => setEnableTransition(false)}
        />
        <input
          type="number"
          step={10000}
          min={0}
          value={allowance}
          onChange={(e) => setAllowance(e.target.value)}
          style={{ width: "80px" }}
        />
      </ControlsGrid>
      <hr style={{ margin: "1rem 0", opacity: 0.2 }} />
      <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <div style={{ flexGrow: 1, flexBasis: 0, textAlign: "center" }}>
          <small style={{ color: theme.colors.incomeText }}>รายได้</small>
          <br />
          <span style={{ color: theme.colors.text }}>{income.toLocaleString()}</span>
        </div>
        <div>→</div>
        <div style={{ flexGrow: 1, flexBasis: 0, textAlign: "center" }}>
          <small style={{ color: theme.colors.incomeText }}>เงินได้สุทธิ</small>
          <br />
          <span style={{ color: theme.colors.text }}>
            {Math.round(netIncome).toLocaleString()}
          </span>
        </div>
        <div>→</div>
        <div style={{ flexGrow: 1, flexBasis: 0, textAlign: "center" }}>
          <small style={{ color: theme.colors.taxText }}>ภาษี</small>
          <br />
          <b>{Math.ceil(taxFinal).toLocaleString()} </b>
        </div>
      </div>
    </ScrollBox>,
    // </div>,
  ];

  useEffect(() => {
    setEnableIncome(currentNarrativeStep >= 1);
    setEnableExpense(currentNarrativeStep >= 4);
    setGroupIncome(currentNarrativeStep >= 5);
    setShowBreakdown(!(currentNarrativeStep >= 6));
    setEnableAllowance(currentNarrativeStep >= 7);
    setShowBrackets(currentNarrativeStep >= 9);
    setActivateTax(currentNarrativeStep >= 10);
  }, [currentNarrativeStep, enableAllowance, income, expense]);

  return (
    <>
      <StoryIndicator
        currentStep={currentNarrativeStep}
        totalSteps={narrativeSteps.length + 1}
        style={{ marginBottom: "20px" }}
      />
      <PageContainer>
        <Step
          status={Math.sign(-1 - currentNarrativeStep)}
          style={{
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.bg,
            zIndex: 100,
            top: 30,
            padding: 50,
            paddingTop: 30,
            textAlign: "center",
          }}
        >
          <h1>Tax, visualized.</h1>
          <p>
            คำนวณภาษียากจัง!?
            <br />
            มาลองคำนวณภาษีมนุษย์เงินเดือน
            <br />
            แบบเห็นภาพกัน
          </p>
          <Button
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              backgroundColor: theme.colors.tax,
              fontWeight: "bold",
              fontSize: "1rem",
            }}
            onClick={() => setCurrentNarrativeStep(0)}
          >
            เริ่มเลย
          </Button>
        </Step>

        <Step
          status={Math.sign(narrativeSteps.length - currentNarrativeStep)}
          style={{
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.bg,
            zIndex: 100,
            top: 30,
            padding: 50,
            paddingTop: 30,
            textAlign: "center",
          }}
        >
          <p>
            เรื่องราวเกี่ยวกับภาษียังมีรายละเอียดมากกว่านี้อีก
            สามารถอ่านเพิ่มเติมได้ที่เว็บไซต์
            <a href="https://www.rd.go.th/548.html">กรมสรรพากร</a>
          </p>
          <p>
            แต่ถ้าชอบ visualization นี้
            <br />
            แชร์ให้เพื่อนดูต่อได้เลย
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <div
              class="fb-share-button"
              data-href="https://taepras.github.io/taxvisualizer/"
              data-layout="button"
              data-size="large"
            >
              <a
                target="_blank"
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftaepras.github.io%2Ftaxvisualizer%2F&amp;src=sdkpreparse"
                class="fb-xfbml-parse-ignore"
              >
                Share
              </a>
            </div>
            <a
              href="https://twitter.com/share?ref_src=twsrc%5Etfw"
              class="twitter-share-button"
              data-size="large"
              data-url="https://taepras.github.io/taxvisualizer/"
              data-via="taepras"
              data-dnt="true"
              data-show-count="false"
            >
              Tweet
            </a>
            <div
              class="line-it-button"
              data-lang="en"
              data-type="share-a"
              data-ver="3"
              data-url="https://taepras.github.io/taxvisualizer/"
              data-color="default"
              data-size="large"
              data-count="false"
              // style={{display: 'none'}}
            ></div>
          </div>

          <div style={{ display: "flex", marginTop: "1rem", gap: "10px" }}>
            <Button
              style={{
                border: "none",
                fontSize: "1rem",
                textDecoration: "underline",
              }}
              secondary
              onClick={() => setCurrentNarrativeStep(narrativeSteps.length - 1)}
            >
              &laquo; ย้อนกลับ
            </Button>
            <Button
              style={{
                border: "none",
                fontSize: "1rem",
                textDecoration: "underline",
              }}
              secondary
              onClick={() => {
                window.location.href = "";
              }}
            >
              &laquo; เริ่มใหม่
            </Button>
          </div>

          <p style={{ marginTop: "30px", color: theme.colors.textMuted }}>
            Tax, visualized. was created by
            <br />
            <a href="https://taepras.com" style={{ color: theme.colors.textMuted }}>
              Tae Prasongpongchai
            </a>
          </p>
        </Step>

        <>
          <ChartContainer>
            <D3Component
              incomeGroups={[
                {
                  label: `เงินเดือน${incomeFreelanceDisplay > 0 ? " + ฟรีแลนซ์" : ""}`,
                  income: +salaryDisplay + +incomeFreelanceDisplay,
                  expense: expense40_1_2,
                },
                {
                  label: "ขายของ",
                  income: incomeMerchantDisplay,
                  expense: expense40_8,
                },
              ]}
              isGroupIncome={isGroupIncome}
              showBreakdown={showBreakdown}
              income={income}
              expense={expense}
              allowance={allowanceDisplay}
              isPullTax={isPullTax}
              setPullTax={setPullTax}
              enableTransition={enableTransition}
              isActivateTax={isActivateTax}
              showBrackets={showBrackets}
              isBlink={{
                tax: currentNarrativeStep == 10,
                income: currentNarrativeStep == 8,
                // expense: currentNarrativeStep == 2,
                // allowance: currentNarrativeStep == 3,
              }}
            />
          </ChartContainer>
          <SideContainer>
            <ContentContainer>
              {narrativeSteps.map((step, i) => (
                <>
                  <Step status={Math.sign(i - currentNarrativeStep)}>
                    {step}
                  </Step>
                </>
              ))}
            </ContentContainer>
            <div style={{ display: "flex", marginTop: "20px", gap: "20px" }}>
              <Button
                style={{ flexGrow: 1, flexBasis: 0, textAlign: "center" }}
                onClick={() =>
                  setCurrentNarrativeStep(
                    Math.max(currentNarrativeStep - 1, -1)
                  )
                }
                // disabled={currentNarrativeStep === 0}
                secondary
              >
                ย้อนกลับ
              </Button>
              <Button
                style={{ flexGrow: 1, flexBasis: 0, textAlign: "center" }}
                onClick={() =>
                  setCurrentNarrativeStep(
                    Math.min(currentNarrativeStep + 1, narrativeSteps.length)
                  )
                }
                disabled={currentNarrativeStep === narrativeSteps.length}
              >
                ต่อไป
              </Button>
            </div>
          </SideContainer>
        </>
      </PageContainer>
    </>
  );
}

export default App;
