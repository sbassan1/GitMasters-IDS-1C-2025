CREATE TABLE Sedes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE, -- formato: 'Sede 1'
    horarios VARCHAR(20) NOT NULL, -- formato: '08:00-18:00'
    dias_abiertos VARCHAR(30), -- formato: 'DDD-DDD-DDD-DDD ó (DDD-DDD) si son dias seguidos'
    direccion VARCHAR(50) NOT NULL,
    dias_restock VARCHAR(30) NOT NULL, -- formato: 'D,D,D,D,D'
    telefono VARCHAR(40) NOT NULL -- 11 5412-6738
);

CREATE TABLE Productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(60) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    precio_venta INT NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    imagen VARCHAR(100),
    sede_id INT REFERENCES Sedes(id) ON DELETE SET NULL
);

CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(50) NOT NULL,
    cumpleanos DATE,
    fecha_inicio DATE NOT NULL
);

CREATE TABLE Ventas (
    id SERIAL PRIMARY KEY,
    valor INT NOT NULL DEFAULT 0,
    fecha DATE NOT NULL,
    id_usuario INT REFERENCES Usuarios(id) ON DELETE SET NULL,
    metodo_pago VARCHAR(20)  
);

CREATE TABLE Venta_Productos (
    id SERIAL PRIMARY KEY,
    id_venta INT REFERENCES Ventas(id) ON DELETE CASCADE,
    id_producto INT REFERENCES Productos(id) ON DELETE SET NULL,
    cantidad INT NOT NULL
);


INSERT INTO Sedes (nombre, horarios, dias_abiertos, direccion, dias_restock, telefono) VALUES
(
  'Sede Paseo Colón',
  '10:00-18:00',
  'LUN-MAR-MIE-JUE-VIE',
  'Av. Paseo Colón 850',
  'LUN,JUE',
  '11-4321-1234'
),
(
  'Sede Palermo',
  '10:00-19:00',
  'LUN-MIE-JUE-VIE',
  'Av. Santa Fe 3253',
  'MAR,VIE',
  '15-4876-9988'
),
(
  'Sede Caballito',
  '09:30-17:30',
  'LUN-MAR-MIE-JUE',
  'Av. Rivadavia 5050',
  'LUN,JUE,SAB',
  '11-4756-3312'
);

-- ESTE USUARIO VA A SER EL ADMIN!
INSERT INTO Usuarios (nombre, email, contrasena, cumpleanos, fecha_inicio)
VALUES
  ('Admin', 'admin@admin.com', 'admin', '2025-07-2', '2025-07-2');


INSERT INTO Usuarios (nombre, email, contrasena, cumpleanos, fecha_inicio)
VALUES
  ('Ana Torres', 'ana.torres@email.com', 'ana123', '1990-05-12', '1990-05-12'),
  ('Luis Gómez', 'luis.gomez@email.com', 'luis456', '1985-11-23', '1990-05-12'),
  ('María Pérez', 'maria.perez@email.com', 'maria789', '1988-03-17', '1990-05-12');


INSERT INTO Sedes (nombre ,horarios, dias_abiertos, direccion, dias_restock, telefono)
VALUES
  ('Sede Belgrano','08:00-18:00', 'LUN-MAR-MIE-JUE-VIE', 'Av. Siempre Viva 742', 'LUN,MIE,VIER', '11 5412-6738');


-- ACCESORIOS
INSERT INTO Productos (nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id) VALUES
('Bungee Mouse Razer', 'Soporte organizador de cable para mouse gaming Razer', 25, 8500, 'accesorio', 'backend/src/assets/accesorio/accesorio-bungee mouse-razer.png', 1),
('HA300 Scepter Pro', 'Soporte para auriculares gaming Redragon HA300 Scepter Pro', 30, 12000, 'accesorio', 'backend/src/assets/accesorio/accesorio-ha300 scepter pro-redragon.png', 1),
('Blue Snowball', 'Micrófono condensador USB Logitech Blue Snowball', 20, 35000, 'accesorio', 'backend/src/assets/accesorio/accesorio-microfono blue snowball-logitech.jpg', 1),
('Mousepad KDA', 'Mousepad gaming edición especial KDA Logitech', 35, 15000, 'accesorio', 'backend/src/assets/accesorio/accesorio-mousepad kda-logitech.png', 1),
('Stream Deck SS550', 'Controlador de stream Redragon SS550 con teclas LCD', 15, 45000, 'accesorio', 'backend/src/assets/accesorio/accesorio-stream deck ss550-redragon.png', 1),
('Webcam Brio 105', 'Cámara web HD Logitech Brio 105 para streaming', 25, 28000, 'accesorio', 'backend/src/assets/accesorio/accesorio-webcam brio 105-logitech.jpg', 1);

