import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class LoginForm extends React.Component {

  constructor(props) {
    super(props)
    this.emailRef=''
    this.passwordRef=''
  }

  componentDidMount() {
    this.props.changeEmail(this.emailRef)
    this.props.changePassword(this.passwordRef)
  }

  goToSignup = () => {
    this.props.history.push('/signup')
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            ref={this.emailRef}
            name="email"
            id="exampleEmail"
            placeholder="email"
            autoComplete="off"
            value={this.props.email}
            onChange={(e) => {this.props.changeEmail(e.target.value)}}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            ref={this.passwordRef}
            name="password"
            id="examplePassword"
            placeholder="password"
            autoComplete="off"
            value={this.props.password}
            onChange={(e) => {this.props.changePassword(e.target.value)}}
          />
        </FormGroup>
        <Button color={'success'} className='button' onClick={() => this.props.login()}>
          Sign in
        </Button>
        <p className='alreadyAccountText'>
          already have an account?
        </p>
        <Button color={'none'} className='outlineButton' onClick={() => this.goToSignup()}>
          Sign up
        </Button>
      </Form>
    );
  }
}
