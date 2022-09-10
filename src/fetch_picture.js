const BACK_END_URL =  'https://pixabay.com/api/'
const API_KEY = '29743912-8e7685db13f3781653d214456'

function fetchImg(qName) {
  return fetch(`${BACK_END_URL}/?key=${API_KEY}&q=${qName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`)
      .then(response => {
        if (response.status === 404) {
          return Promise.reject(new Error());
        }
      return response.json()
  });
}

// var API_KEY = '29743912-8e7685db13f3781653d214456';
// var URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');
// $.getJSON(URL, function(data){
// if (parseInt(data.totalHits) > 0)
//     $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
// else
//     console.log('No hits');
// });


// const  fetchImg = async(qName) => {
//   const fetch = await fetch(`${BACK_END_URL}/?key=${API_KEY}&q=${qName}&image_type=photo&orientation=horizontal&safesearch=true`);
//   const img = await response.json()
//   return console.log(img)
// }

// fetchImg().then(img => console.log(img))

export { fetchImg }
