const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  // NO HACE FALTA PONER EL ID YA QUE SE GENERA AUTOMATICAMENTE
  sequelize.define(
    "genre",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false, // CON ESTO ELIMINAMOS QUE EN SQLShell APAREZCA createdAt y updatedAt
    }
  );
};
