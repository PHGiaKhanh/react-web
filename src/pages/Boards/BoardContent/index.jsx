import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
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
import Card from '@mui/material/Card'
import AddCardIcon from '@mui/icons-material/AddCard'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTTER_HEIGHT = '56px'


function BoardContent() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {setAnchorEl(event.currentTarget)}
  const handleClose = () => {setAnchorEl(null)}

  return (
    <div>
      <Box
        sx={{
          //bgcolor: currentMode === 'dark' ? '#2b3a55' : '#75c3fe',
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <Box
          sx={{
            bgcolor: 'inherit',
            width: '100%',
            height: '100%',
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'hidden',
            '&::-webkit-scrollbar-track': { m: 2 }
          }}>
          {/* Box column 1*/}
          <Box
            sx={{
              minWidth: '300px',
              maxWidth: '300px',
              //bgcolor: currentMode === 'dark'? '#333643' : '#ebecf0',
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
              ml: 2,
              borderRadius: '6px',
              height: 'fit-content',
              maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
              '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
              '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' }
            }}
          >
            {/* header */}
            <Box sx={{
              height: COLUMN_HEADER_HEIGHT,
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
                Column Title
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
            <Box sx={{
              display:'flex',
              flexDirection:'column',
              gap: 1,
              p: '0 6px',
              m: '0 6px',
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTTER_HEIGHT})`
            }}>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="data:image/jpeg;base64,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"
                  title="green iguana"
                />
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Camoi learn mern </Typography>
                </CardContent>
                <CardActions
                  sx={{ p:'0 4px 8px 4px' }}
                >
                  <Button size="small" startIcon={<GroupIcon/>}>20</Button>
                  <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                  <Button size="small" startIcon={<AttachmentIcon/>}>100</Button>
                </CardActions>
              </Card>

              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card01 </Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card01 </Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card01 </Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card01 </Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card01 </Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card01 </Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card01 </Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card01 </Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card01 </Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card01 </Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card01 </Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card01 </Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card01 </Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card01 </Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card01 </Typography>
                </CardContent>
              </Card><Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card01 </Typography>
                </CardContent>
              </Card>

            </Box>

            {/* footer */}
            <Box sx={{
              height: COLUMN_FOOTTER_HEIGHT,
              p:2,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}>
              <Button startIcon={<AddCardIcon />}>Add new card</Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>

          </Box>

          {/* Box column 2*/}
          <Box
            sx={{
              minWidth: '300px',
              maxWidth: '300px',
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
              ml: 2,
              borderRadius: '6px',
              height: 'fit-content',
              maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
              '&::-webkit-scrollbar-thumb': { backgroundColor: '#ced0da' },
              '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#bfc2cf' }
            }}
          >
            {/* header */}
            <Box sx={{
              height: COLUMN_HEADER_HEIGHT,
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
                Column Title
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
            <Box sx={{
              display:'flex',
              flexDirection:'column',
              gap: 1,
              p: '0 6px',
              m: '0 6px',
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTTER_HEIGHT})`
            }}>
              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="data:image/jpeg;base64,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"
                  title="green iguana"
                />
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Camoi learn mern </Typography>
                </CardContent>
                <CardActions
                  sx={{ p:'0 4px 8px 4px' }}
                >
                  <Button size="small" startIcon={<GroupIcon/>}>20</Button>
                  <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                  <Button size="small" startIcon={<AttachmentIcon/>}>100</Button>
                </CardActions>
              </Card>

              <Card sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                  <Typography>Card01 </Typography>
                </CardContent>
              </Card>
            </Box>

            {/* footer */}
            <Box sx={{
              height: COLUMN_FOOTTER_HEIGHT,
              p:2,
              display:'flex',
              alignItems:'center',
              justifyContent:'space-between'
            }}>
              <Button startIcon={<AddCardIcon />}>Add new card</Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>

          </Box>
        </Box>


      </Box>
    </div>
  )
}

export default BoardContent