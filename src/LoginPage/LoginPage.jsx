import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
            
            <style> {'body {background-color: #25AE90; }'} </style>
                <form name="form" onSubmit={this.handleSubmit} style={{marginTop: '80%'}} >
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <input type="text" className="form-control" name="username" placeholder="Username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <input type="password" className="form-control" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block" style={{color: 'green'}} >Login</button>
                        
                        <text>
                            <style> {'text {color: #FFFFFF;}'} </style>
                            Not a member ?
                        </text>
                        <Link to="/register" className="btn btn-link" style={{color: 'white'}} >Sign up now</Link>
                    </div>
                </form>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 