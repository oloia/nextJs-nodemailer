// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {mailOptions, transporter} from "../../config/nodemailer";
import emailHtml from "../../templates/email";

const CONTACT_MESSAGE_FIELDS = {
  name: 'Name',
  email: "Email",
  subject: "Subject",
  message: "Message"
}
const generateEmailContent = ( data ) => {
  const stringData = Object.entries(data).reduce(( str, [ key, val ] ) =>
    (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n\n`), ""
  );
  const htmlData = Object.entries(data).reduce(( str, [ key, val ] ) =>
    (str += `
        <h1 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h1>
        <p class="form-answer" align="left">${val}</p>`
    ), ""
  );
  return {
    text: stringData,
    html: emailHtml({htmlData})
  }
}

const handler = async ( req, res ) => {
  if (req.method === "POST") {
    const data = req.body;
    if (!data || !data.name || !data.email || !data.subject || !data.message) {
      return res.status(400).send({message: "Bad request"});
    }
    
    try {
      await transporter.sendMail({
        ...mailOptions,
        ...generateEmailContent(data),
        subject: data.subject,
      });
      
      return res.status(200).json({success: true});
    } catch (err) {
      console.log(err);
      return res.status(400).json({message: err.message});
    }
  }
  return res.status(400).json({message: "Bad request"});
};
export default handler;