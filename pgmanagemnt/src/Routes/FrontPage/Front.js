import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './Front.css';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
export default class Front extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
    };
    static defaultProps = {
        dispatch: f => f,
    };
    constructor(props) {
        super(props);
        this.state = {
          userName: '',
          password: ''
        };
      }
    
      emitEmpty = () => {
        this.userNameInput.focus();
        this.setState({ userName: '', password: '' });
      }
    
      onChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
      }
      onChangePassword = (e) => {
        this.setState({ password: e.target.value });
      }
    
    render() {
        const { userName, password } = this.state;
        const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
       
        return (
            <div className = {styles.wrapper} id = 'root'>
                <div className = {styles.header}>
                    <h1 className = {styles.headerText}>Royal Stay</h1>
                </div>
                <div className = {styles.container}>
                    <div className = {styles.containerWrapper}>
                    <div className = {styles.inputWrapper}>
                    <span>EMAIL-ID</span>
                    <Input
                        placeholder="Enter your username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={suffix}
                        value={userName}
                        onChange={this.onChangeUserName}
                        ref={node => this.userNameInput = node}
                     />
                     </div>
                     <div className = {styles.inputWrapper}>
                        <span>PASSWORD</span>
                        <Input
                            placeholder="Enter your password"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={suffix}
                            value={password}
                            onChange={this.onChangePassword}
                            ref={node => this.passwordInput = node}
                            type={'password'}
                     />
                     </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Front />, document.getElementById('root'));