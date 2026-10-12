const el = (id) => document.getElementById(id);

const scenarios = {
  normal: {
    temperature: 6.0, humidity: 78, battery: 84, solar: 126,
    title: "Conditions look stable", text: "Sample values are within this demo's illustrative range.",
    recommendation: "Continue monitoring temperature and battery level. Confirm crop-specific storage needs before real use.",
    alert: "green", tempNote: "Example reading", batteryNote: "Example charge level", solarNote: "Illustrative output"
  },
  hot: {
    temperature: 11.2, humidity: 82, battery: 72, solar: 138,
    title: "Temperature warning", text: "The simulated temperature is higher than the demo target. A real system would need inspection.",
    recommendation: "Demo suggestion: check the door seal, cooling unit and sensor readings. Do not rely on this simulation for food-safety decisions.",
    alert: "red", tempNote: "Above demo target", batteryNote: "Example charge level", solarNote: "Illustrative output"
  },
  low: {
    temperature: 7.4, humidity: 77, battery: 18, solar: 54,
    title: "Low battery warning", text: "The simulated battery level is low. Actual backup time would depend on the tested system load.",
    recommendation: "Demo suggestion: inspect battery status and power connections. A real installation needs correctly rated protection and a verified backup plan.",
    alert: "orange", tempNote: "Example reading", batteryNote: "Low simulated charge", solarNote: "Illustrative output"
  },
  cloudy: {
    temperature: 6.8, humidity: 79, battery: 59, solar: 16,
    title: "Low solar input", text: "The simulated solar output is low, as might happen in cloudy conditions.",
    recommendation: "Demo suggestion: monitor stored energy and cooling performance. Real-world operation must be validated for local weather and load.",
    alert: "orange", tempNote: "Example reading", batteryNote: "Example charge level", solarNote: "Low simulated output"
  }
};

function drawChart(temp) {
  const base = [95, 105, 82, 92, 65, 77, 59, 69, 55];
  const shift = (temp - 6) * 7;
  const points = base.map((y, i) => `${i * 75},${Math.max(20, Math.min(150, y - shift + ((i % 3) - 1) * shift * 0.12))}`);
  const pointsString = points.join(" ");
  el("chartLine").setAttribute("points", pointsString);
  el("chartArea").setAttribute("d", `M${points[0].replace(",", ",")} L${points.slice(1).join(" L")} L600,180 L0,180 Z`);
}

function setScenario(key) {
  const data = scenarios[key] || scenarios.normal;
  el("temperature").innerHTML = `${data.temperature.toFixed(1)} <small>°C</small>`;
  el("humidity").innerHTML = `${data.humidity} <small>%</small>`;
  el("battery").innerHTML = `${data.battery} <small>%</small>`;
  el("solar").innerHTML = `${data.solar} <small>W</small>`;
  el("heroTemp").textContent = `${data.temperature.toFixed(1)}°C`;
  el("tempNote").textContent = data.tempNote;
  el("batteryNote").textContent = data.batteryNote;
  el("solarNote").textContent = data.solarNote;
  el("tempBar").style.width = `${Math.min(100, data.temperature / 15 * 100)}%`;
  el("humidityBar").style.width = `${data.humidity}%`;
  el("batteryBar").style.width = `${data.battery}%`;
  el("solarBar").style.width = `${Math.min(100, data.solar / 200 * 100)}%`;
  el("alertTitle").textContent = data.title;
  el("alertText").textContent = data.text;
  el("recommendation").textContent = data.recommendation;
  const dot = document.querySelector(".alert-dot");
  dot.className = `alert-dot ${data.alert}`;
  drawChart(data.temperature);
}

el("runScenario").addEventListener("click", () => setScenario(el("scenario").value));
el("resetScenario").addEventListener("click", () => {
  el("scenario").value = "normal";
  setScenario("normal");
});
setScenario("normal");
