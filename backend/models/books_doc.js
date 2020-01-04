module.exports = function (sequelize, Sequelize) {
  const BookDocs = sequelize.define("books_doc", {
    Id: {
      field: 'id',
      type: Sequelize.BIGINT,
      primarykey: true,
      //autoIncrement: true,
      //allowNull: false,
    },
    bookId: {
      field: 'book_id',
      type: Sequelize.BIGINT,
    },
    documentationId: {
      field: 'documentation_id',
      type: Sequelize.BIGINT
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
  },
  );

  BookDocs.associate = function (models) {
      BookDocs.belongsTo(models.documentation,{foreignKey: "documentation_id"});
      BookDocs.belongsTo(models.book,{foreignKey: "book_id"});
  }

  return BookDocs;
}