const form = document.getElementById('create-form');
const itemList = document.getElementById('item-list');
const storageKey = 'crudItems';
let items = JSON.parse(localStorage.getItem(storageKey)) || [];

// establece una base para la manipulación de datos en la  aplicación 

function updateItemList() {
  itemList.innerHTML = '';
  items.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerHTML = `
      ${item.product} - $${item.price} - ${item.brand}
      <button class="btn btn-secondary btn-sm ms-2" onclick="editItem(${index})">Editar</button>
      <button class="btn btn-danger btn-sm ms-2" onclick="deleteItem(${index})">Borrar</button>
    `;
    itemList.appendChild(listItem);
  });
}

//  se utiliza funcion  dinámicamente actualizar y mostrar la lista de elementos en la interfaz de usuario

function editItem(index) {
  const newProduct = prompt('Nuevo producto:');
  const newPrice = prompt('Nuevo precio:');
  const newBrand = prompt('Nueva marca:');
  
  if (newProduct && newPrice && newBrand) {
    items[index].product = newProduct;
    items[index].price = parseFloat(newPrice);
    items[index].brand = newBrand;
    localStorage.setItem(storageKey, JSON.stringify(items));
    updateItemList();
  }
}
// la función editItem(index) permite al usuario editar un elemento existente en la lista proporcionando nuevos valores para el producto, precio y marca.

function deleteItem(index) {
  items.splice(index, 1);
  localStorage.setItem(storageKey, JSON.stringify(items));
  updateItemList();
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const product = document.getElementById('product').value;
  const price = document.getElementById('price').value;
  const brand = document.getElementById('brand').value;
  
  // este fragmento de código permite controlar el proceso de envío del formulario, capturar los valores ingresados por el usuario en los campos de producto, precio y marca
  if (product && price && brand) {
    items.push({ product, price: parseFloat(price), brand });
    localStorage.setItem(storageKey, JSON.stringify(items));
    updateItemList();
    
    document.getElementById('product').value = '';
    document.getElementById('price').value = '';
    document.getElementById('brand').value = '';
  }
});

updateItemList();
