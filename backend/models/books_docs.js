module.exports = function(sequelize, Sequelize) {
    const BooksDocs = sequelize.define(
      "books_docs",
      {id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        field: "id"
      },
      bookId: {
        type: Sequelize.BIGINT,
        allowNull: true,
        field: "book_id"
      },
      documentationId: {
        type: Sequelize.BIGINT,
        allowNull: true,
        field: "documentation_id"
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
    BooksDocs.associate = function (models) {
        BooksDocs.belongsTo(models.book);
        BooksDocs.belongsTo(models.documentation);
      }
  
    return  BooksDocs;
  };