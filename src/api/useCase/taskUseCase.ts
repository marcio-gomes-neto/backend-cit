import { ITasks } from "../../factory/interfaces/ITasks";
import { ITasksUpdate } from "../../factory/interfaces/ITasksUpdate";
import { TaskServices } from "../../factory/services/TaskServices";

export default class TaskUseCase{
    
    async getRequest(_input){
        if(_input.params.id){
            return this.getTaskById(_input.params.id);
        }

        if(_input.query.name){
            return this.getTaskByName(_input.query.name);
        }

        if(Object.keys(_input.query).length == 0 && Object.keys(_input.params).length == 0){
            return this.getAllActiveTasks()
        }

        return {resp: 'Invalid get request', code:400}
    }

    async getAllActiveTasks(){
        try{
            const taskServices = new TaskServices()
            const getActiveTasks = await taskServices.findAllActiveTasks()

            return {resp: getActiveTasks, code:200}
        }catch(err){
            return {resp: err, code: 400}
        }
    }

    async getAllTasks(){
        try{
            const taskServices = new TaskServices()
            const getActiveTasks = await taskServices.findAllTasks()

            return {resp: getActiveTasks, code:200}
        }catch(err){
            return {resp: err, code: 400}
        }
    }

    async getTaskById(_input){
        try{
            if (Object.keys(_input).length === 0) throw new Error('Argument Cant Be Null')
            
            const taskServices = new TaskServices()
            const getActiveTasks = await taskServices.findTasksById(_input)

            return {resp: getActiveTasks, code:200}
        }catch(err){
            return {resp: err, code: 400}
        }
    }
    
    async getTaskByName(_input){
        try{
            if (Object.keys(_input).length === 0) throw new Error('Argument Cant Be Null')
            
            const taskServices = new TaskServices()
            const getActiveTasks = await taskServices.findTaskByName(_input)

            return {resp: getActiveTasks, code:200}
        }catch(err){
            return {resp: err, code: 400}
        }
    }

    async createNewTask(_input:ITasks){
        try{
            const taskServices = new TaskServices()

            if (Object.keys(_input).length === 0) throw new Error('Argument Cant Be Null')
            if (_input.id != null) throw new Error('No need to send ID')
            
            if (_input.name.length < 3 || typeof _input.name != "string") throw new Error('Invalid Name')
            //if (_input.desc.length < 3 || typeof _input.name != "string") throw new Error('Invalid Description')

            const taskData:ITasks = {
                name: _input.name,
                desc: _input.desc,
                active: true,
                updated_at: new Date().toISOString(),
                created_at: new Date().toISOString()
            }

            const createTask = await taskServices.saveNewTask(taskData);
            return {resp: createTask, code:200}
        }catch (err) {
            return {resp: err, code: 400}
        }
    }

    async updateTask(id:ITasks["id"], _input:ITasksUpdate){
        try{
            const taskServices = new TaskServices()

            if (Object.keys(_input).length === 0) throw new Error('Argument Cant Be Null')
            if (id === undefined || id === NaN) throw new Error('Invalid ID')
            
            const taskData:ITasksUpdate = {}

            for (const key in _input) {
                if (_input[key] !== undefined) {
                    taskData[key] = _input[key]
                }
            }

            taskData.updated_at = new Date().toISOString()
            const updateTask = await taskServices.updateTask(id, taskData);
            return {resp: updateTask, code:200}
        }catch (err) {
            return {resp: err, code: 400}
        }
    }

    async deactivateTask(id:ITasks['id']){
        try{
            const taskServices = new TaskServices()
            if (id === undefined || id === NaN) throw new Error('Invalid ID')

            const disableTask = await taskServices.disableTask(id);
            return {resp: disableTask, code:200}
        }catch (err) {
            return {resp: err, code: 400}
        }
    }
}
