

export interface Category{
    id: number,
    name: String,
    avatar_url: String,
    subtitle: String
}

export default interface Item {
    id: number,
    name: String,
    avatar_url: String,
    subtitle: String,
    category: Category
  }
