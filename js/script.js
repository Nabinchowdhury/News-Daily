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
        console.log(data.category_name)
        const div = document.createElement('div')
        div.classList.add("d-inline-flex", "pe-5")
        div.innerHTML = `
        
        <h5>${data.category_name} </h5>
        `
        newsItems.appendChild(div)
    }
}

loadNewsItems();