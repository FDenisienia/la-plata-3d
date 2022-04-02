const contenedorProductos = document.getElementById('productos-contenedor');

const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contador-carrito');

const precioTotal = document.getElementById('precio-total');



let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

stockFilamentos.forEach ((producto) => {
    const crearDiv = document.createElement('div')
    crearDiv.classList.add('col-12', 'col-sm-6', 'col-lg-4', 'col-xxl-3', 'd-flex', 'flex-column', 'align-items-center')

    crearDiv.innerHTML = `  
        <div class="card mt-2 mb-2" style="width: 21rem;">  
        <img class="card-img-top" src="${producto.img}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title text-center"><strong>${producto.titulo}</strong></h5>
        <ul class="text-start">
                
            <li class="mt-2"> Peso: ${producto.peso}Kg </li>
            <li class="mt-2"> Grosor: ${producto.grosor}mm </li>
            <li class="mt-2"> Temperatura de extrusión: ${producto.tempEMin}-${producto.tempEMax}ºC </li>
            <li class="mt-2"> Temperatura de cama: ${producto.tempC}ºC</li>
                                                
        </ul>
        <p class="card-text"><strong>$ ${producto.precio}</strong></p>
        <a id="agregar${producto.id}" class="btn btn-secondary">Agregar al carrito</a>
        </div>
        </div>
        `    

        contenedorProductos.appendChild(crearDiv)


        const boton = document.getElementById(`agregar${producto.id}`)

        boton.addEventListener('click', () => {
            agregarAlCarrito(producto.id)
        })

})


const agregarAlCarrito = (prodID) => {
    const existe = carrito.some (prod => prod.id === prodID)

    if(existe){
        const prod = carrito.map (prod => {
            if (prod.id === prodID){
                prod.cantidad++
            }
        })
    } else {
        
        const item = stockFilamentos.find( (prod) => prod.id === prodID)
    
        carrito.push(item)
    }

    actualizarCarrito()

}

const eliminarDelCarrito = (prodID) => {
    const existe = carrito.some (prod => prod.id === prodID)

    if(existe){
        const prod = carrito.map (prod => {
            if (prod.id === prodID) {
                prod.cantidad--
            }

            if(prod.cantidad === 0) {
                const item = carrito.find((prod) => prod.id === prodID)

                const indice = carrito.indexOf(item)

                carrito.splice(indice, 1)

                actualizarCarrito()
            }

            if(prod.cantidad <= 0) {
                prod.cantidad = 1;
            }
        })
    }

    localStorage.removeItem('carrito', JSON.stringify(carrito))

    actualizarCarrito()

}




const eliminarelCarrito = (prodID) => {
    const item = carrito.find((prod) => prod.id === prodID)

    const indice = carrito.indexOf(item)

    carrito.splice(indice, 1)

    actualizarCarrito()

    localStorage.removeItem('carrito', JSON.stringify(carrito))
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('w-100')
        div.innerHTML = `
        
        <div class="d-flex justify-content-around align-items-center mt-1">
            <div class="col-3 text-center">
            <p class="mt-3">${prod.titulo}</p>
            </div>

            <div class="col-2 text-center">
            <img class="ms-1 w-100" src=${prod.img}>
            </div>
            
            <div class="col-3 text-center"><p class="mt-3">Precio: $${prod.precio}</p></div>
            
            <div class="col-3 text-center">
            <p class="mt-3">Cantidad: <span id="cantidad">${prod.cantidad}</span></p></div>
            
            <div class="col-1 text-center">
            <button onclick = "eliminarDelCarrito(${prod.id})" class="btn btn-danger">X</button>
            </div>
            

        </div>
        <hr>
        `

        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })

    contadorCarrito.innerText = carrito.length
    precioTotal.innerHTML = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)
}

  