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
      zIndex: 100,
      top: 30,
      padding: 50,
      paddingTop: 30,
      textAlign: 'center',
    }}
  >
    <h1>
      เข้าใจภาษี
      <br />
      แบบเห็นภาพ
    </h1>
    <p>
      คำนวณภาษียากจัง!? มาลองคิดภาษี
      <br />
      สไตล์มนุษย์เงินเดือนมือใหม่แบบคร่าวๆ
      <br />
      ผ่าน data visualization กัน!
    </p>
    <Button
      style={{
        padding: '8px 16px',
        borderRadius: 8,
        backgroundColor: theme.colors.tax,
        fontWeight: 'bold',
        fontSize: '1rem',
      }}
      onClick={() => setCurrentNarrativeStep(0)}
    >
      เริ่มเลย
    </Button>
    {/* <p style={{ color: theme.colors.textMuted, marginTop: '1rem' }}>
      <small>
        *เว็บไซต์นี้ไม่มีการเก็บข้อมูลตัวเลขที่คุณกรอก
        <br />
        และไม่มีข้อผูกพันทางกฎหมายใดๆ
      </small>
    </p> */}
    <p style={{
      color: theme.colors.textMuted,
      marginTop: '1rem',
      position: ' absolute',
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
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
  </Step>
);

export default CoverPage;
