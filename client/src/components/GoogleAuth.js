import React from 'react';
import './GoogleAuth.css';
import {connect} from 'react-redux';
import {signIn,signOut} from '../actions'

class GoogleAuth extends React.Component {


    // method which executes when component is called and loads the auth2 library.
    componentDidMount() {
        //once loaded we are giving a callback function which calls the init methods and takes clientid from developers console.
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '401841951292-ffb3tf9269fdsh1hn1bg0usvkiq82d6n.apps.googleusercontent.com',
                scope: 'email'
                //we are getting the auth instance  and a listen method to render the page when needed 
                // we are also calling the on auth change function the first time for the componnet.
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        });
    }

    // getting the signed in or out as argument and then calling the correct action reducer
    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }
        else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    //rendering the sign in out button based on state.
    renderAuthButton() {
        if(this.props.isSignedIn === null){
            return null;
        }
        else if(this.props.isSignedIn){
            return (
                <button className="ui red google button" onClick={this.onSignOutClick}>
                    <i className="google icon"></i>Sign Out
                </button>
            )
        }
        else {
            return (
                <button className="ui red google button modifybutton" onClick={this.onSignInClick}>
                    <i className="google icon"></i>Sign in with Google
                </button>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
                {console.log(this.props.userId)}
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn : state.auth.isSignedIn,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, {
    signIn,
    signOut
})(GoogleAuth) ;