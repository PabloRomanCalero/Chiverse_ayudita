
let bloqueLista = document.querySelector('#productos-usuarios');
let botonUsuarios = document.querySelector('#usuarios');
let botonPedidos = document.querySelector('#pedidos');
let botonProductos = document.querySelector('#productos');
let tokenInput = document.querySelector('[name=_token]');
let token = tokenInput.value;
let articleEdicion = document.querySelector('#edicion')
let divErrores = document.createElement('div');
divErrores.className = "div_errores";


//Funcion listar productos o usuarios
const listar = async(nombre)=>{

    let lista;
    if(nombre === 'PRODUCTOS'){
        let res2 = await fetch("/api/products");
        let productos = await res2.json();
        lista = productos;
        let res3 = await fetch("/api/images");
        images = await res3.json();

    }else if(nombre === 'USUARIOS'){
        let res = await fetch("/api/users");
        users = await res.json();
        lista = users;
    }else{
        let res5 = await fetch("/api/orders");
        pedidos = await res5.json();
        lista = pedidos;
    };

    let titulo_lista = document.createElement('h2');
    bloqueLista.innerHTML="";
    articleEdicion.innerHTML="";
    titulo_lista.textContent = nombre;
    titulo_lista.className="titulo-lista";
    bloqueEditar = document.createElement('div');
    bloqueEditar.className="bloque-editar";
    articleEdicion.append(bloqueEditar);
    bloqueLista.append(titulo_lista);

    lista.forEach(element => {

        if(nombre === 'PRODUCTOS'){
            let liId = document.createElement("li");
            let liName = document.createElement("li");
            let liCategory = document.createElement("li");
            let liSex = document.createElement("li");
            let liSize = document.createElement("li");
            let liPrice = document.createElement("li");
            let liDescription = document.createElement("li");
            let liImage = document.createElement('li');
            let liStock = document.createElement("li");
            let lista_admin = document.createElement('ul');

            let liBotones = document.createElement('li');
            let botonEditar = document.createElement('button');
            let botonBorrar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.value = element.id;
            botonEditar.className ="edit_button";
            botonBorrar.textContent = 'Borrar';
            botonBorrar.value = element.id;
            botonBorrar.className = "delete_button";
            liBotones.className="botones-lista"
            liBotones.append(botonEditar,botonBorrar);

            liId.textContent = 'ID: '+ element.id;
            liName.textContent = 'Name: '+element.name;
            liCategory.textContent = 'Category: '+ element.category;
            liSex.textContent = 'Sex: '+ element.sex;
            liSize.textContent = 'Size: '+element.size;
            liPrice.textContent = 'Price: '+element.price;
            //URL DE LA IMAGEN
            images.forEach(image => {
                if(image.product_id === element.id){
                    liImage.textContent = 'URL: '+ image.url;
                }
            });
            liDescription.textContent = 'Descripción: '+element.description;
            liStock.textContent = 'Stock: '+ element.stock;
            lista_admin.className = 'lista-admin';
            lista_admin.append(liId,liName,liCategory,liSex,liSize,liPrice,liDescription,liStock,liImage,liBotones);
            bloqueLista.append(lista_admin);
        }else if(nombre === 'USUARIOS'){
            let liId = document.createElement("li");
            let liName = document.createElement("li");
            let liUserName = document.createElement("li");
            let liEmail = document.createElement("li");
            let liDNI = document.createElement("li");
            let liPhone = document.createElement("li");
            let liBirthdate = document.createElement("li");
            let lista_admin = document.createElement('ul');
            let liBotones = document.createElement('li');
            let botonEditar = document.createElement('button');
            let botonBorrar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.value = element.id;
            botonEditar.className ="edit_button";
            botonBorrar.textContent = 'Borrar';
            botonBorrar.className = "delete_button";
            botonBorrar.value = element.id;
            liBotones.className="botones-lista"
            liBotones.append(botonEditar,botonBorrar);

            liId.textContent = 'ID: '+ element.id;
            liName.textContent = 'Nombre: '+element.name +' '+element.surname+' '+element.surname2;
            liUserName.textContent = 'Nombre usuario : '+ element.username;
            console.log(element.email)
            liEmail.textContent = 'Email : '+element.email;
            liDNI.textContent = 'DNI : '+element.dni;
            liPhone.textContent = 'Teléfono: '+element.phone;
            liBirthdate.textContent = 'Fecha Nacimiento : '+ element.birthdate;
            lista_admin.className = 'lista-admin';
            lista_admin.append(liId,liName,liUserName,liEmail,liDNI,liPhone,liBirthdate,liBotones);
            bloqueLista.append(lista_admin);

        }else if(nombre === 'PEDIDOS') {
            let lista_admin = document.createElement('ul');
            let liId = document.createElement("li");
            let liStatus = document.createElement("li");
            let liTypePayment = document.createElement("li");
            let liTotalPrice = document.createElement("li");
            let liDate = document.createElement("li");
            let liUserId = document.createElement("li");
            let liAddressId = document.createElement("li");
            let liBotones = document.createElement("li");
            let botonEditar = document.createElement("button");
            let botonBorrar = document.createElement("button");
            botonEditar.textContent = "Editar";
            botonEditar.value = element.id;
            botonEditar.className = "edit_button";
            botonBorrar.textContent = "Borrar";
            botonBorrar.value = element.id;
            botonBorrar.className = "delete_button";
            liBotones.className = "botones-lista";
            liBotones.append(botonEditar, botonBorrar);
        
            liId.textContent = "ID: " + element.id;
            liStatus.textContent = "Estado: " + element.status;
            liTypePayment.textContent = "Tipo de Pago: " + element.type_payment;
            liTotalPrice.textContent = "Precio Total: $" + element.totalPrice;
            liDate.textContent = "Fecha: " + element.date;
            liUserId.textContent = "ID Usuario: " + element.user_id;
            liAddressId.textContent = "ID Dirección: " + element.address_id;
        
            lista_admin.append(liId, liStatus, liTypePayment, liTotalPrice, liDate, liUserId, liAddressId, liBotones);
            bloqueLista.append(lista_admin);
        }
    });
    edit(nombre);
    deleteProductsUsersOrders(nombre); 
}

