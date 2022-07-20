
const queryString = window.location.href;
const getPageNum = queryString.lastIndexOf("/")
const pageNum = queryString.substring(getPageNum+1);

window.onload = function(){
    showContent(pageNum);    
}

async function showContent(pageNum){
    const contentRes = await getAPI(hostAddress, `app/picture-board/${pageNum}`);
    let html = `
    <h3 class="title is-3" style="color: white; margin-top: 10vh;">${contentRes.result[0].title}</h1>
    <hr class="title-hr">`

    for (var i in contentRes.result)
    {
        html += `
        <div class="image-area">
            <img src="${contentRes.result[i].mediaUrl}" >
        </div>
        `
    }
    html +=
    `
        <div class="picture-content">
            ${contentRes.result[0].content}
        </div>
    `
    $(".mainContents").append(html);
    
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