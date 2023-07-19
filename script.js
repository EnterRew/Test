let blockCounter = 0;

function addImage(block) {
  let fileInput = document.getElementById('fileInput');
  let file = fileInput.files[0];
  let reader = new FileReader();
  reader.onload = function(event) {
    let image = document.createElement('img');
    image.src = event.target.result;
    block.querySelector('#imageContainer').appendChild(image);
    block.querySelector('.addButton').style.display = 'none';
    saveBlockData(block);
  };
  reader.readAsDataURL(file);
}

function replaceImage(block) {
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = function(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      let image = block.querySelector('#imageContainer').getElementsByTagName('img')[0];
      image.src = reader.result;
      saveBlockData(block);
      block.querySelector('.addButton').style.display = 'none';
    };
  };
  input.click();
}

function changeName(block) {
  let newName = prompt('Введите новое имя:');
  block.querySelector('#name').innerHTML = newName;
  saveBlockData(block);
}
function changeDescription(block) {
  let newDescription = prompt('Введите новое описание:');
  block.querySelector('#description').innerHTML = newDescription;
  saveBlockData(block);
}
function changePrice(block) {
  let newPrice = prompt('Введите новую цену:');
  block.querySelector('#price').innerHTML = newPrice;
  saveBlockData(block);
}

function addBlock() {
  if (document.getElementById('container') !== null) {
    let blockId = `myBlock${blockCounter++}`;
    
    let block = document.createElement('div');
    block.innerHTML = `
      <div id="imageContainer">
        <img src="" />
      </div>
      <p id="name">Название</p>
      <p id="description">Описание</p>
      <p id="price">Цена</p>
      <button class="addButton" onclick="addImage(this.parentElement)">Добавить картинку</button>
      <button onclick="replaceImage(this.parentElement)">Заменить картинку</button>
      <button onclick="changeName(this.parentElement)">Изменить название</button>
      <button onclick="changeDescription(this.parentElement)">Изменить описание</button>
      <button onclick="changePrice(this.parentElement)">Изменить цену</button>
      <button onclick="removeBlock()">Удалить блок</button>
    `;
    block.setAttribute('id', blockId);
    document.getElementById('container').appendChild(block);

    // Save the block data to localStorage.
    saveBlockData(block);
  } else {
    alert('Элемент не найден!');
  }
}

function removeBlocks() {
  const blockInfo = localStorage.getItem('blocksData');
  
  if (blockInfo) {
    localStorage.removeItem('blocksData');
    
    const block = event.target.parentNode;
    
    block.remove();
  }
}

function removeBlock() {
  const blockInfo = localStorage.getItem('blockData');
  
  if (blockInfo) {
    localStorage.removeItem('myBlock${blockId}');
    
    const block = document.getElementById(`myBlock${blockId}`);
    
    if (block) {
      block.remove();
    }
  }
}

function deleteBlock(block) {
  if (block !== null) {
    // Remove the block from the DOM.
    block.remove();

    // Remove the block data from localStorage.
    removeBlockData(block.id);
  }
}
// Remove the data of a single block from localStorage.
function removeBlockData(blockId) {
  
  // Get the current blocks data from localStorage.
  const blocksData = JSON.parse(localStorage.getItem('blocksData')) || {};
  
  // Remove the data for this specific block.
  delete blocksData[blockId];
  localStorage.removeItem("blocks");
  
  // Save the updated blocks data back to localStorage.
  localStorage.setItem('blocksData', JSON.stringify(blocksData));
}

function removeBlockFromLocalStorage(blockId) {
  // Получаем текущие данные из local storage
  const blocks = JSON.parse(localStorage.getItem('blocks')) || [];

  // Фильтруем блоки, исключая блок с указанным идентификатором
  const updatedBlocks = blocks.filter((block) => block.id !== blockId);

  // Обновляем данные в local storage
  localStorage.setItem('blocks', JSON.stringify(updatedBlocks));
}

// Пример использования функции
const blockIdToRemove = 'block-12345';
removeBlockFromLocalStorage(blockIdToRemove);

// Save the data of a single block to localStorage.
function saveBlockData(block) {
  
  const blockData = {
    innerHTML: block.innerHTML,
    imageSrc: block.querySelector('#imageContainer').querySelector('img').src,
    name: block.querySelector('#name').innerHTML,
    description: block.querySelector('#description').innerHTML,
    price: block.querySelector('#price').innerHTML,
  };
  
  // Get the current blocks data from localStorage.
  const blocksData = JSON.parse(localStorage.getItem('blocksData')) || {};
  // Update the data for this specific block.
  blocksData[block.id] = blockData;
  
  // Save the updated blocks data back to localStorage.
  localStorage.setItem('blocksData', JSON.stringify(blocksData));
}


window.onload = function() {
  
  // Get the current blocks data from localStorage.
  const blocksData = JSON.parse(localStorage.getItem('blocksData')) || {};
  
  // If there is any data in localStorage, load the blocks from it.
  if (Object.keys(blocksData).length > 0) {
    
    for (const blockId in blocksData) {
      
      const blockData = blocksData[blockId];
      
      const block = document.createElement('div');
      block.innerHTML = blockData.innerHTML;
      block.querySelector('#imageContainer').querySelector('img').src = blockData.imageSrc;
      block.querySelector('#name').innerHTML = blockData.name;
      block.querySelector('#description').innerHTML = blockData.description;
      block.querySelector('#price').innerHTML = blockData.price;
      
      document.getElementById('container').appendChild(block);
    }
  }
};