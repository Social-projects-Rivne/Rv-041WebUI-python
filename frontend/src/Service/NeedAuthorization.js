import React from 'react';
import { Redirect } from 'react-router';


export function redirectToSignUp(error) {

    /*this function checks error message for Forbidden cause.
    If it present - return Redirect for LogIn page, else - return false*/

    const isForbidden = ("" + error).toLowerCase().search("forbidden") !== -1;

    if (isForbidden){
        return (
            <Redirect to='/log-in'/>
       );
    }
    else{
        return false;
    }
}