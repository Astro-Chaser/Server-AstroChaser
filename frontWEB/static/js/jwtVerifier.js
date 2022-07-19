
getUserInfo();
//사용자 로그인 정보 가져오기
async function getUserInfo(){
    const userJWT = localStorage.getItem("accessJWT");
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", userJWT);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const jwtCheckData = await getAPI(hostAddress,"app/users/auto-login", requestOptions)
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
async function getAPI(host, path, options) {
    const url = `http://${host}/${path}`;
    console.log(url);
    console.log(options)
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