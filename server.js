const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/bellafila', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Esquema para reservas
const reservaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String, required: true },
    fecha: { type: Date, required: true },
    hora: { type: String, required: true },
    personas: { type: Number, required: true },
    comentarios: { type: String, default: '' },
    fechaCreacion: { type: Date, default: Date.now },
    estado: { type: String, default: 'pendiente' } // pendiente, confirmada, cancelada
});

const Reserva = mongoose.model('Reserva', reservaSchema);

// Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API para crear reserva
app.post('/api/reservas', async (req, res) => {
    try {
        const nuevaReserva = new Reserva(req.body);
        await nuevaReserva.save();
        
        console.log('Nueva reserva creada:', nuevaReserva);
        
        res.status(201).json({
            message: 'Reserva creada exitosamente',
            reserva: nuevaReserva
        });
    } catch (error) {
        console.error('Error al crear reserva:', error);
        res.status(400).json({
            message: 'Error al crear la reserva',
            error: error.message
        });
    }
});

// API para obtener todas las reservas (admin)
app.get('/api/reservas', async (req, res) => {
    try {
        const reservas = await Reserva.find().sort({ fechaCreacion: -1 });
        res.json(reservas);
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        res.status(500).json({
            message: 'Error al obtener las reservas',
            error: error.message
        });
    }
});

// API para actualizar estado de reserva
app.put('/api/reservas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        
        const reserva = await Reserva.findByIdAndUpdate(
            id,
            { estado },
            { new: true }
        );
        
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        
        res.json(reserva);
    } catch (error) {
        console.error('Error al actualizar reserva:', error);
        res.status(500).json({
            message: 'Error al actualizar la reserva',
            error: error.message
        });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log('Asegúrate de tener MongoDB corriendo en tu sistema');
});
