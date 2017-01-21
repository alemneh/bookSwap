import React, { Component } from 'react';

const Alert = ({ message, error }) => {
  const classType = error ? 'alert alert-dismissible alert-danger' :
                            'alert alert-dismissible alert-success'
  return (
    <div className={ classType }>
       <button type="button" className="close" data-dismiss="alert">&times;</button>
       { message }
     </div>
  )

}


export default Alert;
