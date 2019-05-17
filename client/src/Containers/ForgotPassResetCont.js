import { connect } from 'react-redux';
import ForgotPassReset from '../Components/Auth/ForgotPassReset';
import { resetPasswordDb} from '../Actions/UserActions';

const mapDispatchToProps = dispatch => {
    return {
      resetPasswordDb: userData => dispatch(resetPasswordDb(userData)),
    };
 };

function mapStateToProps(state) {
  const {expiredtoken}  = state.errors;
  const {emailsent} = state.auth
   return { errors: expiredtoken,
            emailsent: emailsent.emailSuccess}
};

const ForgotPassResetCont = connect(mapStateToProps, mapDispatchToProps)(ForgotPassReset);
export default ForgotPassResetCont;