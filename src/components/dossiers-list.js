'use client'

import {Badge} from '@codegouvfr/react-dsfr/Badge'
import {Tag} from '@codegouvfr/react-dsfr/Tag'
import {DataGrid} from '@mui/x-data-grid'
import {frFR} from '@mui/x-data-grid/locales'
import {format} from 'date-fns'
import {pick} from 'lodash'

const convertDossierToRow = dossier => ({
  id: dossier.id,
  number: dossier.number,
  state: dossier.state,
  archived: dossier.archived,
  dateDepot: dossier.dateDepot ? new Date(dossier.dateDepot) : null,
  dateTraitement: dossier.dateTraitement ? new Date(dossier.dateTraitement) : null,
  dateExpiration: dossier.dateExpiration ? new Date(dossier.dateExpiration) : null,
  demandeur: dossier.demandeur,
  mandataire: dossier.deposeParUnTiers ? pick(dossier, ['nomMandataire', 'prenomMandataire']) : null
})

function renderDossierState({value}) {
  const labels = {
    accepte: {severity: 'success', label: 'Accepté'},
    refuse: {severity: 'error', label: 'Refusé'},
    en_construction: {severity: null, label: 'En construction'}, // eslint-disable-line camelcase
    en_instruction: {severity: 'info', label: 'En instruction'}, // eslint-disable-line camelcase
    sans_suite: {severity: 'warning', label: 'Sans suite'} // eslint-disable-line camelcase
  }
  const label = labels[value]
  return <Badge severity={label?.severity}>{label?.label}</Badge>
}

function renderDateCell(value) {
  return value ? format(new Date(value), 'dd/MM/yyyy') : '-'
}

const DossiersList = ({dossiers}) => (
  <div className='relative w-full h-full overflow-auto'>
    <DataGrid
      disableRowSelectionOnClick
      localeText={frFR.components.MuiDataGrid.defaultProps.localeText} // Utilisation des traductions en français
      rows={dossiers.map(d => convertDossierToRow(d))}
      columns={[
        {field: 'number', headerName: 'Numéro'},
        {
          field: 'demandeur',
          headerName: 'Demandeur',
          width: 300,
          valueFormatter: ({civilite, nom, prenom}) => `${civilite}. ${nom.toUpperCase()} ${prenom}`
        },
        {
          field: 'mandataire',
          headerName: 'Mandataire',
          width: 300,
          valueFormatter: mandataire => mandataire ? `${mandataire.nomMandataire.toUpperCase()} ${mandataire.prenomMandataire}` : '-'
        },
        {
          field: 'state',
          headerName: 'État',
          renderCell: renderDossierState,
          width: 180,
          filterable: true,
          type: 'singleSelect',
          valueOptions: [
            {value: 'accepte', label: 'Accepté'},
            {value: 'refuse', label: 'Refusé'},
            {value: 'en_construction', label: 'En construction'},
            {value: 'en_instruction', label: 'En instruction'},
            {value: 'sans_suite', label: 'Sans suite'}
          ]
        },
        {
          field: 'dateDepot', headerName: 'Date de dépôt', type: 'date', width: 150,
          valueFormatter: renderDateCell
        },
        {
          field: 'dateTraitement', headerName: 'Date de traitement', type: 'date', width: 150,
          valueFormatter: renderDateCell
        },
        {
          field: 'dateExpiration', headerName: 'Date d’expiration', type: 'date', width: 150,
          valueFormatter: renderDateCell
        },
        {
          field: 'archived',
          hide: true,
          headerName: 'Archivé',
          renderCell: ({value}) => <Tag>{value ? 'Oui' : 'Non'}</Tag>,
          type: 'boolean',
          valueOptions: [
            {value: true, label: 'Oui'},
            {value: false, label: 'Non'}
          ]
        }
      ]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 20, // Définit la taille de la page à 20 par défaut
            page: 0 // Démarre à la première page
          }
        },
        filter: {
          filterModel: {
            items: [
              {
                field: 'state',
                operator: 'is',
                value: 'en_instruction'
              }
            ]
          }
        },
        sorting: {
          sortModel: [{field: 'dateDepot', sort: 'asc'}]
        }
      }}
      pageSizeOptions={[20, 50, 100]} // Options pour la taille de la page
    />
  </div>
)

export default DossiersList
