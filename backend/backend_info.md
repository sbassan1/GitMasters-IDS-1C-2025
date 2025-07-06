# Backend

Para nuestra backend decidimos utilizar las herramientas y librerias usadas en clase. Usaremos postgreSQL para la base de datos y expressjs para las HTTP requests del servidor. 

---

# Explicacion de tablas en la base de datos

Nuestra base tendra tablas para:

- Usuarios

        TABLE Usuarios (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            contrasena VARCHAR(50) NOT NULL,
            cumpleanos DATE,
            fecha_inicio DATE NOT NULL
        );

Donde guardaremos los datos de los usuarios registrados en la página, su email y
contraseña se usaran para ingresar, el nombre se usara en la UI y para cambiar/recuperar contraseña se usara el email. Tendremos un usuario especial con el email admin@admin.com que podra agregar modificar y agregar elementos en las tablas de la base de datos.
        
- Email = texto@texto.dominio (donde dominio tiene que tener 3 caracteres máx)
- Fecha inicio = AAAA-MM-DD (donde A es año, M mes y D día)
- Contraseña = debe tener una letra mayus y un numero (entre 8 y 16 caracteres máximo)

- Ventas

        TABLE Ventas (
            id SERIAL PRIMARY KEY,
            valor INT NOT NULL DEFAULT 0,
            fecha DATE NOT NULL,
            id_usuario INT REFERENCES Usuarios(id) ON DELETE SET NULL,
            metodo_pago VARCHAR(20)  
        );

Donde guardaremos las ventas de la página web. Aqui tendremos un array de id's de
productos y la cantidad de estos comprados, tambien tendremos el id del cliente y el valor del carrito que tendremos que cambiar con cada elemento agregado ó eliminado.

        TABLE Venta_Productos (
            id SERIAL PRIMARY KEY,
            id_venta INT REFERENCES Ventas(id) ON DELETE CASCADE,
            id_producto INT REFERENCES Productos(id) ON DELETE SET NULL,
            cantidad INT NOT NULL
        );


Esta tabla intermedia guarda los productos en una venta, util para encontrar el valor de la venta y un historial de ventas para los usuarios.

- Cantidad > 0
- Fecha (AAAA-MM-DD)
- Metodo pago tiene que ser exclusivamente una de estas opciones :
'Efectivo', 'Crédito', 'Débito', 'Transferencia bancaria', 'QR', 'Mercado Pago'

- Productos

        TABLE Productos (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(50) NOT NULL,
            descripcion VARCHAR(60) NOT NULL,
            stock INT NOT NULL DEFAULT 0,
            precio_venta INT NOT NULL,
            tipo VARCHAR(20) NOT NULL,
            imagen VARCHAR(100),
            sede_id INT REFERENCES Sedes(id) ON DELETE SET NULL
        );

Donde guardaremos el nombre del producto, su descripción, su stock actual, su precio de venta, el tipo de producto, su imagen para la página y de que sede proviene 

- Stock debe ser >= 0
- Precio venta debe ser > 0

- Sedes

        TABLE Sedes (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(50) NOT NULL UNIQUE, -- formato: 'Sede 1'
            horarios VARCHAR(20) NOT NULL, -- formato: '08:00-18:00'
            dias_abiertos VARCHAR(30), -- formato: 'DDD-DDD-DDD-DDD ó (DDD-DDD) si son dias seguidos'
            direccion VARCHAR(50) NOT NULL,
            dias_restock VARCHAR(30) NOT NULL, -- formato: 'D,D,D,D,D'
            telefono VARCHAR(40) NOT NULL -- 11 5412-6738
        );


Donde guardaremos los datos de las sedes fisicas de la empresa, sus horarios de atencion (HH:MM - HH-MM), su direccion fisica, sus dias de abertura, sus dias de restock y su telefono de contacto. Todos con un formato:

- Nombres = "Sede *" con * como cualquier String.
- Horarios = "HH:MM-HH-MM" donde H es hora y M minutos
- Dias abiertos y Dias restock = DDD-DDD para los dias (LUN,MAR,MIE,JUE,VIE)
- Telefono = 11{Espacio}NNNN-NNNN Donde N es un numero

---

