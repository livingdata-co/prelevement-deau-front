import MuiDsfrThemeProvider from '@codegouvfr/react-dsfr/mui'
import {DsfrHead} from '@codegouvfr/react-dsfr/next-appdir/DsfrHead'
import {DsfrProvider} from '@codegouvfr/react-dsfr/next-appdir/DsfrProvider'
import {getHtmlAttributes} from '@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes'
import Link from 'next/link'
import {getServerSession} from 'next-auth'

import {defaultColorScheme} from '@/app/default-color-scheme.js'
import {StartDsfr} from '@/app/start-dsfr.js'
import Footer from '@/components/footer.js'
import Header from '@/components/header.js'

import '@codegouvfr/react-dsfr/dsfr/utility/icons/icons.min.css'
import '@/app/globals.css'

export const metadata = {
  title: 'Prélèvement d’eau',
  description: 'Suivre les prélèvements d’eau'
}

const RootLayout = async ({children}) => {
  const lang = 'fr'
  const session = await getServerSession()

  return (
    <html {...getHtmlAttributes({defaultColorScheme, lang})} >
      <head>
        <StartDsfr />
        <DsfrHead Link={Link} />
      </head>
      <body>
        <DsfrProvider lang={lang}>
          <MuiDsfrThemeProvider>
            <div className='flex flex-col h-full'>
              <Header user={session?.user} />
              <main className='fr-pt-md-4v' role='main' id='content'>
                {children}
              </main>
              <Footer />
            </div>
          </MuiDsfrThemeProvider>
        </DsfrProvider>
      </body>
    </html>
  )
}

export default RootLayout
