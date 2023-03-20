import { useState } from 'react';
import useFetch from '../../customHooks/useFetch';
import axios from 'axios';

const AddLoan = () => {
    const loanData = {
        borrowerId : "",
        amount : "0",
        interestRate : "0",
        interestAmount : "0",
        term: "1",
        monthlyDue : "0",
        startDate : "",
        dueDate : "",
        balance : "",
        payments : [],
        status : "in-progress"
    }
    const [loan , setLoan] = useState(loanData)
    const {data, loading} = useFetch('/borrowers')
    if(loading)return <h1>Loading...</h1>       

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
      });

    async function handleSubmit(e){
        e.preventDefault();
        await axios.post(process.env.REACT_APP_API_URL + "/loans",loan)
        setLoan(loanData)
    }

    function handleChange(e){
        let interestAmount = loan.interestAmount//interest amount per month  
        let monthlyDue = loan.monthlyDue //monthly due payment
        let balance = loan.balance //total balance
        
        if(e.target.id ==='amount' || e.target.id ==='interestRate' || e.target.id ==='term'){
            const amount = parseInt(e.target.id==='amount' ? e.target.value : loan.amount);
            const interestRate = parseInt(e.target.id==='interestRate' ? e.target.value : loan.interestRate) / 100
            const term = parseInt(e.target.id==='term' ? e.target.value : loan.term)
            interestAmount = amount * interestRate //interest amount per month  
            const totalInterestAmount = interestAmount * term //total interest amount for the term 
            monthlyDue = ((amount + totalInterestAmount) / term).toFixed(2) //monthly due payment, round off to 2 decimal places
            balance = amount + totalInterestAmount //total balance
        }
        
        setLoan({...loan,[e.target.id]:e.target.value,interestAmount,monthlyDue,balance})
    }
    
    return ( 
        <>   
        <div className="container border border-light border-5 mb-2">
            <form onSubmit={handleSubmit}>
                <div className="row mb-5">
                    <h2>Loan Information</h2>
                </div>
                <div className="row mb-3">
                    <div className='col-1'></div>
                    <div className="col-3">
                    <div className="form-group">
                                <label>Borrower</label>
                                <select className="form-control" id="borrowerId" value={loan.borrowerId} onChange={handleChange}>
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
                                <select className="form-control" value={loan.amount} id="amount" onChange={handleChange}>
                                    <option value="0" hidden>Select amount...</option>
                                    <option value="1000">{formatter.format(1000)}</option>
                                    <option value="2000">{formatter.format(2000)}</option>
                                    <option value="3000">{formatter.format(3000)}</option>
                                    <option value="5000">{formatter.format(5000)}</option>
                                    <option value="10000">{formatter.format(10000)}</option>
                                </select>
                        </div>
                    </div>    
                    <div className="col-3">
                        <div className="form-group">
                            <label>Term (Month)</label>
                            <select className="form-control" id="term" value={loan.term} onChange={handleChange}>
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
                                <select className="form-control" id="interestRate" value={loan.interestRate} onChange={handleChange}>
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
                        <input type="text" className="form-control" id="interestAmount" value={formatter.format(loan.interestAmount)} readOnly/>
                        </div>
                    </div>   
                    <div className="col-3">
                        <div className="form-group">
                        <label>Monthly Due</label>
                        <input type="text" className="form-control" id="monthlyDue" value={formatter.format(loan.monthlyDue)} readOnly/>
                        </div>
                    </div>                      
                </div>
                <div className="row mb-3">
                    <div className="col-1"></div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Start Date</label>
                            <input type="date" className='form-control' id='startDate' value={loan.startDate} onChange={handleChange} />                                                
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                        <label>Due Date</label>
                        <input type="date" className='form-control' id='dueDate' value={loan.dueDate} onChange={handleChange} />                                                
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
 
export default AddLoan;