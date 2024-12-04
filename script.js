/* Implementando o pacote buscador */
class PacoteBuscador {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(endpoint) {
    return fetch(this.baseURL + endpoint).then((response) => response.json());
  }

  put(endpoint, body) {
    return this._send('put', endpoint, body);
  }

  post(endpoint, body) {
    return this._send('post', endpoint, body);
  }

  delete(endpoint, body) {
    return this._send('delete', endpoint, body);
  }

  _send(method, endpoint, body) {
    return fetch(this.baseURL + endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }
}

const API = new PacoteBuscador('https://jsonplaceholder.typicode.com');
const formPostagens = document.querySelector('#posts-form');
const postsBody = document.querySelector('.posts-content-body');
const formTitle = document.querySelector('.content-text #title');
const formParagraph = document.querySelector('.content-text #paragraph');
const ancoras = document.querySelectorAll('.ancora');
console.log(ancoras);

const obterPostagens = () => {
  API.get('/posts').then((data) => {
    const ultimasPostagens = data.slice(0, 8);

    ultimasPostagens.forEach((postagem) => {
      postsBody.insertAdjacentHTML(
        'beforeend',
        `
          <div class="post-card">
            <h2 class="title-card">${postagem.title.slice(0, 25)}</h2>
            <p class="paragraph-card">${postagem.body}</p>
          </div>
        `
      );
    });
  });
};

formPostagens.addEventListener('submit', (event) => {
  event.preventDefault();
  API.post('/posts', {
    title: formTitle.value,
    body: formParagraph.value,
    userId: 1,
  }).then((data) => {
    console.log('Nova postagem adicionada:', data);
  });
});

obterPostagens();

function getDistanceFromTheTop(element) {
  const id = element.getAttribute('href');
  return document.querySelector(id).offsetTop;
}

function nativeScroll(distanceFromTheTop) {
  window.scroll({
    top: distanceFromTheTop,
    behavior: 'smooth',
  });
}

function scrollToSection(event) {
  event.preventDefault();
  const distanceFromTheTop = getDistanceFromTheTop(event.target);
  nativeScroll(distanceFromTheTop);
}

ancoras.forEach((link) => {
  link.addEventListener('click', scrollToSection);
});