# Servidor : Correr dockerfile

Nustro servidor donde usaremos la base de datos se levantará utilizando un dockerfile. Este usará postgreSQL17

Es posible levantar el servidor de docker con el archivo docker-compose con ```docker compose up -d``` desde /backend . Es necesario tener docker desktop abierto.

Para correr el sv en terminal puede usarse un comando de docker

    docker exec -it backend-postgres-1 psql -U postgres -d tiendaPC

la informacion del servidor para su uso en dbeaver: 

        - POSTGRES_PASSWORD=postgres
        - POSTGRES_USER=postgres
        - POSTGRES_DB=tiendaPC


# Requests : Formato de requests

## Usuarios :

### REQUEST : http://localhost:3000/api/v1/usuarios/

- GET : 
        
        / : Todos los usuarios como json
        
        /id/:id : Usuario especifico por ID

        /:id/compras : todas las compras del usuario (historial de compras)

- POST :

        / : Creacion de usuario, ejemplo:
        {
            "nombre": "Alvin",
            "email": "darune@sandstorm.com",
            "contrasena": "Turururu1",
            "cumpleanos": "2025-07-02",
            "fecha_inicio": "2025-07-02"
        }

- PUT :

        /:id : Cambiar el cuerpo entero del usuario con :id, ejemplo:
        {
            "nombre": "Admin",
            "email": "admin@admin.com",
            "contrasena": "Administrador1",
            "cumpleanos": "2025-07-02",
            "fecha_inicio": "2025-07-01"
        }

        /email/:id : Cambiar el campo de email al usuario con :id, ejemplo:
        {
            "email": "admin@admin.com"
        }

        /nombre/:id : Cambiar el campo de nombre de usuario con :id, ejemplo:
        {
            "nombre": "Admin"
        }

        /contrasena/:id : Cambiar el campo de contraseña (la n en la url no es typo!), Ejemplo:
        {
            "contrasena": "Adm1inistrador"
        }

        /cumpleanos/:id : Cambiar el campo de cumpleaños (la n en la url no es typo!), Ejemplo:
        {
            "cumpleanos": "2025-07-02"
        }

- DELETE :

        /email/:email : Elimina el usuario de la base a partir del :email

## Productos:

### REQUEST : http://localhost:3000/api/v1/productos/

- GET :

        / : Todos los productos como json

        /id/:id : Producto específico por ID

        /nombre/:nombre : Producto específico por nombre

        /tipo/:tipo : Todos los productos de un tipo específico

        /sede/:sede_id : Todos los productos de una sede específica

- POST :

        / : Creación de producto, ejemplo:
        {
            "nombre": "RTX 4070",
            "descripcion": "Tarjeta gráfica de alta gama",
            "stock": 15,
            "precio_venta": 850000,
            "tipo": "GPU",
            "imagen": "rtx4070.jpg",
            "sede_id": 1
        }

- PUT :

        /:id : Cambiar el cuerpo entero del producto con :id, ejemplo:
        {
            "nombre": "RTX 4070 Super",
            "descripcion": "Tarjeta gráfica de alta gama mejorada",
            "stock": 10,
            "precio_venta": 950000,
            "tipo": "GPU",
            "imagen": "rtx4070super.jpg",
            "sede_id": 1
        }

        /nombre/:id : Cambiar el nombre del producto con :id, ejemplo:
        {
            "nombre": "RTX 4070 Ti"
        }

        /descripcion/:id : Cambiar la descripción del producto con :id, ejemplo:
        {
            "descripcion": "Nueva descripción del producto"
        }

        /stock/:id : Cambiar el stock del producto con :id, ejemplo:
        {
            "stock": 25
        }

        /precio/:id : Cambiar el precio del producto con :id, ejemplo:
        {
            "precio_venta": 900000
        }

        /tipo/:id : Cambiar el tipo del producto con :id, ejemplo:
        {
            "tipo": "Procesador"
        }

        /imagen/:id : Cambiar la imagen del producto con :id, ejemplo:
        {
            "imagen": "nueva_imagen.jpg"
        }

        /sede/:id : Cambiar la sede del producto con :id, ejemplo:
        {
            "sede_id": 2
        }

