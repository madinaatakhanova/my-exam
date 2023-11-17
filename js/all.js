const apiKey = '06a268060d58402eaf2770d71cee5595';
const pageSize = 6; 
let currentPage = 1;
let currentQuery = 'all'; 

async function fetchData(query, page = 1) {
  const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Ma\'lumotlarni olishda xatolik yuz berdi.');
    }

    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error('Xatolik:', error.message);
    return [];
  }
}

//! Ma'lumotlarni chiqarish
async function displayData(query, page = 1) {
  const articles = await fetchData(query, page);

  const cardsContainer = document.querySelector('.cards');
  cardsContainer.innerHTML = '';

  articles.forEach(article => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = article.urlToImage ? article.urlToImage : './img/hero-img.png';

    const cardText = document.createElement('div');
    cardText.classList.add('card-text');

    const h4 = document.createElement('h4');
    h4.textContent = query;

    const h3 = document.createElement('h3');
    h3.textContent = article.title;

    const p = document.createElement('p');
    p.textContent = article.description ? article.description : '';

    cardText.appendChild(h4);
    cardText.appendChild(h3);
    cardText.appendChild(p);

    card.appendChild(img);
    card.appendChild(cardText);

    cardsContainer.appendChild(card);
  });
}

//todo Pagination yaratish
async function renderPagination(query) {
  const paginationContainer = document.querySelector('.pagenation ul');
  paginationContainer.innerHTML = '';

  const totalArticles = await fetchData(query);
  const totalPages = Math.ceil(totalArticles.length / pageSize);

  const prevButton = document.createElement('li');
  prevButton.textContent = '< Prev';
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayData(query, currentPage);
    }
  });
  paginationContainer.appendChild(prevButton);

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.textContent = i;
    li.addEventListener('click', () => {
      currentPage = i;
      displayData(query, i);
    });
    paginationContainer.appendChild(li);
  }

  const nextButton = document.createElement('li');
  nextButton.textContent = 'Next >';
  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayData(query, currentPage);
    }
  });
  paginationContainer.appendChild(nextButton);
}

displayData(currentQuery);
renderPagination(currentQuery);

// search qismi
const searchInput = document.querySelector('.search');
searchInput.addEventListener('keyup', async event => {
  if (event.key === 'Enter') {
    currentQuery = searchInput.value.trim();
    currentPage = 1;
    displayData(currentQuery);
    renderPagination(currentQuery);
  }
});
