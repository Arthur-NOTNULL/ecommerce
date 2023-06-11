let products;
let query

window.onload = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    query = urlParams.get('query')

    document.getElementById("pesquisa").addEventListener("click", pesquisa)
    if(query == null){ 
        await getAllProducts()
        showData()
     }else{
        await getSearch()
        showData()
     }
}

const getAllProducts = async () => {
    await fetch(`https://diwserver.vps.webdock.cloud/products?page=2&page_items=100`)
            .then(res=>res.json())
            .then(json=>products = json.products)
}

const showData = () => {
    const list = document.getElementById("cards")

    products.forEach(product => {
        const card = setUpCard(product)
        list.appendChild(card)
    })
}

const setUpCard = (product) => {
    const li = document.createElement("li")

    const a = document.createElement("a")
    a.className = "card"
    a.href = `detalhes.html?id=${product.id}`

    const img = document.createElement("img")
    img.src = product.image
    img.className = "card__image"

    const divOverlay = document.createElement("div")
    divOverlay.className = "card__overlay"

    const divHeader = document.createElement("div")
    divHeader.className = "card__header"

    const divHeaderText = document.createElement("div")
    divHeaderText.className = "card__header-text"

    const h3 = document.createElement("h3")
    h3.className = "card__title"
    h3.innerHTML = product.title

    const span = document.createElement("span")
    span.className = "card__status"
    span.className = "card__status"
    span.innerHTML = `<span id="stars">${estrelas(product.rating.rate)}</span> ${product.rating.rate} - ${product.rating.count} avaliações`

    const svg = document.createElement("svg")
    svg.className = "card__arc"
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg")
    svg.appendChild(document.createElement("path"))

    const p = document.createElement("p")
    p.className = "card__description"
    p.innerHTML = `<strong>Cor Principal:</strong> ${product.baseColour}`

    divHeaderText.appendChild(h3)
    divHeaderText.appendChild(span)

    divHeader.appendChild(svg)
    divHeader.appendChild(divHeaderText)

    divOverlay.appendChild(divHeader)
    divOverlay.appendChild(p)

    a.appendChild(img)
    a.appendChild(divOverlay)

    li.appendChild(a)
    
    return li
}

const pesquisa = async () => {
    const input = document.getElementById("boxpesquisa")
    console.log(input.value)
    if(input.value.trim() == ""){
        query = null
        window.location.href = `/index.html`
    }else{
        window.location.href = `/index.html?query=${input.value}`
    }
}

const getSearch = async () => {
    const input = document.getElementById("boxpesquisa")
    input.value = query
    await fetch(`https://diwserver.vps.webdock.cloud/products/search?query=${query}`)
    .then(res=>res.json())
    .then(json=> products = json)
}