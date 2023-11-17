const apiKey = '06a268060d58402eaf2770d71cee5595';
let query = 'business'; // Boshlang'ich so'rov
const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

const pageSize = 5; // Sahifadagi elementlar soni

async function fetchData(page) {
  try {
    const response = await fetch(`${apiUrl}&pageSize=${pageSize}&page=${page}`);

    if (!response.ok) {
      throw new Error('Ma\'lumotlarni olishda xatolik yuz berdi.');
    }

    const data = await response.json();
    const articles = data.articles;

    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = ''; // Sahifani qayta yaratishdan oldin bo'shatalab turib, yangi elementlarni qo'shish uchun

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

    // Pagination qismini yaratish
    const paginationContainer = document.querySelector('.pagenation ul');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(data.totalResults / pageSize);
    const limitPages = 10; // Faqatgina 10 ta sahifa chiqarish

    const start = Math.max(1, page - Math.floor(limitPages / 2));
    const end = Math.min(totalPages, start + limitPages - 1);

    const prevButton = document.createElement('li');
    prevButton.textContent = '< Prev';
    prevButton.addEventListener('click', () => {
      if (page > 1) {
        fetchData(page - 1);
      }
    });
    paginationContainer.appendChild(prevButton);

    for (let i = start; i <= end; i++) {
      const li = document.createElement('li');
      li.textContent = i;

      li.addEventListener('click', () => {
        fetchData(i);
      });

      paginationContainer.appendChild(li);
    }

    const nextButton = document.createElement('li');
    nextButton.textContent = 'Next >';
    nextButton.addEventListener('click', () => {
      if (page < totalPages) {
        fetchData(page + 1);
      }
    });
    paginationContainer.appendChild(nextButton);
  } catch (error) {
    console.error('Xatolik:', error.message);
  }
}

// Boshlang'ich sahifani yuklash
fetchData(1); // 1-raqamli sahifa

// Qidiruvni qo'shish
const searchInput = document.querySelector('.search');
searchInput.addEventListener('keydown', async event => {
  if (event.key === 'Enter') {
    query = searchInput.value.trim();
    fetchData(1); // Yangi qidiruvni boshlash
  }
});
