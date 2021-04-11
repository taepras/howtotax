// export const useTaxCalc = ({income, expense, allowance}) => {
//     return 
// }

import { useMemo } from "react"

export const useNetIncome = (income, expense, allowance) => {
    return useMemo(() => {
        return Math.max(0, income - expense - allowance);
      }, [income, expense, allowance]);
}

export const useTaxCalculation = (netIncome, taxBrackets) => {
    return useMemo(() => {
        let sumTax = 0;
        let remainingNetIncome = netIncome;
        for (let i in taxBrackets) {
          let bracketRange =
            taxBrackets[i].maxNetIncome - taxBrackets[i].minNetIncome;
          let incomeInBracket = Math.min(remainingNetIncome, bracketRange);
          let taxInBracket = incomeInBracket * taxBrackets[i].taxRate;
          sumTax += taxInBracket;
          remainingNetIncome -= bracketRange;
          if (remainingNetIncome <= 0) break;
        }
        return sumTax;
      }, [netIncome, taxBrackets]);
}