const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID, // PARA QUE EL ID NO SE REPITA
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      released: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT, // USE EL FLOAT YA QUE DEJA PONER NUMEROS CON PUNTO Y NO LOS TRANSFORMA A STRING COMO DECIMAL
        allowNull: false,
      },
    },
    {
      timestamps: false, // CON ESTO ELIMINAMOS QUE EN SQLShell APAREZCA createdAt y updatedAt
    }
  );
};