-- AURICULARES
INSERT INTO Productos (nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id) VALUES
('Arctis Nova Pro', 'Auriculares gaming premium SteelSeries Arctis Nova Pro', 20, 85000, 'auriculares', 'backend/src/assets/auriculares/auriculares-arctis nova pro-steel series.jpg', 1),
('Barracuda X Black', 'Auriculares inalámbricos Razer Barracuda X Chrome Black', 30, 45000, 'auriculares', 'backend/src/assets/auriculares/auriculares-barracuda x chrome black-razer.png', 1),
('Barracuda X White', 'Auriculares inalámbricos Razer Barracuda X Chrome White', 25, 45000, 'auriculares', 'backend/src/assets/auriculares/auriculares-barracuda x chrome white-razer.png', 1),
('G733 Logitech', 'Auriculares gaming inalámbricos Logitech G733', 35, 38000, 'auriculares', 'backend/src/assets/auriculares/auriculares-g733-logitech.jpg', 1),
('G935 Logitech', 'Auriculares gaming premium Logitech G935 con RGB', 25, 55000, 'auriculares', 'backend/src/assets/auriculares/auriculares-g935-logitech.jpg', 1),
('Lamia2 H320', 'Auriculares gaming Redragon Lamia2 H320 con micrófono', 40, 18000, 'auriculares', 'backend/src/assets/auriculares/auriculares-lamia2 h320-redragon.jpg', 1);

-- MOUSE
INSERT INTO Productos (nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id) VALUES
('Aerox 9 Wireless', 'Mouse gaming inalámbrico SteelSeries Aerox 9 MMO', 25, 48000, 'mouse', 'backend/src/assets/mouse/mouse-aerox 9-steel series.jpg', 1),
('G Pro X Superlight', 'Mouse gaming ultraliviano Logitech G Pro X Superlight', 30, 65000, 'mouse', 'backend/src/assets/mouse/mouse-g pro x superlight-logitech.jpg', 1),
('G203 Lightsync', 'Mouse gaming Logitech G203 con iluminación RGB', 45, 22000, 'mouse', 'backend/src/assets/mouse/mouse-g203 lightsync-logitech.jpg', 1),
('K1ng Pro', 'Mouse gaming Redragon K1ng Pro con sensor de precisión', 35, 15000, 'mouse', 'backend/src/assets/mouse/mouse-k1ng pro-redragon.png', 1),
('M55 Pro', 'Mouse gaming inalámbrico Corsair M55 Pro RGB', 30, 32000, 'mouse', 'backend/src/assets/mouse/mouse-m55 pro-corsair.jpg', 1);

-- TECLADOS
INSERT INTO Productos (nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id) VALUES
('Apex Pro TKL 3', 'Teclado mecánico gaming SteelSeries Apex Pro TKL Gen 3', 20, 95000, 'teclado', 'backend/src/assets/teclado/teclado-apex pro tkl 3-steel series.jpg', 1),
('Aurora G713', 'Teclado mecánico gaming Logitech Aurora G713 RGB', 25, 72000, 'teclado', 'backend/src/assets/teclado/teclado-aurora g713-logitech.jpg', 1),
('K70 Pro Mini', 'Teclado mecánico compacto Corsair K70 Pro Mini RGB', 30, 58000, 'teclado', 'backend/src/assets/teclado/teclado-k70 pro mini-corsair.jpg', 1),
('Kumara', 'Teclado mecánico gaming Redragon Kumara retroiluminado', 50, 25000, 'teclado', 'backend/src/assets/teclado/teclado-kumara-redragon.png', 1),
('Pro RGB', 'Teclado mecánico gaming Logitech Pro RGB para esports', 35, 48000, 'teclado', 'backend/src/assets/teclado/teclado-pro rgb-logitech.jpg', 1);