export default function usersReducer(state, action) {
  switch (action.type) {
    case "MAIL":
      return {
        ...state,
        mail: action.payload,
      };
    case "VOID_MAIL":
      return {
        ...state,
        mail: action.payload,
      };
    case "NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "VOID_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "VOID_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "VOID_ROLE":
      return {
        ...state,
        role: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
