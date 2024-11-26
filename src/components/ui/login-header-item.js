import {HeaderQuickAccessItem} from '@codegouvfr/react-dsfr/Header'
import {signOut} from 'next-auth/react'

const LoginHeaderItem = ({id}) => (
  <HeaderQuickAccessItem
    id={id}
    quickAccessItem={
      {
        iconId: 'ri-account-box-line',
        text: 'Se déconnecter',
        buttonProps: {
          onClick() {
            signOut()
          }
        }
      }
    }
  />
)

export default LoginHeaderItem
