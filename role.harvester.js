let roleHarvester = {
    /** @param {Creep} creep **/
    run: (creep) => {
        //该存储的剩余可用容量(当大于0时，进行采集任务)
        if (creep.store.getFreeCapacity() > 0) {
            //寻找所有的资源
            let sources = creep.room.find(FIND_SOURCES);
            //如果目标太远了，则移动到目标点（creep.harvest采集）
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffff00' } });
            }
        }
        else {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: structure => {
                    return ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN)
                        && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
                        || (structure.structureType == STRUCTURE_CONTAINER && ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN)
                            && structure.store.getFreeCapacity(RESOURCE_ENERGY) == 0));
                }
            });
            console.log(`目标列表：${targets}`);
            //transfer（转移）到基地，当目标不为远的时候进行移动
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};
module.exports = roleHarvester;