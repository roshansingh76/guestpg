import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Search, Pencil, Trash2, Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import Card from '../../components/common/Card'
import ConfirmDialog from '../../components/common/ConfirmDialog'
import { deleteGuest, listGuests } from '../../services/guestService'
import { listPGs } from '../../services/pgService'

export default function GuestsList() {
    const navigate = useNavigate()
    const user = useSelector((s) => s.auth.user)
    const isOwner = user?.role === 'pg_owner' || user?.role === 'pg_staff'
    const [pgs, setPgs] = useState([])
    const [selectedPgId, setSelectedPgId] = useState(user?.pgId ? String(user.pgId) : '')
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [confirm, setConfirm] = useState({ open: false, id: null, name: '' })

    useEffect(() => {
        const loadPGs = async () => {
            try {
                console.log('Loading PGs...')
                const pgList = await listPGs()
                console.log('PGs loaded:', pgList)
                setPgs(pgList)
                if (!selectedPgId && pgList.length > 0) {
                    setSelectedPgId(String(pgList[0].id))
                }
            } catch (error) {
                console.error('Failed to load PGs', error)
                toast.error('Failed to load PGs')
            }
        }
        loadPGs()
    }, [])

    useEffect(() => {
        if (!selectedPgId) return
        setLoading(true)
        localStorage.setItem('selectedPgId', selectedPgId)
        listGuests(selectedPgId)
            .then(setList)
            .catch(() => toast.error('Failed to load guests'))
            .finally(() => setLoading(false))
    }, [selectedPgId])

    const filtered = useMemo(() => {
        const q = search.toLowerCase()
        return list.filter((g) =>
            g.name.toLowerCase().includes(q) || g.phone.includes(q) || g.aadhar?.includes(q)
        )
    }, [list, search])

    const confirmDelete = (guest) => setConfirm({ open: true, id: guest.id, name: guest.name })

    const handleDelete = async () => {
        try {
            await deleteGuest(selectedPgId, confirm.id)
            setList((prev) => prev.filter((g) => g.id !== confirm.id))
            toast.success('Guest deleted')
        } catch {
            toast.error('Failed to delete guest')
        } finally {
            setConfirm({ open: false, id: null, name: '' })
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">Tenant management</p>
                    <h1 className="text-3xl font-semibold text-gray-900">Tenants</h1>
                </div>
                <button onClick={() => navigate('/owner/tenants/new', { state: { selectedPgId } })} className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-white font-semibold shadow-sm hover:bg-blue-700 transition">
                    <Plus size={18} /> Add Tenant
                </button>
            </div>

            <Card>
                <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="relative text-gray-500 w-full md:w-80">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select PG</label>
                        <select
                            value={selectedPgId}
                            onChange={(e) => setSelectedPgId(e.target.value)}
                            disabled={isOwner}
                            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <option value="">-- Select a PG --</option>
                            {pgs.map((pg) => (
                                <option key={pg.id} value={String(pg.id)}>{pg.pgName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="relative text-gray-500 w-full md:w-80">
                        <Search className="absolute left-3 top-3.5" size={18} />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Search by name, phone or Aadhaar"
                        />
                    </div>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500 py-8">Loading...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm text-gray-600">
                            <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                                <tr>
                                    <th className="px-4 py-4">Guest</th>
                                    <th className="px-4 py-4">Phone</th>
                                    <th className="px-4 py-4">Aadhaar</th>
                                    <th className="px-4 py-4">Move-in</th>
                                    <th className="px-4 py-4">Status</th>
                                    <th className="px-4 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filtered.length === 0 && (
                                    <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No tenants found</td></tr>
                                )}
                                {filtered.map((tenant) => (
                                    <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4 font-medium text-gray-900">{tenant.name}</td>
                                        <td className="px-4 py-4">{tenant.phone}</td>
                                        <td className="px-4 py-4">{tenant.aadhar}</td>
                                        <td className="px-4 py-4">{tenant.moveInDate?.slice(0, 10)}</td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tenant.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {tenant.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 flex flex-wrap items-center gap-2">
                                            <button onClick={() => navigate(`/owner/tenants/${tenant.id}/edit`)} className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-blue-700 text-sm hover:bg-blue-100">
                                                <Pencil size={14} /> Edit
                                            </button>
                                            <button onClick={() => confirmDelete(tenant)} className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-2 text-red-700 text-sm hover:bg-red-100">
                                                <Trash2 size={14} /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

            <ConfirmDialog
                open={confirm.open}
                title="Delete tenant?"
                description={`This will permanently remove ${confirm.name || 'this tenant'}.`}
                confirmText="Delete tenant"
                onCancel={() => setConfirm({ open: false, id: null, name: '' })}
                onConfirm={handleDelete}
            />
        </div>
    )
}
