const express = require('express');
const app = express();
const port = 3000;

// Асинхронна функція для отримання даних про курси валют
async function getCurrencyRates() {
  try {
    const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Помилка при завантаженні курсів валют:', error);
    throw error;
  }
}

// Статичні файли (HTML, CSS, JS)
app.use(express.static('public'));

// Роут для отримання курсів валют
app.get('/api/rates', async (req, res) => {
  try {
    const data = await getCurrencyRates();
    res.json(data); // Відправляємо курси валют на фронтенд
  } catch (error) {
    res.status(500).send('Помилка при завантаженні курсів валют');
  }
});

app.listen(port, () => {
  console.log(`Сервер працює на http://localhost:${port}`);
});
