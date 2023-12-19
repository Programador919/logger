const socket = io()

document.getElementById('prod-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const idInput = document.getElementById('productId');
    const id = idInput.value;
    idInput.value = '';

    const descInput = document.getElementById('desc');
    const description = descInput.value;
    descInput.value = '';

    const imgInput = document.getElementById('img');
    const image = imgInput.value;
    imgInput.value = '';

    const priceInput = document.getElementById('price');
    const price = priceInput.value;
    priceInput.value = '';

    const stockInput = document.getElementById('stock');
    const stock = stockInput.value;
    stockInput.value = '';

    const catInput = document.getElementById('cat');
    const category = catInput.value;
    catInput.value = '';

    const availableInput = document.getElementById('available');
    const available = availableInput.value;

    const eliminarProductoCheckbox = document.getElementById('eliminarProducto');
    const eliminarProducto = eliminarProductoCheckbox.checked;

    if (eliminarProducto) {
        // Enviar mensaje si el checkbox está seleccionado
        socket.emit("delProd", { id: id });
    }else{
        const newProduct = {
            description: description,
            image:image,
            price: price,
            stock: stock,
            category: category,
            availability: available
        }
    
        if (id === '') {
            // Si el ID está vacío, es un nuevo producto (crear)
            socket.emit("newProd", newProduct);
        } else {
            // Si el ID tiene un valor, es un producto existente (actualizar)
            socket.emit("updProd", { id: id, newProduct });
        }
    }
});

socket.on("success", (data) => {
    Swal.fire({
        icon: 'success',
        title: data,
        text: `A continuación verás la lista actualizada`,
        confirmButtonText: 'Aceptar', // Cambia el texto del botón Aceptar
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload(); // Recarga la página cuando se hace clic en Aceptar
        }
    });
});

