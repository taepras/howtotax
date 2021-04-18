export const taxBrackets = [
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