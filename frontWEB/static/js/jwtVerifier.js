
getUserInfo();
//사용자 로그인 정보 가져오기
async function getUserInfo(){

  const userJWT = localStorage.getItem("accessJWT");
  const decodedJwt = jwt_decode(userJWT);
  if(((new Date(decodedJwt.exp * 1000))-Date.now())/6000 > 30 )
  {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", userJWT);
  
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
  
      const jwtCheckData = await getAPI(hostAddress,"app/users/auto-login", requestOptions)
      localStorage.setItem("email", jwtCheckData.result.createdAt);
      localStorage.setItem("exp", jwtCheckData.result.exp);
      localStorage.setItem("generation", jwtCheckData.generation);
      localStorage.setItem("id", jwtCheckData.id);
      localStorage.setItem("member", jwtCheckData.member);
      localStorage.setItem("name", jwtCheckData.name);
  }
  else if(((new Date(decodedJwt.exp * 1000))-Date.now())/6000 <= 30)
  {
    //ACCESS TOKEN의 기한이 지날 경우!!
    const local_email = localStorage.getItem("email");
    const local_refreshToken = localStorage.getItem("refreshJWT");

    const refreshTokenData = {
      email: local_email,
      refreshToken: local_refreshToken
    }

    const refreshResult = await postAPI(hostAddress, 'app/users/auto-login/failed', body = refreshTokenData)
    console.log(refreshResult)
    if(refreshResult.result.checkResult == 'failed')
    {
      alert("기한이 만료되어 재로그인이 필요합니다.")
      location.href="/user/signin"
    }
    else{
      
    }
  }



    /**
     * TODO
     * JWT Token 완변하게 받아서 해치우기
     */
    if(jwtCheckData.result[0].member=='운영진')
    {
        localStorage.setItem("member", "운영진");
        $('.buttons').empty();
        html = `
            <div id="userInfo-nav-top" style="font-size: 18px;">
                🌟 ${jwtCheckData.result[0].generation}기 ${jwtCheckData.result[0].name}
            </div>
        `
        
        ;
        $('.buttons').append(html);
    }
    else
        console.log(jwtCheckData.result[0].generation + '기 ' +jwtCheckData.result[0].name);

}

  //get API AS JSON
async function postAPI(host, path, body) {
    const url = `http://${host}/${path}`;
    console.log(url);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const res = await fetch(url, options);
    const data = res.json();
    // console.log(res)
    // console.log(data)
    if (res.ok) {
      return data;
    } else {
      throw new Error(data);
    }
  }