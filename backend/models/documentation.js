module.exports = function(sequelize, Sequelize) {
  const Documentation = sequelize.define("documentation", {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: "id",
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: "name"
    },
    type: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      field: "type"
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: true,
      field: "content"
    },
    url: {
      type: Sequelize.STRING(255),
      allowNull: true,
      field: "url"
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      field: "created_at"
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      field: "updated_at"
    },
    approverId: {
      type: Sequelize.BIGINT,
      allowNull: true,
      field: "approver_id"
    },
    userId: {
      type: Sequelize.BIGINT,
      allowNull: true,
      field: "user_id"
    },
    docStateId: {
      type: Sequelize.BIGINT,
      allowNull: true,
      field: "doc_state_id"
    },
    source: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: "0",
      field: "source"
    },
    popularity: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: "0",
      field: "popularity"
    },
    collectType: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: "0",
      field: "collect_type"
    },
    priceType: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: "0",
      field: "price_type"
    },
    price: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      field: "price"
    },
    copyrightStatus: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: "0",
      field: "copyright_status"
    },
    usageValue: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: "0",
      field: "usage_value"
    },
    storeLocation: {
      type: Sequelize.INTEGER(11),
      allowNull: true,
      defaultValue: "0",
      field: "store_location"
    },
    docTypeId: {
      type: Sequelize.BIGINT,
      allowNull: true,
      field: "doc_state_id"
    },
  });

  Documentation.associate = function(models) {
    Documentation.belongsToMany(models.section, {
      through: models.sections_docs_logs
    });
    Documentation.belongsToMany(models.book, {
      through: models.books_doc
    });
    Documentation.belongsToMany(models.keyword, {
      through: models.documentations_keyword
    });
    
    Documentation.belongsTo(models.doc_state ,{ foreignKey: "doc_state_id" });
    // Documentation.belongsTo(models.doc_type,{ foreignKey: "doc_type_id" });
    Documentation.hasMany(models.docs_log);
    Documentation.belongsTo(models.user, {foreignKey: "user_id"});
    Documentation.belongsTo(models.user, {foreignKey: "approver_id"});
  };

  return Documentation;
};
