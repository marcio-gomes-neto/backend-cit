import { EntityRepository, Repository } from "typeorm";
import { tasks } from "../entities/Tasks";
import { ITasks } from "../interfaces/ITasks";
import { ITaskRepository } from "../interfaces/ITasksRepository";
import { ITasksUpdate } from "../interfaces/ITasksUpdate";

@EntityRepository(tasks)
export class TaskRepository extends Repository<tasks> implements ITaskRepository {

    findAllTasks(){
        return this.createQueryBuilder("tasks")
            .getManyAndCount()
    }
    findAllActiveTasks(){
        return this.createQueryBuilder("tasks")
            .where('tasks.active = :bool', {bool: true})    
            .getManyAndCount()
    }

    findById(id: number){
        return this.createQueryBuilder("tasks")
        .where("tasks.id = :id", { id: id })
        .getOne();
    }

    findByName(name: string) {
        return this.createQueryBuilder("tasks")
        .where("tasks.name = :name", { name: name })
        .andWhere("tasks.active = :bool",{ bool: true })
        .getManyAndCount();
    }
    
    createTasks(data: ITasks){
        return this.createQueryBuilder("tasks")
        .insert()
        .into(tasks)
        .values(data)
        .execute();
    }

    updateTasks(id: ITasks["id"] ,data: ITasksUpdate){
        return this.createQueryBuilder("tasks")
        .update()
        .set({ ...data })
        .where("id = :id", { id: id })
        .execute();
    }

    disableTask(id:ITasks["id"]){
        return this.createQueryBuilder("tasks")
          .update()
          .set({active: false, updated_at: new Date().toISOString()})
          .where("id = :id", { id: id })
          .execute()
      }
  
}