module.exports = function (sequelize, Sequelize) {
  const UserVolume = sequelize.define("users_volume", {
    volumeId: {
      field: 'volume_id',
      type: Sequelize.INTEGER,
    },
    userId: {
      field: 'user_id',
      type: Sequelize.INTEGER,
    }
  },
    { timestamps: false }
  );
  UserVolume.associate = function (models) {
    UserVolume.belongsTo(models.user);
    UserVolume.belongsTo(models.volume);
  }
  return UserVolume;
}