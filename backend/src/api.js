const productosAPI = require("./scripts_bd/productos/productosAPI") // Importar
const usuariosAPI = require("./scripts_bd/usuarios/usuariosAPI") // Importar
const sedesAPI = require("./scripts_bd/sedes/sedesAPI") // Importar
const ventasAPI = require("./scripts_bd/ventas/ventasAPI") // Importar
const v_productosAPI = require("./scripts_bd/venta productos/v_productosAPI") // Importar

const express = require("express")
const cors = require("cors")
const path = require("path")
const multer = require("multer")
const fs = require("fs")

const app = express()
const port = 3000

// Configurar CORS para permitir requests desde el frontend
app.use(
  cors({
    origin: [
      "http://localhost:5500",
      "http://127.0.0.1:5500",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:3001",
      "https://gitmasters-ids-1c-2025.onrender.com/",
      "https://gitmasters-ids-1c-2025-1-front.onrender.com" 
    ],
    credentials: true,
  }),
)

// Middleware para servir archivos estáticos (imágenes)
app.use("/assets", express.static(path.join(__dirname, "assets")))

// Tipos de productos válidos
const tiposProductosValidos = ["accesorio", "auriculares", "mouse", "teclado"]

// Configurar multer para subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Obtener el tipo de producto del body de la request
    const tipoProducto = req.body.tipo

    // Validar que el tipo sea válido
    if (!tipoProducto || !tiposProductosValidos.includes(tipoProducto)) {
      return cb(new Error("Tipo de producto no válido"), null)
    }

    // Crear la ruta basada en el tipo de producto
    const uploadPath = path.join(__dirname, "assets", tipoProducto)

    // Crear directorio si no existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true })
    }

    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    // Generar nombre único para el archivo
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const extension = path.extname(file.originalname)
    const tipoProducto = req.body.tipo

    // Formato: tipo-producto-timestamp-random.ext
    cb(null, `${tipoProducto}-producto-${uniqueSuffix}${extension}`)
  },
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB límite
  },
  fileFilter: (req, file, cb) => {
    // Verificar que sea una imagen
    if (file.mimetype.startsWith("image/")) {
      cb(null, true)
    } else {
      cb(new Error("Solo se permiten archivos de imagen"), false)
    }
  },
})

app.use(express.json()) // Importante para recibir JSON

app.get("/", (req, res) => {
  res.send("Hello World!")
})

const dbClient = require("./database")

// Prefijos de las API
app.use(express.json()) // Importante para recibir JSON

// Endpoint para subir imágenes organizadas por tipo
app.post("/api/v1/upload-imagen", upload.single("imagen"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se subió ningún archivo" })
    }

    if (!req.body.tipo) {
      return res.status(400).json({ error: "Tipo de producto es requerido" })
    }

    // Construir la ruta relativa que se guardará en la base de datos
    const rutaImagen = `backend/src/assets/${req.body.tipo}/${req.file.filename}`

    res.json({
      mensaje: "Imagen subida exitosamente",
      rutaImagen: rutaImagen,
      nombreArchivo: req.file.filename,
      tipoProducto: req.body.tipo,
      carpeta: req.body.tipo,
    })
  } catch (error) {
    console.error("Error al subir imagen:", error)
    res.status(500).json({ error: error.message || "Error al subir la imagen" })
  }
})

app.use("/api/v1/productos", productosAPI)
app.use("/api/v1/usuarios", usuariosAPI)
app.use("/api/v1/sedes", sedesAPI)
app.use("/api/v1/ventas", ventasAPI)
app.use("/api/v1/ventas_productos", v_productosAPI)

const pool = require("./database.js")

const resetDB = async (req, res) => {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    await client.query("DELETE FROM Venta_Productos")
    await client.query("ALTER SEQUENCE venta_productos_id_seq RESTART WITH 1")

    await client.query("DELETE FROM Ventas")
    await client.query("ALTER SEQUENCE ventas_id_seq RESTART WITH 1")

    await client.query("DELETE FROM Productos WHERE id > 22")
    await client.query("ALTER SEQUENCE productos_id_seq RESTART WITH 23")

    await client.query("DELETE FROM Sedes WHERE id > 3")
    await client.query("ALTER SEQUENCE sedes_id_seq RESTART WITH 4")

    await client.query("DELETE FROM Usuarios WHERE id > 1")
    await client.query("ALTER SEQUENCE usuarios_id_seq RESTART WITH 2")

    await client.query("COMMIT")
    res.status(200).json({ message: "Base de datos restablecida correctamente." })
  } catch (err) {
    await client.query("ROLLBACK")
    console.error("Error al resetear la base de datos:", err)
    res.status(500).json({ error: "Error al restablecer la base de datos." })
  } finally {
    client.release()
  }
}

app.post("/api/v1/reset-db", resetDB)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = {
  dbClient,
  app, // si también quieres exportar la app
}
