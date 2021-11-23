import { InsertResult, UpdateResult } from "typeorm";
import { ITasks } from "./ITasks";
import { ITasksUpdate } from "./ITasksUpdate";

export interface ITaskRepository{
    findAllTasks: () => Promise<[ITasks[], number]>
    findAllActiveTasks: () => Promise<[ITasks[], number]>
    findById: (id: ITasks["id"]) => Promise<ITasks>
    findByName: (name: ITasks["name"]) => Promise<[ITasks[], number]>
    
    createTasks: (data: ITasks) => Promise<InsertResult>

    updateTasks: (id:ITasks["id"], data:ITasksUpdate) => Promise<UpdateResult>

    disableTask: (id:ITasks["id"]) => Promise<UpdateResult>
}
