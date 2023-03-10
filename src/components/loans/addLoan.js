import useFetch from '../../customHooks/useFetch';

const AddLoan = () => {
    const {data, loading} = useFetch('/borrowers')
    if(loading)return <h1>Loading...</h1>
    return ( 
        <>   
        <div className="container border border-light border-5 mb-2">
            <form>
                <div className="row mb-5">
                    <h2>Loan Information</h2>
                </div>
                <div className="row mb-3">
                    <div className="col-4">
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
                    <div className='col-2'></div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Amount</label>
                                <select className="form-control" id="amount">
                                    <option>Php 1000</option>
                                    <option>Php 2000</option>
                                    <option>Php 3000</option>
                                    <option>Php 5000</option>
                                    <option>Php 10000</option>
                                </select>
                        </div>
                    </div>                
                </div>
                <div className="row mb-3">
                    <div className="col-3">
                        <div className="form-group">
                        <label>Monthly Interest Rate</label>
                                <select className="form-control" id="amount">
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
                    <div className="col">
                        <div className="form-group">
                            <label>Contact</label>
                            <input type="text" className="form-control" id="contact" placeholder="(+63)1234-567-890"/>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <div className="form-group">
                            <label>Street Address</label>
                            <input type="text" className="form-control" id="street" placeholder="#123 Juan Street"/>
                        </div>
                    </div>                                                            
                </div>
                <div className="row mb-3">
                        <div className="col">
                            <div className="form-group">
                                <label>Barangay</label>
                                <input type="text" className="form-control" id="brgy" placeholder="Barangay"/>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" className="form-control" id="city" placeholder="City"/>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label>Zip Code</label>
                                <input type="text" className="form-control" id="zip" placeholder="Zip"/>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="form-group">
                                <label>Job Role</label>
                                <input type="text" className="form-control" id="job" placeholder="e.g. CSR"/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label>Employer</label>
                                <input type="text" className="form-control" id="job" placeholder="e.g. Accenture"/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label>Years in current employer</label>
                                <select className="form-control" id="employerYr">
                                <option>0-1</option>
                                <option>1-3</option>
                                <option>3-5</option>
                                <option>5-10</option>
                                <option>Other</option>
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
 
export default AddLoan;