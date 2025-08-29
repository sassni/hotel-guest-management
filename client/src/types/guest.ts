export type Guest = {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  address?: string
  date_of_birth?: string // ISO yyyy-mm-dd
  created: string
}

export type GuestInput = Omit<Guest, 'id' | 'created'>
