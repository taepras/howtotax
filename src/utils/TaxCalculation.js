import { useMemo } from 'react';

export const useNetIncome = (income, expense, allowance) => useMemo(
  () => Math.max(0, income - expense - allowance),
  [income, expense, allowance],
);

export const useTaxCalculation = (netIncome, taxBrackets) => useMemo(() => {
  let sumTax = 0;
  let remainingNetIncome = netIncome;
  for (let i = 0; i < taxBrackets.length; i++) {
    const bracketRange = taxBrackets[i].maxNetIncome - taxBrackets[i].minNetIncome;
    const incomeInBracket = Math.min(remainingNetIncome, bracketRange);
    const taxInBracket = incomeInBracket * taxBrackets[i].taxRate;
    sumTax += taxInBracket;
    remainingNetIncome -= bracketRange;
    if (remainingNetIncome <= 0) break;
  }
  return sumTax;
}, [netIncome, taxBrackets]);
