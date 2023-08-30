document.addEventListener('DOMContentLoaded', function () {
    // ... (código anterior)

    const iconoCarrito = document.querySelector('.icon-cart');
    iconoCarrito.addEventListener('click', mostrarCarrito);
    
    // ... (resto del código)
});
function mostrarCarrito() {
    const carritoProductos = document.querySelector('.container-cart-products');
    carritoProductos.classList.toggle('hidden-cart');
}

document.addEventListener('DOMContentLoaded', function () {
    const botonesAñadir = document.querySelectorAll('.info-product button');
    const contadorProductos = document.getElementById('contador-productos');
    const carritoProductos = document.querySelector('.container-cart-products');
    const totalPagar = document.querySelector('.total-pagar');

    let carrito = [];
    let total = 0;

    botonesAñadir.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            const producto = boton.parentElement.parentElement;
            const titulo = producto.querySelector('h2').textContent;
            const precio = parseFloat(producto.querySelector('.price').textContent.replace('$', '').replace(',', ''));

            carrito.push({ titulo, precio });
            total += precio;

            actualizarCarrito();
        });
    });

    function actualizarCarrito() {
        contadorProductos.textContent = carrito.length;
        totalPagar.textContent = '$' + total.toLocaleString();
        carritoProductos.innerHTML = '';

        carrito.forEach((item, index) => {
            const productoCarrito = document.createElement('div');
            productoCarrito.classList.add('cart-product');

            const infoProductoCarrito = document.createElement('div');
            infoProductoCarrito.classList.add('info-cart-product');

            const cantidadProductoCarrito = document.createElement('span');
            cantidadProductoCarrito.classList.add('cantidad-producto-carrito');
            cantidadProductoCarrito.textContent = carrito.filter(cartItem => cartItem.titulo === item.titulo).length;

            const tituloProductoCarrito = document.createElement('p');
            tituloProductoCarrito.classList.add('titulo-producto-carrito');
            tituloProductoCarrito.textContent = item.titulo;

            const precioProductoCarrito = document.createElement('span');
            precioProductoCarrito.classList.add('precio-producto-carrito');
            precioProductoCarrito.textContent = '$' + item.precio.toLocaleString();

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.addEventListener('click', () => {
                carrito.splice(index, 1);
                total -= item.precio;
                actualizarCarrito();
            });

            infoProductoCarrito.appendChild(cantidadProductoCarrito);
            infoProductoCarrito.appendChild(tituloProductoCarrito);
            infoProductoCarrito.appendChild(precioProductoCarrito);
                infoProductoCarrito.appendChild(botonEliminar);

            productoCarrito.appendChild(infoProductoCarrito);

            carritoProductos.appendChild(productoCarrito);
        });
    }
});
