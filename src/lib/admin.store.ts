// src/lib/admin.store.ts
import { create } from 'zustand'

export type RequestStatus = 'new' | 'queued' | 'in_progress' | 'done' | 'cancelled'

export interface AdminInteriorsRequest {
  id: string
  createdAt: string
  clientName: string
  email: string
  spaceType: string
  city: string
  stolarId?: string | null
  status: RequestStatus
  isArchived: boolean
}

export interface AdminStolarProfile {
  id: string
  createdAt: string
  companyName: string
  contactPerson: string
  email: string
  location: string
  projectTypesSummary: string
  monthlyCapacity: string
  status: RequestStatus
  isArchived: boolean
}

export interface AdminWebProjectRequest {
  id: string
  createdAt: string
  clientName: string
  email: string
  projectTypesSummary: string
  budgetRange: string
  status: RequestStatus
  isArchived: boolean
}

export interface AdminStoreState {
  interiors: AdminInteriorsRequest[]
  stolars: AdminStolarProfile[]
  web: AdminWebProjectRequest[]

  addInteriorsRequest: (payload: Omit<AdminInteriorsRequest, 'id' | 'createdAt' | 'status' | 'isArchived'>) => void
  addStolarProfile: (payload: Omit<AdminStolarProfile, 'id' | 'createdAt' | 'status' | 'isArchived'>) => void
  addWebProjectRequest: (payload: Omit<AdminWebProjectRequest, 'id' | 'createdAt' | 'status' | 'isArchived'>) => void

  updateStatus: (
    type: 'interiors' | 'stolars' | 'web',
    id: string,
    status: RequestStatus
  ) => void

  toggleArchive: (
    type: 'interiors' | 'stolars' | 'web',
    id: string
  ) => void

  deleteInteriorsRequest: (id: string) => void
}

export const useAdminStore = create<AdminStoreState>((set) => ({
  interiors: [
    {
      id: 'INT-TEST',
      createdAt: new Date().toISOString(),
      clientName: 'Test klijent',
      email: 'test@example.com',
      spaceType: 'Kuhinja',
      city: 'Rijeka',
      stolarId: null,
      status: 'new',
      isArchived: false,
    },
  ],
  stolars: [
    {
      id: 'STO-TEST',
      createdAt: new Date().toISOString(),
      companyName: 'Stolarija Test',
      contactPerson: 'Marko Test',
      email: 'stolar@test.com',
      location: 'Zagreb',
      projectTypesSummary: 'Kuhinje, Ormari',
      monthlyCapacity: '3-5 projekata mjesečno',
      status: 'new',
      isArchived: false,
    },
  ],
  web: [
    {
      id: 'WEB-TEST',
      createdAt: new Date().toISOString(),
      clientName: 'Web Test Klijent',
      email: 'web@test.com',
      projectTypesSummary: 'Portfolio, Web shop',
      budgetRange: '3.000 - 7.000 €',
      status: 'new',
      isArchived: false,
    },
  ],

  addInteriorsRequest: (payload) =>
    set((state) => ({
      interiors: [
        {
          id: `INT-${state.interiors.length + 1}`,
          createdAt: new Date().toISOString(),
          status: 'new',
          isArchived: false,
          stolarId: payload.stolarId ?? null,
          ...payload,
        },
        ...state.interiors,
      ],
    })),

  addStolarProfile: (payload) =>
    set((state) => ({
      stolars: [
        {
          id: `STO-${state.stolars.length + 1}`,
          createdAt: new Date().toISOString(),
          status: 'new',
          isArchived: false,
          ...payload,
        },
        ...state.stolars,
      ],
    })),

  addWebProjectRequest: (payload) =>
    set((state) => ({
      web: [
        {
          id: `WEB-${state.web.length + 1}`,
          createdAt: new Date().toISOString(),
          status: 'new',
          isArchived: false,
          ...payload,
        },
        ...state.web,
      ],
    })),

  updateStatus: (type, id, status) =>
    set((state) => {
      if (type === 'interiors') {
        return {
          interiors: state.interiors.map((item) =>
            item.id === id ? { ...item, status } : item
          ),
        }
      }
      if (type === 'stolars') {
        return {
          stolars: state.stolars.map((item) =>
            item.id === id ? { ...item, status } : item
          ),
        }
      }
      return {
        web: state.web.map((item) =>
          item.id === id ? { ...item, status } : item
        ),
      }
    }),

  toggleArchive: (type, id) =>
    set((state) => {
      if (type === 'interiors') {
        return {
          interiors: state.interiors.map((item) =>
            item.id === id ? { ...item, isArchived: !item.isArchived } : item
          ),
        }
      }
      if (type === 'stolars') {
        return {
          stolars: state.stolars.map((item) =>
            item.id === id ? { ...item, isArchived: !item.isArchived } : item
          ),
        }
      }
      return {
        web: state.web.map((item) =>
          item.id === id ? { ...item, isArchived: !item.isArchived } : item
        ),
      }
    }),

  deleteInteriorsRequest: (id) =>
    set((state) => ({
      interiors: state.interiors.filter((req) => req.id !== id),
    })),
}))

