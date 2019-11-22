module.exports = function (sequelize, Sequelize) {
    const BookDocs = sequelize.define("books_doc", {
      Id: {
        field: 'id',
        type: Sequelize.BIGINT,
        primarykey: true,
      },
      bookId: {
        field: 'book_id',
        type: Sequelize.BIGINT,
      },
      documentationId: {
        field: 'doccumentation_id',
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
        BookDocs.belongsTo(models.documentation,{foreignKey: "doccumentation_id"});
        BookDocs.belongsTo(models.book,{foreignKey: "book_id"});
    }
  
    return BookDocs;
  }