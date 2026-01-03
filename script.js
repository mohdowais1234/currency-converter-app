const rates = {
  base: "USD",
  date: "2025-12-28",
  rates: {
    AED: 3.67,
    AFN: 70.5,
    XCD: 2.70,
    ALL: 94.2,
    AMD: 402.1,
    ANG: 1.79,
    AOA: 880.0,
    ARS: 1450.81,   
    AUD: 1.49,     
    AZN: 1.70,
    BAM: 1.66,      
    BBD: 2.0,
    BDT: 109.0,
    XOF: 565.0,
    BGN: 1.66,      
    BHD: 0.376,     
    BIF: 2900.0,
    BMD: 1.0,
    BND: 1.28,      
    BOB: 6.9,
    BRL: 5.54,      
    BSD: 1.0,
    NOK: 10.9,
    BWP: 13.05,    
    BZD: 2.0,
    CAD: 1.37,     
    CDF: 2800.0,
    XAF: 565.0,
    CHF: 0.79,      
    CLP: 906.1,     
    CNY: 7.01,      
    COP: 3709.3,    
    CRC: 520.0,
    CUP: 24.0,
    CVE: 103.0,
    CZK: 22.0,
    DJF: 177.0,
    DKK: 6.4,
    DOP: 59.0,
    DZD: 134.0,
    EGP: 48.5,
    ETB: 57.0,
    EUR: 0.849,     
    FJD: 2.25,
    FKP: 0.76,
    GBP: 0.741,    
    GEL: 2.7,
    GHS: 15.0,
    HKD: 7.80,
    HUF: 320.0,
    IDR: 15600.0,
    ILS: 3.7,
    INR: 89.95,     
    JOD: 0.71,
    JPY: 156.33,   
    KRW: 1345.0,
    KWD: 0.31,
    MXN: 17.2,
    MYR: 4.05,     
    NZD: 1.67,
    PHP: 56.1,
    PKR: 278.0,
    PLN: 4.1,
    QAR: 3.64,
    RUB: 93.5,
    SAR: 3.75,
    SEK: 10.2,
    SGD: 1.28,      
    TRY: 32.1,
    TWD: 32.0,
    UAH: 41.0,
    USD: 1.0,
    ZAR: 18.3
  }
};
  
  const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
  
  const currencyList = Object.keys(rates.rates).sort();
  const fromSel = document.getElementById("from");
  const toSel = document.getElementById("to");
  const amountEl = document.getElementById("amount");
  const resultEl = document.getElementById("result");
  const rateInfoEl = document.getElementById("rateInfo");
  const btn = document.getElementById("convertBtn");
  const dropdowns = document.querySelectorAll(".dropdown select");
  
  for (let select of dropdowns) {
  for (currCode in countryList) {
  let newOption = document.createElement("option");
  newOption.innerText = currCode;
  newOption.value = currCode;
  if (select.name === "from" && currCode === "USD") {
    newOption.selected = "selected";
  } else if (select.name === "to" && currCode === "INR") {
    newOption.selected = "selected";
  }
  select.append(newOption);
  }
  }
  function populateSelects() {
    currencyList.forEach(c => {
      const opt1 = document.createElement("option");
      opt1.value = c; opt1.textContent = c;
      const opt2 = document.createElement("option");
      opt2.value = c; opt2.textContent = c;
      fromSel.appendChild(opt1);
      toSel.appendChild(opt2);
    });
    fromSel.value = "USD";
    toSel.value = "INR";
  }
  
  function convert(amount, from, to) {
    const r = rates.rates;
    if (!r[from] || !r[to]) throw new Error("Unsupported currency");
    // Convert via USD base: amount_in_usd = amount / r[from]; result = amount_in_usd * r[to]
    const amountInUSD = amount / r[from];
    return amountInUSD * r[to];
  }
  
  function format(n, ccy) {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: ccy }).format(n);
  }
  
  function update() {
    const amt = parseFloat(amountEl.value);
    const from = fromSel.value;
    const to = toSel.value;
    if (isNaN(amt) || amt < 0) {
      resultEl.textContent = "Enter a valid amount.";
      rateInfoEl.textContent = "";
      return;
    }
    try {
      const out = convert(amt, from, to);
      resultEl.textContent = `${format(amt, from)} = ${format(out, to)}`;
      const rateFromTo = (rates.rates[to] / rates.rates[from]);
      rateInfoEl.textContent = `Rate: 1 ${from} = ${rateFromTo.toFixed(4)} ${to} • Base: ${rates.base} • Date: ${rates.date}`;
    } catch (e) {
      resultEl.textContent = e.message;
      rateInfoEl.textContent = "";
    }
  }
  
  btn.addEventListener("click", update);
  fromSel.addEventListener("change", update);
  toSel.addEventListener("change", update);
  amountEl.addEventListener("input", () => {
    // convert live while typing
    update();
  });
  
  populateSelects();
  update();
  
  
  
  
  
  
  