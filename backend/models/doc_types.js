module.exports = function(sequelize, Sequelize) {
  const DocType = sequelize.define(
    "doc_type",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false }
  );

  return DocType;
};
