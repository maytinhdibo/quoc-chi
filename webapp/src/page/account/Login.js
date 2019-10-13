import React from 'react';
import lang from './../../config/language';
import userAPI from './../../services/user.services';
import { Link, Redirect } from 'react-router-dom';
import auth from '../../services/auth.services';
import { alertText } from '../../components/Alert';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            redirectToReferrer: auth.isAuth
        }
    }
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    componentWillMount() {
    }
    login = (evt) => {
        const { email, password } = this.state
        userAPI.login({ email, password }).then(object => {
            if (object.success) {
                console.log(object);
                localStorage.token = object.data.token;
                localStorage.name = object.data.name;
                localStorage.id = object.data.id;
                auth.login();
                this.setState({ redirectToReferrer: true });
            } else {
                throw new Error(object.reason);
            }
        }).catch(e => {
            alertText(e.message);
        });
        evt.preventDefault();
    }
    render() {
        let { from } = this.props.location.state || { from: { pathname: "/dashboard" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;
        return (
            <div className="page user">
                <div className="bg-overlay" style={{ backgroundImage: "url('/img/bg.jpg')" }}></div>
                <form onSubmit={this.login} className="user card">
                    {/* <div className="qc-card-header">
                    <h2>{lang.login}</h2>
                </div> */}

                    {/* <img className="logo" src="/img/logo.png" /> */}

                    <h1>Quốc Chí</h1>
                    <p>Kho tàng tri thức Việt</p>
                    <div className="qc-input-group">
                        <input value={this.state.email} onChange={this.handleChange} name="email" className="qc-input-lg" placeholder={lang.email} type="text"></input>
                        <input value={this.state.password} onChange={this.handleChange} name="password" className="qc-input-lg" placeholder={lang.password} type="password"></input>
                    </div>

                    <button type="submit" className="qc-btn-lg" ><b>{lang.login}</b></button>
                    <a href="#">{lang.forgotpass}</a>
                </form>
            </div>
        )
    }
}

export default Login;