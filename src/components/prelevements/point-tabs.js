'use client'

import {useEffect, useState} from 'react'

import {Tab, Tabs} from '@mui/material'
import {useRouter, useParams, usePathname} from 'next/navigation'

const PointTabs = () => {
  const router = useRouter()
  const {id} = useParams()
  const url = usePathname()
  const [path, setPath] = useState('identification')

  const handleClick = (e, value) => {
    router.push(`/prelevements/${id}/${value}`)
  }

  useEffect(() => {
    if (url) {
      const parts = url.split('/').filter(Boolean)

      // Lorsque l'url fini par l'id, on reste sur 'identification'
      if (parts.length !== 2) {
        setPath(parts.at(-1))
      }
    }
  }, [url])

  return (
    <Tabs
      value={path}
      variant='scrollable'
      scrollButtons='auto'
      onChange={handleClick}
    >
      <Tab value='identification' label='Identification' />
      <Tab value='localisation' label='Localisation' />
      <Tab value='exploitations' label='Exploitations' />
    </Tabs>
  )
}

export default PointTabs
