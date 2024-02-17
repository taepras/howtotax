import React, { useState } from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';
import { theme } from '../theme';
import Button from '../components/Button';
import Step from '../components/Step';
// import Pill from '../components/Pill';

const EndBox = styled.div`
  padding: 16px 32px;
  max-width: 100%;
  background-color: ${transparentize(0.92, theme.colors.taxText)};
  border-radius: 8px;
  margin-bottom: 1rem;

  p {
    margin: 0;
  }
`;

const PageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #0008;
  display: flex;
  flex-direction: column;
  padding: 16px;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  backdrop-filter: blur(4px);
`;

const LinkButton = styled.a`
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-family: "Bai Jamjuree", sans-serif;
  background-color: ${theme.colors.income};
  color: ${theme.colors.white} !important;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  text-decoration: none !important;
`;

const EndingPage = ({
  currentNarrativeStep, setCurrentNarrativeStep, narrativeStepsCount, tax, income,
}) => {
  const [showQr, setShowQr] = useState(false);

  return (
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
      <p style={{ marginBottom: '2rem' }}>
        ศึกษาข้อมูลเรื่องภาษีเพิ่มเติมได้จาก
        <br />
        {' '}
        <a href="https://www.rd.go.th/548.html" target="_blank" rel="noreferrer">กรมสรรพากร</a>
        {' '}
        หรือ
        {' '}
        <a href="https://www.google.com/search?q=%E0%B8%84%E0%B8%B3%E0%B8%99%E0%B8%A7%E0%B8%93%E0%B8%A0%E0%B8%B2%E0%B8%A9%E0%B8%B5" title="Google: 'คำนวณภาษี'" target="_blank" rel="noreferrer">แหล่งข้อมูลอื่นๆ</a>
      </p>
      <p style={{ marginBottom: '0.5rem' }}>
        แต่ถ้าชอบ visualization นี้ ก็แชร์ต่อได้เลย!
      </p>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '0.5rem' }}>
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
      <p style={{ marginBottom: '0.5rem' }}>
        หรือสนับสนุนผ่าน
        <Button
          style={{ marginLeft: '0.5rem', backgroundColor: '#113e67' }}
          onClick={() => { setShowQr(true); }}
        >
          Thai QR Payment
        </Button>
      </p>

      <div style={{ display: 'flex', marginTop: '2rem', gap: '10px' }}>
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
      {showQr && (
        <>
          <PageOverlay onClick={() => setShowQr(false)}>
            <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
              <Button
                onClick={() => setShowQr(false)}
                style={{
                  fontSize: '1.125rem',
                  // background: 'transparent',
                  // border: '1.5px white solid',
                  // boxShadow: 'none',
                }}
              >
                ปิด X
              </Button>
            </div>
            <img
              src={`${process.env.PUBLIC_URL}/donate_thaiqr_thanawit.jpg`}
              alt="Thai QR donate to Thanawit"
              style={{ maxWidth: '280px', borderRadius: '8px' }}
            />
            <LinkButton
              href={`${process.env.PUBLIC_URL}/donate_thaiqr_thanawit.jpg`}
              style={{ fontSize: '1.125rem', fontWeight: 'bold', backgroundColor: '#113e67' }}
              download="thaiqr_donate_taepras.jpg"
            >
              ดาวน์โหลดภาพ QR
            </LinkButton>
          </PageOverlay>
        </>
      )}
    </Step>
  );
};

export default EndingPage;
