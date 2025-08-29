import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { pb } from '@/lib/pb'
import type { Guest } from '@/types/guest'
import { Link } from '@tanstack/react-router'
import Spinner from './Spinner'
import { useState } from 'react'

const fetchGuests = async (q: string): Promise<Guest[]> => {
  const filter = q ? `first_name ~ "%${q}%" || last_name ~ "%${q}%" || email ~ "%${q}%"` : ''
  const list = await pb.collection('guests').getList<Guest>(1, 200, { filter, sort: '-created' })
  return list.items
}

export default function GuestList() {
  const qc = useQueryClient()
  const [query, setQuery] = useState('')
  const [guestToDelete, setGuestToDelete] = useState<Guest | null>(null)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['guests', query],
    queryFn: () => fetchGuests(query),
  })

  const del = useMutation({
    mutationFn: async (id: string) => pb.collection('guests').delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['guests', query] })
      setGuestToDelete(null) // close modal after delete
    },
    onError: (error) => {
      console.error('Delete error:', error)
      alert('Failed to delete guest. Please try again.')
    }
  })

  if (isLoading) return <Spinner />
  if (isError) return <div className="card">Failed to load guests.</div>

  return (<>
    <div className="card">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold">Guests</h2>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or email…"
          className="input max-w-sm"
        />
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Phone</th>
              <th className="py-2 pr-4">Created</th>
              <th className="py-2 pr-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((g) => (
              <tr key={g.id} className="border-b last:border-0">
                <td className="py-2 pr-4">{g.first_name} {g.last_name}</td>
                <td className="py-2 pr-4">{g.email}</td>
                <td className="py-2 pr-4">{g.phone ?? '-'}</td>
                <td className="py-2 pr-4">{new Date(g.created).toLocaleString()}</td>
                <td className="py-2 pr-0">
                  <div className="flex justify-end gap-2">
                    <Link to={`/guests/${g.id}`} className="btn btn-ghost">Edit</Link>
                    <button
                      onClick={() => setGuestToDelete(g)}
                      className="btn btn-error"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {guestToDelete && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full">
          <h3 className="text-lg font-semibold mb-2">Delete Guest</h3>
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to delete{" "}
            <span className="font-medium">{guestToDelete.first_name} {guestToDelete.last_name}</span>?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setGuestToDelete(null)}
              className="btn btn-ghost"
              disabled={del.isPending}
            >
              Cancel
            </button>
            <button
              onClick={() => del.mutate(guestToDelete.id)}
              className="btn btn-error"
              disabled={del.isPending}
            >
              {del.isPending ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    )}
  </>

  )
}
