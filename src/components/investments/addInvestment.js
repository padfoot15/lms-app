import { useState, useEffect } from 'react';
import useFetch from '../../customHooks/useFetch';
import { formatter } from '../../util/util';
import axios from 'axios';

const AddInvestment = () => {
    const investmentData = {
        investor : "",
        investmentId : "",
        amount : "",
        type : "",
        term : "1",
        ratePerYr : "",
        ratePerMo : "",
        intAmtPerMo : "0",
        intAmtPerYr : "0",
        qrtrlyPayout : "0",
        totalIntAmt : "0",
        investedDate : "",
        payoutDates : "",
        balance : "0",
        startDate : "",
        endDate : "",
        status : "In-progress"
    }
    const [errorMsg, setErrorMsg] = useState('')
    const [investment , setInvestment] = useState(investmentData)
    const {data, loading} = useFetch('/investors')  
    const [investmentId, setNewId] = useState('')    
    useEffect( ()=>{
        async function getNewId(){
          const res = await axios.get(process.env.REACT_APP_API_URL + "/investments/newId")        
          setNewId(res.data.newId)
        }
        getNewId();
      },[])

    if(loading)return <h1>Loading...</h1>     

    async function handleSubmit(e){
        e.preventDefault();      
        if(investment.investor === ""){
            setErrorMsg("***Investor is required") 
        }else if(investment.investedDate === ""){
            setErrorMsg("***Invested date is required") 
        }else if(investment.amount === ""){
            setErrorMsg("***Amount is required") 
        }else if(investment.type === ""){
            setErrorMsg("***Type is required") 
        }else if(investment.ratePerYr === ""){
            setErrorMsg("***Rate Per Year is required") 
        }else if(investment.startDate === ""){
            setErrorMsg("***Start date is required") 
        }else{
            //add investment
            try {
                await axios.post(process.env.REACT_APP_API_URL + "/investments",investment)  
                //clear states
                setInvestment(investmentData)   
                setErrorMsg('')  
                setNewId('')                         
             } catch (error) {
                if (error.response.data.message === 'investment id exists'){
                    setErrorMsg("***investment id exist, generate new id")
                }
             }                          
        }                                                   
    }

    async function handleChange(e){       
        if (e.target.id === "startDate"){
            let startDate = new Date(e.target.value)
            let endDate = new Date(startDate.getFullYear() + parseInt(investment.term), startDate.getMonth(), startDate.getDate())                                               
            endDate = endDate.toLocaleDateString("fr-CA")                     
            setInvestment({...investment,[e.target.id]:e.target.value,endDate})
        }else{
            setInvestment({...investment,[e.target.id]:e.target.value})
        }       
    }

    function handleChangeRate(e){
        let ratePerYr = e.target.id === "ratePerYr" ? parseInt(e.target.value) : parseInt(investment.ratePerYr)
        ratePerYr = isNaN(ratePerYr) ? 0 : ratePerYr
        const invAmount = e.target.id === "amount" ? parseInt(e.target.value) : parseInt(investment.amount)
        const term = e.target.id === "term" ? parseInt(e.target.value) : parseInt(investment.term)
        let startDate = investment.startDate
        let endDate = investment.endDate
       
        if (e.target.id === "term"){
            if(startDate !== ""){  
                startDate = new Date(startDate)
                endDate = new Date(startDate.getFullYear() + parseInt(e.target.value), startDate.getMonth(), startDate.getDate())                                               
                endDate = endDate.toLocaleDateString("fr-CA")  
                startDate = startDate.toLocaleDateString("fr-CA")  
            }                               
        }
        
        let ratePerMo = (ratePerYr / 12).toFixed(2)
        let intAmtPerMo = (invAmount * (ratePerMo/100)).toFixed(2)
        intAmtPerMo = isNaN(intAmtPerMo) ? 0 : intAmtPerMo
        let intAmtPerYr = invAmount * (ratePerYr/100)
        intAmtPerYr = isNaN(intAmtPerYr) ? 0 : intAmtPerYr
        let qrtrlyPayout = intAmtPerMo * 3
        qrtrlyPayout = isNaN(qrtrlyPayout) ? 0 : qrtrlyPayout
        let totalIntAmt = intAmtPerYr * term
        totalIntAmt = isNaN(totalIntAmt) ? 0 : totalIntAmt
        let balance = invAmount + totalIntAmt
        balance = isNaN(balance) ? 0 : balance
        
        setInvestment(
            {...investment,
                [e.target.id]:e.target.value,
                ratePerMo,
                intAmtPerMo,
                intAmtPerYr,
                qrtrlyPayout,
                totalIntAmt,
                balance,
                startDate,
                endDate,
                investmentId                
            })
    }

    async function getNewId(e){
        e.preventDefault()
        const res = await axios.get(process.env.REACT_APP_API_URL + "/investments/newId")        
        setInvestment({...investment,investmentId:res.data.newId})
        setNewId(res.data.newId)
    }
    
    return ( 
        <>   
        <div className="d-flex align-items-center mb-2 justify-content-center">
            <h2>New Investment</h2>                    
        </div>
        <div className="container border border-light border-5 mb-2">
            <form onSubmit={handleSubmit}>
                <div className="row mb-5">                    
                    <div className='col-4'>
                        <h2>Investment</h2>
                    </div>
                    <div className='col-1'></div>
                    <div className='col'>
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
                            <label>Investment ID</label>                        
                            <input type="text" className="form-control" id="investmentId" value={investmentId}  disabled/>                                                                   
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Investor</label>
                            <select className="form-select" value={investment.investor} id="investor" onChange={handleChange} >
                                <option value="" hidden>Select investor...</option>
                                {data.map(investor => {
                                    return <option key={investor._id} value={investor._id}>{investor.name.firstName + " " + investor.name.lastName}</option>
                                })
                                }
                            </select>
                        </div>                                                
                    </div>
                    <div className="col">
                            <div className="form-group">
                                <label>Invested Date</label>
                                <input type="date" value={investment.investedDate} className='form-control' id='investedDate' onChange={handleChange} />                                    
                            </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Amount</label>
                            <select className="form-select" value={investment.amount} id="amount" onChange={handleChangeRate}>
                                    <option value="" hidden>Select amount...</option>
                                    <option value="10000">{formatter.format(10000)}</option>
                                    <option value="20000">{formatter.format(20000)}</option>
                                    <option value="50000">{formatter.format(50000)}</option>
                            </select>
                        </div>
                    </div>    
                    <div className="col">
                        <div className="form-group">
                            <label>Type</label>
                            <select className="form-select" value={investment.type} id="type" onChange={handleChange}>
                                    <option value="" hidden>Select...</option>
                                    <option value="balloon">Balloon</option>
                                </select>
                        </div>
                    </div>                    
                </div>
                
                <div className="row mb-3">
                    <div className="col">
                        <div className="form-group">
                            <label>Term</label>
                            <select className="form-select" value={investment.term} id="term" onChange={handleChangeRate}>
                                    <option value="1">1 Year</option>
                                    <option value="3">3 Years</option>
                                    <option value="5">5 Years</option>
                            </select>
                        </div>                        
                    </div>                    
                    <div className="col">
                        <div className="form-group">
                            <label>Rate Per Year</label>
                            <select className="form-select" value={investment.ratePerYr} id="ratePerYr" onChange={handleChangeRate}>
                                    <option value="" hidden>Select rate...</option>
                                    <option value="18">18%</option>
                                    <option value="19">19%</option>
                                    <option value="20">20%</option>
                                    <option value="21">21%</option>
                                    <option value="22">22%</option>
                                    <option value="23">23%</option>
                                    <option value="24">24%</option>
                                    <option value="25">25%</option>
                                    <option value="26">26%</option>
                                    <option value="27">27%</option>
                                    <option value="28">28%</option>
                                    <option value="29">29%</option>
                                    <option value="30">30%</option>
                            </select>
                        </div>
                    </div>   
                    <div className="col">
                        <div className="form-group">
                            <label>Rate Per Month</label>
                            <input type="text" value={investment.ratePerMo + "%"} className='form-control' disabled/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Interest Amount Per Month</label>
                            <input type="text" value={formatter.format(investment.intAmtPerMo)} className='form-control' disabled />                                                                            
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Interest Amount Per Year</label>
                            <input type="text" value={formatter.format(investment.intAmtPerYr)} className='form-control' disabled />                                               
                        </div>
                    </div>                                                               
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <div className="form-group">
                            <label>Quarterly Payout</label>
                            <input type="text" value={formatter.format(investment.qrtrlyPayout)} className='form-control' disabled />                                    
                        </div>
                    </div> 
                    <div className="col">
                        <div className="form-group">
                            <label>Total Interest Amount</label>
                            <input type="text" value={formatter.format(investment.totalIntAmt)} className='form-control' disabled />                                               
                        </div>
                    </div>                                           
                    <div className="col">
                        <div className="form-group">
                            <label>Balance</label>
                            <input type="text" value={formatter.format(investment.balance)} className='form-control' disabled />                                    
                        </div>
                    </div>                     
                    <div className="col">
                        <div className="form-group">
                            <label>Start Date</label>
                            <input type="date" value={investment.startDate} className='form-control' id='startDate' onChange={handleChange} />                                    
                        </div>
                    </div>                      
                    <div className="col">
                        <div className="form-group">
                            <label>End Date</label>
                            <input type="date" value={investment.endDate} className='form-control' disabled />                                    
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
 
export default AddInvestment;