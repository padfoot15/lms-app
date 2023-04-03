import { Button, Card, FormControl, FormGroup, FormLabel, Form, Alert } from 'react-bootstrap'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Container } from 'react-bootstrap';

const SignUp = () => {
    const [isError, setError] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    async function handleSubmit(e){
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/user/signup",{
                email : emailRef.current.value,
                password : passwordRef.current.value        
            })
            setErrMsg('')
        } catch (error) {
            if(error.response.data.message === 'email exists'){
                setErrMsg('Account already exist, try logging in.')
            }
        }
        
    }

    function alertMsg(){
        return isError === true ? <Alert variant='danger'>Invalid Email</Alert> : <p></p>
         
    }

  return (    
    <>
        <Container 
            className='d-flex align-items-center justify-content-center'
            style={{minHeight : "100vh"}}
        >
        <div className='w-100' style={{ maxWidth : "400px"}}>
        <Card>            
            <Card.Body>           
                <p style={{color:"red",fontStyle:"italic"}}>{errMsg}</p>
                <h2 className='text-center mb-4'>Sign Up</h2>
                <Form onSubmit={handleSubmit}>
                    <FormGroup id="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl type="email" ref={emailRef} required />              
                    </FormGroup>
                    <FormGroup id="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl type="password" ref={passwordRef}  required />              
                    </FormGroup>
                    <FormGroup id="password-confirm">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl type="password" ref={passwordConfirmRef} required />            
                    </FormGroup>
                    <Button className='w-100 text-center mt-2' type="submit">Sign Up</Button>
                </Form>
                
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Already have an account? <Link to="/login">Log In</Link>
        </div>
        </div>
        </Container>
    </>
  )
}

export default SignUp;