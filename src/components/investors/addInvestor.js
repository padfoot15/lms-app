import { useState } from "react";
import axios from 'axios';


const AddInvestor = () => {
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
        accountNumber : "",
        qrCode : ""
    }
    const userOtherInfo={
        birthDate:"",
        validIds:""
    }
    const [errorMsg, setErrorMsg] = useState('')
    const [name, setUserName] = useState(userName)
    const [address, setUserAddress] = useState(userAddress)
    const [contact, setUserContact] = useState(userContact)
    const [bankAccount, setUserBank] = useState(userBank)
    const [otherInfo, setUserOtherInfo] = useState(userOtherInfo)

    async function handleSubmit(e){
        e.preventDefault();
        if(name.firstName === ''){            
            setErrorMsg("***First name is required")        
        }else if(name.lastName === '0'){
            setErrorMsg("***Last name is required")        
        }else if(contact.email === ''){
            setErrorMsg("***Email is required")        
        }else if(contact.number === ''){
            setErrorMsg("***Contact number is required")        
        }else if(otherInfo.birthDate === ''){
            setErrorMsg("***Birth date is required")        
        }else if(otherInfo.validIds === ''){
            setErrorMsg("***Valid IDs is required")        
        }else if(address.street === ''){
            setErrorMsg("***Street is required")        
        }else if(address.city === ''){
            setErrorMsg("***City is required")        
        }else if(address.brgy === ''){
            setErrorMsg("***Barangay is required")        
        }else if(address.zip === ''){
            setErrorMsg("***Zip code is required")        
        }else if(bankAccount.bankName === ''){
            setErrorMsg("***Bank name is required")        
        }else if(bankAccount.accountName === ''){
            setErrorMsg("***Account name is required")        
        }else if(bankAccount.accountNumber === ''){
            setErrorMsg("***Account number is required")        
        }else{
            const userData ={
                name,
                address,
                contact,
                bankAccount,
                validIds:otherInfo.validIds,
                birthDate:otherInfo.birthDate
            }
            try {
                await axios.post(process.env.REACT_APP_API_URL + "/investors",userData)
                //clear states
                setUserName(userName)
                setUserAddress(userAddress)
                setUserContact(userContact)
                setUserBank(userBank)
                setErrorMsg('')
            } catch (error) {
                if (error.response.data.code) setErrorMsg("***Email address already exist")
            }                    
        }
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
    function handleChangeOtherInfo(e){     
        setUserOtherInfo({...otherInfo,[e.target.id]:e.target.value})
    }
    return ( 
        <>
        <div className="d-flex align-items-center mb-2 justify-content-center">
            <h2>New Investor</h2>                    
        </div>
        <div className="container border border-light border-5 mb-2">
            <form onSubmit={handleSubmit}>
                <div className="row mb-5">                    
                    <div className='col-4'>
                        <h2>Investor's Information</h2>
                    </div>
                    <div className='col-1'></div>
                    <div className='col'>
                        <p style={{color:"red",fontStyle:"italic"}}>{errorMsg}</p>
                    </div>
                </div>
                <div className="row mb-2">
                    <h4>Basic Information</h4>
                </div>
                <div className="row mb-3">
                    <div className="col-4">
                        <div className="form-group">
                            <label>First Name</label>
                            <input value={name.firstName} type="input" className="form-control" id="firstName" placeholder="First Name" onChange={handleChangeName}/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-group">
                            <label>Middle Name</label>
                            <input value={name.middleName} type="input" className="form-control" id="middleName" placeholder="Last Name" onChange={handleChangeName}/>
                        </div>
                    </div>
                    <div className="col-4">
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
                            <input value={contact.email} type="email" className="form-control" id="email" placeholder="abc@mail.com" onChange={handleChangeContact}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Contact</label>
                            <input value={contact.number} type="text" className="form-control" id="number" placeholder="(+63)1234-567-890" onChange={handleChangeContact}/>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="form-group">
                            <label>Birth Date</label>
                            <input value={otherInfo.birthDate} type="date" className="form-control" id="birthDate" onChange={handleChangeOtherInfo}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Gov't Valid Id</label>
                            <input value={otherInfo.validIds} type="text" className="form-control" id="validIds"  onChange={handleChangeOtherInfo}/>
                        </div>
                    </div>
                </div>
                <div className="row mb-2">
                    <h4>Address</h4>
                </div>
                <div className="row mb-3">
                    <div className="col">
                            <div className="form-group">
                                <label>Street Address</label>
                                <input value={address.street} type="text" className="form-control" id="street" placeholder="#123 Juan Street" onChange={handleChangeAddress}/>
                            </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>City</label>
                            <input value={address.city} type="text" className="form-control" id="city" placeholder="City" onChange={handleChangeAddress}/>                        
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label>Barangay</label>
                            <input value={address.brgy} type="text" className="form-control" id="brgy" placeholder="Barangay" onChange={handleChangeAddress}/>                        
                            </div>
                    </div>
                    <div className="col-2">
                        <div className="form-group">
                            <label>Zip Code</label>
                            <input value={address.zip} type="text" className="form-control" id="zip" placeholder="Zip" onChange={handleChangeAddress}/>
                        </div>
                    </div>
                </div>                
                <div className="row mb-2">
                    <h4>Bank</h4>
                </div>
                <div className="row mb-3">                    
                    <div className="col-3">
                        <div className="form-group">
                            <label>Bank Name</label>
                            <input value={bankAccount.bankName} type="text" className="form-control" id="bankName" onChange={handleChangeBank}/>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="form-group">
                            <label>Account Name</label>
                            <input value={bankAccount.accountName} type="text" className="form-control" id="accountName"  onChange={handleChangeBank}/>
                        </div>
                    </div>  
                    <div className="col-3">
                        <div className="form-group">
                            <label>Account Number</label>
                            <input value={bankAccount.accountNumber} type="text" className="form-control" id="accountNumber"  onChange={handleChangeBank}/>
                        </div>
                    </div>  
                    <div className="col-3">
                        <div className="form-group">
                            <label>QR Code</label>
                            <input value={bankAccount.qrCode} type="text" className="form-control" id="qrCode"  onChange={handleChangeBank}/>
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
 
export default AddInvestor;