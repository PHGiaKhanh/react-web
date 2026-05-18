import Box from '@mui/material/Box'
import { useColorScheme } from '@mui/material/styles'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  const { mode, systemMode } = useColorScheme()
  const currentMode = (mode === 'system' ? systemMode : mode) || 'light'


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

  //1  thoi diem chi 1 item duoc drag
  const [activeDragItemId, setActiveDragItemId] = useState(null) // { type: ACTIVE_DRAG_ITEM_TYPE.COLUMN, id: 'column-1' } hoac { type: ACTIVE_DRAG_ITEM_TYPE.CARD, id: 'card-1' }
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  //TRigger khi ket thuc hành dong keo(Drag) 1 phan tu=>hanh dong tha(drop)
  const handleDragStart = (event) => {
    setActiveDragItemId(event.active?.id)
    setActiveDragItemType(event.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event.active?.data?.current)
  }
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
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }
  const CustomeDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }
  return (
    <DndContext 
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
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
        <DragOverlay dropAnimation={CustomeDropAnimation}>
          {activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && (
            <Column column={activeDragItemData} />
          )}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent