import React from 'react';
import { theme } from '../theme';
import Button from '../components/Button';
import Step from '../components/Step';

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
      padding: 50,
      paddingTop: 30,
      textAlign: 'center',
    }}
  >
    <p>
      เรื่องราวเกี่ยวกับภาษียังมีรายละเอียด
      <br />
      กว่านี้อีกมาก สามารถอ่านเพิ่มเติมได้ที่
      <br />
      เว็บไซต์
      {' '}
      <a href="https://www.rd.go.th/548.html">กรมสรรพากร</a>
    </p>
    <p>
      แต่ถ้าชอบ visualization นี้
      <br />
      แชร์ให้เพื่อนดูต่อได้เลย
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

    <p style={{ marginTop: '30px', color: theme.colors.textMuted }}>
      Tax, visualized. was created by
      <br />
      <a
        href="https://taepras.com"
        style={{ color: theme.colors.textMuted }}
      >
        Tae Prasongpongchai
      </a>
    </p>
  </Step>
);

export default EndingPage;
