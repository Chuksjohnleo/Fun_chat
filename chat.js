const section1 = document.getElementById('section1');
const section2 = document.getElementById('section2');
const textarea1 = document.getElementById('textarea1');
const textarea2 = document.getElementById('textarea2');
const send1 = document.getElementById('send1');
const send2 = document.getElementById('send2');

const user1 = []

const user2 = []

function messenger(user,section){
    section.innerHTML = '';
    user.forEach(message=>{
            const p = document.createElement('p');
            if(message.type === 'sent'){
                
             p.innerHTML = `<div class='sent-div'>
                               <span width='30' style='background-color:black;' class='sent date'>${message.date}</span>
                               <span class='sent message'>${message.message.toString()}</span>
                            </div>`
            }else{
                p.innerHTML = `<div class='received-div'>
                                <span style='background-color:black;' class='received date'>${message.date}</span>
                                <span class='received message'>${message.message.toString()}</span>
                               </div>`
            }
            section.appendChild(p);
    });
}
const small_screen = window.matchMedia('(max-width:500px)');
if(small_screen.matches){
    textarea1.cols = '10';
    textarea2.cols = '10'
}

messenger(user1,section1);
messenger(user2,section2);


function send(send_btn,textarea,sender,receiver,s_section,r_section){


    send_btn.addEventListener('click',()=>{
 if(textarea.value !== ''){
        const new_message =  {
            date: '',
            type: '',
            message: ''
        }
       let date = new Date();
       let d = date.getMonth()+1 + '/'+ date.getDate() + '/' + date.getFullYear() + " " + " " + date.getHours() + ":" + date.getMinutes() +':' + date.getSeconds() ;
      
       new_message.date =  d;
       new_message.type = 'sent';
       new_message.message = textarea.value;
       sender.push(new_message);
       messenger(sender,s_section);
       let sent = JSON.stringify(new_message);
       let parsed_sent = JSON.parse(sent);
       parsed_sent.type = 'received';
       new_message.date = d;
       new_message.message = textarea.value;
       receiver.push(parsed_sent);
       messenger(receiver,r_section);
       textarea.value = '';
       document.getElementById('focus').scrollIntoView();
       
       }
    });
}

send(send1,textarea1,user1,user2,section1,section2);
send(send2,textarea2,user2,user1,section2,section1);
