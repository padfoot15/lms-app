import { useState, useEffect } from 'react';
import useFetch from '../../customHooks/useFetch';
import { formatter } from '../../util/util';
import axios from 'axios';

const AddLoan = () => {
    const loanData = {
        borrowerId : "",
        loanId : "",
        amount : "0",
        interestRate : "0",
        interestAmount : "0",
        term: "1",
        monthlyDue : "0",
        startDate : "",
        dueDate : "",
        balance : "",
        payments : [],
        status : "In-progress"
    }
    const [errorMsg, setErrorMsg] = useState('')
    const [loan , setLoan] = useState(loanData)
    const {data, loading} = useFetch('/borrowers')
    const [loanId, setNewId] = useState('')
    useEffect( ()=>{
        async function getNewId(){
          const res = await axios.get(process.env.REACT_APP_API_URL + "/loans/newId")        
          setNewId(res.data.newId)
        }
        getNewId();
      },[])
    if(loading)return <h1>Loading...</h1> 

    async function handleSubmit(e){
        
        if(loan.borrowerId === ''){
            e.preventDefault();            
            setErrorMsg("***Borrower is required")        
        }else if(loan.amount === '0'){
            e.preventDefault();
            setErrorMsg("***Amount is required")        
        }else if(loan.startDate === ''){
            setErrorMsg("***Start date is required")
            e.preventDefault();        
        }else if(loan.dueDate === ''){
            setErrorMsg("***Due date is required") 
            e.preventDefault();       
        }else{
            try {
                await axios.post(process.env.REACT_APP_API_URL + "/loans",loan)
                //clear states
                setLoan(loanData)
                setNewId('')
                setErrorMsg('')
            } catch (error) {
                console.log(error)
                e.preventDefault();
            }                        
        }
    }

    async function getNewId(e){
        e.preventDefault()
        const res = await axios.get(process.env.REACT_APP_API_URL + "/loans/newId")        
        setNewId(res.data.newId)
        
    }

    function handleChangeDate(e){
        let startDate = new Date(e.target.value)
        let dueDate = new Date(startDate.getFullYear(), startDate.getMonth() , startDate.getDate() + (parseInt(loan.term)*30))                                               
        dueDate = dueDate.toLocaleDateString("fr-CA")                                         
    
        setLoan({...loan,[e.target.id]:e.target.value,dueDate})        
    }

    function handleChange(e){
        let interestAmount = loan.interestAmount//interest amount per month  
        let monthlyDue = loan.monthlyDue //monthly due payment
        let balance = loan.balance //total balance
        let startDate = loan.startDate
        let dueDate = loan.dueDate

        if (e.target.id === "term"){
            if(startDate !== ""){  
                startDate = new Date(startDate)
                dueDate = new Date(startDate.getFullYear(),
                                    startDate.getMonth(), startDate.getDate() + (parseInt(e.target.value)*30))                                               
                dueDate = dueDate.toLocaleDateString("fr-CA")  
                startDate = startDate.toLocaleDateString("fr-CA")  
            }                               
        }
        
        if(e.target.id ==='amount' || e.target.id ==='interestRate' || e.target.id ==='term'){
            const amount = parseInt(e.target.id==='amount' ? e.target.value : loan.amount);
            const interestRate = parseInt(e.target.id==='interestRate' ? e.target.value : loan.interestRate) / 100
            const term = parseInt(e.target.id==='term' ? e.target.value : loan.term)
            interestAmount = amount * interestRate //interest amount per month  
            const totalInterestAmount = interestAmount * term //total interest amount for the term 
            monthlyDue = ((amount + totalInterestAmount) / term).toFixed(2) //monthly due payment, round off to 2 decimal places
            balance = amount + totalInterestAmount //total balance
        }
        
        setLoan({...loan,[e.target.id]:e.target.value,interestAmount,monthlyDue,balance,startDate,dueDate,loanId})
    }
    
    return ( 
        <>   
        <div className="d-flex align-items-center mb-2 justify-content-center">
            <h2>New Loan</h2>                    
        </div>
        <div className="container border border-light border-5 mb-2">
                        
            <form>                
                <div className="row mb-5">
                    <div className="col-4">
                        <h2 >Loan Information</h2>                      
                    </div>
                    <div className='col-1'></div>
                    <div className='col-4'>
                        <p style={{color:"red",fontStyle:"italic"}}>{errorMsg}</p>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className='col-1'>
                        <div className="form-group">
                            <button className='btn btn-link' onClick={getNewId}>NEW ID</button>                                                                   
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="form-group">
                            <label>Loan ID</label>                        
                            <input type="text" className="form-control" id="loanId" value={loanId} disabled/>                                                                   
                        </div>
                    </div> 
                    <div className="col-3">
                        <div className="form-group">
                                    <label>Borrower</label>
                                    <select className="form-select" id="borrowerId" value={loan.borrowerId} onChange={handleChange}>
                                    <option value="" hidden>Select borrower...</option>
                                        {data.map(borrower => {
                                            const fullName = borrower.name.firstName + " " + borrower.name.lastName
                                            return <option value={borrower._id} key={borrower._id}>{fullName}</option>
                                        })
                                        }
                                    </select>
                                </div>
                        </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Loan Amount</label>
                                <select className="form-select" value={loan.amount} id="amount" onChange={handleChange}>
                                    <option value="0" hidden>Select amount...</option>
                                    <option value="1000">{formatter.format(1000)}</option>
                                    <option value="2000">{formatter.format(2000)}</option>
                                    <option value="3000">{formatter.format(3000)}</option>
                                    <option value="5000">{formatter.format(5000)}</option>
                                    <option value="10000">{formatter.format(10000)}</option>
                                </select>
                        </div>
                    </div>    
                    <div className="col-2">
                        <div className="form-group">
                            <label>Term (Month)</label>
                            <select className="form-select" id="term" value={loan.term} onChange={handleChange}>
                                    <option value="0" hidden>Select term...</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="6">6</option>
                                    <option value="12">12</option>
                                </select>
                        </div>
                    </div>            
                </div>
                
                <div className="row mb-3">
                    <div className="col-1"></div>
                    <div className="col-3">
                        <div className="form-group">
                        <label>Monthly Interest Rate</label>
                                <select className="form-select" id="interestRate" value={loan.interestRate} onChange={handleChange}>
                                    <option value="" hidden>Select interest...</option>
                                    <option value="0">0%</option>
                                    <option value="4">4%</option>
                                    <option value="6">6%</option>
                                    <option value="10">10%</option>
                                </select>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                        <label>Monthly Interest Amount</label>
                        <input type="text" className="form-control" id="interestAmount" value={formatter.format(loan.interestAmount)} disabled/>
                        </div>
                    </div>   
                    <div className="col-3">
                        <div className="form-group">
                        <label>Monthly Due</label>
                        <input type="text" className="form-control" id="monthlyDue" value={formatter.format(loan.monthlyDue)} disabled/>
                        </div>
                    </div>                      
                </div>
                <div className="row mb-3">
                    <div className="col-1"></div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Start Date</label>
                            <input type="date" className='form-control' id='startDate' value={loan.startDate} onChange={handleChangeDate} />                                                
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                        <label>Due Date</label>
                        <input type="date" className='form-control' id='dueDate' value={loan.dueDate} disabled/>                                                
                        </div>
                    </div>   
                                          
                </div>
                    <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary" name='submit' onClick={handleSubmit}>Submit</button>
                    </div>                
            </form>
        </div>         
        </>
     );
}
 
export default AddLoan;