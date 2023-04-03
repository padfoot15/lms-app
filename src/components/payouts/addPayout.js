import { useState } from 'react';
import useFetch from '../../customHooks/useFetch';
import axios from 'axios';

const AddPayout = () => {
    const payoutData = {        
        date : "",
        amount : "",
        investmentId:"",
        account : "", 
        balance : ""   
    }
    const [errorMsg, setErrorMsg] = useState('')
    const [payout , setPayout] = useState(payoutData)       
    const {data, loading} = useFetch('/investments')  
    if(loading)return <h1>Loading...</h1>                        
    
    async function handleSubmit(e){
        e.preventDefault();
        if(parseInt(payout.amount) <= 0 || isNaN(parseInt(payout.amount)) ){            
            setErrorMsg("***Amount should be more than 0")        
        }else if(payout.date === ''){
            setErrorMsg("***Date is required")        
        }else if(payout.account === ''){
            setErrorMsg("***Account is required")        
        }else if(payout.investmentId === ''){
            setErrorMsg("***Investment ID is required")        
        }else{            
             //add expense
             try {
                await axios.post(process.env.REACT_APP_API_URL + "/payouts",payout)  
                
                //clear states
                setErrorMsg('');
                setPayout(payoutData)
                try {
                    //update investment balance
                } catch (error) {
                    console.log(error)
                }

             } catch (error) {
                console.log(error)
             }             
        }
        
    }

    function handleChange(e){
        let balance;
        let amount = parseInt(e.target.id === 'amount'  ? e.target.value : payout.amount)        
        let investmentId = e.target.id === 'investmentId' ? e.target.value : payout.investmentId
                
        const investment = data.filter(investments => investments.investmentId === investmentId)[0]

        if(investment === undefined){
            balance = 0;
        }else{
            //compute balance
            amount = isNaN(amount) ? 0 : amount
            balance = investment.balance
            balance = parseInt(balance) - parseInt(amount)
        }
                
        setPayout({...payout,[e.target.id]:e.target.value,balance})       
    }
    
    return ( 
        <>   
        <div className="d-flex align-items-center mb-2 justify-content-center">
            <h2>New Payout</h2>                    
        </div>
        <div className="container border border-light border-5 mb-2">
            <form onSubmit={handleSubmit}>
                <div className="row mb-5">                    
                    <div className='col-4'>
                        <h2>Payout</h2>
                    </div>
                    <div className='col-1'></div>
                    <div className='col'>
                        <p style={{color:"red",fontStyle:"italic"}}>{errorMsg}</p>
                    </div>                    
                </div>
                <div className="row mb-3">
                    <div className='col-1'></div>
                    <div className="col">
                        <div className="form-group">
                            <label>Date</label>
                            <input type='date' className='form-control' id="date" value={payout.date} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Amount</label>
                            <input type="text" className='form-control' id='amount' value={payout.amount} placeholder="0" onChange={handleChange} /> 
                        </div>
                    </div>                        
                    <div className="col">
                        <div className="form-group">
                            <label>Investment ID</label>
                            <select className="form-select" id="investmentId" value={payout.investmentId} onChange={handleChange}>
                                <option value="" hidden>Select investment...</option>
                                {data.filter(investments => investments.status === "in-progress")
                                .map(investment => {
                                    return <option key={investment._id} value={investment.investmentId}>{investment.investmentId}</option>
                                })

                                }
                            </select>
                        </div>
                    </div>  
                    <div className="col">
                        <div className="form-group">
                            <label>Account</label>
                            <select className="form-select" id="account" value={payout.account} onChange={handleChange}>
                                <option value="" hidden>Select account...</option>
                                <option value="BPI">BPI</option>
                                <option value="GCASH">GCASH</option>
                                <option value="CHECKING">Checking</option>
                                <option value="CASH">Cash</option>
                            </select>
                        </div>
                    </div>           
                </div>                                       
                <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                </div>                
            </form>            
        </div>         
        </>
     );
}
 
export default AddPayout;