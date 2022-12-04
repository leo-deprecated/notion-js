const Sequelize = require('sequelize');

module.exports = class tb_document extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.BIGINT,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING(256),
                allowNull: false,
            },
            contents: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            created_by: {
                type :Sequelize.STRING(128),
                allowNull: false
            },
            created_at: {
                type :Sequelize.STRING(128),
                allowNull: false
            },
            update_by: {
                type: Sequelize.STRING(128),
                allowNull: false

            },
            update_at: {
                type: Sequelize.STRING(128),
                allowNull: false
            }
                        
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: '',
            tableName: 'tb_document',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    
};