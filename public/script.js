let rates = [];
let currencies = [];

// Функція для отримання даних про курси валют
async function fetchRates() {
  try {
    const response = await fetch('/api/rates');
    rates = await response.json();
    currencies = rates.map(rate => rate.cc); // Отримуємо список валют

    // Заповнення списків валют
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');

    currencies.forEach(currency => {
      const optionFrom = document.createElement('option');
      const optionTo = document.createElement('option');
      optionFrom.value = currency;
      optionTo.value = currency;
      optionFrom.textContent = currency;
      optionTo.textContent = currency;

      fromCurrency.appendChild(optionFrom);
      toCurrency.appendChild(optionTo);
    });

    // Виведення курсів валют у новому блоці з національними валютами
    const ratesList = document.getElementById('rates-list');
    rates.forEach(rate => {
      const listItem = document.createElement('li');
      // Використовуємо поле `txt` для національної валюти
      listItem.textContent = `${rate.cc} (${rate.txt}): ${rate.rate}`;
      ratesList.appendChild(listItem);
    });

  } catch (error) {
    console.error('Помилка при отриманні курсів валют:', error);
  }
}

// Функція для конвертації валюти
function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  
  if (!amount || fromCurrency === toCurrency) {
    document.getElementById('result').textContent = 'Будь ласка, введіть суму та виберіть різні валюти.';
    return;
  }

  const fromRate = rates.find(rate => rate.cc === fromCurrency);
  const toRate = rates.find(rate => rate.cc === toCurrency);

  if (fromRate && toRate) {
    const result = (amount * fromRate.rate) / toRate.rate;
    document.getElementById('result').textContent = `Результат: ${result.toFixed(2)} ${toCurrency}`;
  } else {
    document.getElementById('result').textContent = 'Невідомий курс валюти.';
  }
}

// Завантаження курсів валют при завантаженні сторінки
fetchRates();
