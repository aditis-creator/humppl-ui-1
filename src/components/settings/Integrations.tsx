"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/Button"
import { toast } from "@/components/ui/Toast"

const DEFAULT = [
  { name: "Zoho CRM", connected: true },
  { name: "Gmail", connected: true },
  { name: "Slack", connected: false },
]

export default function Integrations() {
  const [services, setServices] = useState(DEFAULT)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('integrations_status')
      if (stored) setServices(JSON.parse(stored))
    } catch (e) { console.error(e) }
  }, [])

  const toggle = (index: number) => {
    const next = [...services]
    next[index].connected = !next[index].connected
    setServices(next)
  }

  const save = () => {
    try {
      localStorage.setItem('integrations_status', JSON.stringify(services))
      toast.success('Integrations saved')
    } catch (e) { console.error(e); toast.error('Failed to save integrations') }
  }

  return (
    <div className="space-y-4 text-sm text-gray-700">
      <p className="text-gray-600">Manage third-party integrations and authentication for your workspace.</p>
      <div className="grid gap-2">
        {services.map((service, idx) => (
          <div key={service.name} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3">
            <span>{service.name}</span>
            <div className="flex items-center space-x-3">
              <button onClick={() => toggle(idx)} className={`px-3 py-1 rounded-full text-xs font-semibold ${service.connected ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {service.connected ? 'Connected' : 'Disconnected'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Button onClick={save}>Save Changes</Button>
      </div>
    </div>
  )
}
