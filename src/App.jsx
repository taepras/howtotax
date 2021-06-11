/* eslint-disable max-len */

import React, { useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { D3Component } from './components/D3Component';
import { useNetIncome, useTaxCalculation } from './utils/TaxCalculation';
import StoryIndicator from './components/StoryIndicator';
import ScrollBox from './components/ScrollBox';
import Slider from './components/Slider';
import ScrollInstruction from './components/ScrollInstruction';

import { taxBrackets } from './data/TaxBrackets';
import { theme } from './theme';

import Button from './components/Button';
import Step from './components/Step';
import CoverPage from './pages/CoverPage';
import EndingPage from './pages/EndingPage';
import PageNavigator from './components/PageNavigator';
import Pill from './components/Pill';
import GlobalStyle from './styles/globalStyles';

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

const ContentContainer = styled.div`
  /* height: 200px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  position: relative;

  transition: min-height 0.3s;

  @media (min-width: 480px) {
    min-height: ${(props) => (props.taller ? '440px' : '240px')};
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

const TaxTableDisplay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.bg};
  transition: opacity 0.3s;
  opacity: ${(props) => (props.show ? 1 : 0)};
`;

function NetIncomeEquation({
  income, expense, allowance, highlight = {},
}) {
  const netIncome = useNetIncome(income, expense, allowance);
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
      <div style={{ flexGrow: 1, textAlign: 'center' }}>
        <small
          style={{
            color: highlight.income
              ? theme.colors.incomeText
              : theme.colors.textMuted,
          }}
        >
          รายได้
        </small>
        <br />
        <small
          style={{
            fontWeight: highlight.income ? 'bold' : 'normal',
            color: highlight.income
              ? theme.colors.text
              : theme.colors.textMuted,
          }}
        >
          {Math.round(income).toLocaleString()}
        </small>
      </div>
      <div style={{ color: theme.colors.textMuted }}>−</div>
      <div style={{ flexGrow: 1, textAlign: 'center' }}>
        <small
          style={{
            color: highlight.expense
              ? theme.colors.expenseText
              : theme.colors.textMuted,
          }}
        >
          ค่าใช้จ่าย
        </small>
        <br />
        <small
          style={{
            fontWeight: highlight.expense ? 'bold' : 'normal',
            color: highlight.expense
              ? theme.colors.text
              : theme.colors.textMuted,
          }}
        >
          {Math.round(expense).toLocaleString()}
        </small>
      </div>
      <div style={{ color: theme.colors.textMuted }}>−</div>
      <div style={{ flexGrow: 1, textAlign: 'center' }}>
        <small
          style={{
            color: highlight.allowance
              ? theme.colors.allowanceText
              : theme.colors.textMuted,
          }}
        >
          ลดหย่อน
        </small>
        <br />
        <small
          style={{
            fontWeight: highlight.allowance ? 'bold' : 'normal',
            color: highlight.allowance
              ? theme.colors.text
              : theme.colors.textMuted,
          }}
        >
          {Math.round(allowance).toLocaleString()}
        </small>
      </div>
      <div style={{ color: theme.colors.textMuted }}>=</div>
      <div style={{ flexGrow: 1, textAlign: 'center' }}>
        <small
          style={{
            color: highlight.netIncome
              ? theme.colors.incomeText
              : theme.colors.textMuted,
          }}
        >
          เงินได้สุทธิ
        </small>
        <br />
        <small
          style={{
            fontWeight: highlight.netIncome ? 'bold' : 'normal',
            color: highlight.netIncome
              ? theme.colors.text
              : theme.colors.textMuted,
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
  const [salary, setSalary] = useState(300_000);
  const [incomeFreelance, setIncomeFreelance] = useState(50_000);
  const [incomeMerchant, setIncomeMerchant] = useState(50_000);
  const [enableIncome, setEnableIncome] = useState(false);
  const [enableIncomeExtra, setEnableIncomeExtra] = useState(false);
  const salaryDisplay = useMemo(
    () => (enableIncome ? salary : 0),
    [enableIncome, salary],
  );
  const incomeFreelanceDisplay = useMemo(
    () => (enableIncomeExtra ? incomeFreelance : 0),
    [enableIncomeExtra, incomeFreelance],
  );
  const incomeMerchantDisplay = useMemo(
    () => (enableIncomeExtra ? incomeMerchant : 0),
    [enableIncomeExtra, incomeMerchant],
  );
  const income = useMemo(
    () => (+salaryDisplay + +incomeFreelanceDisplay + +incomeMerchantDisplay),
    [salaryDisplay, incomeMerchantDisplay, incomeFreelanceDisplay],
  );

  // expense stated & computed numbers
  const [enableExpense, setEnableExpense] = useState(false);
  /* eslint-disable-next-line camelcase */
  const expense40_1_2 = useMemo(
    () => (enableExpense ? Math.min((+salary + +incomeFreelance) * 0.5, 100_000) : 0),
    [salary, incomeFreelance, enableExpense],
  );
  /* eslint-disable-next-line camelcase */
  const expense40_8 = useMemo(
    () => (enableExpense ? incomeMerchant * 0.6 : 0),
    [incomeMerchant, enableExpense],
  );
  const expense = useMemo(
    /* eslint-disable-next-line camelcase */
    () => (enableExpense ? +expense40_1_2 + +expense40_8 : 0),
    /* eslint-disable-next-line camelcase */
    [expense40_1_2, expense40_8, enableExpense],
  );

  // allowance stated & computed numbers
  const [enableAllowance, setEnableAllowance] = useState(false);
  const [allowance, setAllowance] = useState(60_000);
  const allowanceDisplay = useMemo(
    () => (enableAllowance ? allowance : 0),
    [allowance, enableAllowance],
  );

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
  const [showDragInstruction, setShowDragInstruction] = useState(true);
  const [showFullScale, setShowFullScale] = useState(false);

  // หลายคนอาจจะเคยเห็นตาราง "อัตราภาษีเงินได้บุคคลธรรมดา" หน้าตาแบบนี้ แต่ยังไม่เข้าใจว่ามันคำนวณยังไงกันแน่ เราจะมาทำตารางนี้ให้เห็นภาพกัน
  // ถ้าเราเอาตารางอัตราภาษีมาพล็อตแบบนี้ ก็จะได้กราฟหน้าตาเป็น "ขั้นบันได" แบบนี้
  // กติกาของ "ภาษีเงินได้บุคคลธรรมดา" ก็คือ ถ้า "รายได้สุทธิ" ของเราเข้าไปอยู่ในกล่องขั้นบันไดภาษีสีแดง ส่วนที่อยู่ในกล่องก็คือภาษีที่เราจะต้องจ่าย
  // ซึ่ง "รายได้สุทธิ" ก็คือรายได้หลังหัก "ค่าใช้จ่าย" และ "ค่าลดหย่อน" แล้ว [สมการ]

  const narrativeSteps = [
    <>
      <p style={{ textAlign: 'center' }}>
        หลายคนอาจจะเคยเห็นตาราง
        <br />
        <Pill color="taxText">อัตราภาษีเงินได้บุคคลธรรมดา</Pill>
        {' '}
        หน้าตาแบบนี้
        <br />
        แต่ยังไม่เข้าใจว่ามันคำนวณยังไงกันแน่
        <br />
        เราจะมาทำตารางนี้ให้เห็นภาพกัน
      </p>
    </>,

    <>
      <p style={{ textAlign: 'center' }}>
        ถ้าเราเอาตารางอัตราภาษีที่ว่ามาพล็อตระหว่าง
        <br />
        <Pill color="incomeText">เงินได้สุทธิ</Pill>
        {' '}
        และ
        {' '}
        <Pill color="taxText">อัตราภาษี</Pill>
      </p>
      <p style={{ textAlign: 'center' }}>
        ก็จะได้กราฟหน้าตาเป็น &ldquo;ขั้นบันได&rdquo; แบบนี้
        <br />
        {' '}
        ไล่ไปตั้งแต่เงินได้สุทธิบาทแรก (ภาษี 0%)
        {' '}
        <br />
        ไปถึงบาทที่ 5,000,000 ขึ้นไป (ภาษี 35%)
      </p>
    </>,

    <>
      <p style={{ textAlign: 'center' }}>
        กติกาของ
        {' '}
        <Pill color="taxText">ภาษีเงินได้บุคคลธรรมดา</Pill>
        {' '}
        ก็คือ
        <br />
        ถ้า
        {' '}
        <Pill color="incomeText">เงินได้สุทธิ</Pill>
        {' '}
        ของเราเข้าไปอยู่ในกล่องขั้นบันไดภาษีสีแดงนี้
        {' '}
        ส่วนที่อยู่ในกล่อง
        <br />
        ก็คือภาษีที่เราจะต้องจ่าย
      </p>
    </>,

    <>
      <p style={{ textAlign: 'center' }}>
        ซึ่ง
        <Pill color="incomeText">เงินได้สุทธิ</Pill>
        ก็คือรายได้ของเรา
        <br />
        หลังจากหัก
        <Pill color="expenseText">ค่าใช้จ่าย</Pill>
        และ
        <Pill color="allowanceText">ค่าลดหย่อน</Pill>
        แล้วนั่นเอง
      </p>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flexGrow: 1, textAlign: 'center' }}>
          <Pill color="incomeText">เงินได้สุทธิ</Pill>
        </div>
        <div>=</div>
        <div style={{ flexGrow: 1, textAlign: 'center' }}>
          <Pill color="incomeText">รายได้</Pill>
        </div>
        <div>−</div>
        <div style={{ flexGrow: 1, textAlign: 'center' }}>
          <Pill color="expenseText">ค่าใช้จ่าย</Pill>
        </div>
        <div>−</div>
        <div style={{ flexGrow: 1, textAlign: 'center' }}>
          <Pill color="allowanceText">ค่าลดหย่อน</Pill>
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
        <p style={{ textAlign: 'center' }}>
          ทีนี้ สมมติว่าคุณทำงานได้เงินเดือนรวมทั้งปี
          {' '}
          <Pill color="incomeText" bold>{salary.toLocaleString()}</Pill>
          {' '}
          บาท
        </p>
        <div style={{ display: 'flex' }}>
          <label
            htmlFor="salaryinput"
            style={{ flexGrow: 1 }}
          >
            เงินเดือน (ทั้งปี รวมโบนัส)
          </label>
          <input
            id="salaryinput"
            type="number"
            step={10_000}
            min={0}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            style={{ width: '80px' }}
          />
        </div>

        <Slider
          min={0}
          max={1_200_000}
          step={10_000}
          value={salary}
          onAfterChange={setSalary}
          color={theme.colors.income}
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
      <p style={{ textAlign: 'center' }}>
        และสมมติว่าคุณทำฟรีแลนซ์อีก
        {' '}
        <Pill color="incomeText" bold>{incomeFreelance.toLocaleString()}</Pill>
        {' '}
        บาท กับขายของออนไลน์ได้มาอีก
        {' '}
        <Pill color="incomeText" bold>{incomeMerchant.toLocaleString()}</Pill>
        {' '}
        บาท
      </p>
      <ControlsGrid style={{ gridTemplateColumns: '80px auto 80px' }}>
        <label style={{ flexGrow: 1 }}>
          <small>
            ฟรีแลนซ์
            {' '}
            <span style={{ color: theme.colors.textMuted }}>/ ปี</span>
          </small>
        </label>
        <Slider
          min={0}
          max={1_200_000}
          step={10_000}
          value={incomeFreelance}
          onAfterChange={setIncomeFreelance}
          color={theme.colors.income}
        />
        <div>
          <input
            type="number"
            step={10000}
            min={0}
            value={incomeFreelance}
            onChange={(e) => setIncomeFreelance(e.target.value)}
            style={{ width: '80px' }}
          />
        </div>

        <label style={{ flexGrow: 1 }}>
          <small>
            ขายของ
            {' '}
            <span style={{ color: theme.colors.textMuted }}>/ ปี</span>
          </small>
        </label>
        <Slider
          min={0}
          max={1_200_000}
          step={10_000}
          value={incomeMerchant}
          onAfterChange={setIncomeMerchant}
          color={theme.colors.income}
        />
        <div>
          <input
            type="number"
            step={10000}
            min={0}
            value={incomeMerchant}
            onChange={(e) => setIncomeMerchant(e.target.value)}
            style={{ width: '80px' }}
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
      <p style={{ textAlign: 'center' }}>
        <Pill color="expenseText">ค่าใช้จ่าย</Pill>
        ที่หักได้ คิดจาก
        <Pill color="incomeText">รายได้</Pill>
        แต่ละประเภท
        <br />
        ซึ่งตามภาษาภาษีแล้ว...
      </p>
      <p
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          columnGap: '10px',
          marginBottom: 0,
        }}
      >
        <span style={{ textAlign: 'right' }}>เงินเดือน</span>
        <span>นับเป็น &ldquo;เงินได้ประเภทที่ 1&rdquo;</span>
        <span style={{ textAlign: 'right' }}>เงินจากฟรีแลนซ์</span>
        <span>นับเป็น &ldquo;เงินได้ประเภทที่ 2&rdquo;</span>
        <span style={{ textAlign: 'right' }}>เงินจากขายของ</span>
        <span>นับเป็น &ldquo;เงินได้ประเภทที่ 8&rdquo;</span>
      </p>
      {/* <p style={{ textAlign: "center", color: theme.colors.textMuted }}>
        *ตามประมวลรัษฎากร มาตรา 40
      </p> */}
    </>,

    <>
      <p style={{ textAlign: 'center' }}>
        แล้วมีรายได้เท่านี้ จะหัก
        <Pill color="expenseText">ค่าใช้จ่าย</Pill>
        ได้เท่าไหร่?
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          alignItems: 'center',
          columnGap: '10px',
          rowGap: '10px',
        }}
      >
        <span style={{ textAlign: 'right' }}>
          <b>
            เงินเดือน
            {' '}
            {incomeFreelance > 0 && '+ ฟรีแลนซ์'}
          </b>
          <br />
          <span style={{ color: theme.colors.textSecondary }}>
            หักได้ 50% ของรายได้
            <br />
            (รวมไม่เกิน 100,000 บาท)
          </span>
        </span>
        <span>
          →
          {' '}
          <Pill color="expenseText" bold>{expense40_1_2.toLocaleString()}</Pill>
          {' '}
          บาท
        </span>
        {incomeMerchant > 0 && (
          <>
            <span style={{ textAlign: 'right' }}>
              <b>ขายของ</b>
              <br />
              <span style={{ color: theme.colors.textSecondary }}>
                หักได้อย่างน้อย 60%
              </span>
            </span>
            <span>
              →
              {' '}
              <Pill color="expenseText" bold>{expense40_8.toLocaleString()}</Pill>
              {' '}
              บาท
            </span>
          </>
        )}
      </div>
    </>,

    <>
      <p style={{ textAlign: 'center', marginBottom: 0 }}>
        ดังนั้น คุณจะหักค่าใช้จ่ายได้รวม
        <br />
        <b style={{ color: theme.colors.expenseText }}>
          <Pill color="expenseText" bold>{Math.round(expense).toLocaleString()}</Pill>
        </b>
        {' '}
        บาท
      </p>
      <NetIncomeEquation
        income={income}
        expense={expense}
        allowance={allowanceDisplay}
        highlight={{ expense: true }}
      />
    </>,

    <>
      <p style={{ textAlign: 'center' }}>
        นอกจาก
        <Pill color="expenseText">ค่าใช้จ่าย</Pill>
        แล้ว ทุกคน
        <br />
        สามารถหัก &ldquo;ค่าลดหย่อนส่วนตัว&rdquo;
        <br />
        ได้ทันทีอีก
        {' '}
        <Pill color="allowanceText" bold>60,000</Pill>
        {' '}
        บาท!
      </p>
      <p style={{ textAlign: 'center', marginBottom: 0 }}>
        และ
        <Pill color="allowanceText">ค่าลดหย่อน</Pill>
        ก็มาจากสิ่งอื่นๆ ได้อีก
        <br />
        เช่น การบริจาคเงิน ค่าเบี้ยประกันต่างๆ ฯลฯ
      </p>
    </>,

    <>
      {/* <p>ลดหย่อนส่วนตัวได้ 60,000 บาท</p> */}
      <ControlsContainer>
        <div style={{ display: 'flex' }}>
          <label style={{ flexGrow: 1 }}>ค่าลดหย่อน</label>
          <input
            type="number"
            step={10000}
            min={0}
            value={allowance}
            onChange={(e) => setAllowance(e.target.value)}
            style={{ width: '80px' }}
          />
        </div>
        <Slider
          min={60_000}
          max={income - expense}
          step={10_000}
          value={allowance}
          onAfterChange={setAllowance}
          color={theme.colors.allowance}
        />
      </ControlsContainer>
      <small style={{ marginLeft: 'auto', color: theme.colors.textMuted }}>
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
      <p style={{ textAlign: 'center', marginBottom: 0 }}>
        ดังนั้นเงินได้สุทธิของคุณคือ
        <br />
        <Pill color="incomeText" bold>
          {Math.round(netIncome).toLocaleString()}
        </Pill>
        {' '}
        บาท
      </p>
      <NetIncomeEquation
        income={income}
        expense={expense}
        allowance={allowanceDisplay}
        highlight={{
          income: true,
          expense: true,
          allowance: true,
          netIncome: true,
        }}
      />
    </>,

    <>
      <p style={{ textAlign: 'center', marginBottom: 0 }}>
        เมื่อคำนวณ
        <Pill color="incomeText">เงินได้สุทธิ</Pill>
        ได้แล้ว
        <br />
        จะต้องนำตัวเลขที่ได้ไปเข้า
        <Pill color="taxText">ขั้นบันไดภาษี</Pill>
        <br />
        เพื่อคำนวณภาษีที่จะต้องจ่าย
      </p>
    </>,

    <>
      <p style={{ textAlign: 'center' }}>
        ดังนั้น ภาษีเงินได้บุคคลธรรมดา
        <br />
        ที่คุณจะต้องเสียคือ
        {' '}
        <Pill color="taxText" bold>
          {Math.ceil(taxFinal).toLocaleString()}
        </Pill>
        {' '}
        บาท
        <br />
        หรือเป็นประมาณ
        {' '}
        <Pill color="taxText" bold>
          {((taxFinal / income) * 100).toFixed(1)}
          %
        </Pill>
        {' '}
        ของเงินได้ทั้งปี
      </p>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flexGrow: 1, flexBasis: 0, textAlign: 'center' }}>
          <small style={{ color: theme.colors.incomeText }}>รายได้</small>
          <br />
          <b>
            {income.toLocaleString()}
          </b>
        </div>
        <div style={{ color: theme.colors.textMuted }}>→</div>
        <div style={{ flexGrow: 1, flexBasis: 0, textAlign: 'center' }}>
          <small style={{ color: theme.colors.incomeText }}>เงินได้สุทธิ</small>
          <br />
          <b>
            {netIncome?.toLocaleString()}
          </b>
        </div>
        <div style={{ color: theme.colors.textMuted }}>→</div>
        <div style={{ flexGrow: 1, flexBasis: 0, textAlign: 'center' }}>
          <small style={{ color: theme.colors.taxText }}>ภาษี</small>
          <br />
          <b>
            {Math.ceil(taxFinal).toLocaleString()}
            {' '}
          </b>
        </div>
      </div>
    </>,

    <ScrollBox
      // style={{ height: '500px' }}
      onScroll={() => {
        setShowDragInstruction(false);
      }}
    >
      <ScrollInstruction visible={showDragInstruction} />
      <p style={{ marginBottom: '0.5rem' }}>
        <b>ลองปรับตัวเลขดู</b>
      </p>
      <div
        style={{
          margin: '1rem  0 0.5rem',
          fontWeight: 'bold',
          color: theme.colors.incomeText,
          display: 'flex',
        }}
      >
        <div style={{ flexGrow: 1 }}>รายได้</div>
        <div>
          {income.toLocaleString()}
          {' '}
          บาท
        </div>
      </div>
      <ControlsGrid style={{ gridTemplateColumns: '80px auto 80px' }}>
        <label style={{ flexGrow: 1 }}>
          <small>เงินเดือน</small>
        </label>
        <Slider
          min={0}
          max={1_200_000}
          step={10_000}
          value={salary}
          onAfterChange={setSalary}
          color={theme.colors.income}
        />
        <div>
          <input
            type="number"
            step={10000}
            min={0}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            style={{ width: '80px' }}
          />
        </div>

        <label style={{ flexGrow: 1 }}>
          <small>ฟรีแลนซ์</small>
        </label>
        <Slider
          min={0}
          max={1_200_000}
          step={10_000}
          value={incomeFreelance}
          onAfterChange={setIncomeFreelance}
          color={theme.colors.income}
        />
        <div>
          <input
            type="number"
            step={10000}
            min={0}
            value={incomeFreelance}
            onChange={(e) => setIncomeFreelance(e.target.value)}
            style={{ width: '80px' }}
          />
        </div>

        <label style={{ flexGrow: 1 }}>
          <small>ขายของ</small>
        </label>
        <Slider
          min={0}
          max={1_200_000}
          step={10_000}
          value={incomeMerchant}
          onAfterChange={setIncomeMerchant}
          color={theme.colors.income}
        />
        <div>
          <input
            type="number"
            step={10000}
            min={0}
            value={incomeMerchant}
            onChange={(e) => setIncomeMerchant(e.target.value)}
            style={{ width: '80px' }}
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

      <div
        style={{
          margin: '1rem 0 0.5rem',
          fontWeight: 'bold',
          color: theme.colors.expenseText,
          display: 'flex',
        }}
      >
        <div style={{ flexGrow: 1 }}>ค่าใช้จ่าย</div>
        <div>
          {expense.toLocaleString()}
          {' '}
          บาท
        </div>
      </div>
      <ControlsGrid>
        <label style={{ flexGrow: 1 }}>
          <small>คิดจากเงินเดือน + ฟรีแลนซ์</small>
          <br />
          <small style={{ color: theme.colors.textSecondary }}>(หักได้ 50% ไม่เกิน 100,000 บาท)</small>
        </label>
        <div style={{ gridColumn: '2 / -1', textAlign: 'right' }}>
          <small>
            หักได้
            {' '}
            {Math.round(expense40_1_2).toLocaleString()}
            {' '}
            บาท
          </small>
        </div>

        <label style={{ flexGrow: 1 }}>
          <small>คิดจากขายของ</small>
          <br />
          <small style={{ color: theme.colors.textSecondary }}>(หักได้อย่างน้อย 60%)</small>
        </label>
        <div style={{ gridColumn: '2 / -1', textAlign: 'right' }}>
          <small>
            หักได้
            {' '}
            {Math.round(expense40_8).toLocaleString()}
            {' '}
            บาท
          </small>
        </div>
      </ControlsGrid>
      <div
        style={{
          margin: '1rem  0 0.5rem',
          fontWeight: 'bold',
          color: theme.colors.allowanceText,
          display: 'flex',
        }}
      >
        <div style={{ flexGrow: 1 }}>ค่าลดหย่อน</div>
        <div>
          {allowance.toLocaleString()}
          {' '}
          บาท
        </div>
      </div>
      <ControlsGrid style={{ gridTemplateColumns: '80px auto 80px' }}>
        <label style={{ flexGrow: 1 }}>
          <small>ค่าลดหย่อน</small>
        </label>
        <Slider
          min={60_000}
          max={income - expense}
          step={10_000}
          value={allowance}
          onAfterChange={setAllowance}
          color={theme.colors.allowance}
        />
        <input
          type="number"
          step={10000}
          min={0}
          value={allowance}
          onChange={(e) => setAllowance(e.target.value)}
          style={{ width: '80px' }}
        />
      </ControlsGrid>
      <hr style={{ margin: '1rem 0', opacity: 0.2 }} />
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <div style={{ flexGrow: 1, flexBasis: 0, textAlign: 'center' }}>
          <small style={{ color: theme.colors.incomeText }}>รายได้</small>
          <br />
          <span style={{ color: theme.colors.text }}>
            {income.toLocaleString()}
          </span>
        </div>
        <div>→</div>
        <div style={{ flexGrow: 1, flexBasis: 0, textAlign: 'center' }}>
          <small style={{ color: theme.colors.incomeText }}>เงินได้สุทธิ</small>
          <br />
          <span style={{ color: theme.colors.text }}>
            {Math.round(netIncome).toLocaleString()}
          </span>
        </div>
        <div>→</div>
        <div style={{ flexGrow: 1, flexBasis: 0, textAlign: 'center' }}>
          <small style={{ color: theme.colors.taxText }}>ภาษี</small>
          <br />
          <b>
            {Math.ceil(taxFinal).toLocaleString()}
            {' '}
            <small>
              (
              {((taxFinal / income) * 100).toFixed(1)}
              %)

            </small>
          </b>
        </div>
      </div>
    </ScrollBox>,
    // </div>,
  ];

  useEffect(() => {
    console.log(currentNarrativeStep);
    setEnableIncome(currentNarrativeStep >= 4);
    setEnableIncomeExtra(currentNarrativeStep >= 5);
    setEnableExpense(currentNarrativeStep >= 7);
    setGroupIncome(currentNarrativeStep >= 8);
    setShowBreakdown(!(currentNarrativeStep >= 9));
    setTimeout(() => setEnableAllowance(currentNarrativeStep >= 9), 800);
    setShowBrackets(currentNarrativeStep >= 12 || currentNarrativeStep <= 3);
    setActivateTax(currentNarrativeStep >= 13 || currentNarrativeStep === 2 || currentNarrativeStep === 3);
    // setShowFullScale(currentNarrativeStep === 1 || currentNarrativeStep === 2);
  }, [currentNarrativeStep, enableAllowance, income, expense]);

  return (
    <>
      <GlobalStyle />
      <StoryIndicator
        currentStep={currentNarrativeStep}
        totalSteps={narrativeSteps.length + 1}
        style={{ marginBottom: '20px' }}
      />
      <PageContainer>
        <CoverPage
          currentNarrativeStep={currentNarrativeStep}
          setCurrentNarrativeStep={setCurrentNarrativeStep}
        />
        <EndingPage
          currentNarrativeStep={currentNarrativeStep}
          setCurrentNarrativeStep={setCurrentNarrativeStep}
          narrativeStepsCount={narrativeSteps.length}
        />

        <ChartContainer>
          <D3Component
            incomeGroups={[
              {
                label: `เงินเดือน${incomeFreelanceDisplay > 0 ? ' + ฟรีแลนซ์' : ''
                }`,
                income: +salaryDisplay + +incomeFreelanceDisplay,
                expense: expense40_1_2,
              },
              {
                label: 'ขายของ',
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
              tax: currentNarrativeStep === 13 || currentNarrativeStep === 2 || currentNarrativeStep === 3,
              income: currentNarrativeStep === 11,
              // expense: currentNarrativeStep == 5,
              // allowance: currentNarrativeStep == 6,
            }}
            forceBlinkTax={currentNarrativeStep === 2 || currentNarrativeStep === 3}
            isFocusIncome={currentNarrativeStep >= 11}
            showFullScale={currentNarrativeStep <= 3}
            // slowTransition={currentNarrativeStep <= 4}
          />
          <TaxTableDisplay show={currentNarrativeStep <= 0}>
            <img src={`${process.env.PUBLIC_URL}/table.png`} alt="ตารางอัตราภาษีเงินได้บุคคลธรรมดา" style={{ width: '100%', maxWidth: 500 }} />
          </TaxTableDisplay>
        </ChartContainer>
        <SideContainer>
          <ContentContainer taller={currentNarrativeStep === 14}>
            {narrativeSteps.map((step, i) => (
              <>
                <Step status={Math.sign(i - currentNarrativeStep)}>
                  {step}
                </Step>
              </>
            ))}
          </ContentContainer>
          <PageNavigator
            currentStep={currentNarrativeStep}
            setCurrentStep={setCurrentNarrativeStep}
            stepCount={narrativeSteps.length}
          />
        </SideContainer>
      </PageContainer>
    </>
  );
}

export default App;
