import Ajv from "ajv"
import schema from "./schema.json"

const ajv = new Ajv({allErrors: true})

export const validate = ajv.compile(schema)