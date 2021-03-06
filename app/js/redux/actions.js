/* Action constants */

const Actions = {}

//Todo actions
Actions.ADD_TODO = 'ADD_TODO'
Actions.MARK_AS_COMPLETE = 'MARK_AS_COMPLETE'
Actions.UNDO_COMPLETE = 'UNDO_COMPLETE'
Actions.CLEAR_COMPLETED = 'CLEAR_COMPLETED'

//User actions
Actions.CREATE_USER = 'CREATE_USER'
Actions.CREATE_USER_SUCCESS= 'CREATE_USER_SUCCESS'
Actions.CREATE_USER_ERROR='CREATE_USER_ERROR'

Actions.LOAD_USER = 'LOAD_USER'
Actions.LOAD_USER_SUCCESS= 'LOAD_USER_SUCCESS'
Actions.LOAD_USER_ERROR='LOAD_USER_ERROR'

Actions.UPDATE_USER = 'UPDATE_USER'
Actions.UPDATE_SUCCESS = 'UPDATE_USER_SUCCESS'
Actions.UPDATE_ERROR ='UPDATE_USER_ERROR'

Actions.CREATE_TODO_LIST = 'CREATE_TODO_LIST'
Actions.CREATE_TODO_LIST_ERROR = 'CREATE_TODO_LIST_ERROR'

Actions.LOAD_TODO_LIST = 'LOAD_TODO_LIST'
Actions.LOAD_TODO_LIST_ERROR = 'LOAD_TODO_LIST_ERROR'

Actions.TODO_LIST_RECEIVED = 'TODO_LIST_RECEIVED'

Actions.LOAD_SAVED_STATE = 'LOAD_SAVED_STATE'

export default Actions