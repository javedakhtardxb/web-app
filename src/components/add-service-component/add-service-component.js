import './add-service-component.css';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { Stepper } from 'react-form-stepper';
import { useState } from 'react';
import { encrypt, decrypt } from '../../common/crypto';
import { Validation } from '../../common/validation';
import Header from '../header-component/header-component';
import { ToastContainer, toast } from 'react-toastify';

function Services() {
    const navigate = useNavigate();
    const [activeSteps, setActiveSteps] = useState(0); //0, 1, 2, 3(pay)
    const [formData, setformData] = useState(
        {
            fullname: "",
            address: "",
            email: "",
            phonenumber: "",
            projectname: "",
            projectdescription: "",
            workdescription: "",
            permittype: "",
            permitscope: "",
            servicefees: 200,
            cardnumber: "",
            cardholdername: "",
            cardexpirydate: "",
            cvcnumber: "",
            permitstatus: "Under Review",
            paymentstatus: "Paid"
        }
    );
    const [errors, setErrors] = useState({});

    const onHandleActiveStep = (_step, direction) => {
        if (_step === 0 && direction == 'forward') {
            const err = Validation(formData, "step-1")
            setErrors(err);
            if (Object.keys(err).length === 0) {
                setActiveSteps(1);
            }
        } else if (_step === 1 && direction == 'forward') {
            const err = Validation(formData, "step-2");
            setErrors(err);
            if (Object.keys(err).length === 0) {
                setActiveSteps(2);
            }
        } else if (_step === 2 && direction == 'backward') {
            setActiveSteps(1);
        } else if (_step === 1 && direction == 'backward') {
            setActiveSteps(0);
        }
    };

    const onHandleInput = (event) => {
        setformData(
            {
                ...formData,
                [event.target.name]: event.target.value
            }
        );
    }

    const payFees = () => {
        const err = Validation(formData, "step-3");
        setErrors(err);
        if (Object.keys(err).length === 0) {
            const storageData = decrypt('users');
            const newDataAdded = [...storageData, formData];
            encrypt('users', newDataAdded);
            console.log("+++++",decrypt('users'));
            toast.success("Transaction Successfull");
            toast.success("Your payment was successfully processed!");
            setTimeout(() => {
                navigate('/dashboard');
            }, 2500);
        }
    }

    return (
        <div className="horizontal-layout horizontal-menu material-horizontal-layout material-layout 2-columns  " data-open="hover"
            data-menu="horizontal-menu" data-col="2-columns">
            <Header notificationCount={0} notifications={[]} shownotification="0"/>
            {/* <!-- BEGIN: Main Menu--> */}
            <div className="header-navbar navbar-expand-sm navbar navbar-horizontal navbar-fixed navbar-dark navbar-without-dd-arrow navbar-shadow"
                role="navigation" data-menu="menu-wrapper">
                <div className="navbar-container main-menu-content" data-menu="menu-container">
                    <ul className="nav navbar-nav" id="main-menu-navigation" data-menu="menu-navigation">
                        <li className="nav-item">
                            <Link className="nav-link" to={`/dashboard`}><i className="material-icons">settings_input_svideo</i><span>Dashboard</span></Link>
                        </li>
                        <li className="dropdown nav-item" data-menu="dropdown"><a className="dropdown-toggle nav-link" href="#"
                            data-toggle="dropdown"><i className="material-icons">playlist_add</i><span
                                data-i18n="Services">Services</span></a>
                            <ul className="dropdown-menu">

                                <li data-menu="">
                                    <Link className="dropdown-item" to={`/service-request`} data-toggle=""><span data-i18n="Add New">Apply Construction Permit</span></Link>
                                </li>
                            </ul>
                        </li>

                    </ul>
                </div>
            </div>

            {/* <!-- END: Main Menu--> */}

            {/* <!-- BEGIN: Content--> */}
            <div className="app-content content">
                <Stepper steps={[{ label: 'Personal Information' }, { label: 'Project Information' }, { label: 'Payment' }]} activeStep={activeSteps} />
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-body">

                        {/* <!-- Form wizard with number tabs section start --> */}
                        <section id="number-tabs">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className="card-title"></h4>
                                            <a className="heading-elements-toggle"><i
                                                className="la la-ellipsis-h font-medium-3"></i></a>
                                        </div>
                                        <div className="card-content collapse show">
                                            <div className="card-body">
                                                <form action="#" className="number-tab-steps wizard-circle">

                                                    {/* <!-- Step 1 --> */}
                                                    {/* <h6>Step 1</h6> */}

                                                    {
                                                        activeSteps === 0 && (
                                                            <fieldset>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label for="fullname">Full Name* :</label>
                                                                            <input type="text" name="fullname" value={formData.fullname} className="form-control" id="fullname" onChange={onHandleInput} />
                                                                            {errors.fullname && <p style={{ color: 'red' }}>Name is required</p>}
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label for="address">Address :</label>
                                                                            <input type="text" name="address" value={formData.address} className="form-control" id="address" onChange={onHandleInput} />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label for="emailAddress1">Email Address* :</label>
                                                                            <input type="email" name="email" value={formData.email} className="form-control" id="emailAddress1" onChange={onHandleInput} />
                                                                            {errors.email && <p style={{ color: 'red' }}>Email is required</p>}
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label for="phoneNumber1">Phone Number* :</label>
                                                                            <input type="number" name="phonenumber" value={formData.phonenumber} className="form-control" id="phoneNumber1" onChange={onHandleInput} />
                                                                            {errors.phonenumber && <p style={{ color: 'red' }}>Phone is required</p>}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <input type="button"
                                                                            name="generate" value="Next"
                                                                            className="btn round btn-primary box-shadow-1 px-3 mr-1" onClick={() => onHandleActiveStep(0, 'forward')} />
                                                                    </div>
                                                                </div>
                                                            </fieldset>
                                                        )
                                                    }

                                                    {/* <!-- Step 2 --> */}
                                                    {/* <h6>Step 2</h6> */}

                                                    {
                                                        activeSteps === 1 && (
                                                            <fieldset>
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label for="projectname">Project Name* :</label>
                                                                            <input type="text" name="projectname" value={formData.projectname} className="form-control" id="projectname" onChange={onHandleInput} />
                                                                            {errors.projectname && <p style={{ color: 'red' }}>Project name  is required</p>}
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label for="projectdescription">Project Description :</label>
                                                                            <input type="text" name="projectdescription" value={formData.projectdescription} className="form-control" id="projectdescription" onChange={onHandleInput} />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label for="workdescription">Description Of Work :</label>
                                                                            <input type="text" name="workdescription" value={formData.workdescription} className="form-control" id="workdescription" onChange={onHandleInput} />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label for="permittype">Permit Type* :</label>
                                                                            <select className="custom-select form-control" value={formData.permittype} id="permittype" name="permittype" onChange={onHandleInput}>
                                                                                <option value="">Select Permit Type</option>
                                                                                <option value="Building Permit">Building Permit</option>
                                                                                <option value="Electrical Permit">Electrical Permit</option>
                                                                                <option value="Plumbing Permit">Plumbing Permit</option>
                                                                                <option value="Mechanical Permit">Mechanical Permit</option>
                                                                            </select>
                                                                            {errors.permittype && <p style={{ color: 'red' }}>Permit type is required</p>}
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label for="permitscope">Project Scope* :</label>
                                                                            <select className="custom-select form-control" value={formData.permitscope} id="permitscope" name="permitscope" onChange={onHandleInput}>
                                                                                <option value="">Select Project Scope</option>
                                                                                <option value="New Construction">New Construction</option>
                                                                                <option value="Addition">Addition</option>
                                                                                <option value="Remodel">Remodel</option>
                                                                                <option value="Demolition">Demolition</option>
                                                                            </select>
                                                                            {errors.permitscope && <p style={{ color: 'red' }}>Permit scope is required</p>}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label for="servicefees">Service Fees :</label>
                                                                            <input type="text" name="servicefees" value="200 AED" className="form-control" id="servicefees" readOnly />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <input type="button"
                                                                            name="generate" value="Back"
                                                                            className="btn btn-secondary round box-shadow-1 px-3" onClick={() => onHandleActiveStep(1, 'backward')} />
                                                                        <input type="button"
                                                                            name="cancel" value="Next"
                                                                            className="btn round btn-primary box-shadow-1 px-3 mr-1" onClick={() => onHandleActiveStep(1, 'forward')} />
                                                                    </div>
                                                                </div>
                                                            </fieldset>
                                                        )
                                                    }


                                                    {/* <!-- Step 3 --> */}
                                                    {/* <h6>Step 3</h6> */}

                                                    {
                                                        activeSteps === 2 && (
                                                            <fieldset>
                                                                <div className="row match-height">
                                                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                                                        <div className="card add-card">
                                                                            <div className="card-header">
                                                                                <h4>Credit/Debit Card Detail*</h4>
                                                                            </div>
                                                                            <div className="card-content">
                                                                                <div className="card-body">
                                                                                    <div className="row">

                                                                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                                                                            <form action="#" className="card-form">
                                                                                                <fieldset className="mb-1">
                                                                                                    <div className="form-group">
                                                                                                        <input type="text"
                                                                                                            className="form-control card-number"
                                                                                                            name="cardnumber"
                                                                                                            id="card-number"
                                                                                                            value={formData.cardnumber}
                                                                                                            maxlength="19"
                                                                                                            placeholder="Card Number" onChange={onHandleInput} />
                                                                                                        {errors.cardnumber && <p style={{ color: 'red' }}>Card number is required</p>}
                                                                                                    </div>
                                                                                                </fieldset>
                                                                                                <fieldset className="mb-1">
                                                                                                    <div className="form-group">
                                                                                                        <input type="text"
                                                                                                            className="form-control card-name"
                                                                                                            name="cardholdername" id="card-name"
                                                                                                            value={formData.cardholdername}
                                                                                                            placeholder="Card Holder Name" onChange={onHandleInput} />
                                                                                                        {errors.cardholdername && <p style={{ color: 'red' }}>Card holder name is required</p>}

                                                                                                    </div>
                                                                                                </fieldset>
                                                                                                <div className="row">
                                                                                                    <div className="col-md-6">
                                                                                                        <fieldset className="mb-1">
                                                                                                            <div className="form-group">
                                                                                                                <input type="date"
                                                                                                                    className="form-control card-expiry"
                                                                                                                    name="cardexpirydate"
                                                                                                                    id="card-expiry"
                                                                                                                    value={formData.cardexpirydate}
                                                                                                                    placeholder="mm/yy" onChange={onHandleInput} />
                                                                                                                {errors.cardexpirydate && <p style={{ color: 'red' }}>Card expiry date is required</p>}
                                                                                                            </div>
                                                                                                        </fieldset>
                                                                                                    </div>
                                                                                                    <div className="col-md-6">
                                                                                                        <fieldset className="mb-1">
                                                                                                            <div className="form-group">
                                                                                                                <input type="number"
                                                                                                                    className="form-control card-cvc"
                                                                                                                    name="cvcnumber"
                                                                                                                    id="card-cvc"
                                                                                                                    value={formData.cvcnumber}
                                                                                                                    maxlength="16"
                                                                                                                    placeholder="Card CVC Number" onChange={onHandleInput} />
                                                                                                                {errors.cvcnumber && <p style={{ color: 'red' }}>CVC expiry date is required</p>}
                                                                                                            </div>
                                                                                                        </fieldset>
                                                                                                    </div>
                                                                                                </div>
                                                                                                <div className="row">
                                                                                                    <div className="col-12">
                                                                                                        <input type="button"
                                                                                                            name="generate" value="Back"
                                                                                                            className="btn btn-secondary round box-shadow-1 px-3" onClick={() => onHandleActiveStep(2, 'backward')} />
                                                                                                        <input type="button"
                                                                                                            name="cancel" value="Pay"
                                                                                                            className="btn round btn-primary box-shadow-1 px-3 mr-1" onClick={payFees} />
                                                                                                    </div>
                                                                                                </div>
                                                                                            </form>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </fieldset>
                                                        )
                                                    }
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* <!-- Form wizard with number tabs section end --> */}

                    </div>
                </div>
            </div>
            {/* <!-- END: Content--> */}

            <div className="sidenav-overlay"></div>
            <div className="drag-target"></div>

            {/* <!-- BEGIN: Footer--> */}
            <footer className="footer footer-static footer-light navbar-shadow">
                <p className="clearfix blue-grey lighten-2 text-sm-center mb-0 px-2"><span
                    className="float-md-left d-block d-md-inline-block">Copyright &copy; 2023 <a
                        className="text-bold-800 grey darken-2" href="#" target="_blank">Sharjah Municipality</a></span><span
                            className="float-md-right d-none d-lg-block">POC - Not for production use<span
                                id="scroll-top"></span></span></p>
            </footer>
            {/* <!-- END: Footer--> */}

            <ToastContainer />
        </div>
    );
}

export default Services;
