import { Connection, getConnectionManager } from "typeorm";
import { tasks } from "../entities/Tasks";
import { ITasks } from "../interfaces/ITasks";
import { TaskRepository } from "../repository/TaskRespository";

export class TaskServices{
    private readonly _taskConn:Connection

    constructor(){
        const connectionManager = getConnectionManager();
        this._taskConn = connectionManager.create({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "root",
            database: "tasks",
            entities: [tasks],
        });   
    }

    async saveNewTask(taskData: ITasks){
        try {
            await this._taskConn.connect()
            const taskRepo = this._taskConn.getCustomRepository(TaskRepository)

            await taskRepo.createTasks(taskData)
            await this._taskConn.close()

            return {message: "User Created With Sucess!", task: taskData}
        } catch (error) {
            console.log(error)
        }
    }

    async findAllTasks(){
        try {
            await this._taskConn.connect()
            const taskRepo = this._taskConn.getCustomRepository(TaskRepository)

            const findTasks = await taskRepo.findAllTasks()
            await this._taskConn.close()

            if(findTasks){
                return {message: `There are ${findTasks[1]} Tasks!`,task: findTasks}
            }
            return {message: "Unexpected Error!"}
            
        } catch (error) {
            console.log(error)
        }
    }

    async findAllActiveTasks(){
        try {
            await this._taskConn.connect()
            const taskRepo = this._taskConn.getCustomRepository(TaskRepository)

            const findTasks = await taskRepo.findAllActiveTasks()
            await this._taskConn.close()

            if(findTasks){
                return {message: `There are ${findTasks[1]} Tasks!`,task: findTasks}
            }
            return {message: "Unexpected Error!"}
            
        } catch (error) {
            console.log(error)
        }
    }

    async findTasksById(id){
        try {
            await this._taskConn.connect()
            const taskRepo = this._taskConn.getCustomRepository(TaskRepository)

            const findTask = await taskRepo.findById(id)
            await this._taskConn.close()

            if(findTask){
                return {message: `Task Found!`,task: findTask}
            }
            return {message: "No Tasks with this ID!"}
            
        } catch (error) {
            console.log(error)
        }
    }

    async findTaskByName(name){
        try {
            await this._taskConn.connect()
            const taskRepo = this._taskConn.getCustomRepository(TaskRepository)

            const findTasks = await taskRepo.findByName(name)
            await this._taskConn.close()

            if(findTasks){
                return {message: `There are ${findTasks[1]} Tasks!`,task: findTasks}
            }
            return {message: "No Tasks with this name!"}
            
        } catch (error) {
            console.log(error)
        }
    }

    async updateTask(id, data){
        try {
            await this._taskConn.connect()
            const taskRepo = this._taskConn.getCustomRepository(TaskRepository)

            await taskRepo.updateTasks(id, data)
            const updateTask = await taskRepo.findById(id)

            await this._taskConn.close()
            return {message: `Task Updated!`,taskUpdated: updateTask}
            
        } catch (error) {
            console.log(error)
        }
    }

    async disableTask(id){
        try {
            await this._taskConn.connect()
            const taskRepo = this._taskConn.getCustomRepository(TaskRepository)

            await taskRepo.disableTask(id)
            const disableTask = await taskRepo.findById(id)

            await this._taskConn.close()

            return {message: `Task Disabled!`,taskDisabled: disableTask}
            
        } catch (error) {
            console.log(error)
        }
    }
}