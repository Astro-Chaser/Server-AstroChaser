const signinBtn = document.getElementById("signinBtn");

signinBtn.onclick = signinBtnClicked;

async function signinBtnClicked(event){
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const signinData={
        email: email,
        password: password
    }

    const signinResponse = post(hostAddress, "app/users/signin", signinData)
    .then((data) => {
        if(data.isSuccess == true)
        {
            console.log(data.result)
            alert("로그인 성공")
            localStorage.setItem("email", data.result.email);
            localStorage.setItem("accessJWT", data.result.AccessJWT);
            localStorage.setItem("accessJWT", data.result.RefreshJWT);
            location.href="/"
        }
        else
        {
            alert(data.message)
        }
    })
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