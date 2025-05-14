// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Variables globales
    let carrito = [];
    const modal = document.getElementById('carrito-modal');
    const contadorCarrito = document.getElementById('contador-carrito');
    const productosCarrito = document.getElementById('productos-carrito');
    const totalPrecio = document.getElementById('total-precio');
    const buscador = document.getElementById('buscador');
    const productos = document.querySelectorAll('.producto');

    // Funciones del carrito
    function actualizarCarrito() {
        contadorCarrito.textContent = carrito.length;
        productosCarrito.innerHTML = '';
        let total = 0;

        carrito.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'producto-carrito';
            div.innerHTML = `
                <span>${item.nombre} - $${item.precio}</span>
                <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
            `;
            productosCarrito.appendChild(div);
            total += parseFloat(item.precio);
        });

        totalPrecio.textContent = total.toFixed(2);
    }

    // Función para agregar al carrito
    window.agregarAlCarrito = function(nombre, precio) {
        carrito.push({ nombre, precio });
        actualizarCarrito();
        
        // Animación del contador del carrito
        contadorCarrito.style.transform = 'scale(1.5)';
        setTimeout(() => {
            contadorCarrito.style.transform = 'scale(1)';
        }, 200);
    };

    // Función para eliminar del carrito
    window.eliminarDelCarrito = function(index) {
        carrito.splice(index, 1);
        actualizarCarrito();
    };

    // Función de búsqueda
    function buscarProductos(termino) {
        termino = termino.toLowerCase();
        productos.forEach(producto => {
            const nombre = producto.querySelector('h3').textContent.toLowerCase();
            const descripcion = producto.querySelector('p').textContent.toLowerCase();
            
            if (nombre.includes(termino) || descripcion.includes(termino)) {
                producto.style.display = 'block';
                producto.style.animation = 'fadeIn 0.5s ease-in';
            } else {
                producto.style.display = 'none';
            }
        });
    }

    // Eventos del buscador
    buscador.addEventListener('input', (e) => {
        buscarProductos(e.target.value);
    });

    document.getElementById('btn-buscar').addEventListener('click', () => {
        buscarProductos(buscador.value);
    });

    // Eventos del carrito
    document.querySelector('.carrito-icono').addEventListener('click', () => {
        modal.style.display = 'block';
    });

    document.querySelector('.cerrar-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    document.getElementById('comprar-todo').addEventListener('click', () => {
        if (carrito.length > 0) {
            alert('¡Gracias por tu compra! Total: $' + totalPrecio.textContent);
            carrito = [];
            actualizarCarrito();
            modal.style.display = 'none';
        } else {
            alert('Tu carrito está vacío');
        }
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Eventos de los botones de compra
    const botonesComprar = document.querySelectorAll('.producto button');
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', function() {
            const producto = this.parentElement;
            const nombreProducto = producto.querySelector('h3').textContent;
            const precio = this.getAttribute('data-precio');
            
            agregarAlCarrito(nombreProducto, precio);
            
            // Animación del botón
            const textoOriginal = this.textContent;
            this.textContent = 'Agregado ✓';
            this.style.backgroundColor = '#28a745';
            this.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                this.textContent = textoOriginal;
                this.style.backgroundColor = '';
                this.style.transform = 'scale(1)';
            }, 2000);
        });
    });

    // Navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const seccion = this.getAttribute('data-seccion');
            
            if (seccion === 'carrito') {
                modal.style.display = 'block';
            } else {
                alert(`Sección ${seccion} en desarrollo`);
            }
        });
    });

    // Efecto hover en imágenes
    const imagenes = document.querySelectorAll('.producto img');
    imagenes.forEach(img => {
        img.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.0) rotate(2deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Animación inicial de los productos
    productos.forEach((producto, index) => {
        producto.style.animationDelay = `${index * 0.1}s`;
    });
}); 