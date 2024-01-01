const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('home.html', { root: 'public' });
});

router.get('/bmicalculator', (req, res) => {
  res.sendFile('bmiCalculator.html', { root: 'public' });
});

router.post('/bmicalculator', (req, res) => {
  const { age, gender, height, heightUnit, weight, weightUnit } = req.body;

  const heightInMeters = heightUnit === 'in' ? height * 0.0254 : height;
  const weightInKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;

  let bmi;
  if (gender === 'male') {
    bmi = weightInKg / (heightInMeters * heightInMeters) * 1.1;
  } else if (gender === 'female') {
    bmi = weightInKg / (heightInMeters * heightInMeters) * 1.075;
  }

  function interpretBMI(bmi) {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  }

  let interpret = interpretBMI(bmi);
  let resultMessage = `BMI Result: ${Math.round(bmi * 100) / 100}. Interpretation: ${interpret}`;

  res.send(`
    <script>
      // Show the result in an alert
      alert("${resultMessage.replace(/"/g, '\\"')}");
      // Redirect back to the BMI calculator page
      window.location.href = '/bmicalculator';
    </script>
  `);
});

module.exports = router;
