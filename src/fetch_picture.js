const BACK_END_URL =  'https://pixabay.com/api/'
const API_KEY = '29743912-8e7685db13f3781653d214456'

export default class NewsApiService {
  constructor() {
    this.inputValue = '';
    this.page = 1;
  }
  
  async fetchArticles() {
    console.log(this)
    // const options = {
    //   headers: {
    //     Autorization: `29743912-8e7685db13f3781653d214456` 
    //   },
    // }
    const url = `${BACK_END_URL}/?key=${API_KEY}&q=${this.inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.incrementPage();
    return data.hits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get value(){
    return this.inputValue;
  }

  set value(newValue) {
    this.inputValue = newValue;
  }
}

