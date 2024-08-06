import { styled } from '@mui/material/styles'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    fontWeight: '600',
    textAlign: 'start',
    fontSize: '14px',
    textIndent: '10px',
    ['@media screen and (min-width:375px) and (max-width:424px)']: {
      textIndent: '0px',
      paddingLeft: '10px'
    }
  },
  [`&.${tableCellClasses.body}`]: {
    color: '#454d59',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'start',
    // textIndent: '30px',
    ['@media screen and (min-width:375px) and (max-width:424px)']: {
      fontSize: 12,
      paddingLeft: '10px',
    }
  }
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    cursor: 'pointer'
  },

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))
