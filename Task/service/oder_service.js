
import {
  Tosendsorry,
  Tosendthankuh,
  Tosendwelcome,
  TosendWelcomeAndThankuh
} from "./user_email/email_service.js";

export const handleEmail = async ({ user, totalamount, paymentstatus , ifFirstoder }) => {

  if (paymentstatus === "failed") {
    await Tosendsorry(user);
    return;
  }


  
  if(ifFirstoder && totalamount >= 3000){
    await TosendWelcomeAndThankuh(user , totalamount)
    return
  }
  
  if (ifFirstoder) {
    await Tosendwelcome(user);
    return
  }

 
  if (totalamount >= 3000) {
    await Tosendthankuh(user, totalamount);
    return
  }

};
