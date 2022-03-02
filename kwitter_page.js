var firebaseConfig = {
    apiKey: "AIzaSyBldzs4nB4d275lAbZriySYQpvl_isklrQ",
    authDomain: "letschat-ca8a7.firebaseapp.com",
    databaseURL: "https://letschat-ca8a7-default-rtdb.firebaseio.com",
    projectId: "letschat-ca8a7",
    storageBucket: "letschat-ca8a7.appspot.com",
    messagingSenderId: "130830876849",
    appId: "1:130830876849:web:3534eef03d11dcd1672290",
    measurementId: "G-9T2288ENZB"
  };
      
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  user_name=localStorage.getItem("user_name");
  room_name=localStorage.getItem("room_name");
  function send(){
      msg=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({ name:user_name, message:msg, like:0 });
      document.getElementById("msg").value="";
      
  }
  function getData() {
       firebase.database().ref("/"+room_name).on('value', 
       function(snapshot) {
            document.getElementById("output").innerHTML = "";
             snapshot.forEach(function(childSnapshot) { 
                 childKey = childSnapshot.key;
                childData = childSnapshot.val();
                   if(childKey != "purpose") { 
                    firebase_message_id = childKey;
                 message_data = childData;
                  console.log(message_data); 
                  name=message_data['name'];
                  message=message_data['message'];
                  like=message_data['like'];
                  row="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
                  row+="<h4 class='message_h4'>"+message+"</h4>";
                  row+="<button class='btn btn-warning' id='"+firebase_message_id+"' value='"+like+"' onclick='updatelike(this.id)'>";
                  row+="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";
                  document.getElementById("output").innerHTML+=row;
                }
             }); 
        });
    }
getData();
function updatelike(message_id){
    button_id=message_id;
    likes=document.getElementById(button_id).value;
    likes_in_number=Number(likes)+1;
    console.log(likes_in_number);

    firebase.database().ref(room_name).child(message_id).update({
        like:likes_in_number
    });
}
function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location="index.html";
    }