
getUserInfo();
//사용자 로그인 정보 가져오기
async function getUserInfo(){
  let jwtCheckData;
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
  
      jwtCheckData = await getAPI(hostAddress,"app/users/auto-login", requestOptions)
      localStorage.setItem("createdAt", jwtCheckData.result.createdAt);
      localStorage.setItem("email", jwtCheckData.result.email);
      localStorage.setItem("exp", jwtCheckData.result.exp);
      localStorage.setItem("generation", jwtCheckData.result.generation);
      localStorage.setItem("id", jwtCheckData.result.id);
      localStorage.setItem("member", jwtCheckData.result.member);
      localStorage.setItem("name", jwtCheckData.result.name);
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
    if(refreshResult.result.checkResult == 'failed')
    {
      localStorage.clear();
      alert("인증 기한이 만료되어 재로그인이 필요합니다.")
      location.href="/user/signin"
    }
    else{
      localStorage.setItem("email", refreshResult.result.email);
      localStorage.setItem("accessJWT", refreshResult.result.AccessJWT);
      localStorage.setItem("refreshJWT", refreshResult.result.RefreshJWT);

      var myHeaders = new Headers();
      myHeaders.append("x-access-token", data.result.AccessJWT);
    
      var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
      };
    
        jwtCheckData = await getAPI(hostAddress,"app/users/auto-login", requestOptions)
        localStorage.setItem("createdAt", jwtCheckData.result.createdAt);
        localStorage.setItem("email", jwtCheckData.result.email);
        localStorage.setItem("exp", jwtCheckData.result.exp);
        localStorage.setItem("generation", jwtCheckData.result.generation);
        localStorage.setItem("id", jwtCheckData.result.id);
        localStorage.setItem("member", jwtCheckData.result.member);
        localStorage.setItem("name", jwtCheckData.result.name);
      }
  }

    if(localStorage.getItem("member")=='운영진')
    {
        $('.buttons').empty();
        html = `
            <div id="userInfo-nav-top" style="font-size: 18px;">
                🌟 ${localStorage.getItem('generation')}기 ${localStorage.getItem("name")}
            </div>
        `
        
        ;
        $('.buttons').append(html);
    }
    else
        {
          $('.buttons').empty();
          html = `
              <div id="userInfo-nav-top" style="font-size: 18px;">
                 ${localStorage.getItem("generation")}기 ${localStorage.getItem("name")}
              </div>
          `
          
          ;
          $('.buttons').append(html);
        }

}

  //post API AS JSON
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

async function getAPI(host, path, options) {
  const url = `http://${host}/${path}`;
  console.log(url);
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