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
//ADD YOUR FIREBASE LINKS HERE
user_name=localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML="Welcome "+ user_name;
function getData() {
      firebase.database().ref("/").on('value', function(snapshot) 
      {document.getElementById("output").innerHTML = "";
      snapshot.forEach(function(childSnapshot) 
      {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
       console.log("Room Name -"+Room_names);
       row="<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
       document.getElementById("output").innerHTML+=row;
      //End code
      });});}
getData();
function logout() {
localStorage.removeItem("user_name");
localStorage.removeItem("room_name");
window.location="index.html";
}
function addRoom(){
      room_name=document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose:"adding room name"
      });
      localStorage.setItem("room_name", room_name);
      window.location="kwitter_page.html";
}
function redirectToRoomName(name){
      localStorage.setItem("room_name",name);
      window.location="kwitter_page.html";
}