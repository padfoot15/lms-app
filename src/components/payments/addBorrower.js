import { useState } from "react";
import axios from 'axios';



const AddBorrower = () => {
    const userName={
        firstName : "",
        middleName : "",
        lastName : ""
    }
    const userAddress={
        street : "",
        brgy : "",
        city : "",
        zip : ""
    }
    const userContact={
        email : "",
        number : ""
    }
    const userBank={
        bankName : "",
        accountName : "",
        accountNumber : ""
    }
    const userWork={
        jobTitle:"",
        employer : "",
        employmentYear: "",
        coe: ""
    }
    const [name, setUserName] = useState(userName)
    const [address, setUserAddress] = useState(userAddress)
    const [contact, setUserContact] = useState(userContact)
    const [bankAccount, setUserBank] = useState(userBank)
    const [workDetails, setUserWork] = useState(userWork)

    async function handleSubmit(e){
        const userData ={
            name,
            address,
            contact,
            bankAccount,
            workDetails
        }
        console.log(userData)
        e.preventDefault();
        const res = await axios.post(process.env.REACT_APP_API_URL + "/borrowers",userData)
        console.log(res)
    }

    function handleChangeName(e){
        setUserName({...name,[e.target.id]:e.target.value})
    }
    function handleChangeAddress(e){
        setUserAddress({...address,[e.target.id]:e.target.value})
    }
    function handleChangeContact(e){
        setUserContact({...contact,[e.target.id]:e.target.value})
    }
    function handleChangeBank(e){
        setUserBank({...bankAccount,[e.target.id]:e.target.value})
    }
    function handleChangeWork(e){
        setUserWork({...workDetails,[e.target.id]:e.target.value})
    }

    return ( 
        <div className="container border border-light border-5 mb-2">
            <form onSubmit={handleSubmit}>
                <div className="row mb-5">
                    <h2>Borrower's Information</h2>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <div className="form-group">
                            <label>First Name</label>
                            <input value={name.firstName} type="input" className="form-control" id="firstName" placeholder="First Name" onChange={handleChangeName}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Last Name</label>
                            <input value={name.lastName} type="input" className="form-control" id="lastName" placeholder="Last Name" onChange={handleChangeName}/>
                        </div>
                    </div>                
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <div className="form-group">
                            <label>Email</label>
                            <input value={contact.email} type="text" className="form-control" id="email" placeholder="abc@mail.com" onChange={handleChangeContact}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Contact</label>
                            <input value={contact.number} type="text" className="form-control" id="number" placeholder="(+63)1234-567-890" onChange={handleChangeContact}/>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <div className="form-group">
                            <label>Street Address</label>
                            <input value={address.street} type="text" className="form-control" id="street" placeholder="#123 Juan Street" onChange={handleChangeAddress}/>
                        </div>
                    </div>                                                            
                </div>
                <div className="row mb-3">
                        <div className="col">
                            <div className="form-group">
                                <label>Barangay</label>
                                <input value={address.brgy} type="text" className="form-control" id="brgy" placeholder="Barangay" onChange={handleChangeAddress}/>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label>City</label>
                                <input value={address.city} type="text" className="form-control" id="city" placeholder="City" onChange={handleChangeAddress}/>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label>Zip Code</label>
                                <input value={address.zip} type="text" className="form-control" id="zip" placeholder="Zip" onChange={handleChangeAddress}/>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="form-group">
                                <label>Job Role</label>
                                <input value={workDetails.jobTitle} type="text" className="form-control" id="jobTitle" placeholder="e.g. CSR" onChange={handleChangeWork}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label>Employer</label>
                                <input value={workDetails.employer} type="text" className="form-control" id="employer" placeholder="e.g. Accenture" onChange={handleChangeWork}/>
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
     );
}
 
export default AddBorrower;