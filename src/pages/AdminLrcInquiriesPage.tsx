import React, { useState, useEffect } from 'react'
import { fetchLrcInquiries, type LrcInquiry } from '../lib/lrcInquiries'
import { isSupabaseConfigured } from '../lib/supabase'
import { sampleProducts } from '../data/products'

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString('hr-HR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getProductName(productId: string, language: 'hr' | 'en' = 'hr'): string {
  const product = sampleProducts.find(p => p.id === productId)
  if (!product) return productId
  return language === 'hr' ? product.nameHr : product.name
}

function getStatusBadgeColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'new':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'read':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'archived':
      return 'bg-gray-100 text-gray-800 border-gray-200'
    default:
      return 'bg-slate-100 text-slate-800 border-slate-200'
  }
}

const AdminLrcInquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<LrcInquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setError('Supabase nije konfiguriran. Dohvat podataka nije moguć.')
      setIsLoading(false)
      return
    }

    async function loadInquiries() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await fetchLrcInquiries()
        setInquiries(data)
      } catch (err) {
        const errorMessage = 'Došlo je do greške pri dohvaćanju upita. Pokušaj ponovo.'
        setError(errorMessage)
        console.error('Error fetching LRC inquiries:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadInquiries()
  }, [])

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <header className="mb-8 border-b pb-4">
          <h1 className="text-2xl font-semibold text-slate-900">
            LRC Upiti
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Pregled svih upita za personalizirane proizvode iz LRC forme.
          </p>
        </header>

        {/* Error message */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <p className="text-slate-600">Učitavanje...</p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !error && inquiries.length === 0 && (
          <div className="rounded-xl bg-white border border-slate-200 p-8 text-center">
            <p className="text-slate-600">Trenutno nema upita.</p>
          </div>
        )}

        {/* Table */}
        {!isLoading && !error && inquiries.length > 0 && (
          <div className="rounded-xl bg-white shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Datum
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Proizvod
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Ime
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Telefon
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Jezik
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-slate-900">
                        {formatDate(inquiry.created_at)}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-900">
                        <div className="max-w-xs">
                          <div className="font-medium">
                            {getProductName(inquiry.product, inquiry.language as 'hr' | 'en')}
                          </div>
                          <div className="text-xs text-slate-500 mt-1 line-clamp-2">
                            {inquiry.description}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-900">
                        {inquiry.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-900">
                        <a
                          href={`mailto:${inquiry.email}`}
                          className="text-violet-600 hover:text-violet-800 hover:underline"
                        >
                          {inquiry.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-900">
                        {inquiry.phone ? (
                          <a
                            href={`tel:${inquiry.phone}`}
                            className="text-violet-600 hover:text-violet-800 hover:underline"
                          >
                            {inquiry.phone}
                          </a>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-900">
                        <span className="uppercase">{inquiry.language}</span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadgeColor(inquiry.status)}`}
                        >
                          {inquiry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Summary */}
        {!isLoading && !error && inquiries.length > 0 && (
          <div className="mt-4 text-sm text-slate-600">
            Ukupno upita: <span className="font-semibold">{inquiries.length}</span>
          </div>
        )}
      </section>
    </main>
  )
}

export default AdminLrcInquiriesPage

