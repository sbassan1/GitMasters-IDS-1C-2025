-- Insertar sedes
INSERT INTO Sedes (nombre, horarios, dias_abiertos, direccion, dias_restock, telefono)
VALUES 
  ('Sede Central', '08:00-18:00', 'LUN-MAR-MIE-JUE-VIE', 'Av. Siempre Viva 123', 'LUN,MIE,VIE', '11 5412-6738'),
  ('Sucursal Oeste', '09:00-17:00', 'LUN-MIE-VIE', 'Calle Falsa 456', 'MAR,JUE', '11 5222-1234');

-- Insertar productos
INSERT INTO Productos (nombre, descripcion, stock, precio_venta, tipo, imagen, sede_id)
VALUES
  ('Ryzen 5 5600', 'Procesador 6 núcleos AM4', 10, 95000, 'CPU', 'ryzen5600.jpg', 1),
  ('RTX 4060', 'GPU NVIDIA 8GB', 5, 320000, 'GPU', 'rtx4060.jpg', 1),
  ('SSD 1TB', 'Kingston NVMe', 20, 45000, 'Almacenamiento', 'ssd1tb.jpg', 2),
  ('Gabinete RGB', 'Gabinete con vidrio templado', 7, 60000, 'Gabinete', 'gabinete.jpg', 2),
  ('Fuente 750W', 'Fuente certificada 80+', 15, 52000, 'Fuente', 'fuente750w.jpg', 1);

-- Insertar usuarios
INSERT INTO Usuarios (nombre, email, contrasena, cumpleanos, fecha_inicio)
VALUES
  ('Juan Pérez', 'juanp@mail.com', '1234', '1990-05-12', '2024-06-01'),
  ('Ana Gómez', 'ana@mail.com', 'abcd', '1985-09-22', '2024-06-05'),
  ('Carlos Ruiz', 'carlos@mail.com', 'pass', '2000-03-15', '2024-06-10');

-- Insertar ventas
INSERT INTO Ventas (valor, fecha, id_usuario, metodo_pago)
VALUES
  (370000, '2024-06-20', 1, 'Tarjeta'),
  (107000, '2024-06-22', 2, 'Efectivo'),
  (145000, '2024-06-23', 3, 'Transferencia');

-- Insertar productos en ventas
INSERT INTO Venta_Productos (id_venta, id_producto, cantidad)
VALUES
  (1, 1, 1),  -- Ryzen 5 5600
  (1, 2, 1),  -- RTX 4060
  (2, 4, 1),  -- Gabinete
  (2, 5, 1),  -- Fuente
  (3, 3, 2);  -- SSD 1TB (x2)