//FUNCIÓN PARA BORRAR USUARIOS, PRODUCTOS Y PEDIDOS
const deleteProductsUsersOrders = async(nombre)=>{
    deleteButtons = document.querySelectorAll('.delete_button');
    deleteButtons.forEach((deleteButton)=>{
        deleteButton.addEventListener('click',(e)=>{
            //console.log(e)
            getProductsUsersAndOrdersForDelete(e,nombre);
        })
    })
}

//FUNCIÓN PARA RECOGER LOS DATOS DE LOS USUARIOS, PRODUCTOS Y PEDIDOS PARA PODER BORRARLOS
const getProductsUsersAndOrdersForDelete = async(e,nombre)=>{

    let id = e.target.value;

    console.log(id);
    console.log(nombre)
    if(nombre === 'PRODUCTOS'){
        let resProducto = await fetch(`/api/products/${id}`);
        let producto = await resProducto.json();
        let mensajeProduct = confirm(`Estas seguro de querer borrar el producto ${producto.name} de tipo ${producto.category} ?`);
        if(mensajeProduct){
            fetch(`/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
            }).then(()=>listar('PRODUCTOS'));
        }
    }else if(nombre === 'USUARIO'){
        let resUser = await fetch(`/api/users/${id}`);
        let user = await resUser.json();
        let mensajeUser = confirm(`Estas seguro de querer borrar el usuario ${user.name} de DNI ${user.dni} ?`);
        if(mensajeUser){
            fetch(`/api/users/${id}`, {
                method: "DELETE",
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
            }).then(()=>listar('USUARIOS'));
        }
    }else if(nombre === 'PEDIDOS'){
        let resOrder = await fetch(`/api/orders/${id}`);
        let order = await resOrder.json();
        let mensajeOrder = confirm(`Estas seguro de querer borrar el pedido ${order.id}?`);
        if(mensajeOrder){
            fetch(`/api/orders/${id}`, {
                method: "DELETE",
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
            }).then(()=>listar('PEDIDOS'));
        }
    }
}


// FUNCIÓN EDITAR USUARIOS, PRODUCTOS Y PEDIDOS
const edit = async(nombre)=>{
    let editButtons = document.querySelectorAll('.edit_button');
    for(let edit_button of editButtons ){
        edit_button.addEventListener('click',(e)=>{
            console.log(e.target.value)
            bloqueEditar.innerHTML="";

            const getUserProductsAndOrders= async()=>{
                let boton_enviar_cambios = document.createElement('button');
                boton_enviar_cambios.className="boton_guardar_cambios";
                boton_enviar_cambios.textContent = "Guardar Cambios"
                console.log('alo');
                if(nombre === 'USUARIOS'){
                    let respUsuario = await fetch(`/api/users/${e.target.value}`);
                    let usuario = await respUsuario.json();
                    //Inputs de los campos para cambiarlo
                    let divInputs = document.createElement('div')
                    let inputName = document.createElement('input');
                    let inputSurname = document.createElement('input');
                    let inputSurname2 = document.createElement('input');
                    let inputUserName = document.createElement('input');
                    let inputEmail = document.createElement('input');
                    let inputDNI = document.createElement('input');
                    let inputPhone = document.createElement('input');
                    let inputFechaNacimiento = document.createElement('input');
                    let divImageProfile = document.createElement('div');
                    let imgProfile = document.createElement('img');

                    divImageProfile.classList.add('divImageProfile')
                    divInputs.classList.add('divInputs')

                    //tipos de los input
                    inputName.type = "text";
                    inputSurname.type ="text";
                    inputSurname2.type = "text";
                    inputUserName.type = "text";
                    inputDNI.type ="text";
                    inputPhone.type ="number";
                    inputFechaNacimiento.type = "date";

                    //Aplicamos el contenido
                    console.log(usuario.name)
                    inputName.value = usuario.name;
                    inputSurname.value = usuario.surname;
                    inputSurname2.value = usuario.surname2;
                    inputUserName.value = usuario.username;
                    inputEmail.value = usuario.email;
                    inputDNI.value = usuario.dni;
                    inputPhone.value = usuario.phone;
                    inputFechaNacimiento.value = usuario.birthdate;
                    imgProfile.src = usuario.profile_photo

                    imgProfile.onload = function() {
                        if (imgProfile.naturalWidth > imgProfile.naturalHeight) {
                            imgProfile.classList.add('ImagenMayorWidth');
                        }
                        else if (imgProfile.naturalHeight > imgProfile.naturalWidth) {
                            imgProfile.classList.add('ImagenMayorHeight');
                        }
                        else{
                            imgProfile.classList.add('ImagenCuadrada');
                        }
            
                    };

                    divInputs.append('Nombre: ',inputName,'Apellido: ',inputSurname,'2Apellido: ',inputSurname2,'Nombre Usuario: ',inputUserName,'DNI: ',inputDNI,'Correo electrónico: ', inputEmail,
                    'Teléfono: ',inputPhone,'Fecha Nacimiento: ',inputFechaNacimiento,boton_enviar_cambios,divErrores)
                    divImageProfile.append(imgProfile)
                    bloqueEditar.append(divInputs, divImageProfile);

                    //GUARDAR LOS CAMBIOS REALIZADOS SOBRE EL USUARIO
                    boton_enviar_cambios.addEventListener('click',(e)=>{
                        //VALIDACIONES DE LOS INPUT
                        let arrayErrores = [];
                        let error = false;
                        if(inputName.value === '' || inputName.value === null  || inputName.value.length > 30){
                            arrayErrores.push('Error en el nombre , por favor escríbalo bien');
                            error = true;
                        }
                        if(inputSurname.value === '' || inputSurname.value === null || inputSurname.value.length > 25){
                            arrayErrores.push('Error en el apellido , por favor escríbalo bien');
                            error = true;
                        }
                        if(inputSurname2.value.length > 25){
                            arrayErrores.push('El segundo apellido es demasiado largo');
                            error = true;
                        }
                        if(inputUserName.value === '' || inputUserName.value === null || inputUserName.value.length > 25){
                            arrayErrores.push('Error en nombre sde usuario , por favor escríbalo bien');
                            error = true;
                        }
                        if(inputDNI.value === '' || inputDNI.value === null || inputDNI.value.length >9){
                            arrayErrores.push('Error en el DNI , por favor escríbalo bien');
                            error = true;
                        }
                        if(inputPhone.value.length >12){
                            arrayErrores.push('Error en el telefono , por favor escríbalo bien');
                            error = true;
                        }
                        if(error){
                            divErrores.innerHTML="";
                            let ulErrores = document.createElement('ul');
                            ulErrores.className='lista_errores';
                            for(let _error of arrayErrores){
                                let liError = document.createElement('li');
                                liError.textContent = _error;
                                ulErrores.append(liError);
                            }
                            divErrores.append(ulErrores);
                        }else{
                            //CAMBIAMOS LOS DATOS DEL USUARIO
                            let usuarioCambiado = {"name" : inputName.value,"surname":inputSurname.value,"surname2":inputSurname2.value,
                                                    "username": inputUserName.value,"dni":inputDNI.value,"phone":inputPhone.value,"birthdate":inputFechaNacimiento.value};
                            let usuarioId = usuario.id;
                            console.log(usuarioId);
                            fetch(`/api/users/${usuarioId}`, {
                                method: "PUT",
                                headers: {
                                    'X-CSRF-TOKEN': token,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(usuarioCambiado),
                            }).then((res) => {
                                console.log('jojojo')
                                listar('USUARIOS');
                            });
                            console.log('guay')
                        }
                    })
                }else if(nombre === 'PRODUCTOS'){
                    //EDITAR PRODUCTO
                    let respProducto = await fetch(`/api/products/${e.target.value}`);
                    let producto = await respProducto.json();
                    let res4 = await fetch("/api/images");
                    images = await res4.json();
                    console.log(images);
                    console.log(producto);
                    //CREACIÓN DE SUS INPUTS Y DIV
                    let divInputs = document.createElement('div')
                    let inputName = document.createElement('input');
                    let inputCategory = document.createElement('input');
                    let inputSex = document.createElement('input');
                    let inputBrand = document.createElement('input');
                    let inputSize = document.createElement('input');
                    let inputPrice = document.createElement('input');
                    let inputDescription = document.createElement('textarea');
                    let inputStock = document.createElement('input');
                    let inputImage = document.createElement('input');
                    let divImageProduct = document.createElement('div');
                    let imgProduct = document.createElement('img');
                    
                    divInputs.classList.add('divInputs');
                    divImageProduct.classList.add('divImageProduct');

                    //Añadimos propiedades
                    inputDescription.cols ="40";
                    inputDescription.rows ="5";
                    //DEFINIMOS TIPO DE INPUT
                    inputName.type = "text";
                    inputCategory.type = "text";
                    inputSex.type = "text";
                    inputBrand.type = "text";
                    inputSize.type = "text";
                    inputPrice.type = "number";
                    inputDescription.type = "text";
                    inputStock.type = "number";

                    //Insertamos el contenido en los input
                    console.log(producto.category);
                    inputName.value = producto.name;
                    inputCategory.value = producto.category;
                    inputSex.value = producto.sex;
                    inputBrand.value = producto.brand;
                    inputSize.value = producto.size;
                    inputPrice.value = producto.price;
                    inputDescription.value = producto.description;
                    inputStock.value = producto.stock;
                    //bucle para la URL de la imagen
                    images.forEach(image => {
                        if(image.product_id === producto.id){
                            inputImage.value = image.url;
                            imgProduct.src = image.url;
                            idImage = image.id;
                        }
                    });
                    divInputs.append('Nombre: ',inputName,'Tipo: ',inputCategory,'Sexo: ',inputSex, 'Marca: ',inputBrand,'Talla: ',inputSize,'Price: ',
                    inputPrice,'Descripción: ',inputDescription,'Stock: ',inputStock,'URL: ',inputImage, boton_enviar_cambios,divErrores)
                    divImageProduct.append(imgProduct);
                    bloqueEditar.append(divInputs, divImageProduct);

                    //GUARDAR LOS CAMBIOS REALIZADOS SOBRE EL PRODUCTO
                    boton_enviar_cambios.addEventListener('click',(e)=>{
                        //VALIDACIONES DE LOS INPUT
                        let arrayErrores = [];
                        let error = false;
                        if(inputName.value === '' || inputName.value === null  || inputName.value.length > 30){
                            arrayErrores.push('Error en el nombre del producto, por favor escríbalo bien');
                            error = true;
                        }
                        if(inputCategory.value === '' || inputCategory.value === null || inputCategory.value.length > 25){
                            arrayErrores.push('Error en el tipo del producto, por favor escríbalo bien');
                            error = true;
                        }
                        if(inputSex.value != 'Hombre' && inputSex.value != 'Mujer' && inputSex.value != 'Unisex'){
                            arrayErrores.push('Error en el sex del producto, por favor escríbalo bien ("Hombre" o "Mujer")');
                            error = true;
                        }
                        if(inputBrand.value === '' || inputBrand.value === null){
                            arrayErrores.push('Error en la marca del producto, por favor escríbalo bien');
                            error = true;
                        }
                        if(inputSize.value === '' || inputSize.value === null){
                            arrayErrores.push('Error en la marca del producto, por favor escríbalo bien');
                            error = true;
                        }
                        if(inputPrice.value === '' || inputPrice.value === null || isNaN(inputPrice.value)){
                            arrayErrores.push('Error en la talla del producto, por favor escríbalo bien');
                            error = true;
                        }
                        if(inputDescription.value === '' || inputDescription.value === null || inputDescription.value.length > 255){
                            arrayErrores.push('Error en la descripción del producto, por favor escríbalo bien');
                            error = true;
                        }
                        if(inputStock.value === '' || inputStock.value === null || isNaN(inputStock.value)){
                            arrayErrores.push('Error en el stock del producto, por favor escríbalo bien');
                            error = true;
                        }
                        if(inputImage.value === '' || inputImage.value === null ){
                            arrayErrores.push('Error en el imagen , por favor escríbalo bien');
                            error = true;
                        }
                        if(error){
                            divErrores.innerHTML="";
                            let ulErrores = document.createElement('ul');
                            ulErrores.className='lista_errores';
                            for(let _error of arrayErrores){
                                let liError = document.createElement('li');
                                liError.textContent = _error;
                                ulErrores.append(liError);
                            }
                            divErrores.append(ulErrores);
                        }else{
                            //CAMBIAMOS LOS DATOS DEL PRODUCTO
                            let productoCambiado = {"name" : inputName.value,"category":inputCategory.value,"sex":inputSex.value,"brand":inputBrand.value,
                            "size":inputSize.value,"price":inputPrice.value,"description": inputDescription.value,"stock":inputStock.value};
                            let productoId = producto.id;
                            fetch(`/api/products/${productoId}`, {
                                method: "PUT",
                                headers: {
                                    'X-CSRF-TOKEN': token,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(productoCambiado),
                            })
                            console.log(idImage);
                            fetch(`/api/images/${idImage}`, {
                                method: "PUT",
                                headers: {
                                    'X-CSRF-TOKEN': token,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({"url":inputImage.value}),
                            }).then((res) => {
                                listar('PRODUCTOS');
                            });
                        }
                    });
                }else if(nombre === 'PRODUCTOS'){
                    //EDITAR PRODUCTO
                    let respProducto = await fetch(`/api/products/${e.target.value}`);
                    let producto = await respProducto.json();
                    let res4 = await fetch("/api/images");
                    images = await res4.json();
                    console.log(images);
                    console.log(producto);
                    //CREACIÓN DE SUS INPUTS Y DIV
                    let divInputs = document.createElement('div')
                    let inputName = document.createElement('input');
                    let inputCategory = document.createElement('input');
                    let inputSex = document.createElement('input');
                    let inputBrand = document.createElement('input');
                    let inputSize = document.createElement('input');
                    let inputPrice = document.createElement('input');
                    let inputDescription = document.createElement('textarea');
                    let inputStock = document.createElement('input');
                    let inputImage = document.createElement('input');
                    let divImageProduct = document.createElement('div');
                    let imgProduct = document.createElement('img');
                    
                    divInputs.classList.add('divInputs');
                    divImageProduct.classList.add('divImageProduct');

                    //Añadimos propiedades
                    inputDescription.cols ="40";
                    inputDescription.rows ="5";
                    //DEFINIMOS TIPO DE INPUT
                    inputName.type = "text";
                    inputCategory.type = "text";
                    inputSex.type = "text";
                    inputBrand.type = "text";
                    inputSize.type = "text";
                    inputPrice.type = "number";
                    inputDescription.type = "text";
                    inputStock.type = "number";

                    //Insertamos el contenido en los input
                    console.log(producto.category);
                    inputName.value = producto.name;
                    inputCategory.value = producto.category;
                    inputSex.value = producto.sex;
                    inputBrand.value = producto.brand;
                    inputSize.value = producto.size;
                    inputPrice.value = producto.price;
                    inputDescription.value = producto.description;
                    inputStock.value = producto.stock;
                    //bucle para la URL de la imagen
                    images.forEach(image => {
                        if(image.product_id === producto.id){
                            inputImage.value = image.url;
                            imgProduct.src = image.url;
                            idImage = image.id;
                        }
                    });
                    divInputs.append('Nombre: ',inputName,'Tipo: ',inputCategory,'Sexo: ',inputSex, 'Marca: ',inputBrand,'Talla: ',inputSize,'Price: ',
                    inputPrice,'Descripción: ',inputDescription,'Stock: ',inputStock,'URL: ',inputImage, boton_enviar_cambios,divErrores)
                    divImageProduct.append(imgProduct);
                    bloqueEditar.append(divInputs, divImageProduct);

                    //GUARDAR LOS CAMBIOS REALIZADOS SOBRE EL PRODUCTO
                    boton_enviar_cambios.addEventListener('click',(e)=>{
                        //VALIDACIONES DE LOS INPUT
                        let arrayErrores = [];
                        let error = false;
                        if(inputName.value === '' || inputName.value === null  || inputName.value.length > 30){
                            arrayErrores.push('Error en el nombre del producto, por favor escríbalo bien');
                            error = true;
                        }
                        if(inputCategory.value === '' || inputCategory.value === null || inputCategory.value.length > 25){
                            arrayErrores.push('Error en el tipo del producto, por favor escríbalo bien');
                            error = true;
                        }
                        if(inputSex.value != 'Hombre' && inputSex.value != 'Mujer' && inputSex.value != 'Unisex'){
                            arrayErrores.push('Error en el sex del producto, por favor escríbalo bien ("Hombre" o "Mujer")');
                            error = true;
                        }
                        if(inputBrand.value === '' || inputBrand.value === null){
                            arrayErrores.push('Error en la marca del producto, por favor escríbalo bien');
                            error = true;
                        }
                        if(inputSize.value === '' || inputSize.value === null){
                            arrayErrores.push('Error en la marca del producto, por favor escríbalo bien');
                            error = true;
                        }
                        if(inputPrice.value === '' || inputPrice.value === null || isNaN(inputPrice.value)){
                            arrayErrores.push('Error en la talla del producto, por favor escríbalo bien');
                            error = true;
                        }
                        if(inputDescription.value === '' || inputDescription.value === null || inputDescription.value.length > 255){
                            arrayErrores.push('Error en la descripción del producto, por favor escríbalo bien');
                            error = true;
                        }
                        if(inputStock.value === '' || inputStock.value === null || isNaN(inputStock.value)){
                            arrayErrores.push('Error en el stock del producto, por favor escríbalo bien');
                            error = true;
                        }
                        if(inputImage.value === '' || inputImage.value === null ){
                            arrayErrores.push('Error en el imagen , por favor escríbalo bien');
                            error = true;
                        }
                        if(error){
                            divErrores.innerHTML="";
                            let ulErrores = document.createElement('ul');
                            ulErrores.className='lista_errores';
                            for(let _error of arrayErrores){
                                let liError = document.createElement('li');
                                liError.textContent = _error;
                                ulErrores.append(liError);
                            }
                            divErrores.append(ulErrores);
                        }else{
                            //CAMBIAMOS LOS DATOS DEL PRODUCTO
                            let productoCambiado = {"name" : inputName.value,"category":inputCategory.value,"sex":inputSex.value,"brand":inputBrand.value,
                            "size":inputSize.value,"price":inputPrice.value,"description": inputDescription.value,"stock":inputStock.value};
                            let productoId = producto.id;
                            fetch(`/api/products/${productoId}`, {
                                method: "PUT",
                                headers: {
                                    'X-CSRF-TOKEN': token,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(productoCambiado),
                            })
                            console.log(idImage);
                            fetch(`/api/images/${idImage}`, {
                                method: "PUT",
                                headers: {
                                    'X-CSRF-TOKEN': token,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({"url":inputImage.value}),
                            }).then((res) => {
                                listar('PRODUCTOS');
                            });
                        }
                    });
                }
            }
            getUserProductsAndOrders();
        });
    }
}


//Funcion para crear los productos desde el admin
const makeProducts = async()=>{
    makeProductsButton = document.querySelector('#crear-productos');
    makeProductsButton.addEventListener('click',(e)=>{
        bloqueLista.innerHTML="";
        articleEdicion.innerHTML="";
        let carac = ['name','category','sex','size','brand','price','description','stock','link'];

        for(let name of carac){
            let div = document.createElement('div');
            div.className="div_inputs_carac"
            let label = document.createElement('label');
            label.textContent = name;
            label.className = 'label_carac'
            let input = document.createElement('input');
            input.id = name;
            input.className ="input_carac";
            div.append(label,input);
            bloqueLista.append(div);
        }
        let sendButton = document.createElement('button');
        sendButton.textContent = 'Crear Producto';
        sendButton.className = 'send_button';
        bloqueLista.append(sendButton,divErrores);

        //CREAR PRODUCTO
        sendButton.addEventListener('click',(e)=>{

            let inputName = document.querySelector('#name');
            let inputCategory = document.querySelector('#category');
            let inputSex = document.querySelector('#sex');
            let inputSize = document.querySelector('#size');
            let inputBrand = document.querySelector('#brand')
            let inputPrice = document.querySelector('#price');
            let inputDescription = document.querySelector('#description');
            let inputStock = document.querySelector('#stock');
            let inputLink = document.querySelector('#link');

            const sendProductInformation = async() =>{
                //CONSEGUIR LA LONGITUD DEL ARRAY DE PRODUCTOS
                let resProductosLength = await fetch("/api/products");
                productosLong = await resProductosLength.json();
                let idProduct = productosLong.length +1;
                //VALIDACIONES DE LOS INPUT
                let arrayErrores = [];
                let error = false;
                if(inputName.value === '' || inputName.value === null  || inputName.value.lenght > 30){
                    arrayErrores.push('Error en el nombre del producto, por favor escríbalo bien');
                    error = true;
                }
                if(inputCategory.value === '' || inputCategory.value === null || inputCategory.value.lenght > 25){
                    arrayErrores.push('Error en el tipo del producto, por favor escríbalo bien');
                    error = true;
                }
                if(inputSex.value != 'Hombre' && inputSex.value != 'Mujer' && inputSex.value != 'Unisex'){
                    arrayErrores.push('Error en el sex del producto, por favor escríbalo bien ("Hombre" o "Mujer")');
                    error = true;
                }
                if(inputBrand.value === '' || inputPrice.value === null){
                    arrayErrores.push('Error en la marca del producto, por favor escríbalo bien');
                    error = true;
                }
                if(inputPrice.value === '' || inputPrice.value === null || isNaN(inputPrice.value)){
                    arrayErrores.push('Error en el precio del producto, por favor escríbalo bien');
                    error = true;
                }
                if(inputDescription.value === '' || inputDescription.value === null || inputDescription.value.lenght > 255){
                    arrayErrores.push('Error en la descripción del producto, por favor escríbalo bien');
                    error = true;
                }
                if(inputStock.value === '' || inputStock.value === null || isNaN(inputStock.value)){
                    arrayErrores.push('Error en el stock del producto, por favor escríbalo bien');
                    error = true;
                }
                if(inputLink.value === '' || inputLink.value === null){
                    arrayErrores.push('Error en la URL del producto, por favor escríbalo bien');
                    error = true;
                }
                if(error){
                    divErrores.innerHTML="";
                    let ulErrores = document.createElement('ul');
                    ulErrores.className='lista_errores';
                    for(let _error of arrayErrores){
                        let liError = document.createElement('li');
                        liError.textContent = _error;
                        ulErrores.append(liError);
                    }
                    divErrores.append(ulErrores);
                }else{
                    //ENVAIR DATOS
                    let producto = {"name": inputName.value,"category": inputCategory.value,"sex": inputSex.value,"brand": inputBrand.value,"size": inputSize.value,"price": inputPrice.value,
                                    "description":inputDescription.value,"stock": inputStock.value};
                    console.log(producto);
                    fetch("/api/products", {
                        method: "POST",
                        headers: {
                            'X-CSRF-TOKEN': token,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(producto),
                    });
                    console.log('A');
                    fetch("/api/images", {
                        method: "POST",
                        headers: {
                            'X-CSRF-TOKEN': token,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({"product_id": idProduct,"url":inputLink.value}),
                    }).then((res)=>{
                        inputName.value = '';
                        inputCategory.value = '';
                        inputSex.value = '';
                        inputBrand.value = '';
                        inputPrice.value = '';
                        inputSize.value = '';
                        inputDescription.value = '';
                        inputStock.value = '';
                        inputLink.value = '';
                    });
                }
            }
            sendProductInformation();

        });
    });
}

listar('USUARIOS');
botonUsuarios.addEventListener('click',(e) =>{
    listar('USUARIOS');
});

botonPedidos.addEventListener('click',(e) =>{
    listar('PEDIDOS');
});

botonProductos.addEventListener('click',(e) =>{
    listar('PRODUCTOS');
});



makeProducts();