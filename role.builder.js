/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */
let roleBuilder = {
    /**@param {Creep} creep **/
    run: (creep) => {
        if (creep.store[RESOURCE_ENERGY] == 0) {
            let sources = creep.room.find(FIND_SOURCES);
            //console.log(`房间里的资源列表：${sources}`);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffff00' } });
            }
        } else {
            let constructions = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
            //console.log(`房间里的建筑工地列表：${constructions}`);
            if (creep.build(constructions[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(constructions[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }

    }
};
module.exports = roleBuilder;