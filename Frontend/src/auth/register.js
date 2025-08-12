import React, { useState } from "react";
import axios from "axios";
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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilUser, cilEnvelopeClosed, cilLockLocked, cilUserPlus } from "@coreui/icons";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:1001/auth/register", data);
      console.log(res.data);
      alert(res.data.message);
    } catch (err) {
      console.error(' error:', err.response.data || err.message)
      alert("User already exist ");
    }
  };

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={8}>
          <CCardGroup>
            <CCard className="p-4">
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <h1>Register User</h1>

                  
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      required
                    />
                  </CInputGroup>

                  
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilEnvelopeClosed} />
                    </CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={data.email}
                       onChange={(e) => setData({ ...data, email: e.target.value })}
                      required
                    />
                  </CInputGroup>

                 
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={data.password}
                       onChange={(e) => setData({ ...data, password: e.target.value })}
                      required
                    />
                  </CInputGroup>

                 
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilUserPlus} />
                    </CInputGroupText>
                    <CFormSelect
                      name="role"
                      value={data.role}
                       onChange={(e) => setData({ ...data, role: e.target.value })}
                      required
                    >
                      <option value="">Select role</option>
                      <option value="student">Student</option>
                      <option value="faculty">Faculty</option>
                    </CFormSelect>
                  </CInputGroup>

                  
                  <CRow>
                    <CCol xs={6}>
                      <CButton type="submit" color="primary" className="px-4">
                        Register
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Register;
