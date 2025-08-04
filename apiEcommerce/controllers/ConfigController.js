import Config from '../models/Config.js';

export default {
  // Obtener la config (igual que antes)
  getConfig: async (req, res) => {
    try {
      const config = await Config.findOne({});
      if (!config) return res.status(404).json({ message: 'No se encontró configuración' });
      res.status(200).json(config);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener configuración' });
    }
  },

  // Actualiza Tasa de cambio con fecha vigencia manual
  updateTasaCambio: async (req, res) => {
    try {
      const { tasaCambio_bcv, fecha_vigencia } = req.body;

      if (typeof tasaCambio_bcv !== 'number' || tasaCambio_bcv < 0) {
        return res.status(400).json({ message: 'Tasa de cambio inválida' });
      }
      if (!fecha_vigencia || isNaN(Date.parse(fecha_vigencia))) {
        return res.status(400).json({ message: 'Fecha de vigencia inválida' });
      }

      let config = await Config.findOne({});

      if (!config) {
        config = new Config({
          tasaCambio_bcv,
          fecha_vigencia: new Date(fecha_vigencia),
          fechaActualizacion_tasaCambio: new Date()
        });
      } else {
        config.tasaCambio_bcv = tasaCambio_bcv;
        config.fecha_vigencia = new Date(fecha_vigencia);
        config.fechaActualizacion_tasaCambio = new Date();
      }

      await config.save();

      res.status(200).json({
        message: 'Tasa de cambio actualizada correctamente',
        config
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar tasa de cambio' });
    }
  },

  // Actualiza porcentaje IVA (fecha es timestamp automático)
  updatePorcIva: async (req, res) => {
    try {
      const { porc_iva } = req.body;

      if (typeof porc_iva !== 'number' || porc_iva < 0 || porc_iva > 100) {
        return res.status(400).json({ message: 'Porcentaje de IVA inválido' });
      }

      let config = await Config.findOne({});

      if (!config) {
        config = new Config({
          porc_iva,
          fechaActualizacion_iva: new Date()
        });
      } else {
        config.porc_iva = porc_iva;
        config.fechaActualizacion_iva = new Date();
      }

      await config.save();

      res.status(200).json({
        message: 'Porcentaje de IVA actualizado correctamente',
        config
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar porcentaje de IVA' });
    }
  }
};


