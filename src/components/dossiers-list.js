'use client'

import {useState} from 'react'

import {Badge} from '@codegouvfr/react-dsfr/Badge'
import {createModal} from '@codegouvfr/react-dsfr/Modal'
import {DataGrid, GridToolbar} from '@mui/x-data-grid'
import {frFR} from '@mui/x-data-grid/locales'
import {format} from 'date-fns'

import InvalidDossierModal from './dossiers-errors/invalid-dossier-modal.js'

const modal = createModal({
  id: 'invalid-dossiers-modal',
  isOpenedByDefault: false
})

const convertDossierToRow = dossier => ({
  id: dossier._id,
  number: dossier.number,
  state: dossier.state,
  errorsCount: dossier.errorsCount,
  dateDepot: dossier.dateDepot ? new Date(dossier.dateDepot) : null,
  dateTraitement: dossier.dateTraitement ? new Date(dossier.dateTraitement) : null,
  prelevementType: dossier.prelevementType,
  demandeur: dossier.demandeur
})

function renderPrelevementType({value}) {
  const labels = {
    'Prélèvement AEP ou en ZRE': {severity: 'new', label: 'AEP ou en ZRE'},
    'Prélèvement ICPE hors ZRE': {severity: 'info', label: 'ICPE hors ZRE'},
    'Prélèvement par camion citerne': {severity: 'warning', label: 'Camion citerne'},
    'Autre prélèvement (agricole, domestique...)': {severity: 'success', label: 'Autre'}
  }

  const label = labels[value]
  return <Badge noIcon severity={label?.severity}>{label?.label}</Badge>
}

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

function renderErrorsCount({field, row}) {
  const value = row[field]

  if (value === 0) {
    return null
  }

  return <Badge severity='error'>{value} Erreurs</Badge>
}

function renderDateCell(value) {
  return value ? format(new Date(value), 'dd/MM/yyyy') : '-'
}

const DossiersList = ({dossiers}) => {
  const [selectedDossier, setSelectedDossier] = useState(null)

  const openModal = dossier => {
    if (dossier.errorsCount > 0) {
      setSelectedDossier(dossier)
      modal.open()
    }
  }

  return (
    // On ajoute 1px pour compenser le débordement provoqué par la bordure du header et supprimer la seconde scrollbar.
    <div className='flex h-[calc(100%+1px)]'>
      <DataGrid
        disableRowSelectionOnClick
        slots={{toolbar: GridToolbar}}
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        rows={dossiers.map(d => convertDossierToRow(d))}
        columns={[
          {field: 'number', headerName: 'Numéro'},
          {
            field: 'demandeur',
            headerName: 'Demandeur',
            width: 300,
            sortComparator: (a, b) => a.nom.localeCompare(b.nom),
            valueFormatter: ({nom, prenom}) => `${nom.toUpperCase()} ${prenom}`
          },
          {
            field: 'prelevementType',
            headerName: 'Type de prélèvement',
            renderCell: renderPrelevementType,
            width: 200,
            filterable: true,
            type: 'singleSelect',
            valueOptions: [
              {value: 'Prélèvement AEP ou en ZRE', label: 'Prélèvement AEP ou en ZRE'},
              {value: 'Prélèvement ICPE hors ZRE', label: 'Prélèvement ICPE hors ZRE'},
              {value: 'Prélèvement par camion citerne', label: 'Prélèvement par camion citerne'},
              {value: 'Extrait de registre', label: 'Extrait de registre'}
            ]
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
            field: 'errorsCount',
            headerName: 'Erreurs détectées',
            type: 'number',
            renderCell: renderErrorsCount,
            width: 180,
            filterable: true
          },
          {
            field: 'dateDepot',
            headerName: 'Date de dépôt',
            type: 'date',
            width: 150,
            valueFormatter: renderDateCell
          }
        ]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
              page: 0
            }
          },
          sorting: {
            sortModel: [{field: 'dateDepot', sort: 'desc'}]
          }
        }}
        pageSizeOptions={[20, 50, 100]}
        onRowClick={row => openModal(row.row)}
      />

      <modal.Component title='Erreurs du dossier'>
        {selectedDossier && (
          <InvalidDossierModal selectedDossier={selectedDossier} />
        )}
      </modal.Component>
    </div>
  )
}

export default DossiersList
