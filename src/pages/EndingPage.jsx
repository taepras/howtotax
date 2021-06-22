import React from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { theme } from '../theme';
import Button from '../components/Button';
import Step from '../components/Step';
import Pill from '../components/Pill';

const EndBox = styled.div`
  padding: 16px 32px;
  max-width: 100%;
  background-color: ${transparentize(0.92, theme.colors.taxText)};
  border-radius: 8px;
  margin-bottom: 2rem;

  p {
    margin: 0;
  }
`;

const EndingPage = ({
  currentNarrativeStep, setCurrentNarrativeStep, narrativeStepsCount, tax, income,
}) => (
  <Step
    status={Math.sign(narrativeStepsCount - currentNarrativeStep)}
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.bg,
      zIndex: 100,
      top: 30,
      padding: 30,
      paddingTop: 50,
      textAlign: 'center',
    }}
  >
    <EndBox>
      <p>
        ดังนั้น คุณจะต้องเสียภาษีประมาณ
      </p>
      <p style={{ margin: `0.5rem ${0}`, color: theme.colors.taxText }}>
        <h1 style={{ display: 'inline', margin: 0 }}>{Math.round(tax).toLocaleString()}</h1>
        {' '}
        <b>บาท</b>
        <br />
      </p>
      <p>
        หรือคิดเป็น
        {' '}
        <b style={{ color: theme.colors.taxText }}>
          {((tax / income) * 100).toFixed(1)}
          %
        </b>
        {' '}
        ของเงินได้ทั้งหมด
      </p>
    </EndBox>
    <p>
      ศึกษาข้อมูลเรื่องภาษีเพิ่มเติมได้จาก
      <br />
      {' '}
      <a href="https://www.rd.go.th/548.html" target="_blank" rel="noreferrer">กรมสรรพากร</a>
      {' '}
      หรือ
      {' '}
      <a href="https://www.google.com/search?q=%E0%B8%84%E0%B8%B3%E0%B8%99%E0%B8%A7%E0%B8%93%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B5" title="Google: 'คำนวณภาษี'" target="_blank" rel="noreferrer">แหล่งข้อมูลอื่นๆ</a>
    </p>
    <p>
      แต่ถ้าชอบ visualization นี้ก็แชร์ต่อได้เลย!
    </p>
    <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
      <div
        className="fb-share-button"
        data-href="https://taepras.github.io/howtotax/"
        data-layout="button"
        data-size="large"
      >
        <a
          target="_blank"
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftaepras.github.io%2Fhowtotax%2F&amp;src=sdkpreparse"
          className="fb-xfbml-parse-ignore"
          rel="noreferrer"
        >
          Share
        </a>
      </div>
      <a
        href="https://twitter.com/share?ref_src=twsrc%5Etfw"
        className="twitter-share-button"
        data-size="large"
        data-url="https://taepras.github.io/howtotax/"
        data-via="taepras"
        data-dnt="true"
        data-show-count="false"
      >
        Tweet
      </a>
      <div
        className="line-it-button"
        data-lang="en"
        data-type="share-a"
        data-ver="3"
        data-url="https://taepras.github.io/howtotax/"
        data-color="default"
        data-size="large"
        data-count="false"
      />
    </div>

    <div style={{ display: 'flex', marginTop: '1rem', gap: '10px' }}>
      <Button
        style={{
          border: 'none',
          fontSize: '1rem',
          textDecoration: 'underline',
        }}
        secondary
        onClick={() => setCurrentNarrativeStep(narrativeStepsCount - 1)}
      >
        &laquo; ย้อนกลับ
      </Button>
      <Button
        style={{
          border: 'none',
          fontSize: '1rem',
          textDecoration: 'underline',
        }}
        secondary
        onClick={() => {
          /* eslint-disable-next-line no-undef */
          window.location.href = '';
        }}
      >
        &laquo; เริ่มใหม่
      </Button>
    </div>

    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginTop: '30px',
      color: theme.colors.textSecondary,
      fontSize: '0.875rem',
    }}
    >
      <a
        href="https://taepras.com"
        style={{ color: theme.colors.textSecondary, marginRight: 16 }}
        target="_blank"
        rel="noreferrer"
      >
        <img src={`${process.env.PUBLIC_URL}/logo_initials.svg`} alt="tp_" style={{ width: 64 }} />
      </a>
      <div style={{ textAlign: 'left' }}>
        <a
          href="https://taepras.com"
          style={{ color: theme.colors.textSecondary }}
          target="_blank"
          rel="noreferrer"
        >
          taepras.com
        </a>
        <br />
        ธนวิชญ์ ประสงค์พงษ์ชัย
      </div>
    </div>
  </Step>
);

export default EndingPage;
