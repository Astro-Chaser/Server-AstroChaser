window.onload= function(){
    showNormalNoticeBoard();
}

async function showNormalNoticeBoard(){
    const getTitleRes = await getAPI(hostAddress, 'app/notice/title');

    html = ''
    for(var i in getTitleRes.result){
        html += `<li> ${getTitleRes.result[i].title} </li>`
        if(i>5) break;
    }
    $('.notice-list').append(html)
}

//get API AS JSON
async function getAPI(host, path, headers ={}) {
    const url = `http://${host}/${path}`;
    console.log(url);
    const options = {
      method: "GET",
      headers: headers,
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