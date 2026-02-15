const form = document.querySelector("#budgetForm");
const resultCard = document.querySelector("#resultCard");

const reserveAmount = document.querySelector("#reserveAmount");
const educationAmount = document.querySelector("#educationAmount");
const emergencyAmount = document.querySelector("#emergencyAmount");
const investmentAmount = document.querySelector("#investmentAmount");
const balanceAmount = document.querySelector("#balanceAmount");
const balanceState = document.querySelector("#balanceState");
const ruleText = document.querySelector("#ruleText");

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

function getDistribution(income) {
  if (income < 20000) {
    return {
      totalPercent: 0.1,
      educationPercent: 0.03,
      emergencyPercent: 0.03,
      investmentPercent: 0.04,
      text: "Ingreso menor a $20,000: guardamos 10% total (3% + 3% + 4%).",
    };
  }

  return {
    totalPercent: 0.3,
    educationPercent: 0.1,
    emergencyPercent: 0.1,
    investmentPercent: 0.1,
    text: "Ingreso mayor o igual a $20,000: 10% para cada rubro (30% total).",
  };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const income = Number(form.income.value);
  const expenses = Number(form.expenses.value);

  if (!Number.isFinite(income) || !Number.isFinite(expenses) || income < 0 || expenses < 0) {
    alert("Por favor, escribe números válidos para ingresos y egresos.");
    return;
  }

  const distribution = getDistribution(income);

  const education = income * distribution.educationPercent;
  const emergency = income * distribution.emergencyPercent;
  const investment = income * distribution.investmentPercent;
  const reserve = income * distribution.totalPercent;
  const balance = income - expenses - reserve;

  reserveAmount.textContent = currency.format(reserve);
  educationAmount.textContent = currency.format(education);
  emergencyAmount.textContent = currency.format(emergency);
  investmentAmount.textContent = currency.format(investment);
  balanceAmount.textContent = currency.format(balance);
  ruleText.textContent = distribution.text;

  balanceAmount.classList.remove("positive", "negative");
  if (balance >= 0) {
    balanceAmount.classList.add("positive");
    balanceState.textContent = "¡Vas muy bien! Tus gastos y metas están cubiertos.";
  } else {
    balanceAmount.classList.add("negative");
    balanceState.textContent = "Tu balance es negativo; intenta bajar egresos este mes.";
  }

  resultCard.classList.remove("hidden");
});
