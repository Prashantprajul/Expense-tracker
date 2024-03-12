let amt=document.getElementById("amount");
let des=document.getElementById("descript");
let cat=document.getElementById("catogery");
let Table=document.getElementById('table');
let insbody=document.getElementById("tbody")
let date=da();
let time=tim();

//function for adding to screen
function addtoscreen(event){
  event.preventDefault();
  
  let amount=amt.value;
  let description=des.value;
  let catogery=cat.value;
  
  //CASE of missing input
  if(amount.value==""||descript.value==="")
  {
    alert("SOMETHING MISSING!!!");
    return;
  }
  
  const obj={
    amount,description,catogery
  };
  //local storage get item
  /*
  if(localStorage.getItem(amount))
  {
    localStorage.setItem(parseInt(amount)+0.5,JSON.stringify(obj));
  }
  else
  */  
  localStorage.setItem(amount,JSON.stringify(obj));

  //Creation of elements
  let ins1=document.createElement('tr');
  ins1.innerHTML=`<tr>
  <td>${amount}  </td>
  <td>${description}  </td>
  <td>${catogery}  </td>
  <td>${da()}  </td>
  <td>${tim()}  </td>
  <button class="btn">EDIT</button>
  <button class="btn">DELETE</button>
  </tr>
  `

  //insertion of Element
  insbody.appendChild(ins1);
  //clearing the form 
  amt.value="";
  des.value="";
  cat.value="";
}



let subm= document.getElementById("form");
subm.addEventListener("submit",addtoscreen);


insbody.addEventListener('click',(event)=>{
  if(event.target.tagName === 'BUTTON'){
    const button=event.target;//access button 
    const t_row=button.parentNode;//access parent of button ie TABLE ROW
    const t_body=t_row.parentNode;//access parent of t_row(grandparent of button) ie TBODY
    if(button.textContent === "DELETE")
    {
      let key=t_row.firstElementChild.innerText;
      t_body.removeChild(t_row);//removing ROW from BODY
      localStorage.removeItem(key);
    }
    else if(button.textContent === "EDIT")
    {
      //local storage removal
      let key=t_row.firstElementChild.innerText;
      localStorage.removeItem(key);

      let new_data=document.createElement('tr');
      new_data.innerHTML=`<input id="edamt"class="data" placeholder="Correct amount">
      <input id="eddes" class="data" placeholder="Correct description">
      <input id="edcat" class="data" placeholder="Correct catogery">
      `
      Table.before(new_data);
      button.textContent="SAVE";
      
      //SAVE BUTTON FUNCTIONALLITY
button.onclick=(new_data)=>{
        let data=document.querySelectorAll(".data");
        t_row.innerHTML=`<tr>
        <td>${data[0].value}  </td>
        <td>${data[1].value}  </td>
        <td>${data[2].value}  </td>
        <td>${date}  </td>
        <td>${time}  </td>
        <button class="btn">EDIT</button>
        <button class="btn">DELETE</button>
        </tr>`
        
        button.innerText="EDIT";
      //For changeing the value of local storage
        let amount=data[0].value;
        let description=data[1].value;
        let catogery=data[2].value;
        const new_obj={
          amount,description,catogery
        }
        localStorage.setItem(amount,JSON.stringify(new_obj));

      //Removing the added editing block
      let div2=document.querySelector('#print');
        div2.firstElementChild.remove();
      }

    }
  }
})




/* DATE AND TIME */
function da() {
let x = new Date();
let d = x.getDate();
let mon = x.getMonth();
let y = x.getFullYear();
let date = d + "/" + mon + "/" + y;
document.getElementById("date").innerHTML = `<big><b>${date}</b></big>`;
return date;
}
function tim() {
let x = new Date();
let h = x.getHours();
let m = x.getMinutes();
let s = x.getSeconds();
let time = h + ":" + m + ":" + s;
document.getElementById("time").innerHTML = `<big><b>${time}</b></big>`;
return time;
}
let dateDis = setInterval(da, 999);
let timeDis = setInterval(tim, 999);