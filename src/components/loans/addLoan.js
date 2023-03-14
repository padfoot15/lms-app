import { useState } from 'react';
import useFetch from '../../customHooks/useFetch';

const AddLoan = () => {
    const loanData = {
        borrowerId : "",
        amount : "",
        interestRate : "",
        interestAmount : "",
        term: "",
        monthlyDue : "",
        startDate : "",
        dueDate : "",
        balance : "",
        payments : "",
        status : ""
    }
    const [loan , setLoan] = useState(loanData)
    const {data, loading} = useFetch('/borrowers')
    if(loading)return <h1>Loading...</h1>   

    function handleChange(e){
        setLoan({...loan,[e.target.id]:e.target.value})
       
    }
    function computeMonthlyInterestAmount(){
        if(loan.amount && loan.interestRate){
            let interestAmount = parseInt(loan.amount) * (parseInt(loan.interestRate)/100)
            setLoan({...loan,interestAmount})           
        }
        return loan.interestAmount
    } 
    console.log(loan)

    return ( 
        <>   
        <div className="container border border-light border-5 mb-2">
            <form>
                <div className="row mb-5">
                    <h2>Loan Information</h2>
                </div>
                <div className="row mb-3">
                    <div className='col-1'></div>
                    <div className="col-3">
                    <div className="form-group">
                                <label>Borrower</label>
                                <select className="form-control" id="borrowerId" value={loan.borrowerId} onChange={handleChange}>
                                <option value="">Select borrower...</option>
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
                            <label>Amount (PHP)</label>
                                <select className="form-control" value={loan.amount} id="amount" onChange={handleChange}>
                                    <option value="">Select amount...</option>
                                    <option value="1000">1000</option>
                                    <option value="2000">2000</option>
                                    <option value="3000">3000</option>
                                    <option value="5000">5000</option>
                                    <option value="10000">10000</option>
                                </select>
                        </div>
                    </div>    
                    <div className="col-3">
                        <div className="form-group">
                            <label>Term (Month)</label>
                            <select className="form-control" id="term" value={loan.term} onChange={handleChange}>
                                    <option value="">Select term...</option>
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
                                    <option value="">Select interest...</option>
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
                        <input type="text" className="form-control" id="interestAmount" value={computeMonthlyInterestAmount} readOnly/>
                        </div>
                    </div>   
                    <div className="col-3">
                        <div className="form-group">
                        <label>Monthly Due</label>
                        <input type="text" className="form-control" id="monthlyDue" value={loan.monthlyDue} readOnly/>
                        </div>
                    </div>                      
                </div>
                <div className="row mb-3">
                    <div className="col-1"></div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Start Date</label>
                            <input type="text" className="form-control"/>                        
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                        <label>Due Date</label>
                        <input type="text" className="form-control" id="interestAmount"/>
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