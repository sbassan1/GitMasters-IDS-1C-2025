

INSERT INTO Usuarios (nombre, email, contrasena, cumpleanos, administrador)
VALUES
  ('Ana Torres', 'ana.torres@email.com', 'ana123', '1990-05-12', false),
  ('Luis Gómez', 'luis.gomez@email.com', 'luis456', '1985-11-23', false),
  ('María Pérez', 'maria.perez@email.com', 'maria789', '1988-03-17', true); -- administradora


INSERT INTO Sedes (horarios, dias_abiertos, direccion, dias_restock, telefono)
VALUES
  ('08:00-18:00', 'LUN-MAR-MIE-JUE-VIE', 'Av. Siempre Viva 742', 'LUN,MIE,VIER', '11 5412-6738');

INSERT INTO Productos (nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id)
VALUES
  ('Café', 'Café molido premium', 100, 1500, 'Bebida', 'cafe.jpg', 1),
  ('Té Verde', 'Té verde orgánico', 80, 1200, 'Bebida', 'teverde.jpg', 1),
  ('Galletas', 'Galletas de avena', 50, 900, 'Snack', 'galletas.jpg', 1),
  ('Jugo', 'Jugo natural de naranja', 60, 1300, 'Bebida', 'jugo.jpg', 1),
  ('Chocolate', 'Tableta de chocolate amargo', 40, 1600, 'Dulce', 'chocolate.jpg', 1);


INSERT INTO Ventas (valor, fecha, id_usuario, metodo_pago)
VALUES
  (3700, '2025-06-29', 1, 'Tarjeta'), -- Ana Torres
  (2500, '2025-06-30', 2, 'Efectivo'); -- Luis Gómez


-- Venta 1 (Ana Torres)
INSERT INTO Venta_Productos (id_venta, id_producto, cantidad)
VALUES
  (1, 1, 1), -- Café
  (1, 2, 1), -- Té Verde
  (1, 5, 1); -- Chocolate

-- Venta 2 (Luis Gómez)
INSERT INTO Venta_Productos (id_venta, id_producto, cantidad)
VALUES
  (2, 3, 1), -- Galletas
  (2, 4, 1); -- Jugo
