import Box from '@mui/material/Box'
import { useColorScheme } from '@mui/material/styles'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

function BoardContent({ board }) {
  const { mode, systemMode } = useColorScheme()
  const currentMode = (mode === 'system' ? systemMode : mode) || 'light'

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance:10
    }
  })

  // Nhan giu 10px thi moi duoc kich hoat drag
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance:10
    }
  })
  // Nhan giu 500ms thi moi duoc kich hoat drag, va khi di chuyen 5px thi moi duoc kich hoat drag
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay:500,
      tolerance:5
    }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    console.log('Drag ended:', event)
    const { active, over } = event

    if (!over) return // Nếu không có vị trí mới (over) thì không làm gì

    if (active.id !== over?.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)// lay vij tri cu active
      const newIndex = orderedColumns.findIndex(c => c._id === over.id) // lay vi tri moi sau khi drag

      // arrayMove se tra ve mang column moi sau khi da duoc sap xep lai
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      //dung sau nay khi da co API update column order tren server
      // const dndOrderedColumnIds = dndOrderedColumns.map(c => c._id)
      // console.log('DndOrderedColumns:', dndOrderedColumns)
      // console.log('DndOrderedColumnIds:', dndOrderedColumnIds)
      setOrderedColumns(dndOrderedColumns)
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Box
        sx={{
          //bgcolor: currentMode === 'dark' ? '#2b3a55' : '#75c3fe',
          bgcolor: currentMode === 'dark' ? '#34495e' : '#1976d2',
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent