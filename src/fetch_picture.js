const BACK_END_URL =  'https://pixabay.com/api/'
const API_KEY = '29743912-8e7685db13f3781653d214456'

export default class NewsApiService {
  constructor() {
    this.inputValue = '';
    this.page = 1;
  }
  
  fetchArticles(inputValue) {
    console.log(this)
    // const options = {
    //   headers: {
    //     Autorization: `29743912-8e7685db13f3781653d214456` 
    //   },
    // }
    const url = `${BACK_END_URL}/?key=${API_KEY}&q=${this.inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page = ${this.page}`
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.incrementPage();

        return data.hits
      })
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

