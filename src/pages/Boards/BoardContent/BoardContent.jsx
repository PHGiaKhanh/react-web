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
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'
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
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  //tim column theo cardid
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column.cards.map(card => card._id )?.includes(cardId))
  }

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])


  //function chung xử lý Cập nhật lại stae trong trường hợp di chuyển Card giữa các Column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColmns => {
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
            active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      //clone mang orderedColumns(State) ra 1 mang moi de xu ly data roi return cap nhat lai
      const nextColumns = cloneDeep(prevColmns)
      const nextActiveColumn = nextColumns.find(c => c._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(c => c._id === overColumn._id)

      //old column
      if (nextActiveColumn) {
        //xoa card o column active o vi tri cu
        nextActiveColumn.cards = nextActiveColumn.cards.filter(c => c._id !== activeDraggingCardId)
        //cap nhat lai cardOrderIds sau khi da xoa card khoi column active
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(c => c._id)
      }

      //new column
      if (nextOverColumn) {
        //kiem tra card dang keo co dang o overColumn chua, co thi can xoa no truoc 
        nextOverColumn.cards = nextOverColumn.cards.filter(c => c._id !== activeDraggingCardId)

        // cập nhật lại chuẩn dữ liệu columnID trong card sau khi kéo card giữa 2 column khác nhau
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }

        // them card dang keo vao overColumn o vi tri moi
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(c => c._id)
      }
      //console.log('NextColumns:', nextColumns)

      return nextColumns
    })
  }
  //TRigger khi ket thuc hành dong keo(Drag) 1 phan tu=>hanh dong tha(drop)
  const handleDragStart = (event) => {
    setActiveDragItemId(event.active?.id)
    setActiveDragItemType(event.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event.active?.data?.current)

    //nếu kéo card thì mới set giá trị oldColumn để
    if (event.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }
  //trigger khi keo 1 phan tu qua 1 phan tu khac
  const handleDragOver = (event) => {
    //kh làm gì thêm nếu đnag kéo column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      //console.log('Drag over:', event)
      //còn nếu đang kéo card thì xử lý để có thể kéo card qua lại giữa các column
      const { active, over } = event
      //kéo ra ngoài phạm vi container không làm gì
      if (!active || !over) return

      //activeDraggingCardId là card đang được kéo (đang active)
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      //overCardId là card  trên hoặc dưới card đang kéo
      const { id: overCardId } = over
      //Tìm 2 cái column theo CardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // Nếu không tìm thấy column nào chứa card đang kéo hoặc card đang được kéo qua thì không làm gì
      if (!activeColumn || !overColumn) return

      //xử lý logic khi kéo card qua 2 column khác nhau. nếu card trong column ban đầu của nó -> kh làm gì
      //đây là xử lý lúc đang kéo
      if (activeColumn._id !== overColumn._id) {
        moveCardBetweenDifferentColumns (
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      }
    }
  }

  const handleDragEnd = (event) => {
    //console.log('Drag ended:', event)

    const { active, over } = event

    //kéo ra ngoài phạm vi container thì không làm gì
    if (!active || !over) return

    //XỬ LÝ KÉO THẢ CARD
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log('keo tha card tam thoi')

      //activeDraggingCardId là card đang được kéo (đang active)
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      //overCardId là card  trên hoặc dưới card đang kéo
      const { id: overCardId } = over
      //Tìm 2 cái column theo CardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // Nếu không tìm thấy column nào chứa card đang kéo hoặc card đang được kéo qua thì không làm gì
      if (!activeColumn || !overColumn) return

      //Xử lý logic khi thả card vào 2 column khác nhau.
      //Phải dùng tới activeDragItemData.columnId hoặc oldColumnWhenDraggingCard._id (set và state từ bước handleDragStart)
      //
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns (
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        //kéo thả card trong cùng column( giống kéo thả column)
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)// lay vij tri oldColumnWhenDraggingCard
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId) // lay vi tri moi sau khi drag
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          const targetColumn = nextColumns.find(c => c._id === overColumn._id)
          //cập nhật lại 2 giá trị mới là cards và cardOrderIds trong targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(c => c._id)
          //trả về state mới sau khi đã được cập nhật
          return nextColumns

        })


      }
    }

    //XỬ LÝ KÉO THẢ COLUMN
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over?.id) {
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)// lay vij tri cu active
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id) // lay vi tri moi sau khi drag

        // arrayMove se tra ve mang column moi sau khi da duoc sap xep lai
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        //dung sau nay khi da co API update column order tren server
        // const dndOrderedColumnIds = dndOrderedColumns.map(c => c._id)
        // console.log('DndOrderedColumns:', dndOrderedColumns)
        // console.log('DndOrderedColumnIds:', dndOrderedColumnIds)
        setOrderedColumns(dndOrderedColumns)
      }
    }

    //những dữ liệu sau khi kéo thả này lun đưa về null mặc định ban đầu
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }
  const CustomeDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
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