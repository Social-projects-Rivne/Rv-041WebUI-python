import React from 'react';
import { Redirect } from 'react-router';


export function redirectToSignUp(error) {
    /*this function return Redirect for LogIn page*/
    return (<Redirect to='/log-in'/>);
}