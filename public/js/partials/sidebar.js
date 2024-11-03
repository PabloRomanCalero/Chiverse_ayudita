document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropdown > a");
    const submenu = document.querySelector(".submenu");

    dropdown.addEventListener("click", function (event) {
        event.preventDefault();
        submenu.style.display = submenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target) && !submenu.contains(event.target)) {
            submenu.style.display = "none";
        }
    });
    async function numCarrito(){
        let respOrderLines = await fetch('/api/orderLines');
        let orderLines = await respOrderLines.json();
        console.log(orderLines)
        if(orderLines === 'error'){
            console.log('no invitado');
        }else{
            console.log(orderLines);
            let numCarrito = document.querySelector('#numCarrito');
            let numeroCarrito = 0;
            orderLines.forEach(linea =>{
                numeroCarrito = numeroCarrito + linea.quantity;
            });
            numCarrito.textContent = numeroCarrito;
        }
    }
    numCarrito();
});
