const sigupBtn = document.getElementById("sigupBtn");

sigupBtn.onclick = signupBtnClicked;

   async function signupBtnClicked(event)
  {
    event.preventDefault();
    // event.stopPropagation();
    const  name = document.getElementById("name").value;
    const  email = document.getElementById("email").value;
    const  password1 = document.getElementById("password1").value;
    const  password2 = document.getElementById("password2").value;

    const  memberOption = document.getElementById("memberOption");
    const memberOptionVal = memberOption.options[memberOption.selectedIndex].value;
    const generationOption = document.getElementById("generationOption");
    const generationOptionVal = generationOption.options[generationOption.selectedIndex].value;

    if(password1!=password2){
        alert("비밀번호가 일치하지 않습니다.");
    }
    else{
      // ************************************
      const signUpData = {
        name: name,
        email: email,
        password: password2,
        member: memberOptionVal,
        generation: generationOptionVal
      };

      const responseRes = post(hostAddress, "app/users", signUpData)  
        .then((data) => {
          // console.log(data)
          // console.log(data.isSuccess);
          // console.log(data.message);
          if(data.isSuccess == false){
            alert(data.message);
          }

          if(data.isSuccess == true){
            alert("회원가입되었습니다.");
            location.href = '/';
          }
        })
        .catch((error) => console.log(error));
      // ***********************************
    } 
  }

async function post(host, path, body, headers = {}) {
  const url = `http://${host}/${path}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
  };
  const res = await fetch(url, options);
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw new Error(data);
  }
}




