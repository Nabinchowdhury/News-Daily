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
        
        <h6 onclick="loadNews('${data.category_id}','${data.category_name}')">${data.category_name} </h6>
        `
        newsItems.appendChild(div)
    }
}

const loadNews = (id, name) => {

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => showNews(data.data, name))
        .catch(error => console.log(error))

}
const showNews = (datas, name) => {
    // console.log(datas)
    // console.log(name)
    const sortedResponse = datas.sort(function (a, b) {
        return parseInt(b.total_view) - parseInt(a.total_view)
    });
    console.log(sortedResponse)
    const foundMsg = document.getElementById('found-msg')
    if (datas && name) {

        foundMsg.classList.remove("d-none")
        foundMsg.innerHTML = `
        <h3>${sortedResponse.length} news found for ${name}</h3>
        `
    }
    else {
        foundMsg.classList.add("d-none")
    }


}

loadNewsItems();







// const sortedResponse = datas.sort(function (a, b) { return parseInt(b.category_id) - parseInt(a.category_id) });
// console.log(sortedResponse)