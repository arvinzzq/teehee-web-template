module.exports = function(sequelize, DataTypes) {
  return Object.assign(sequelize.define('Record', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    content: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ''
    },
    url: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    },
    idDelete: {
      field: 'is_delete',
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'record',
    freezeTableName: true
  }), {
    async createRecord(data) {
      const { title, content, url } = data;
      const result = await this.create({ title, content, url }, { raw: true });
      return result;
    },
  
    async findRecordById(id) {
      const result = await this.findById(id, {
        where: { isDelete: 0 },
        raw: true
      });
      return result;
    },
  
    async findRecords(data) {
      const { page, pageSize } = data;
      console.log('page: ', page);
      console.log('pagesize: ', pageSize);
      const result = await this.findAll({
        where: { isDelete: 0 },
        raw: true,
        offset: (page - 1) * pageSize,
        limit: page
      });
      return result;
    },
  
    async findAllRecords() {
      const result = await this.findAll({ where: { idDelete: 0 }, raw: true });
      return result;
    },
  
    async deleteRecord(id) {
      const result = await this.update({
        where: {
          id,
          isDelete: 0
        },
        raw: true
      })
      return result;
    }
  });
};