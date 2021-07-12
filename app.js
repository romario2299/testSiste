
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

let moneyInit = 0;
let dues = 0;
let interest = 0;
let result;

readline.question('Ingrese el monto de crédito inicial, número de cuotas e interés separados por coma. Ejemplo: 1000000,5,10: ', (opt) => {
  const aux = opt.split(',');
  moneyInit = parseInt(aux[0], 10);
  dues = parseInt(aux[1], 10);
  interest = parseInt(aux[2], 10);
  console.log('Monto Inicial: ', moneyInit);
  console.log('No. de Cuotas: ', dues);
  console.log('Interes: ', interest + '%');
  const result = listPaymentMonthly(moneyInit, dues, interest);
  console.log('================================');
  console.log('Payments Total', result.paymentTotal);
  result.arrayPayments.forEach((el, i) => {
    console.log(`Month ${i+1}: ${el}`);
  })
  readline.close();
});

listPaymentMonthly = (moneyInit, dues, interest) => {
  let arrayPayments = [];
  const paymentMonthly = moneyInit / dues;
  for (let index = 0; index < dues; index++) {
    const interestInit = moneyInit * interest / 100;
    const montAddInterest = paymentMonthly + interestInit;
    arrayPayments[index] = montAddInterest;
    moneyInit = moneyInit - paymentMonthly;
  }
  let paymentTotal = 0;
  arrayPayments.forEach(el => {
    paymentTotal += el;
  });
  return {paymentTotal, arrayPayments};
}
