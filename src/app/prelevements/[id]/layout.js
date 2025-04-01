import {Suspense} from 'react'

import PointTabs from '@/components/prelevements/point-tabs.js'

const Layout = ({children}) => (
  <div className='fr-container'>
    <PointTabs />
    <Suspense>
      {children}
    </Suspense>
  </div>
)

export default Layout
