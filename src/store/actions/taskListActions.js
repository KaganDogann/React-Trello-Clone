export const ADD_LIST = "ADD_LIST"
export const ADD_CARD_TO_LIST = "ADD_CARD_TO_LIST"
export const DRAG_HAPPENED = "DRAG_HAPPENED"
export const ADD_DESCRIPTION_TO_CARD = "ADD_DESCRIPTION_TO_CARD"
export const EDIT_LIST_TITLE = "EDIT_LIST_TITLE"
export const EDIT_CARD_TITLE = "EDIT_CARD_TITLE"
export const DELETE_CARD = "DELETE_CARD"
export const DELETE_LIST = "DELETE_LIST"


export const addNewList = (taskList) => ({
  type: ADD_LIST,
  payload: taskList
})

export const addNewCardToList = (taskCard, listID) => ({
  type: ADD_CARD_TO_LIST,
  payload: { taskCard, listID }
})

export const addNewDescriptionToCard = (description, cardId, listId, cardText) => ({
  type: ADD_DESCRIPTION_TO_CARD,
  payload: { description, cardId, listId, cardText }
})

export const editListTitle = (listId, newListTitle) => ({
  type: EDIT_LIST_TITLE,
  payload: { listId, newListTitle }
})

export const deleteCard = (cardId, listId) => ({
  type: DELETE_CARD,
  payload: { cardId, listId }
})

export const deleteList = (listId) => ({
  type: DELETE_LIST,
  payload: { listId }
})

export const editCardTitle = (cardId, listId, newCardText) => ({
  type: EDIT_CARD_TITLE,
  payload: { cardId, listId, newCardText }
})

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return {
    type: DRAG_HAPPENED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexEnd,
      droppableIndexStart,
      draggableId,
      type
    }
  }
}