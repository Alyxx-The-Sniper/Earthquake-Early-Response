// ---------- 1. DATA ----------
const buildingData = [
  { Building_ID: 60, Latitude: 10.308, Longitude: 123.8995, PGA_g: 0.55, PGV_cm_s: 59, Year_Construction: 2010, Num_Stories: 15, Structural_System: "Reinforced Concrete", Soil_Type_Vs30_mps: 450 },
  { Building_ID: 80, Latitude: 10.2895, Longitude: 123.8765, PGA_g: 0.35, PGV_cm_s: 31.2, Year_Construction: 1963, Num_Stories: 3, Structural_System: "Unreinforced Masonry", Soil_Type_Vs30_mps: 250 },
  { Building_ID: 89, Latitude: 10.3475, Longitude: 123.9325, PGA_g: 0.3, PGV_cm_s: 27.8, Year_Construction: 2020, Num_Stories: 6, Structural_System: "Reinforced Concrete", Soil_Type_Vs30_mps: 800 },
  { Building_ID: 10, Latitude: 10.3001, Longitude: 123.8902, PGA_g: 0.48, PGV_cm_s: 46.3, Year_Construction: 1988, Num_Stories: 6, Structural_System: "Reinforced Concrete", Soil_Type_Vs30_mps: 450 },
  { Building_ID: 39, Latitude: 10.294, Longitude: 123.88, PGA_g: 0.39, PGV_cm_s: 34.5, Year_Construction: 2018, Num_Stories: 2, Structural_System: "Masonry (CHB)", Soil_Type_Vs30_mps: 250 },
  { Building_ID: 59, Latitude: 10.331, Longitude: 123.918, PGA_g: 0.49, PGV_cm_s: 50.8, Year_Construction: 1983, Num_Stories: 4, Structural_System: "Masonry (CHB)", Soil_Type_Vs30_mps: 450 },
  { Building_ID: 95, Latitude: 10.3158, Longitude: 123.8908, PGA_g: 0.5, PGV_cm_s: 51.7, Year_Construction: 2004, Num_Stories: 13, Structural_System: "Reinforced Concrete", Soil_Type_Vs30_mps: 450 },
  { Building_ID: 79, Latitude: 10.3365, Longitude: 123.9225, PGA_g: 0.46, PGV_cm_s: 46.5, Year_Construction: 2014, Num_Stories: 12, Structural_System: "Reinforced Concrete", Soil_Type_Vs30_mps: 450 },
  { Building_ID: 65, Latitude: 10.3005, Longitude: 123.8895, PGA_g: 0.47, PGV_cm_s: 45.8, Year_Construction: 1987, Num_Stories: 5, Structural_System: "Masonry (CHB)", Soil_Type_Vs30_mps: 450 },
  { Building_ID: 84, Latitude: 10.3138, Longitude: 123.9058, PGA_g: 0.54, PGV_cm_s: 58.2, Year_Construction: 2017, Num_Stories: 25, Structural_System: "Steel Frame", Soil_Type_Vs30_mps: 450 },
  { Building_ID: 16, Latitude: 10.305, Longitude: 123.895, PGA_g: 0.51, PGV_cm_s: 52.9, Year_Construction: 2002, Num_Stories: 15, Structural_System: "Reinforced Concrete", Soil_Type_Vs30_mps: 450 },
  { Building_ID: 93, Latitude: 10.2928, Longitude: 123.8798, PGA_g: 0.38, PGV_cm_s: 34.4, Year_Construction: 2021, Num_Stories: 2, Structural_System: "Reinforced Concrete", Soil_Type_Vs30_mps: 250 },
  { Building_ID: 28, Latitude: 10.35, Longitude: 123.935, PGA_g: 0.28, PGV_cm_s: 25.4, Year_Construction: 2000, Num_Stories: 8, Structural_System: "Reinforced Concrete", Soil_Type_Vs30_mps: 800 },
  { Building_ID: 7, Latitude: 10.316, Longitude: 123.888, PGA_g: 0.47, PGV_cm_s: 45, Year_Construction: 2005, Num_Stories: 5, Structural_System: "Reinforced Concrete", Soil_Type_Vs30_mps: 250 },
  { Building_ID: 70, Latitude: 10.2965, Longitude: 123.8835, PGA_g: 0.41, PGV_cm_s: 38.2, Year_Construction: 1998, Num_Stories: 2, Structural_System: "Wood", Soil_Type_Vs30_mps: 250 },
  { Building_ID: 50, Latitude: 10.299, Longitude: 123.887, PGA_g: 0.44, PGV_cm_s: 42, Year_Construction: 2004, Num_Stories: 4, Structural_System: "Masonry (CHB)", Soil_Type_Vs30_mps: 250 },
  { Building_ID: 30, Latitude: 10.296, Longitude: 123.883, PGA_g: 0.43, PGV_cm_s: 41.1, Year_Construction: 1980, Num_Stories: 2, Structural_System: "Wood", Soil_Type_Vs30_mps: 250 },
  { Building_ID: 45, Latitude: 10.286, Longitude: 123.873, PGA_g: 0.33, PGV_cm_s: 28.2, Year_Construction: 1960, Num_Stories: 2, Structural_System: "Unreinforced Masonry", Soil_Type_Vs30_mps: 250 },
  { Building_ID: 68, Latitude: 10.334, Longitude: 123.9195, PGA_g: 0.47, PGV_cm_s: 47.5, Year_Construction: 2013, Num_Stories: 18, Structural_System: "Reinforced Concrete", Soil_Type_Vs30_mps: 450 },
  { Building_ID: 22, Latitude: 10.335, Longitude: 123.92, PGA_g: 0.46, PGV_cm_s: 45.6, Year_Construction: 2007, Num_Stories: 9, Structural_System: "Reinforced Concrete", Soil_Type_Vs30_mps: 450 }
];

