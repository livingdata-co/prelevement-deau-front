import PointTabs from '@/components/prelevements/point-tabs.js'

const Layout = ({children}) => (
  <>
    <PointTabs />
    <div className='fr-container h-full'>
      {children}
    </div>
  </>
)

export default Layout
