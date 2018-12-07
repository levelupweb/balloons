import ContactModel from "./model";
import * as methods from "./methods";

ContactModel.createContact = methods.createContact;
ContactModel.getContacts = methods.getContacts;

export const Contact = ContactModel;
export default Contact;
