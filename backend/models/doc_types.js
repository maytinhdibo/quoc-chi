module.exports = function(sequelize, Sequelize) {
  const DocType = sequelize.define(
    "doc_type",
    {
      id: {
        type: Sequelize.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false }
  );
  DocType.associate = function (models) {
    DocType.hasMany(models.documentation);    
}


  return DocType;
};
