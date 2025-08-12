import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({name:'',password: '',email:''})
  const[Error,setError]=useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })}

  const submit = async (e) => {
    e.preventDefault()
    if(!formData.email||!formData.password){
    setError("enter both email and password")
    return;

    }
    try {
      const response = await axios.post('http://localhost:1001/auth/login', formData)
      // if(response.status===200)
      // {
      //   const {role}=response.data
      //   console.log(response)
      //   if (role==='admin')
      //     navigate('/admin')
      //   else if (role === 'faculty') 
      //     navigate('/faculty');
      // else navigate('/student');

      // }
    } catch (error) {
      console.error('login error:', error.response.data || error.message)
      alert('login failed')
    }
  }
  const click=()=>{
    navigate('/register')
  }

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={8}>
          <CCardGroup>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={submit}>
                  <h1>login</h1>
                  

                   <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput type="text" placeholder="Name" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput type="email" placeholder="Email" name="email"value={formData.email} onChange={handleChange}required/>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} required/>
                  </CInputGroup>
                   <CRow>
                                      <CCol xs={6}>
                                        <CButton type="submit" color="primary" className="px-4">Login</CButton>
                                        
                                       

                                      </CCol>
                                      <CCol xs={6}>
                                         <div className="d-grid">
                                                           <CButton onClick={click} color="primary">Create Account</CButton>
                                                         </div>
                                      
                                      </CCol>
                                    </CRow>

                  
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Login
