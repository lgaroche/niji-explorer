interface Attributes {
  trait_type: string
  value: string
}

interface IDCardContent {
  name: string
  image: string
  attributes: Attributes[]
}

export type { IDCardContent, Attributes }
