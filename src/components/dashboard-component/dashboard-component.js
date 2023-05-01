import './dashboard-component.css';
import { Link, useNavigate } from "react-router-dom";
import Header from '../header-component/header-component';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useState, useEffect, useLayoutEffect } from 'react';
import { decrypt } from '../../common/crypto';
import { w3cwebsocket as W3CWebSocket } from "websocket";

ChartJS.register(ArcElement, Tooltip, Legend);
const client = new W3CWebSocket('ws://127.0.0.1:8000');

function Dashboard() {
  const [users, setUsers] = useState([]);

  const [permitApprovedCount, setPermitApprovedCount] = useState(0);
  const [permitPendingCount, setPermitPendingCount] = useState(0);
  const [permitUnderRevievedCount, setPermitUnderRevievedCount] = useState(0);
  const [permitRejectedCount, setPermitRejectedCount] = useState(0);

  const [paymentStatuspaid, setpaymentStatuspaid] = useState(0);
  const [paymentStatusUnpaid, setpaymentStatusUnpaid] = useState(1);

  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotification] = useState([]);

  const [isWebSocketRunning, setWebSocketRunning] = useState(false);
  // const [counter, setCounter] = useState(0);
  let count = 0;

  useEffect(() => {
    const data = decrypt('users');
    count = count + 1;
    // console.log("dash",data);
    setUsers(data);
    setpaymentStatuspaid(data.filter(d => d.paymentstatus === "Paid").length);

    //WEB SOCKET
    client.onopen = () => {
      console.log('WebSocket Client Connected');
      setWebSocketRunning(true);
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      // console.log(dataFromServer);
      console.log('WebSocket Client Enable');
      setNotificationCount(prev => prev + 1);
      let obj = {};
      obj.notificationText = dataFromServer.notificationText;
      obj.statusText = dataFromServer.statusText;
      setNotification([
        ...notifications,
        obj
      ]);

      if (dataFromServer.statusCode === "Under Review") {
        setPermitUnderRevievedCount(prev => prev + 1);
      } else if (dataFromServer.statusCode === "Rejected") {
        setPermitRejectedCount(prev => prev + 1);
      } else if (dataFromServer.statusCode === "Approved") {
        setPermitApprovedCount(prev => prev + 1);
      } else if (dataFromServer.statusCode === "Pending") {
        setPermitPendingCount(prev => prev + 1);
      }
    };
    //WEB SOCKET
    if(!isWebSocketRunning) {
      console.log("Web socket disable");
        pieChartDataFeed();
    }
  }, []);

  const pieChartDataFeed = () => {
    if(count === 1) {
      const users = decrypt('users');
      console.log(users);
      users.forEach(user => {
        if (user.permitstatus === "Under Review") {
          setPermitUnderRevievedCount(prev => prev + 1);
        } else if (user.permitstatus === "Rejected") {
          setPermitRejectedCount(prev => prev + 1);
        } else if (user.permitstatus === "Approved") {
          setPermitApprovedCount(prev => prev + 1);
        } else if (user.permitstatus === "Pending") {
          setPermitPendingCount(prev => prev + 1);
        } 
      });
    }
  };

  const permitstatus = {
    labels: ['Under Review', 'Rejected', 'Approved', 'Pending'],
    datasets: [
      {
        label: '# of permit status',
        data: [permitUnderRevievedCount, permitRejectedCount, permitApprovedCount, permitPendingCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
      },
    ],
  };

  const paymentstatus = {
    labels: ["success", "failed"],
    datasets: [
      {
        label: '# of payment status',
        data: [paymentStatuspaid, paymentStatusUnpaid],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)'
        ],
      },
    ],
  };

  return (
    <div className="horizontal-layout horizontal-menu material-horizontal-layout material-layout 2-columns  " data-open="hover"
      data-menu="horizontal-menu" data-col="2-columns">
      <Header notificationCount={notificationCount} notifications={notifications} shownotification="1" />
      {/* <!-- BEGIN: Main Menu--> */}
      <div className="header-navbar navbar-expand-sm navbar navbar-horizontal navbar-fixed navbar-dark navbar-without-dd-arrow navbar-shadow"
        role="navigation" data-menu="menu-wrapper">
        <div className="navbar-container main-menu-content" data-menu="menu-container">
          <ul className="nav navbar-nav" id="main-menu-navigation" data-menu="menu-navigation">
            <li className="nav-item">
              {/* <a className="nav-link" href="index.html"><i
              className="material-icons">settings_input_svideo</i><span> Dashboard</span></a> */}
              <Link className="nav-link" to={`/dashboard`}><i className="material-icons">settings_input_svideo</i><span>Dashboard</span></Link>
            </li>
            <li className="dropdown nav-item" data-menu="dropdown"><a className="dropdown-toggle nav-link" href="#"
              data-toggle="dropdown"><i className="material-icons">playlist_add</i><span
                data-i18n="Services">Services</span></a>
              <ul className="dropdown-menu">

                {/* <li data-menu=""><a className="dropdown-item" href="form-construction-service.html"
                  data-toggle=""><span data-i18n="Add New">Apply Construction Permit</span></a>
                </li> */}
                <Link className="dropdown-item" to={`/service-request`} data-toggle=""><span data-i18n="Add New">Apply Construction Permit</span></Link>
              </ul>
            </li>

          </ul>
        </div>
      </div>

      {/* <!-- END: Main Menu--> */}
      {/* <!-- BEGIN: Content--> */}
      <div className="app-content content">
        <div className="content-header row">
        </div>
        <div className="content-overlay"></div>
        <div className="content-wrapper">
          <div className="content-body">
            {/* <!-- Bank Stats --> */}
            <section id="bank-cards" className="bank-cards">
              <div className="row match-height">
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <div className="card bank-card pull-up">
                    <div className="card-content">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-5 text-left">
                            <h3 className="mb-0">{permitApprovedCount}</h3>

                            <h4 className="warning mt-1 text-bold-500" data-testid="permit_approved">PERMIT APPROVED</h4>
                          </div>
                          <div className="col-7">
                            <div className="float-right">
                              <canvas id="gold-chart" className="height-75"></canvas>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <div className="card bank-card pull-up">
                    <div className="card-content">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-5 text-left">
                            <h3 className="mb-0">{permitPendingCount}</h3>

                            <h4 className="info mt-1 text-bold-500" data-testid="permit_pending">PERMIT PENDING</h4>
                          </div>
                          <div className="col-7">
                            <div className="float-right">
                              <canvas id="silver-chart" className="height-75"></canvas>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <div className="card bank-card pull-up">
                    <div className="card-content">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-5 text-left">
                            <h3 className="mb-0">{permitUnderRevievedCount}</h3>

                            <h4 className="danger mt-1 text-bold-500" data-testid="permit_under_review">PERMIT UNDER REVIEW</h4>
                          </div>
                          <div className="col-7">
                            <div className="float-right">
                              <canvas id="gold-chart" className="height-75"></canvas>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <div className="card bank-card pull-up">
                    <div className="card-content">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-5 text-left">
                            <h3 className="mb-0">{permitRejectedCount}</h3>

                            <h4 className="success mt-1 text-bold-500" data-testid="permit_rejected">PERMIT REJECTED</h4>
                          </div>
                          <div className="col-7">
                            <div className="float-right">
                              <canvas id="bitcoin-chart" className="height-75"></canvas>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* <!-- Simple Pie Chart --> */}
                <div className="col-md-2 col-sm-12"></div>

                <div className="col-md-4 col-sm-12">
                  <div className="card">
                    <div className="card-header">
                      <h1>Permit Status</h1>
                    </div>
                    <div className="card-content collapse show">
                      <div className="card-body">
                        <Pie data={permitstatus} />;
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Simple Doughnut Chart --> */}
                <div className="col-md-4 col-sm-12">
                  <div className="card">
                    <div className="card-header">
                      <h1>Payment Status</h1>
                    </div>
                    <div className="card-content collapse show">
                      <div className="card-body">
                        <Pie data={paymentstatus} />;
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 col-sm-12"></div>

              </div>
              <div className="row match-height">

                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="card recent-loan">
                    <div className="card-header">
                      <h4 className="text-center"> Construction Permit Requests</h4>
                    </div>
                    <div className="card-content">
                      <div className="table-responsive">
                        <div className="table-responsive">
                          <table id="active-accounts" className="table alt-pagination table-wrapper">
                            <thead>
                              <tr>
                                <th className="border-top-0"></th>
                                <th className="border-top-0">Full Name</th>
                                <th className="border-top-0">Project Name</th>
                                <th className="border-top-0">Permit Type</th>
                                <th className="border-top-0">Permit Status</th>
                                <th className="border-top-0">Payment Status</th>
                                <th className="border-top-0">Service Fees</th>
                              </tr>
                            </thead>
                            <tbody>
                              {users.map((user) => {
                                return (
                                  <tr>
                                    <td className="align-middle">
                                      <div className="ac-symbol saving"><i className="la la-suitcase"></i>
                                      </div>
                                    </td>
                                    <td className="align-middle">
                                      <div className="ac-type">{user.fullname}</div>
                                    </td>
                                    <td className="align-middle">
                                      <div className="ac-number">{user.projectname}</div>
                                    </td>
                                    <td className="align-middle">
                                      <div className="ac-hol-name">{user.permittype}</div>
                                    </td>
                                    <td className="align-middle">
                                      {
                                        user.permitstatus === "Approved" ? (
                                          <div className="ac-status badge badge-success badge-pill badge-sm" >{user.permitstatus}</div>
                                        ) : (
                                          <div className="ac-status badge badge-danger badge-pill badge-sm" >{user.permitstatus}</div>
                                        )
                                      }
                                    </td>
                                    <td className="align-middle">
                                      {
                                        user.paymentstatus === "Paid" ? (
                                          <div className="ac-status badge badge-success badge-pill badge-sm">{user.paymentstatus}</div>
                                        ) : (
                                          <div className="ac-status badge badge-danger badge-pill badge-sm">{user.paymentstatus}</div>
                                        )
                                      }
                                    </td>
                                    <td className="align-middle">
                                      <div className="ac-balance">{user.servicefees}</div>
                                    </td>
                                  </tr>
                                )
                              })}

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </section>

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

    </div>
  );
}

export default Dashboard;