// ---------- 2. API ----------
async function getPredictionFromAPI(building) {
  try {
    const res = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(building)
    });
    if (!res.ok) return { ...building, Predicted_Damage: 'API Error' };
    const json = await res.json();
    return { ...building, Predicted_Damage: json.predicted_damage };
  } catch {
    return { ...building, Predicted_Damage: 'Network Error' };
  }
}

// ---------- 3. COLOURS ----------
const colorMap = {
  'No Damage': '#22c55e', Light: '#84cc16', Moderate: '#f97316',
  Severe: '#ef4444', Collapse: '#171717', 'API Error': '#78716c', 'Network Error': '#78716c'
};

// ---------- 4. MAP + TABLE ----------
document.addEventListener('DOMContentLoaded', () => {
  const simulateBtn = document.getElementById('simulateBtn');
  const resultsDiv = document.getElementById('results');
  const noResultsDiv = document.getElementById('no-results');
  const tableBody = document.getElementById('resultsTableBody');

  let map;
  const markerStore = {};   // Building_ID → {marker, halo}

  simulateBtn.addEventListener('click', async () => {
    simulateBtn.disabled = true;
    simulateBtn.textContent = 'Simulating...';
    const sample = [...buildingData].sort(() => Math.random() - .5).slice(0, 13);
    const preds = await Promise.all(sample.map(getPredictionFromAPI));
    buildTable(preds);
    buildMap(preds);
    resultsDiv.classList.remove('hidden');
    noResultsDiv.classList.add('hidden');
    map.invalidateSize();
    simulateBtn.disabled = false;
    simulateBtn.textContent = 'Simulate Earthquake';
  });

  function buildTable(data) {
    tableBody.innerHTML = '';
    data.forEach(it => {
      const tr = document.createElement('tr');
      tr.id = `row-${it.Building_ID}`;
      tr.className = 'cursor-pointer hover:bg-blue-100';
      tr.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold" style="color:${colorMap[it.Predicted_Damage]}">${it.Predicted_Damage}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${it.Latitude.toFixed(4)}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${it.Longitude.toFixed(4)}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${it.PGA_g}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${it.Soil_Type_Vs30_mps}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${it.Structural_System}</td>`;
      tableBody.appendChild(tr);
    });
    tableBody.onclick = e => {
      const tr = e.target.closest('tr');
      if (!tr || !tr.id.startsWith('row-')) return;
      const id = Number(tr.id.slice(4));
      const {marker} = markerStore[id] || {};
      if (!marker) return;
      map.setView(marker.getLatLng(), 16, {animate: true, duration: .3});
      // flash highlight
      marker.setStyle({weight: 5, color: '#0ea5e9'});
      setTimeout(() => marker.setStyle({weight: 2, color: '#ffffff'}), 1000);
    };
  }

  function buildMap(data) {
    if (map) {
      Object.values(markerStore).forEach(m => map.removeLayer(m.marker));
      Object.values(markerStore).forEach(m => {if(m.halo) map.removeLayer(m.halo);});
    } else {
      const cenLat = data.reduce((s,it)=>s+it.Latitude,0)/data.length;
      const cenLon = data.reduce((s,it)=>s+it.Longitude,0)/data.length;
      map = L.map('map').setView([cenLat, cenLon], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
    }
    // clear old lookup
    Object.keys(markerStore).forEach(k => delete markerStore[k]);

    data.forEach(it => {
      const color = colorMap[it.Predicted_Damage];
      const marker = L.circleMarker([it.Latitude, it.Longitude], {
        radius: 8, color: '#ffffff', weight: 2, fillColor: color, fillOpacity: 0.9
      }).bindPopup(
        `<b>Building ID:</b> ${it.Building_ID}<br><b>Predicted Damage:</b> ${it.Predicted_Damage}<br><b>Structure:</b> ${it.Structural_System}<br><b>Soil (Vs30):</b> ${it.Soil_Type_Vs30_mps}`
      ).addTo(map);

      let halo;
      if (it.Predicted_Damage === 'Severe' || it.Predicted_Damage === 'Collapse') {
        halo = L.circle([it.Latitude, it.Longitude], {
          radius: 400, color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.15, weight: 1
        }).addTo(map);
      }
      markerStore[it.Building_ID] = {marker, halo};
    });
  }
});