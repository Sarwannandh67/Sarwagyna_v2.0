// lib/database.types.ts

export type ClientStatus = 'active' | 'inactive' | 'prospect' | 'churned'
export type ProjectStatus = 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold'
export type InvoiceStatus = 'draft' | 'sent' | 'overdue' | 'paid'
export type PaymentMethod = 'upi' | 'bank_transfer' | 'card' | 'cash' | 'cheque' | 'other'

export interface Client {
  id: string
  name: string
  company: string | null
  email: string
  phone: string | null
  address: string | null
  tags: string[]
  status: ClientStatus
  account_manager: string | null
  notes: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  client_id: string
  name: string
  description: string | null
  tech_stack: string[]
  tags: string[]
  repo_url: string | null
  figma_url: string | null
  start_date: string | null
  end_date: string | null
  status: ProjectStatus
  budget: number | null
  currency: string
  created_at: string
  updated_at: string
}

export interface Invoice {
  id: string
  client_id: string
  project_id: string | null
  invoice_number: string
  issue_date: string
  due_date: string
  amount: number
  currency: string
  status: InvoiceStatus
  file_url: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  client_id: string
  invoice_id: string | null
  amount: number
  currency: string
  payment_date: string
  method: PaymentMethod
  reference: string | null
  notes: string | null
  created_at: string
}

export interface ClientSummary {
  id: string
  name: string
  company: string | null
  email: string
  status: ClientStatus
  total_projects: number
  total_invoices: number
  outstanding_amount: number
  total_paid: number
}

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: Client
        Insert: Omit<Client, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Client, 'id' | 'created_at' | 'updated_at'>>
      }
      projects: {
        Row: Project
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>
      }
      invoices: {
        Row: Invoice
        Insert: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Invoice, 'id' | 'created_at' | 'updated_at'>>
      }
      payments: {
        Row: Payment
        Insert: Omit<Payment, 'id' | 'created_at'>
        Update: Partial<Omit<Payment, 'id' | 'created_at'>>
      }
    }
    Views: {
      client_summary: {
        Row: ClientSummary
      }
    }
  }
}
