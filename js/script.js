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
        // console.log(typeof a.total_view)
        // console.log(b.total_view)
        // if (a.total_view != Number && b.total_view != Number) {

        // }
        // else { 
        return parseInt(b.total_view) - parseInt(a.total_view)
        // }

    });
    console.log(sortedResponse)

    const foundMsg = document.getElementById('found-msg')
    const newsCard = document.getElementById("news-card")
    newsCard.innerHTML = ``


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

    for (const each of sortedResponse) {
        // console.log(each)

        const { author, details, thumbnail_url, title, total_view } = each
        // console.log(author) 
        // console.log(details.length)
        const { name, published_date, img } = author

        const news = document.createElement('div')
        news.classList.add('card', 'mb-3', "border-0")
        news.innerHTML = `
        <div class="row g-0 ">
        <div class="col-md-3">
                        <img src="${thumbnail_url}" class="img-fluid rounded-start w-100 m-3" style="height: 300px;" "alt="...">
                    </div>
                    <div class="col-md-9">
                        <div class="card-body ms-5 mt-5" >
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${details.length > 200 ? details.slice(0, 200) + "..." : details}</p>
                               <div class="d-flex">
                            <div class="d-flex align-items-center  w-25">
                            <img src="${img}" class="rounded-circle"
                                style="height: 50px; width:50px;" alt="">
                                <div class="ms-2">
                                <p class="mb-0 mt-2">${name ? name : "Anonymous Writer"}</p>
                            <p class="ms-2">${published_date ? published_date.slice(0, 10) : "No Date Found"}</p>
                                </div>
                            
                        </div>

                        <div class="d-flex align-items-center justify-content-center w-25">
                            <i class="fa-solid fa-eye"></i>
                            
                            <p class="ms-2 mt-2" id="views">${total_view ? total_view : "No Views"}</p>
                        </div>
                        <div class="d-flex align-items-center justify-content-center w-25">
                            <i class="fa-regular fa-star-half-stroke"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="d-flex align-items-center justify-content-center w-25">
                            <i class="fa-solid fa-arrow-right"></i>
                        </div>
                    </div>
                        </div>
                    </div>
                    </div>
        `
        newsCard.appendChild(news)


    }


}

loadNewsItems();







// const sortedResponse = datas.sort(function (a, b) { return parseInt(b.category_id) - parseInt(a.category_id) });
// console.log(sortedResponse)