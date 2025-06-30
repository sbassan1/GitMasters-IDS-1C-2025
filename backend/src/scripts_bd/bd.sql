CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    contraseña VARCHAR(50) NOT NULL,
    cumpleaños DATE,
    administrador BOOLEAN NOT NULL -- Si es true puede crear productos, pero no comprar
);

CREATE TABLE Ventas (
    id SERIAL PRIMARY KEY,
    valor INT NOT NULL DEFAULT 0,
    fecha DATE NOT NULL,
    id_usuario INT REFERENCES Usuarios(id),
    metodo_pago VARCHAR(20)
);

CREATE TABLE Venta_Productos (
    id SERIAL PRIMARY KEY,
    id_venta INT REFERENCES Ventas(id) ON DELETE CASCADE,
    id_producto INT REFERENCES Productos(id),
    cantidad INT NOT NULL
);

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

CREATE TABLE Sedes (
    id SERIAL PRIMARY KEY,
    horarios VARCHAR(20) NOT NULL, -- formato: '08:00-18:00'
    dias_abiertos VARCHAR(30), -- formato: 'DDD-DDD-DDD-DDD ó (DDD-DDD) si son dias seguidos'
    direccion VARCHAR(50) NOT NULL,
    dias_restock VARCHAR(30),NOT NULL -- formato: 'D,D,D,D,D'
    telefono VARCHAR(40) NOT NULL -- 11 5412-6738
);
