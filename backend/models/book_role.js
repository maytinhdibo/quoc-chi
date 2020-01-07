module.exports = function (sequelize, Sequelize) { 
    const BookRole = sequelize.define("book_role", {
         
      id: {
        primaryKey: true,
        field: 'id',
        type: Sequelize.BIGINT,
        autoIncrement: true,
      },
      name: {
            field: 'name',
            type: Sequelize.STRING,
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
    {timestamps: false});

    BookRole.associate = function (models) {
      BookRole.hasOne(models.books_user);
    }
    
    return BookRole;
}