import {articoli} from "./json/articoli.json"
import articleObj from "./article-object"
import {getRandomInt} from './utils'

(function (document) {
  const alert = document.querySelector('.message');
  alert.addEventListener('click', function(){
    this.style.display = "none";
  });

  const fonts = ['Helvetica', 'Times'];
  const colors= ['#08c96b', '#274bf9', '#18ecdc', '#cdff66', '#b0f303', '#FCC300', '#4CFC00', '#1300FC', '#FC00ED', '#FC002E', '#FCED00'];
  const currentColor = colors[getRandomInt(0, colors.length)];
  document.querySelector('html').style.fontFamily = fonts[getRandomInt(0, fonts.length)];
  document.querySelector('html').style.color = currentColor;
  document.querySelector('.img').style.background = currentColor;
  //GIF
  const giphy = {
    baseURL: 'https://api.giphy.com/v1/gifs/',
    apiKey: '6udFbZ9yasgyoaTiQk9zPM8k5vzaVnPk',
    type: 'search',
    limit: 1,
  };
  
  const articles = {
    length: 8,
    indexs: [],
    arrayArticles: []
  };

  for (let i = 0; i < articles.length; i++) {
    const random = null;
    const isNew = false;
    while(!isNew){
      const r = getRandomInt(0, articoli.length);
      if(!articles.indexs.includes(r)){
        articles.indexs.push(r);
        random = r;
        isNew = true;
      }
    }
    const articolo = articoli[random];

    //LOAD ARTICLES
    articles.arrayArticles[i] = new articleObj(articolo);

    //LOAD GIF
    const offset = getRandomInt(0, 100);
    const requestURL = encodeURI(
      `${giphy.baseURL}${giphy.type}?api_key=${giphy.apiKey}&limit=${giphy.limit}&offset=${offset}&q=${articles.arrayArticles[i].queriesGIF[0]}`
    );
    const request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
      const data = request.response;
      const imgUrl = data.data[0].images.original.webp;
      const thumb = document.createElement('div');
      thumb.style.background = 'url("' + imgUrl + '")';
      thumb.classList = 'article square';
      thumb.innerHTML = `<div class="inner">
                          <h1>${articles.arrayArticles[i].title}</h1>
                          <p class="caption">${articles.arrayArticles[i].caption}</p>
                        </div>`;
      thumb.addEventListener('click', () => articles.arrayArticles[i].open());
      document.querySelector('.articoli').insertBefore(thumb, document.querySelector('.articoli footer'));
    };
  }
  console.log(articles.arrayArticles);
  
})(document);




