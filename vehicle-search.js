const availableCars = [];

const vehicleSearchInput = document.querySelector('.vehicle-search-input');
const vehicleSearchTable = document.querySelector('.vehicle-search-table');
const vehicleSearchList = document.querySelector('.vehicle-search-list');
const vehicleSearchMessage = document.querySelector('.vehicle-search-message');

function normalizeSearchText(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR');
}

function renderVehicleSearch() {
  const query = normalizeSearchText(vehicleSearchInput.value.trim());
  vehicleSearchList.replaceChildren();
  vehicleSearchTable.hidden = true;
  vehicleSearchMessage.hidden = true;

  if (!query) {
    return;
  }

  const matchingCars = availableCars.filter(car => (
    normalizeSearchText(`${car.make} ${car.model}`).includes(query)
  ));

  if (matchingCars.length === 0) {
    vehicleSearchMessage.textContent = availableCars.length === 0
      ? 'Nenhum veículo cadastrado no estoque.'
      : 'Nenhum veículo encontrado para essa busca.';
    vehicleSearchMessage.hidden = false;
    return;
  }

  matchingCars.forEach(car => {
    const row = document.createElement('tr');
    const makeCell = document.createElement('td');
    const modelCell = document.createElement('td');

    makeCell.textContent = car.make;
    modelCell.textContent = car.model;
    row.append(makeCell, modelCell);
    vehicleSearchList.append(row);
  });

  vehicleSearchTable.hidden = false;
}

vehicleSearchInput.addEventListener('input', renderVehicleSearch);
