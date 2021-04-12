import {articoli} from "./json/articoli.json"
import articleObj from "./article-object"
import {getRandomInt} from './utils'

(function (document) {
  const fonts = ['Helvetica', 'Times'];
  const colors= ['#08c96b', '#274bf9', '#18ecdc', '#cdff66', '#b0f303', '#FCC300', '#4CFC00', '#1300FC', '#FC00ED', '#FC002E', '#FCED00'];
  const currentColor = colors[getRandomInt(0, colors.length)];
  document.querySelector('html').style.fontFamily = fonts[getRandomInt(0, fonts.length)];
  document.querySelector('html').style.color = currentColor;
  document.querySelector('.img').style.background = currentColor;

  //Alert
  const alert = document.querySelector('.message');
  alert.style.background = currentColor;
  if(!sessionStorage.getItem("alert")){
    sessionStorage.setItem('alert', true);
    alert.addEventListener('click', function(){
      this.style.display = "none";
    });
  }else{
    alert.style.display = "none";
  }

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
      console.log(r);
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
      const thumb = document.createElement('div');
      if(data.data.length != 0){
        articles.arrayArticles[i].image_title = data.data[0].title;
        articles.arrayArticles[i].image = data.data[0].images.original.webp; 
        thumb.style.background = 'url("' + articles.arrayArticles[i].image + '")';
      }
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

  function router(e){
        e.preventDefault();
        if(document.body.classList.contains('open')){  
          const a = document.getElementById('articolo').classList.remove('open');
          document.body.classList.remove('open');
          a.querySelector('#image').classList.remove('loaded');
        }
  }
  window.addEventListener('hashchange', router)
  
})(document);




