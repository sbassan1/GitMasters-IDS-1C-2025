CREATE TABLE Sedes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL UNIQUE, -- formato: 'Sede 1'
    horarios VARCHAR(20) NOT NULL, -- formato: '08:00-18:00'
    dias_abiertos VARCHAR(30), -- formato: 'DDD-DDD-DDD-DDD ó (DDD-DDD) si son dias seguidos'
    direccion VARCHAR(50) NOT NULL,
    dias_restock VARCHAR(30) NOT NULL, -- formato: 'D,D,D,D,D'
    telefono VARCHAR(40) NOT NULL -- 11 5412-6738
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

CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(50) NOT NULL,
    cumpleanos DATE,
    fecha_inicio DATE NOT NULL
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

