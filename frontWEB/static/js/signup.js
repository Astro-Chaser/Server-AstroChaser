const sigupBtn = document.getElementById("sigupBtn");

sigupBtn.addEventListener('click', ()=>{
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
        const registerResult = postData(hostAddress+'app/users', 
        {
            "name": name,
            "email": email,
            "password": password1,
            "member": memberOptionVal,
            "generation": generationOptionVal
            }.then((data) => {
                console.log(data); // JSON 데이터가 `data.json()` 호출에 의해 파싱됨
              }),
        );
        alert(registerResult);
    }
        
})

// POST 메서드 구현 예제
async function postData(url = '', data = {}) {
    // 옵션 기본 값은 *로 강조
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE 등
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
    });
    return response.json(); // JSON 응답을 네이티브 JavaScript 객체로 파싱
}
  
  