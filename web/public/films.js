var jwToken;
var filmid=5;


function loginUser(event){

    event.preventDefault();
    let userName = document.getElementById('usernameinput').value;

    var letterNumber = /^[0-9a-zA-Z]+$/;
    if(userName.match(letterNumber)){
        try {
            fetch("http://192.168.1.6:8080/api/v1/login", {
                method: 'POST',
                body: JSON.stringify({
                    username: userName
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
        
        
            }).then(resp => resp.json())
            .then(data => {
                jwToken = data.token;
            });
            document.getElementById('successuser-alert').style.display = 'block';
        } catch (e) {
            console.log(e)
            
        }
         }
   else
     { 
        document.getElementById('invaliduser-alert').style.display = 'block';
    }
    

    setTimeout(() => { 
        var elements = document.getElementsByClassName('redalert');
        for(var i=0; i<elements.length; i++) {
            elements[i].style.display='none';
            document.getElementById('successuser-alert').style.display = 'none';
        
        }
        }, 5000);
    return false;
    }

    

function createFilm(event){
    //Prevent form to reload page after submit
    event.preventDefault();

    //Getting Films Input
    let filmTitle  = document.getElementById('filmTitle').value;
    let filmRating = document.getElementById('filmRating').value;



// If else statements to check the validity of the input
   if (filmTitle === '' && filmRating === ''){

    document.getElementById('emptytitle-alert').style.display = 'block';
    document.getElementById('emptyrating-alert').style.display = 'block';
   
   }
   
    else if (filmTitle === '') {
    
    document.getElementById('emptytitle-alert').style.display = 'block';
}
else if (parseInt(filmRating, 10) < 1 || parseInt(filmRating, 10) > 5 ){
    document.getElementById('invalidrating-alert').style.display = 'block';
}
else if (filmRating === '') {

    document.getElementById('emptyrating-alert').style.display = 'block';
}
else if (isNaN(filmRating)){

    document.getElementById('invalidrating-alert').style.display = 'block';

}

else{
    
        //All the requests send to API should be written in try catch block
    try{
        fetch('http://192.168.1.6:8080/api/v1/films',{
            method: 'POST',
            body: JSON.stringify({
                title: filmTitle,
                rating: filmRating
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwToken
            }
        }).then(resp =>{
            setTimeout(function () {
                if (resp.status == 200) {
                    document.getElementById('success-alert').style.display = 'block';                }
                    else{
                    alert(resp.status + " " + resp.statusText);                }
            }, 0);
        });

        //Clear text field
        document.getElementById('filmTitle').value = '';
        document.getElementById('filmRating').value = '';

        //show success message to user
     //   document.getElementById('success-alert').style.display = 'block';
    }catch(e){
        //Handling all exceptions
        console.log(e);
        console.log('---------------');
    }
    
}


// Timeout function to make alert messages disappear after 5 sec
setTimeout(() => { 
var elements = document.getElementsByClassName('redalert');
for(var i=0; i<elements.length; i++) {
    elements[i].style.display='none';
    document.getElementById('success-alert').style.display = 'none';

}
}, 5000);

}




function getFilms(event){
    //Prevent form from reload after submit
    event.preventDefault();

    try {
        fetch('http://192.168.1.6:8080/api/v1/films', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {

               totalFilms = result.length; 
               var ids = [];
               ids.length = result.length;               
	            //Getting reference to films table 
                let filmsTable = document.getElementById('films');
var x =5 ;
            
                //Reset Table...
                filmsTable.innerHTML = '';
            

                //Add header to table when there is atleast one film...
                if(totalFilms > 0){
                    filmsTable.innerHTML = '<tr><th id = "bito" >#</th><th id = "twoclmns" >Film Title</th><th id = "twoclmns" >Rating</th><th id = "bitc" >Edit rating</th></tr>'
                }
                        

                //Adding films into table 
                //Outer loop is for rows of table (each row one film)
                for(let i=0 ; i < totalFilms ; i++){
                    let tr = filmsTable.insertRow(i+1);
                        
                        //Inner loop is for film attributes (Title and rating in this case)
                        for(let j=0; j<4 ; j++)
                        {
                            let td = document.createElement('td'); 
                            td = tr.insertCell(j);
                            if(j===0)
                                td.innerHTML = i;
                            else if(j ===  1)
                                td.innerHTML = result[i].title;
                            else if (j === 2)
                                td.innerHTML = result[i].rating;
                           else
                               // td.innerHTML +='<form onSubmit ="return newOne(\''+result[i]._id.toString()+'\',  \''+i.toString()+'\')"> \<input id="mynewrate" type="text" class="input-txt"><input id="mycolumn" type="Submit" class="input-btn" value="Go">';
                              // td.innerHTML +='<form onSubmit ="return newOne(\''+result[i]._id.toString()+'\')"> \<input id="mycolumn" type="text" class="input-txt"><input id="mycolumn" type="Submit" class="input-btn" value="Go">';
                                //ids[i] = result[i]._id;
                                td.innerHTML += `<form onSubmit ="return newOne(event, '${result[i]._id.toString()}')"> \<input id="mynr${result[i]._id.toString()}" type="text" class="input-txt"> <input id="mycolumn" type="Submit" class="input-btn" value="Go">`;
                           // document.getElementById('editButton').style.display = 'block';

                        }
                }
                    
            }
        ) ;
    } catch (error) {
        console.log(error)
    }
 

}

function newOne(event, filsm) {
    event.preventDefault();
    let nr = document.getElementById(`mynr${filsm.toString()}`).value;
if (parseInt(nr, 10) < 1 || parseInt(nr, 10) > 5 ){
    document.getElementById('invalidrating-alert').style.display = 'block';
}
else if (nr === '') {

    document.getElementById('emptyrating-alert').style.display = 'block';
}
else if (isNaN(nr)){

    document.getElementById('invalidrating-alert').style.display = 'block';

}

else{
    
    try{
        fetch(`http://192.168.1.6:8080/api/v1/films/${filsm.toString()}`,{
            method: 'PUT',
            body: JSON.stringify({
                rating: nr
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(resp =>{
            setTimeout(function () {
                if (resp.status == 200) {
                    document.getElementById('success-alert').style.display = 'block';                }
                    else{
                    alert(resp.status + " " + resp.statusText);                }
            }, 0);
        });

        //Clear text field
        document.getElementById('filmTitle').value = '';
        document.getElementById('filmRating').value = '';

        //show success message to user
     //   document.getElementById('success-alert').style.display = 'block';
    }catch(e){
        //Handling all exceptions
        console.log(e);
        console.log('---------------');
    }
}
    getFilms();
}



