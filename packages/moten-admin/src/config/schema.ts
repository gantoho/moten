import { schema } from '@moten/ui'
import _pageSchema from './page-schema'

export type BlockSchema = typeof schema

export type BlockSchemaKeys = keyof BlockSchema

export type PageSchema = typeof _pageSchema

export const blockSchema = schema as BlockSchema

export const pageSchema = _pageSchema as PageSchema