- DELETE :

        /id/:id : Elimina el producto de la base a partir del :id

## Sedes: 

### REQUEST : http://localhost:3000/api/v1/sedes/

- GET :

        / : Todas las sedes como json

        /id/:id : Sede específica por ID

        /nombre/:nombre : Sede específica por nombre

        /horarios/:horarios : Sedes con horarios específicos

        /dias_abiertos/:dias_abiertos : Sedes con días abiertos específicos

        /direccion/:direccion : Sedes con dirección específica

        /telefono/:telefono : Sede específica por teléfono

        /dias_restock/:dias_restock : Sedes con días de restock específicos

- POST :

        / : Creación de sede, ejemplo:
        {
            "nombre": "Sede Centro",
            "horarios": "08:00-18:00",
            "dias_abiertos": "LUN-VIE",
            "direccion": "Av. Corrientes 1234",
            "dias_restock": "MAR,JUE",
            "telefono": "11 4123-4567"
        }

- PUT :

        /:id : Cambiar el cuerpo entero de la sede con :id, ejemplo:
        {
            "nombre": "Sede Centro Ampliada",
            "horarios": "09:00-20:00",
            "dias_abiertos": "LUN-SAB",
            "direccion": "Av. Corrientes 1234, 2do piso",
            "dias_restock": "MAR,JUE,SAB",
            "telefono": "11 4123-4568"
        }

        /nombre/:id : Cambiar el nombre de la sede con :id, ejemplo:
        {
            "nombre": "Sede Nueva"
        }

        /horarios/:id : Cambiar los horarios de la sede con :id, ejemplo:
        {
            "horarios": "10:00-19:00"
        }

        /dias_abiertos/:id : Cambiar los días abiertos de la sede con :id, ejemplo:
        {
            "dias_abiertos": "LUN-SAB"
        }

        /direccion/:id : Cambiar la dirección de la sede con :id, ejemplo:
        {
            "direccion": "Nueva dirección 5678"
        }

        /dias_restock/:id : Cambiar los días de restock de la sede con :id, ejemplo:
        {
            "dias_restock": "LUN,MIE,VIE"
        }

        /telefono/:id : Cambiar el teléfono de la sede con :id, ejemplo:
        {
            "telefono": "11 5555-6666"
        }

- DELETE :

        /nombre/:nombre : Elimina la sede de la base a partir del :nombre

## Ventas :

### REQUEST : http://localhost:3000/api/v1/ventas/

- GET :

        / : Todas las ventas como json

        /id/:id : Venta específica por ID

        /valor/:valor : Ventas con valor específico

        /fecha/:fecha : Ventas de una fecha específica

        /cliente/:clienteId : Ventas de un cliente específico

        /metodo/:metodo_pago : Ventas con método de pago específico

- POST :

        / : Creación de venta, ejemplo:
        {
            "valor": 850000,
            "fecha": "2025-07-06",
            "id_usuario": 1,
            "metodo_pago": "Crédito"
        }

- PUT :

        /:id : Cambiar el cuerpo entero de la venta con :id, ejemplo:
        {
            "valor": 950000,
            "fecha": "2025-07-06",
            "id_usuario": 1,
            "metodo_pago": "Débito"
        }

## Venta Productos:

### REQUEST : http://localhost:3000/api/v1/venta-productos/

- GET :

        / : Todas las relaciones venta-productos como json

        /id/:id : Relación venta-producto específica por ID

        /id_venta/:id_venta : Todos los productos de una venta específica

        /id_producto/:id_producto : Todas las ventas de un producto específico

        /cantidad/:cantidad : Relaciones con cantidad específica

- POST :

        / : Creación de relación venta-producto, ejemplo:
        {
            "id_venta": 1,
            "id_producto": 5,
            "cantidad": 2
        }

        Nota: Al crear una relación venta-producto, automáticamente se:
        - Actualiza el valor total de la venta
        - Reduce el stock del producto
        - Valida que hay suficiente stock disponible

- PUT :

        /:id : Cambiar el cuerpo entero de la relación venta-producto con :id, ejemplo:
        {
            "id_venta": 1,
            "id_producto": 5,
            "cantidad": 3
        }


---
