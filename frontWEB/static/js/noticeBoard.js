window.onload = function(){
    showNormalNoticeBoardTitles();
}

async function showNormalNoticeBoardTitles(){
    const getTitleRes = await getAPI(hostAddress, 'app/notice/title');
    html = ''
    for(var i in getTitleRes.result){
        console.log
        html += `
        <div class="columns">
            <div class="column is-full">
                <div class="noticeCol iconCol"></div>
                <div class="noticeCol titleCol">${getTitleRes.result[i].title}</div>
                <div class="noticeCol writerCol">${getTitleRes.result[i].name}</div>
                <div class="noticeCol timeCol">${getTitleRes.result[i].createdat}</div>
                <div class="noticeCol watchCol">${getTitleRes.result[i].viewCount}</div>
            </div>
        </div>
        `
        if(i==10) {
            html += `
                    <div class="columns">
                        <div class="column is-full" id="final-column">
                            <div class="noticeCol iconCol"></div>
                            <div class="noticeCol titleCol">${getTitleRes.result[i].title}</div>
                            <div class="noticeCol writerCol">${getTitleRes.result[i].name}</div>
                            <div class="noticeCol timeCol">${getTitleRes.result[i].createdat}</div>
                            <div class="noticeCol watchCol">${getTitleRes.result[i].viewCount}</div>
                        </div>
                    </div>
                `
            $('.notice-list').append(html)
            break;
        }
       
    }      
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