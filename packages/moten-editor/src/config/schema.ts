import { schema, type MoComponentSchema } from '@moten/ui'

export type BlockSchema = typeof schema

export type BlockSchemaKeys = keyof BlockSchema

export type BlockSchemaFormData = MoComponentSchema

export const blockSchema = schema
