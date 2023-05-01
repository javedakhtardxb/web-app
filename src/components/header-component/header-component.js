import './header-component.css';

function Header({ notificationCount, notifications, shownotification }) {
    return (
        <div className="horizontal-layout horizontal-menu material-horizontal-layout material-layout 2-columns  " data-open="hover" data-menu="horizontal-menu" data-col="2-columns">
            {/* <!-- BEGIN: Header--> */}
            <nav
                className="header-navbar navbar-expand-md navbar navbar-with-menu navbar-without-dd-arrow navbar-static-top navbar-dark navbar-brand-center">
                <div className="navbar-wrapper">
                    <div className="navbar-header">
                        <ul className="nav navbar-nav flex-row">
                            <li className="nav-item mobile-menu d-md-none mr-auto"><a
                                className="nav-link nav-menu-main menu-toggle hidden-xs" href="#"><i
                                    className="ft-menu font-large-1"></i></a></li>
                            <li className="nav-item"><a className="navbar-brand" href="javascript:void(0)">

                                <h3 className="brand-text"> <img className="brand-logo"
                                    src="./app-assets/images/logo/logo.png" />Municipality - Sharjah</h3>
                            </a></li>
                            <li className="nav-item d-md-none"><a className="nav-link open-navbar-container" data-toggle="collapse"
                                data-target="#navbar-mobile"><i className="la la-ellipsis-v"></i></a></li>
                        </ul>
                    </div>
                    <div className="navbar-container content">
                        <div className="collapse navbar-collapse" id="navbar-mobile">
                            <ul className="nav navbar-nav mr-auto float-left">
                                {/* <li className="nav-item d-none d-md-block"><a className="nav-link nav-menu-main menu-toggle" href="#"><i
                                    className="ft-menu"></i></a></li> */}
                            </ul>
                            <ul className="nav navbar-nav float-right">
                                {shownotification === '1' && (
                                    <li className="dropdown dropdown-notification nav-item"><a className="nav-link nav-link-label" href="#"
                                        data-toggle="dropdown"><i className="material-icons">notifications_none</i><span
                                            className="badge badge-pill badge-danger badge-up badge-glow">{notificationCount}</span></a>
                                        <ul className="dropdown-menu dropdown-menu-media dropdown-menu-right">
                                            <li className="dropdown-menu-header">
                                                <h6 className="dropdown-header m-0"><span className="grey darken-2">Notifications</span>
                                                </h6><span className="notification-tag badge badge-danger float-right m-0">{notificationCount} New</span>
                                            </li>
                                            <li className="scrollable-container media-list w-100">

                                                {
                                                    notifications.map(notification => (
                                                        <div className="media">
                                                            <div className="media-left align-self-center"><i
                                                                className="material-icons icon-bg-circle bg-cyan mr-0">add_box</i></div>
                                                            <div className="media-body">
                                                                <h6 className="media-heading">{notification.notificationText}</h6>
                                                                <p className="notification-text font-small-3 text-muted">{notification.statusText}</p><small>
                                                                </small>
                                                            </div>
                                                        </div>
                                                    ))
                                                }

                                            </li>
                                        </ul>
                                    </li>
                                )}

                                <li className="dropdown dropdown-user nav-item"><a
                                    className="dropdown-toggle nav-link dropdown-user-link" href="#"
                                    data-toggle="dropdown"><span className="mr-1 user-name text-bold-700">Javed
                                        Akhtar</span><span className="avatar avatar-online"><img
                                            src="./app-assets/images/portrait/small/avatar-s-19.png"
                                            alt="avatar" /><i></i></span></a>
                                    <div className="dropdown-menu dropdown-menu-right">

                                        <div className="dropdown-divider"></div><a className="dropdown-item"
                                            href="javascript:void(0)"><i className="material-icons">power_settings_new</i>
                                            Logout</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            {/* <!-- END: Header--> */}
        </div>
    );
}

export default Header;
