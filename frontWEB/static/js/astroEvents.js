var date = new Date();
let yearAstroEventResArr = new Array();

window.onload = async function(){
    setSearchAstroEvent();
    $("#optionYear").on("change", function(){
        //selected value
        $(this).val();
        //selected option element
        $("option:selected", this);
        $("option:selected", this).text();
        selectedYear = $(this).find("option:selected").text();
    
        setAstroEventTable(selectedYear, selectedMonth);
    });
    $("#optionMonth").on("change", function(){
        //selected value
        $(this).val();
        //selected option element
        $("option:selected", this);
        $("option:selected", this).text();
        selectedMonth = $(this).find("option:selected").text();
    
        setAstroEventTable(selectedYear, selectedMonth);
    });
    
   
    let selectedYear = $("#optionYear option:selected").val();
    let selectedMonth = $("#optionMonth option:selected").val();
    await astroEventParser();
    setAstroEventTable(selectedYear, selectedMonth);    
}

async function astroEventParser(){
        for(var i = 2021; i<=date.getFullYear(); i++){
            yearAstroEvent = await getAPI(hostAddress,`app/astro-info/${i}`);
            yearAstroEventResArr.push(yearAstroEvent.result);
        }       
}

function setSearchAstroEvent(){
    setOptionHtml = `
    <span style="float: right;">
                <span>
                  <div class="select is-info">
                    <select id = "optionYear">
                    `;
                    for(var i = 2021; i<date.getFullYear(); i++){
                        setOptionHtml += `<option>${i}</option>;`
                    }
                    setOptionHtml += `<option selected>${date.getFullYear()}</option>;
                    </select>
                  </div>
                </span>
                <span class="option-text-area">
                  년
                </span>
                
                <span class="option-area">
                  <div class="select is-info">
                    <select id = "optionMonth">`;
                      for(var i=1; i<12; i++){
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

async function setAstroEventTable(year, month){
    let tableHtml = '';
    let tableHeadLineHtml = '';
    let tableContentHtml = '';
    let rowCount = 1;

    for(var i in yearAstroEventResArr)
    {
        if(Number(yearAstroEventResArr[i][10].date.substring(0,4)) == Number(year)){
            console.log(yearAstroEventResArr[i][0].date.substring(0,4))
            for(var j in yearAstroEventResArr[i]){
                
                let DByear = Number(yearAstroEventResArr[i][j].date.substring(0,4))
                let DBmonth = Number(yearAstroEventResArr[i][j].date.substring(5,7))
                
                tableHtml = `
                <table class="table is-narrow"> 
                    <thead>
                        <tr style="width: 20px;">
                            <th class="tg-1lax">순서</th>
                            <th class="tg-2lax">날짜</th>
                            <th class="tg-3lax">시간</th>
                            <th class="tg-4lax">내용</th>
                        </tr>
                    </thead>
                <tbody>'`;
                
                if(DBmonth == Number(month)-1 && DByear == Number(year) && yearAstroEventResArr[i][j].isMonthTitle == 1 ){
                
                    tableHeadLineHtml +=`
                    <tr class="month-main">
                        <td class="tg-1lax"></td>
                        <td class="tg-2lax" colspan="2">${Number(month)}월의 주요 이벤트</td>
                        <td class="tg-4lax">${yearAstroEventResArr[i][j].content}</td>
                     </tr>
                    `
                   
                  }
                  if(DBmonth == Number(month) && DByear == Number(year) && yearAstroEventResArr[i][j].isMonthTitle == 0)
                  {
                    tableContentHtml += `
                    <tr>
                        <td class="tg-1lax">${rowCount++}</td>
                        <td class="tg-2lax">${yearAstroEventResArr[i][j].date.substring(5,7)}월 ${yearAstroEventResArr[i][j].date.substring(8,10)}일</td>
                        <td class="tg-3lax">${yearAstroEventResArr[i][j].time.substring(0,5)}</td>
                        <td class="tg-4lax">${yearAstroEventResArr[i][j].content}</td>
                    </tr>
                    `
                  }
                    
                   }   
                }
            }
    let htmlResult = '';
    htmlResult = tableHtml + tableHeadLineHtml + tableContentHtml + '</tbody> </table>';
    $('.table-container').empty();
    $('.table-container').append(htmlResult);          
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
    if (res.ok) {
      return data;
    } else {
      throw new Error(data);
    }
  }