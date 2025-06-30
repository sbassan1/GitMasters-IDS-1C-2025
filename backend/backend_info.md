# Backend

Para nuestra backend decidimos utilizar las herramientas y librerias usadas en clase. Usaremos postreSQL para la base de datos y expressjs para las HTTP requests del servidor. 

---

Nuestra base tendra tablas para:

- Usuarios

        TABLE Usuarios (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(30) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            contraseña VARCHAR(50) NOT NULL,
            cumpleaños DATE,
            administrador BOOLEAN NOT NULL -- Si es true puede crear productos, pero no comprar
        );

Donde guardaremos los datos de los usuarios registrados en la página, su email y
contraseña se usaran para ingresar, el nombre se usara en la UI y para cambiar/recuperar contraseña. Si administrador es TRUE entonces el usuario podra crear productos, añadir sedes y más. 
        
- Ventas

        TABLE Ventas (
            id SERIAL PRIMARY KEY,
            valor INT NOT NULL DEFAULT 0,
            fecha DATE NOT NULL,
            id_usuario INT REFERENCES Usuarios(id),
            metodo_pago VARCHAR(20)
        );

Donde guardaremos las ventas de la página web. Aqui tendremos un array de id's de
productos y la cantidad de estos comprados, tambien tendremos el id del cliente y el valor del carrito que tendremos que cambiar con cada elemento agregado ó eliminado.

        TABLE Venta_Productos (
            id SERIAL PRIMARY KEY,
            id_venta INT REFERENCES Ventas(id) ON DELETE CASCADE,
            id_producto INT REFERENCES Productos(id),
            cantidad INT NOT NULL
        );

Esta tabla intermedia guarda los productos en una venta, util para encontrar el valor de la venta y un historial de ventas para los usuarios.

- Productos

    CREATE TABLE Productos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(20),
        descripcion VARCHAR(60),
        stock INT NOT NULL DEFAULT 0,
        precio_venta INT NOT NULL,
        tipo VARCHAR(20) NOT NULL,
        imagen VARCHAR(100),
        sede_id INT REFERENCES Sedes(id)
    );

Donde guardaremos el nombre del producto, su descripción, su stock actual, su precio de venta, el tipo de producto, su imagen para la página y de que sede proviene 

- Sedes

        TABLE Sedes (
            id SERIAL PRIMARY KEY,
            horarios VARCHAR(20) NOT NULL, -- formato: '08:00-18:00'
            dias_abiertos VARCHAR(30), -- formato: 'DDD-DDD-DDD-DDD ó (DDD-DDD) si son dias seguidos'
            direccion VARCHAR(50) NOT NULL,
            dias_restock VARCHAR(30),NOT NULL -- formato: 'D,D,D,D,D'
            telefono VARCHAR(40) NOT NULL -- 11 5412-6738
        );

Donde guardaremos los datos de las sedes fisicas de la empresa, sus horarios de atencion (HH:MM - HH-MM), su direccion fisica, sus dias de abertura, sus dias de restock y su telefono de contacto.

---

