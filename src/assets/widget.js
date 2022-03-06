
export class Widget {
  constructor({ position = "bottom-right" } = {}) {
    this.position = this.getPotision(position);
    this.open = false;
    this.closeIcon;
    this.popIcon;
    this.initialize();
    this.createStyles();
  }
  getPotision(position) {
    const [vertical, horizontal] = position.split("-");
    return {
      [vertical]: "30px",
      [horizontal]: "30px",
    };
  }
  initialize() {
    const container = document.createElement("div");
    container.style.position = "fixed";
    Object.keys(this.position).forEach(
      (key) => (container.style[key] = this.position[key])
    );
    document.body.appendChild(container);
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    const popIcon = document.createElement("img");
    popIcon.src = "/chat.9cdb9b40.svg";
    popIcon.classList.add("icon");
    this.popIcon = popIcon;
    const closeIcon = document.createElement("img");
    closeIcon.src = "/cross.9c75413d.svg";
    closeIcon.classList.add("icon", "hidden");
    this.closeIcon = closeIcon;
    this.messageContainer = document.createElement("div");
    this.messageContainer.classList.add("hidden", "message-container");
    ////////////Create all /////////////////////////
    this.createMessageContainerContent();

    buttonContainer.appendChild(this.popIcon);
    buttonContainer.appendChild(this.closeIcon);

    buttonContainer.addEventListener("click", this.toggleOpen.bind(this));

    // container.appendChild(this.messageContainer);
    container.appendChild(buttonContainer);
  }
  createStyles() {
    const styleTag = document.createElement("style");
    document.head.appendChild(styleTag);
    styleTag.innerHTML = `
   
           .icon{
               cursor:pointer;
               width:70%;
               position:absolute;
               top:9px;
               left:9px;
               transition:transform .3s ease;
           }
           .hidden {
            transform: scale(0);
          }
          .button-container {
            background-color: #04b73f;
            width: 60px;
          
            height: 60px;
            border-radius: 50%;
          }
          .message-container {
            box-shadow: 0 0 18px 8px rgba(0, 0, 0, 0.1);
            width: 400px;
            left:50%;
            top:50%;
            max-height: 400px;
            position: absolute;
            transition: 0.2s ease-in-out;
            font-family: Arial, Helvetica, sans-serif;
            transform:translate(-50%,-50%) scale(1);
          }
          .message-container.hidden {
            transition: 0.2s ease-in-out;
           opacity:0;
          
          }
          .message-container h2 {
            margin: 0;
            padding: 20px;
            color: #fff;
            background-color: #04b73f;
          }
          .message-container .content{
            margin:20px 10px;
            border:1px solid #dbdbdb;
            padding:10px;
            display:flex;
            background-color:#fff;
            flex-direction:column;
          }
          .message-container form * {
            margin: 5px 0;
          }
          .message-container form input {
            padding: 10px;
          }
          .message-container form textarea {
            height: 100px;
            padding: 10px;
          }
          .message-container form textarea::placeholder {
            font-family: Arial, Helvetica, sans-serif;
          }
          .message-container form button {
            cursor: pointer;
            background-color: #04b73f;
            color: #fff;
            border: 0;
            border-radius: 4px;
            padding: 10px;
          }
          .message-container form button:hover{
              background-color: #16632f;
          }
          



      `;
  }
  createMessageContainerContent() {
    this.messageContainer.innerHTML = "";
    // const modal = document.createElement("div");

    const title = document.createElement("h2");
    title.textContent = `We are not here`;
    const form = document.createElement("form");
    form.classList.add("content");
    const email = document.createElement("input");
    email.required = true;
    email.id = "email";
    email.type = "email";
    email.placeholder = "Enter your email address";
    const message = document.createElement("textarea");
    message.required = true;
    message.id = "message";
    message.placeholder = "Your meaasge";
    const btn = document.createElement("button");
    btn.textContent = "Submit";
    form.appendChild(email);
    form.appendChild(message);
    form.appendChild(btn);
    form.addEventListener("submit", this.Submit.bind(this));
    this.messageContainer.appendChild(title);
    this.messageContainer.appendChild(form);
    document.body.appendChild(this.messageContainer);
  }
  creatCalender() {}
  resiveOTP() {}
  Submit(event) {
    event.preventDefault();
    const formSubmission = {
      email: event.srcElement.querySelector("#email").value,
      message: event.srcElement.querySelector("#message").value,
    };
    this.messageContainer.innerHTML = "<h2>thank you for your submission</h2>";
    console.log(formSubmission);
  }
  userDetails() {}
  thankyou() {}
  toggleOpen() {
    this.open = !this.open;
    if (this.open) {
      this.popIcon.classList.add("hidden");
      this.closeIcon.classList.remove("hidden");
      this.messageContainer.classList.remove("hidden");
    } else {
      //this.createContent();
      this.popIcon.classList.remove("hidden");
      this.closeIcon.classList.add("hidden");
      this.messageContainer.classList.add("hidden");
    }
  }
}
