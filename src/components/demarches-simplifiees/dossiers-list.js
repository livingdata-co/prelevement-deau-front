'use client'

import {useState} from 'react'

import {Badge} from '@codegouvfr/react-dsfr/Badge'
import {createModal} from '@codegouvfr/react-dsfr/Modal'
import {DataGrid, GridToolbar} from '@mui/x-data-grid'
import {frFR} from '@mui/x-data-grid/locales'
import {format} from 'date-fns'

import DossierModal from '@/components/demarches-simplifiees/dossier-modal.js'
import DossierStateBadge from '@/components/demarches-simplifiees/dossier-state-badge.js'
import PrelevementTypeBadge from '@/components/demarches-simplifiees/prelevement-type-badge.js'
import {getDossierDSURL} from '@/lib/url.js'

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
    setSelectedDossier(dossier)
    modal.open()
  }

  return (
    <div className='flex'>
      <DataGrid
        disableRowSelectionOnClick
        slots={{toolbar: GridToolbar}}
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        rows={dossiers.map(d => convertDossierToRow(d))}
        sx={{
          '& .MuiDataGrid-virtualScroller': {
            overflowY: 'hidden'
          }
        }}
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
            renderCell: PrelevementTypeBadge,
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
            renderCell: DossierStateBadge,
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

      <modal.Component
        title={`Dossier n°${selectedDossier?.number}`}
        buttons={selectedDossier ? [
          {
            linkProps: {href: getDossierDSURL(selectedDossier), target: '_blank'},
            doClosesModal: false, // Default true, clicking a button close the modal.
            children: 'Consulter le dossier'
          }
        ] : []}
      >
        {selectedDossier && (
          <DossierModal selectedDossier={selectedDossier} />
        )}
      </modal.Component>
    </div>
  )
}

export default DossiersList
