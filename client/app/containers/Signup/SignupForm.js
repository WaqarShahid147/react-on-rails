import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class SignupForm extends React.PureComponent {
  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            value={this.props.email}
            onChange={(e) => {this.props.changeEmail(e.target.value)}}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            autoComplete="off"
            value={this.props.password}
            onChange={(e) => {this.props.changePassword(e.target.value)}}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password_confirmation">Password Confirmation</Label>
          <Input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
            placeholder="password confirmation"
            autoComplete="off"
            value={this.props.passwordConfirmation}
            onChange={(e) => {
              this.props.changePasswordConfirmation(e.target.value)
            }}
          />
        </FormGroup>
        <Button color={'success'} className='button' onClick={() => this.props.signup()}>
          Sign up
        </Button>
      </Form>
    );
  }
}
