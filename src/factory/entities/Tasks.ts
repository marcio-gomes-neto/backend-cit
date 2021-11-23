import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'
import { ITasks } from '../interfaces/ITasks'

@Entity()
export class tasks implements ITasks{
    @PrimaryGeneratedColumn()
    id:number
    
    @Column({ type: "varchar", length: 255, nullable: false})
    name: string

    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    desc: string
    
    @Column({ type: "boolean",  nullable: false})
    active: boolean

    @Column({ type: "date", nullable: false })
    updated_at: string

    @Column({ type: "date", nullable: true})
    created_at: string
}