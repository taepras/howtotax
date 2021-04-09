import { useMemo, useState } from "react";
import { D3Component } from "./components/D3Component";
import "./App.css";

const taxBrackets = [
  {
    minNetIncome: 0,
    maxNetIncome: 150000,
    taxRate: 0
  },
  {
    minNetIncome: 150000,
    maxNetIncome: 300000,
    taxRate: .05
  },
  {
    minNetIncome: 300000,
    maxNetIncome: 500000,
    taxRate: .10
  },
  {
    minNetIncome: 500000,
    maxNetIncome: 750000,
    taxRate: .15
  },
  {
    minNetIncome: 750000,
    maxNetIncome: 1000000,
    taxRate: .20
  },
  {
    minNetIncome: 1000000,
    maxNetIncome: 2000000,
    taxRate: .25
  },
  {
    minNetIncome: 2000000,
    maxNetIncome: 5000000,
    taxRate: .30
  },
  {
    minNetIncome: 5000000,
    maxNetIncome: Infinity,
    taxRate: .35
  }
]

function App() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [allowance, setAllowance] = useState(0);

  const netIncome = useMemo(() => {
    return income - expense - allowance;
  }, [income, expense, allowance]);

  const taxFinal = useMemo(() => {
    let sumTax = 0;
    let remainingNetIncome = netIncome;
    for (let i in taxBrackets) {
      let bracketRange = (taxBrackets[i].maxNetIncome - taxBrackets[i].minNetIncome);
      let incomeInBracket = Math.min(remainingNetIncome, bracketRange);
      let taxInBracket = incomeInBracket * taxBrackets[i].taxRate;
      sumTax += taxInBracket
      remainingNetIncome -= bracketRange;
      if (remainingNetIncome <= 0)
        break;
    }
    return sumTax;
  }, [netIncome]);

  return (
    <div className="my-app">
      <input
        type="number"
        step={5000}
        min={0}
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />
      <input
        type="number"
        step={5000}
        min={0}
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
      />
      <input
        type="number"
        step={5000}
        min={0}
        value={allowance}
        onChange={(e) => setAllowance(e.target.value)}
      />
      <p>{netIncome}</p>
      <p>{taxFinal}</p>
      <D3Component income={income} expense={expense} allowance={allowance} />
    </div>
  );
}

export default App;
