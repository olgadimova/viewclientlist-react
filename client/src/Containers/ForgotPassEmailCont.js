import { connect } from 'react-redux';
import ForgotPassEmail from '../Components/Auth/ForgotPassEmail';
import { sendResetEmail} from '../Actions/UserActions';

const mapDispatchToProps = dispatch => {
    return {
      sendResetEmail: userData => dispatch(sendResetEmail(userData)),
    };
 };

function mapStateToProps(state) {
  const {notfound}  = state.errors;
  const {emailsent} = state.auth
   return { errors: notfound,
            emailsent: emailsent.success
  };
};

const ForgotPassEmailCont = connect(mapStateToProps, mapDispatchToProps)(ForgotPassEmail);
export default ForgotPassEmailCont;