const carritoToggle = document.querySelector("#boton-carrito")

const carritoMenu = document.querySelector("#contenedor-carrito")

carritoToggle.addEventListener("click", () => {

    carritoMenu.classList.toggle("carrito-contenedor-mostrar");
    
})