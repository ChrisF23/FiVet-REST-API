'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Paciente', [{
            nombre: 'Cachupin',
            //numero_chip: '575431',
            especie: 'Perro',
            edad_anios: 3,
            edad_meses: 2,
            raza: 'Quiltro',
            color: 'Cafe claro',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        },{
            nombre: 'Carlota',
            numero_chip: '231422',
            especie: 'Gato',
            edad_anios: 0,
            edad_meses: 7,
            raza: 'Sin especificar',
            color: 'Blanco',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        },{
            nombre: 'Kim',
            numero_chip: '883904',
            especie: 'Gato',
            edad_anios: 1,
            edad_meses: 0,
            raza: 'Sin especificar',
            color: 'Negro',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString()
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Paciente', null, {});
    }
};
