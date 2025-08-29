import { useMutation, useQueryClient } from '@tanstack/react-query'
import { pb } from '@/lib/pb'
import type { GuestInput } from '@/types/guest'
import { useNavigate } from "@tanstack/react-router";
import { useState } from 'react'

export default function AddGuestForm() {
  const nav = useNavigate()
  const qc = useQueryClient()
  const [form, setForm] = useState<GuestInput>({
    first_name: '', last_name: '', email: '', phone: '', address: '', date_of_birth: ''
  })
  const [error, setError] = useState('')

  const create = useMutation({
    mutationFn: async (values: GuestInput) => {
      setError('')
      return pb.collection('guests').create(values)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['guests'] })
      nav({ to: '/guests' })
    },
    onError: (e: any) => setError(e?.data?.message || e?.message || 'Failed to create guest'),
  })

  return (
    <form
      className="card grid grid-cols-1 gap-4 sm:grid-cols-2"
      onSubmit={(e) => { e.preventDefault(); create.mutate(form) }}
    >
      <div>
        <label className="label">First name *</label>
        <input className="input" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} required />
      </div>
      <div>
        <label className="label">Last name *</label>
        <input className="input" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} required />
      </div>
      <div className="sm:col-span-2">
        <label className="label">Email *</label>
        <input type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
      </div>
      <div>
        <label className="label">Phone</label>
        <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      </div>
      <div>
        <label className="label">Date of birth</label>
        <input type="date" className="input" value={form.date_of_birth} onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })} />
      </div>
      <div className="sm:col-span-2">
        <label className="label">Address</label>
        <input className="input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
      </div>

      {error && <div className="sm:col-span-2 text-red-600">{error}</div>}

      <div className="sm:col-span-2 flex gap-2">
        <button className="btn btn-primary" type="submit" disabled={create.isPending}>
          {create.isPending ? 'Saving…' : 'Save Guest'}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => history.back()}>Cancel</button>
      </div>
    </form>
  )
}
