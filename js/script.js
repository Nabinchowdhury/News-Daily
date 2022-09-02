const loadNewsItems = () => {
    const url = "https://openapi.programming-hero.com/api/news/categories"
    fetch(url)
        .then(res => res.json())
        .then(data => showNewsItems(data.data.news_category))
        .catch(error => console.log(error))
}
const showNewsItems = (datas) => {
    const newsItems = document.getElementById("news-items")
    for (const data of datas) {
        // console.log(data.category_name)
        const div = document.createElement('div')
        div.classList.add("d-inline-flex", "px-4")
        div.innerHTML = `
        
        <h6 onclick="loadNews('${data.category_id}')">${data.category_name} </h6>
        `
        newsItems.appendChild(div)
    }
}

const loadNews = (id) => {

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(datas => console.log(datas))
}

loadNewsItems();







// const sortedResponse = datas.sort(function (a, b) { return parseInt(b.category_id) - parseInt(a.category_id) });
// console.log(sortedResponse)