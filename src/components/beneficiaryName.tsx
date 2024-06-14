import { useDispatch, useSelector } from "react-redux";
import { Beneficiary } from "../store/types/types";

const BeneficiaryName:React.FC=()=>{
    const fullname = useSelector(
		(state: { fullName: string }) => state.fullName
	);
    const dispatch = useDispatch();
    dispatch({
        type:'GET_UPDATED_BENEFICIARY'
    })
    return (
        <>
        	<div className='ms-Grid' dir='ltr' style={{ padding: 10, margin: 10 }}>
					<div className='ms-Grid-row'>
                       
                            <h1>{fullname}</h1>
                        
					</div>
                    </div>
        </>
    )
}
export default BeneficiaryName;