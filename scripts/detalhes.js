let product;

window.onload = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const id = urlParams.get('id')

    const searchString = window.location.search;
    const stringParam = new URLSearchParams(searchString)
    query = stringParam.get('query')

    document.getElementById("pesquisa").addEventListener("click", searchDetail)
    if(query == null){ 
        await getDetails(id)
        showDetails()
     }else{
        await getSearchDetail()
        showData()
     }
}

const getDetails = async (id) => {
    let url = `https://diwserver.vps.webdock.cloud/products/${id}`
    
    await fetch(url)
        .then(res=>res.json())
        .then(json=>{
            product = json
            console.log(product)
            showDetails()
        })
}

const showDetails = () => {
    const pageTitle = document.getElementById("pageTitle")
    pageTitle.innerHTML = product.title

    const title = document.getElementById("title")
    title.innerHTML = product.title

    const img = document.getElementById("img")
    img.src = product.image

    const rating = document.getElementById("rating")
    rating.innerHTML = `<span id="stars">${estrelas(product.rating.rate)}</span> <span id="ratingDescription">${product.rating.rate} - ${product.rating.count} avaliações</span>`

    const description = document.getElementById("description")
    description.innerHTML = product.description

    const price = document.getElementById("price")
    price.innerHTML = `R$${product.price},00`
}

const estrelas = (quantidade) => {
    let string = ""
    for(let i = 0; i < quantidade; i++){
        string += "★"
    }
    return string
}

const searchDetail = async () => {
    const input = document.getElementById("boxpesquisa")
    console.log(input.value)
    if(input.value.trim() == ""){
        query = null
        window.location.href = `/index.html`
    }else{
        window.location.href = `/index.html?query=${input.value}`
    }
}

const getSearchDetail = async () => {
    const input = document.getElementById("boxpesquisa")
    input.value = query

    await fetch(`https://diwserver.vps.webdock.cloud/products/search?query=${query}`)
    .then(res=>res.json())
    .then(json=> products = json)
}