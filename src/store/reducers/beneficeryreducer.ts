import mockBeneficiaries from "../../mock-Data";
import { Beneficiary } from "../types/types";

interface BeneficiaryState {
  beneficiaries: Beneficiary[];
  fullName:string
}
const initialState: BeneficiaryState = {
  beneficiaries: mockBeneficiaries,
  fullName:''
};
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_BENEFICIARY':
      return {
        ...state,
        beneficiaries: [...state.beneficiaries, action.payload],
      };
    case 'EDIT_BENEFICIARY':
      return {
        ...state,
        beneficiaries: state.beneficiaries.map((beneficiary) =>
          beneficiary.id === action.payload.id ? action.payload : beneficiary
        ),
        fullName:action.payload.fullName
      };
    case 'REMOVE_BENEFICIARY':
      return {
        ...state,
        beneficiaries: state.beneficiaries.filter(
          (beneficiary) => beneficiary.id !== action.payload.id
        ),
      };
      case 'LIST_BENEFICIARY':
      return {
        ...state,
        beneficiaries:state.beneficiaries.sort((a,b)=>b.id-a.id)
      };
      case 'GET_UPDATED_BENEFICIARY':
      return {
        ...state,
        beneficiaries:state.beneficiaries,
       fullName:state.fullName
      };
    default:
      return state;
  }
};
export default reducer;