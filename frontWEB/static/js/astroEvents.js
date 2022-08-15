
astroEventParser();
setSearchAstroEvent();
async function astroEventParser(){
    yearAstroEvent = await getAPI(hostAddress,`app/astro-info/${year}`);
    let yearAstroEventRes = yearAstroEvent.result;
    astroEventsParams = new Array();
    
    console.log(yearAstroEventRes)
    for(const property in yearAstroEventRes){
      if(property >0 && yearAstroEventRes[property].content == yearAstroEventRes[property-1].content) continue;
      let eventObj = new Object();
  
      let title = yearAstroEventRes[property].content;
      let start = yearAstroEventRes[property].date.substr(0,10);
      let description=null;
      if(yearAstroEventRes[property].time)
      {
        description = `${start}시작. ${title}`
      }
      else
      {
        description = `${title}`
      }
      
      eventObj.title = title;
      eventObj.start = start;
      eventObj.description = description;
  
      astroEventsParams.push(eventObj);
    }
}

function setSearchAstroEvent(){
    var date = new Date();
    console.log(date.getFullYear());
    console.log(date.getMonth()+1);

    setOptionHtml = `
    <span style="float: right;">
                <span>
                  <div class="select is-info">
                    <select id = "optionYear">
                    `;
                    for(var i = 2021; i<date.getFullYear(); i++){
                        setOptionHtml += `<option>${i}</option>;`
                    }
                    setOptionHtml += `<option>${date.getFullYear()}</option>;
                    </select>
                  </div>
                </span>
                <span class="option-text-area">
                  년
                </span>
                
                <span class="option-area">
                  <div class="select is-info">
                    <select id = "optionMonth">`;
                      for(var i=1; i<=12; i++){
                        if(i == date.getMonth()){
                            setOptionHtml += `<option selected> ${i+1} </option>`;
                            continue;
                        }

                        setOptionHtml += `<option> ${i+1} </option>`
                      }
                      setOptionHtml +=`
                    </select>
                  </div>
                </span>
                <span class="option-text-area">
                  월 천문현상 검색하기
                </span>
              </span>
    `

    $('.search-area').append(setOptionHtml)
}



//get API AS JSON
async function getAPI(host, path, headers = {}) {
    const url = `http://${host}/${path}`;
    //console.log(url);
    const options = {
      method: "GET"
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