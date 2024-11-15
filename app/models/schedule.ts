import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Folder from '#models/folder'

export default class Schedule extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare folderId: number

  @column()
  declare description: string

  @column()
  declare workTime: number

  @belongsTo(() => Folder)
  declare folder: BelongsTo<typeof Folder>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}