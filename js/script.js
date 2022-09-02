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

    const sortedResponse = datas.sort(function (a, b) {
        return parseInt(b.total_view) - parseInt(a.total_view)
    });
    console.log(sortedResponse)

    const foundMsg = document.getElementById('found-msg')
    const newsCard = document.getElementById("news-card")


    if (datas && name) {

        foundMsg.classList.remove("d-none")
        foundMsg.innerHTML = `
        <h3>${sortedResponse.length} news found for ${name}</h3>
        `
    }
    else {
        foundMsg.classList.add("d-none")
        newsCard.innerHTML = ""
    }

    // for (const each of sortedResponse) {
    //     console.log(each)
    //     const news = document.createElement('div')
    //     news.classList.add('card', 'mb-3', "border-0")
    //     news.innerHTML = `
    //     <div class="row g-0 ">
    //     <div class="col-md-4">
    //                     <img src="${each.thumbnail_url}" class="img-fluid rounded-start w-75 m-3" style="height: 300px;" "alt="...">
    //                 </div>
    //                 <div class="col-md-8">
    //                     <div class="card-body">
    //                         <h5 class="card-title">Card title</h5>
    //                         <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
    //                             additional content. This content is a little bit longer.</p>
    //                         <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    //                     </div>
    //                 </div>
    //                 </div>
    //     `
    //     newsCard.appendChild(news)

    // }


}

loadNewsItems();







// const sortedResponse = datas.sort(function (a, b) { return parseInt(b.category_id) - parseInt(a.category_id) });
// console.log(sortedResponse)