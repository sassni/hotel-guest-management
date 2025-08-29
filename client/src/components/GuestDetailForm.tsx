import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { pb } from '@/lib/pb'
import type { Guest, GuestInput } from '@/types/guest'
import Spinner from './Spinner'
import { useParams, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export default function GuestDetailForm() {
  const { id } = useParams({ from: '/guests/$id' })
  const nav = useNavigate()
  const qc = useQueryClient()
  const [error, setError] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['guest', id],
    queryFn: async (): Promise<Guest> => pb.collection('guests').getOne(id!),
    enabled: !!id,
  })

  const update = useMutation({
    mutationFn: async (values: Partial<GuestInput>) => pb.collection('guests').update(id!, values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['guest', id] })
      qc.invalidateQueries({ queryKey: ['guests'] })
    },
    onError: (e: any) => setError(e?.data?.message || e?.message || 'Failed to update guest'),
  })

  if (isLoading || !data) return <Spinner />

  return (
    <form
      className="card grid grid-cols-1 gap-4 sm:grid-cols-2"
      onSubmit={(e) => { e.preventDefault(); /* noop - we save on blur */ }}
    >
      <div>
        <label className="label">First name *</label>
        <input
          className="input"
          defaultValue={data.first_name}
          onBlur={(e) => update.mutate({ first_name: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="label">Last name *</label>
        <input
          className="input"
          defaultValue={data.last_name}
          onBlur={(e) => update.mutate({ last_name: e.target.value })}
          required
        />
      </div>
      <div className="sm:col-span-2">
        <label className="label">Email *</label>
        <input
          className="input"
          type="email"
          defaultValue={data.email}
          onBlur={(e) => update.mutate({ email: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="label">Phone</label>
        <input
          className="input"
          defaultValue={data.phone}
          onBlur={(e) => update.mutate({ phone: e.target.value })}
        />
      </div>
      <div>
        <label className="label">Date of birth</label>
        <input
          className="input"
          type="date"
          defaultValue={data.date_of_birth?.slice(0, 10)}
          onBlur={(e) => update.mutate({ date_of_birth: e.target.value })}
        />
      </div>
      <div className="sm:col-span-2">
        <label className="label">Address</label>
        <input
          className="input"
          defaultValue={data.address}
          onBlur={(e) => update.mutate({ address: e.target.value })}
        />
      </div>

      {error && <div className="sm:col-span-2 text-red-600">{error}</div>}

      <div className="sm:col-span-2 flex gap-2">
        <button type="button" className="btn btn-ghost" onClick={() => nav({ to: '/guests' })}>Back to list</button>
      </div>
    </form>
  )
}
