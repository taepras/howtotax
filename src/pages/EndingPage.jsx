import React from 'react';
import { theme } from '../theme';
import Button from '../components/Button';
import Step from '../components/Step';
import Pill from '../components/Pill';

const EndingPage = ({ currentNarrativeStep, setCurrentNarrativeStep, narrativeStepsCount }) => (
  <Step
    status={Math.sign(narrativeStepsCount - currentNarrativeStep)}
    style={{
      gap: '10px',
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
    <p>
      และนี่คือการคำนวณ
      <br />
      <Pill color="taxText">ภาษีเงินได้บุคคลธรรมดา</Pill>
      เบื้องต้น
      <br />
      {/* <small style={{ color: theme.colors.textSecondary }}>(อ้างอิงข้อมูลปีภาษี 2563)</small>
    </p>
    <p> */}
      หากสนใจเรื่องการคำนวณภาษี
      <br />
      อย่างละเอียด สามารถอ่านได้จาก
      <br />
      {' '}
      <a href="https://www.rd.go.th/548.html" target="_blank" rel="noreferrer">กรมสรรพากร</a>
      {' '}
      หรือ
      {' '}
      <a href="https://www.google.com/search?q=%E0%B8%84%E0%B8%B3%E0%B8%99%E0%B8%A7%E0%B8%93%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B5" title="Google: 'คำนวณภาษี'" target="_blank" rel="noreferrer">แหล่งข้อมูลอื่นๆ</a>
    </p>
    <p>
      แต่ถ้าชอบ visualization นี้
      <br />
      ก็อย่าลืมแชร์ต่อให้เพื่อนได้เลย!
    </p>
    <div style={{ display: 'flex', gap: '10px' }}>
      <div
        className="fb-share-button"
        data-href="https://taepras.github.io/taxvisualizer/"
        data-layout="button"
        data-size="large"
      >
        <a
          target="_blank"
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftaepras.github.io%2Ftaxvisualizer%2F&amp;src=sdkpreparse"
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
        data-url="https://taepras.github.io/taxvisualizer/"
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
        data-url="https://taepras.github.io/taxvisualizer/"
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

    <p style={{ marginTop: '30px', color: theme.colors.textSecondary, fontSize: '0.875rem' }}>
      <a
        href="https://taepras.com"
        style={{ color: theme.colors.textSecondary }}
        target="_blank"
        rel="noreferrer"
      >
        <img src={`${process.env.PUBLIC_URL}/logo_initials.svg`} alt="tp_" style={{ width: 64 }} />
        <br />
        taepras.com
      </a>
      <br />
      ธนวิชญ์ ประสงค์พงษ์ชัย
    </p>
  </Step>
);

export default EndingPage;
