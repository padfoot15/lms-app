import useFetch from '../../customHooks/useFetch';

const AddLoan = () => {
    const {data, loading} = useFetch('/borrowers')
    if(loading)return <h1>Loading...</h1>    

    function handleChange(e){

    }

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
                                <select className="form-control" id="borrower">
                                    {data.map(borrower => {
                                        return <option key={borrower._id}>{borrower.name.firstName + " " + borrower.name.lastName}</option>
                                    })
                                    }
                                </select>
                            </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Amount</label>
                                <select className="form-control" id="amount">
                                    <option value="" selected disabled hidden>Select amount...</option>
                                    <option value="1">Php 1000</option>
                                    <option value="2">Php 2000</option>
                                    <option value="3">Php 3000</option>
                                    <option value="4">Php 5000</option>
                                    <option value="5">Php 10000</option>
                                </select>
                        </div>
                    </div>    
                    <div className="col-3">
                        <div className="form-group">
                            <label>Term (Month)</label>
                            <select className="form-control" id="amount">
                                    <option value="" selected disabled hidden>Select term...</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>6</option>
                                    <option>12</option>
                                </select>
                        </div>
                    </div>            
                </div>
                
                <div className="row mb-3">
                    <div className="col-1"></div>
                    <div className="col-3">
                        <div className="form-group">
                        <label>Monthly Interest Rate</label>
                                <select className="form-control" id="amount">
                                    <option value="" selected disabled hidden>Select interest...</option>
                                    <option>0%</option>
                                    <option>4%</option>
                                    <option>6%</option>
                                    <option>10%</option>
                                </select>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                        <label>Monthly Interest Amount</label>
                        <input type="text" className="form-control" id="interestAmount" readOnly/>
                        </div>
                    </div>   
                    <div className="col-3">
                        <div className="form-group">
                        <label>Monthly Due</label>
                        <input type="text" className="form-control" id="interestAmount" readOnly/>
                        </div>
                    </div>                      
                </div>
                <div className="row mb-3">
                    <div className="col-1"></div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Start Date</label>
                            <input type="text" class="form-control"/>                        
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