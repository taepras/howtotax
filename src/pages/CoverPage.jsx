import React from 'react';
import { theme } from '../theme';
import Button from '../components/Button';
import Step from '../components/Step';

const CoverPage = ({ currentNarrativeStep, setCurrentNarrativeStep }) => (
  <Step
    status={Math.sign(-1 - currentNarrativeStep)}
    style={{
      gap: '10px',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.bg,
      color: theme.colors.text,
      // color: theme.colors.incomeText,
      zIndex: 100,
      top: 30,
      padding: 50,
      paddingTop: 30,
      marginTop: -30,
      textAlign: 'center',
      backgroundImage: `url('${process.env.PUBLIC_URL}/bg_fast.gif')`,
      backgroundSize: '97.2px 21.6px',
      backgroundPosition: 'center center',
    }}
  >
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: 'calc(50% - 16px)',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        backgroundColor: theme.colors.bg,
        padding: '64px',
        width: '360px',
        height: '360px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 style={{
        color: theme.colors.text,
        // marginTop: -30,
        marginBottom: 16,
      }}
      >
        เข้าใจ
        <span style={{ color: theme.colors.taxText }}>ภาษี</span>
        <br />
        แบบเห็นภาพ
      </h1>
      <p>
        ภาษีคิดมายังไง? คำนวณภาษียากจัง?
        <br />
        มาลองคิดภาษีแบบ &ldquo;เห็นภาพ&rdquo;
        <br />
        ผ่าน data visualization กัน!
      </p>
      <Button
        style={{
          padding: '8px 32px',
          borderRadius: 8,
          backgroundColor: theme.colors.income,
          color: theme.colors.white,
          fontWeight: 'bold',
          fontSize: '1.125rem',
        }}
        onClick={() => setCurrentNarrativeStep(0)}
      >
        เริ่มเลย
      </Button>
      {/* <p style={{
        color: theme.colors.textSecondary,
        marginTop: '1rem',
        position: ' absolute',
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        lineHeight: 1.2,
      }}
      > */}
      <p style={{
        color: theme.colors.textSecondary,
        marginTop: '3rem',
        marginBottom: '-3rem',
        textAlign: 'center',
        lineHeight: 1.2,
      }}
      >
        <small>
          a data visualization experiment by
          <br />
          <a href="https://taepras.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
            Tae Prasongpongchai
          </a>
        </small>
      </p>
    </div>
    {/* <p style={{ color: theme.colors.textMuted, marginTop: '1rem' }}>
      <small>
        *เว็บไซต์นี้ไม่มีการเก็บข้อมูลตัวเลขที่คุณกรอก
        <br />
        และไม่มีข้อผูกพันทางกฎหมายใดๆ
      </small>
    </p> */}
  </Step>
);

export default CoverPage;
