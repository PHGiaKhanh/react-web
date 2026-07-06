import { useState } from 'react'
import { toast } from 'react-toastify'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import ListCards from './ListCards/ListCards'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'

function Column({ column, createNewCard }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })
  const dndKitColumnStyles = {
    touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    height: '100%',
    opacity: isDragging ? 0.5 : undefined
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {setAnchorEl(event.currentTarget)}
  const handleClose = () => {setAnchorEl(null)}
  //card đã được sắp xếp ở trên
  const orderedCards = column.cards

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)

  const [newCardTitle, setNewCardTitle] = useState('')

  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error('Please enter card title', { position: 'bottom-right' })
      return
    }

    //tao du lieu de goi API
    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }

    await createNewCard(newCardData)

    // Đóng trạng thái thêm card mới và clear input
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }



  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => theme.palette.mode === 'light' ? '#ebecf0' : '#3c3c3c',
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
        }}
      >
        {/* header */}
        <Box sx={{
          height: (theme) => theme.trello.columnHeaderHeight,
          p:2,
          display:'flex',
          alignItems:'center',
          justifyContent:'space-between'
        }}>
          <Typography sx={{
            fontWeight: 'bold',
            fontSize: '1.125rem',
            cursor: 'pointer'
          }}>
            {column?.title}
          </Typography>

          <Box>
            <Tooltip title="More options">
              <ExpandMoreIcon
                sx={{ color: 'text.primary', cursor: 'pointer' }}
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>

            <Menu
              id="basic-menu-column"
              aria-labelledby="basic-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon><DeleteForeverIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>

            </Menu>
          </Box>
        </Box>

        {/* body */}
        <ListCards cards={orderedCards} />

        {/* footer */}
        <Box sx={{
          height: (theme) => theme.trello.columnFooterHeight,
          p:2
        }}>
          {!openNewCardForm
            ?
            <Box sx = {{
              height:'100%',
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between',
              gap:1
            }}>
              <Button startIcon={<AddCardIcon />} onClick={toggleOpenNewCardForm}>Add new card</Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
            : <Box sx={{
              height:'100%',
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between',
              gap:1
            }} >
              <TextField
                id="outlined-search"
                label="Enter card name..."
                type="text"
                size="small"
                variant="outlined"
                autoFocus
                data-no-dnd="true"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={{
                  ' & label': { color: 'text.primary' },
                  ' & input': {
                    color: 'theme.palette.primary.main',
                    bgcolor: (theme) => theme.palette.mode === 'light' ? '#ebecf0' : '#3c3c3c'
                  },
                  ' & label.Mui-focused': { color: 'theme.palette.primary.main' },
                  ' & .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'theme.palette.primary.main' },
                    '&:hover fieldset': { borderColor: 'theme.palette.primary.main' },
                    '&.Mui-focused fieldset': { borderColor: 'theme.palette.primary.main' }
                  },
                  '& .MuiOutlinedInput-input': {
                    borderRadius: 1
                  }
                }}
              />
              <Box sx={{ display : 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  onClick={ addNewCard }
                  variant="contained" color="success" size="small"
                  sx={{
                    boxShadow: 'none',
                    //border: '0.5px solid',
                    borderColor: ('theme.palette.success.main'),
                    '&:hover': { bgcolor: 'theme.palette.success.main' }
                  }}
                >
                  Add
                </Button>
                <CloseIcon
                  fontSize="small"
                  sx={{
                    cursor: 'pointer',
                    color: 'theme.palette.warning.light'
                  }}
                  onClick={toggleOpenNewCardForm}
                />
              </Box>
            </Box>
          }

        </Box>

      </Box>
    </div>

  )
}

export default Column