import {parole} from "./json/parole.json"
import faker from "faker/locale/it"
import {getNewWord, getRandomInt} from './utils'
const regex = /(___([^_]*)___([0-9]*))/g;
let arrayParole = [];
const month = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];

export default class Article {
    constructor(articolo) {
        this.DOM = document.getElementById('articolo');
        this.queriesGIF = articolo.queriesGIF;
        this.queriesFoto = articolo.queriesFoto;
        this.articoloOriginale = articolo;
        this.title = articolo.title.replace(regex, replacer);
        this.caption =  articolo.caption.replace(regex, replacer);
        this.text = articolo.text.replace(regex, replacer);
        this.arrayParole = arrayParole;
        arrayParole = [];
    }

    render(){
        console.log(this.queriesFoto);
        const date = faker.date.past();
        this.DOM.querySelector('.content').innerHTML = `
                <a class="close">black</a><header><p class="date">pubblicato il ${date.getDay() + 2} di ${month[date.getMonth()]}<span class="spacer"></span>Scritto da ${faker.name.findName()}</p><h1>${this.title}</h1><p class="caption">${this.caption}</p></header><main class="content">${this.text}</main>
                `;
        fetch(`https://source.unsplash.com/1200x700/?${this.queriesFoto[getRandomInt(0, this.queriesFoto.length)]}`).then((response) => { 
            if(response.url != 'https://images.unsplash.com/source-404?fit=crop&fm=jpg&h=800&q=60&w=1200'){
                const image = this.DOM.querySelector('#image');
                image.src = response.url;
                setTimeout(() => {
                    image.classList.add('loaded');
                }, 200);
               
            }
        });
        this.DOM.querySelector('.close').addEventListener('click', (e) => this.close(e));
    }

    open(){
        this.DOM.classList.add('open');
        document.body.classList.add('open');
        this.render('dog');
    }

    close(){
        this.DOM.classList.remove('open');
        document.body.classList.remove('open');
        this.DOM.querySelector('#image').classList.remove('loaded');;
    }
}

function replacer(match, p1, p2, p3, offset, string, array) {
      
    let parola = "";
    if(p3 != "" && p3 != null){
        const parolaDaArray = arrayParole[p3 - 1];
        if(parolaDaArray != undefined){
            parola = parolaDaArray;
        }else{
            const parolaRaw =  getNewWord(parole, p2);
            arrayParole[p3 - 1] = parolaRaw;
            parola = parolaRaw
        }
    }else{
        parola = getNewWord(parole, p2);
    }
    return `<span style="color:white;">${p2}_${p3} / ${parola}</span>`;
  }