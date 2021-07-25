import LexChat from "react-lex";
 
function Chatbot(){
  return(
    <LexChat
      botName="HalifaxFoodie"
      IdentityPoolId="us-east-1:490d8d9b-4877-4f91-a06d-aee20121e312"
      placeholder="Placeholder text"
      style={{ position: 'absolute' }}
      backgroundColor="#FFFFFF"
      height="430px"
      region="us-east-1"
      headerText="Chat with our awesome bot" />
  )
}

export default Chatbot;