import {Suspense} from 'react'

import PointTabs from '@/components/prelevements/point-tabs.js'

const Layout = ({children}) => (
  <>
    <PointTabs />
    <div className='fr-container'>
      <Suspense>
        {children}
      </Suspense>
    </div>
  </>
)

export default Layout
