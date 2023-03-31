import { Button, Card, FormControl, FormGroup, FormLabel, Form } from 'react-bootstrap'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
  return (
    
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Log In</h2>
                <Form>
                    <FormGroup id="email">
                        <FormLabel>Email</FormLabel>
                        <FormControl type="email" ref={emailRef} required />              
                    </FormGroup>
                    <FormGroup id="password">
                        <FormLabel>Password</FormLabel>
                        <FormControl type="password" ref={passwordRef}  required />              
                    </FormGroup>                    
                </Form>
                <Button className='w-100 text-center mt-2' type="submit">Log In</Button>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Need an account? <Link to="/signup">Sign Up</Link>
        </div>
    </>
  )
}

export default Login;