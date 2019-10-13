module.exports = function(sequelize, Sequelize) {
  const Documentation = sequelize.define("documentation", {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      field: "id"
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
    }
  });

  Documentation.associate = function(models) {
    Documentation.belongsToMany(models.section, {
      through: models.sections_docs_logs
    });
  };

  return Documentation;
};
