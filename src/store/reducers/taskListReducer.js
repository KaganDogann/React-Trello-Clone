import { ADD_CARD_TO_LIST, ADD_DESCRIPTION_TO_CARD, ADD_LIST, DELETE_CARD, DELETE_LIST, DRAG_HAPPENED, EDIT_CARD_TITLE, EDIT_LIST_TITLE } from "../actions/taskListActions"
import { taskListItems } from "../initialValues/taskListItems"

let cardID = 7;
let listID = 3;
const initialState = {
  taskListItems: taskListItems
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

    case ADD_LIST:
      
      //console.log("reducer payload:", payload)
      listID++;
      return {
        ...state,
        taskListItems: [...state.taskListItems, { title: payload.text, listId: `list-${listID}`, cards: [] }],
      }

    case ADD_CARD_TO_LIST: {
      //console.log("ADD_CARD_TO_LIST state:", state)
      //console.log(" ADD_CARD_TO_LIST payload", payload)
      state.taskListItems.map(list => {
        if (list.listId === payload.listID) {
          //console.log("if işi")
          return {
            ...state,
            taskListItems: [...state.taskListItems, list.cards = [...list.cards, { cardId: `card-${cardID}`, text: payload.taskCard.text }]]
          }
        } else {
          return list
        }
      })
      //console.log("deneme1", taskListItems)
      cardID++;
      return { ...state, taskListItems: [...state.taskListItems] }
    }

    case DELETE_CARD: {
      //console.log("DELETE CARD REDUCER ÇALIŞTI. PAYLOAD:", payload)
      state.taskListItems.map(list => {
        if (list.listId === payload.listId) {
          // console.log("delete card list if içierisi")
          return {
            ...state,
            taskListItems: [...state.taskListItems, list.cards = list.cards.filter((c) => c.cardId !== payload.cardId)]
          }
        }
        return state
      })
      return { ...state, taskListItems: [...state.taskListItems] }
    }

    case ADD_DESCRIPTION_TO_CARD: {
      //console.log("ADD_DESCRIPTION_TO_CARD payload:", payload)
      const newArray = [...state.taskListItems]
      //console.log("İlk oluştuktan sonra new array", newArray)
      newArray.map(list => {
        const index = list.cards.findIndex(card => card.cardId === payload.cardId)
        // console.log("index number:", index)
        // console.log("state.tasklistItems maplendi her bir list:", list)
        if (list.listId === payload.listId) {
          // console.log("gönderilen cardId initial state'te ki bir CardId ile eşleşti muvcut card:")
          //  console.log("Değişmeden önceki ", newArray)
          list.cards[index].cardDescription = payload.description
          //  console.log("Değiştikten sonraki", newArray)
          return {
            ...state,
            taskListItems: newArray

          }
        } else {
          return list
        }
      })
      return { ...state, taskListItems: [...state.taskListItems] }
    }

    case EDIT_LIST_TITLE: {
      // console.log("Edit list title reducer checkpoint");
      state.taskListItems.map(list => {
        if (list.listId === payload.listId) {
          list.title = payload.newListTitle
          return {
            ...state,
            taskListItems: [...state.taskListItems]
          }
        } else {
          return list
        }
      })
      return { ...state, taskListItems: [...state.taskListItems] }
    }

    case EDIT_CARD_TITLE: {
      // console.log("EDIT_CARD_TITLE: ", payload)
      state.taskListItems.map(list => {
        if (list.listId === payload.listId) {
          list.cards.map(card => {
            if (card.cardId === payload.cardId) {
              card.text = payload.newCardText
              return {
                ...state,
                taskListItems: [...state.taskListItems]
              }
            }
          })
          return list
        }
      })
      return { ...state, taskListItems: [...state.taskListItems] }
    }

    case DELETE_LIST: {
      // console.log("delete list reducer çalıştı. payload:", payload)

      const newArray = state.taskListItems.filter((l) => l.listId !== payload.listId)
      // console.log("newArray:", newArray)
      return {
        ...state,
        taskListItems: [...newArray]
      }
    }

    case DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId,
        type,
      } = payload

      if (type === "list") {
        const list = state.taskListItems.splice(droppableIndexStart, 1)
        state.taskListItems.splice(droppableIndexEnd, 0, ...list)
        return { taskListItems: [...state.taskListItems] }
      }
      if (droppableIdStart === droppableIdEnd) {
        const list = state.taskListItems.find((list) => droppableIdStart === list.listId)
        const card = list.cards.splice(droppableIndexStart, 1);
        //console.log("DRAG_HAPPENED", card) //Burası harika basit bir mantık üzerine kurulu incele. 
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      if (droppableIdStart !== droppableIdEnd) {
        //  find the list where drag happened
        const listStart = state.taskListItems.find((list) => droppableIdStart === list.listId);

        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);

        // find the list where drag ended
        const listEnd = state.taskListItems.find((list) => droppableIdEnd === list.listId);

        // put the card in  the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }


    default:
      return state
  }
}
