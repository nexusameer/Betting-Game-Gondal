import ChatBot from "react-chatbotify";
import React from "react";

{/*

1. Question: What is the approval time for deposits?
   Answer: Deposit approval time is 30 minutes.

2. Question: What is the approval time for withdrawals?
   Answer: Withdrawal approval time is also 30 minutes.

3. Question: What are the team commission rates for levels 1, 2, and 3?
   Answer: The team commission rates for levels 1, 2, and 3 are 0.3%, 0.2%, and 0.1% respectively.

4. Question: What is the rate of the direct bonus?
   Answer: The direct bonus rate is 5%.

5. Question: What is the requirement to receive withdrawals?
   Answer: You need to place a bet equivalent to your investment amount before being able to withdraw.

6. Question: When is the direct bonus received?
   Answer: Direct bonus is received within

7. Question: What are the minimum deposit amounts?
   Answer: The minimum deposit amounts are PKR 1000, USDT 5, TRX 30.

8. Question: What are the minimum withdrawal amounts?
   Answer: The minimum withdrawal amounts are PKR 1000, USDT 5, TRX 30.

9. Question: How often can withdrawals be made?
   Answer: Withdrawals can be made once every 24 hours.

10. Question: Since when has the website been operational?
    Answer: The website has been operational since 2021.

11. Question: Where is the head office located?
    Answer: The head office is located in the UK.

12. Question: In how many countries does the platform operate?
    Answer: The platform operates in the UK, India, Pakistan, South Africa, China, and Qatar.

13. Question: Who is the owner?
    Answer: The owner's name is Jordan.

14. Question: What are the details about Veto Gaming?
    Answer: Veto Gaming offers two ways to earn: through betting and voting. The voting system allows users to cast votes on their favorite numbers, with winnings based on correct predictions. Deposits and withdrawals are available in PKR, TRX, and USDT. Referral income offers a 5% bonus on the first deposit of referred members. Commission rates for betting extend up to three levels: 0.3% for level 1, 0.2% for level 2, and 0.1% for level 3. 


*/}


const Chat = () => {

    // const options = {
    //     isOpen : true,
    // }
    // const helpOptions = [
    //     "What is the approval time for deposits?", 
    //     "What is the approval time for withdrawals?",
    //     "What are the team commission rates for levels 1, 2, and 3?",
    //     "What is the rate of the direct bonus?",
    //     "What is the requirement to receive withdrawals?",
    //     "When is the direct bonus received?",
    //     "What are the minimum deposit amounts?",
    //     "What are the minimum withdrawal amounts?",
    //     "How often can withdrawals be made?",
    //     "Since when has the website been operational?",
    //     "Where is the head office located?",
    //     "In how many countries does the platform operate?",
    //     "Who is the owner?",
    //     "What are the details about Veto Gaming?",
    // ];
    // const flow = {
	// 	start: {
	// 		message: `Hello, ${localStorage.getItem("user")} I am Tan Jin 👋! Welcome to React ChatBotify, I'm excited that you are using our ` +
	// 			"chatbot 😊!",
	// 		transition: {duration: 1000},
	// 		path: "show_options"
	// 	},
	// 	show_options: {
	// 		message: "It looks like you have not set up a conversation flow yet. No worries! Here are a few helpful " +
	// 			"things you can check out to get started:",
	// 		options: helpOptions,
    //         transition: {duration: 2000},
	// 		path: "process_options"
	// 	},
	// 	prompt_again: {
	// 		message: "Do you need any other help?",
	// 		options: helpOptions,
	// 		path: "process_options"
	// 	},
	// 	unknown_input: {
	// 		message: "Sorry, I do not understand your message 😢! If you require further assistance, you may click on " +
	// 			"the Github option and open an issue there or visit our discord.",
	// 		options: helpOptions,
	// 		path: "process_options"
	// 	},
    //     process_options: {
	// 		transition: {duration: 2},
	// 		path: async (params) => {
    //             let reply = "";
	// 			switch (params.userInput) {
	// 			case "What is the approval time for deposits?":
	// 				reply = "Deposit approval time is 30 minutes.";
	// 				break;
	// 			case "What is the approval time for withdrawals?":
	// 				reply = "Withdrawal approval time is also 30 minutes.";
	// 				break;
    //             case "What are the team commission rates for levels 1, 2, and 3?":
    //                 reply = "The team commission rates for levels 1, 2, and 3 are 0.3%, 0.2%, and 0.1% respectively.";
    //                 break;
    //             case "What is the rate of the direct bonus?":
    //                 reply = "The direct bonus rate is 5%.";
    //                 break;
    //             case "What is the requirement to receive withdrawals?":
    //                 reply = "You need to place a bet equivalent to your investment amount before being able to withdraw.";
    //                 break;
    //             case "When is the direct bonus received?":
    //                 reply = "Direct bonus is received within 24 hours.";
    //                 break;
    //             case "What are the minimum deposit amounts?":
    //                 reply = "The minimum deposit amounts are PKR 1000, USDT 5, TRX 30.";
    //                 break;
    //             case "What are the minimum withdrawal amounts?":
    //                 reply = "The minimum withdrawal amounts are PKR 1000, USDT 5, TRX 30.";
    //                 break;
    //             case "How often can withdrawals be made?":
    //                 reply = "Withdrawals can be made once every 24 hours.";
    //                 break;
    //             case "Since when has the website been operational?":
    //                 reply = "The website has been operational since 2021.";
    //                 break;
    //             case "Where is the head office located?":
    //                 reply = "The head office is located in the UK.";
    //                 break;
    //             case "In how many countries does the platform operate?":
    //                 reply = "The platform operates in the UK, India, Pakistan, South Africa, China, and Qatar.";
    //                 break;
    //             case "Who is the owner?":
    //                 reply = "The owner's name is Jordan.";
    //                 break;
    //             case "What are the details about Veto Gaming?":
    //                 reply = "Veto Gaming offers two ways to earn: through betting and voting. The voting system allows users to cast votes on their favorite numbers, with winnings based on correct predictions. Deposits and withdrawals are available in PKR, TRX, and USDT. Referral income offers a 5% bonus on the first deposit of referred members. Commission rates for betting extend up to three levels: 0.3% for level 1, 0.2% for level 2, and 0.1% for level 3.";
    //                 break;
	// 			default:
	// 				reply = "I'm sorry, I don't understand that option 😢!";
    //                 break;
	// 			}
	// 			await params.injectMessage(reply);
	// 			return "repeat"
	// 		},
	// 	},
	// 	repeat: {
	// 		transition: {duration: 5000},
	// 		path: "prompt_again"
	// 	},
    // }

    // make a massage that show the user to renewal the purchase plan 
    const options = {
        isOpen : true,
    }
    
    const flow = {
        start: { 
            message : "Hello, I am Veto Gaming's ChatBot. Please renewal your purchase plan.",
            path: "renewal"
        },
    }

    return (
        <div className="z-5" >
            <ChatBot
            options={options}
            flow={flow}
            />
        </div>
    );
};

export default Chat;