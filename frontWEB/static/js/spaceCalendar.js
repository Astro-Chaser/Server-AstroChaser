var today = new Date();
var year = today.getFullYear();

astroEventParser();
//astro event parser
async function astroEventParser(){
  let yearAstroEvent = await getAPI('localhost:8000',`app/astro-info/${year}`);
  let yearAstroEventRes = yearAstroEvent.result;
  let astroEventsParams = new Array();

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
  console.log(astroEventsParams)
  
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    expandRows: true, // 화면에 맞게 높이 재설정
    height: '700px',

    // 해더에 표시할 툴바
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth', // 초기 로드 될때 보이는 캘린더 화면(기본 설정: 달)
    navLinks: true, // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크
    editable: true, // 수정 가능?
    nowIndicator: true, // 현재 시간 마크
    dayMaxEvents: true, // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
    locale: 'ko', // 한국어 설정
    eventAdd: function(obj) { // 이벤트가 추가되면 발생하는 이벤트
      console.log(obj);
    },
    eventChange: function(obj) { // 이벤트가 수정되면 발생하는 이벤트
      console.log(obj);
    },
    eventRemove: function(obj){ // 이벤트가 삭제되면 발생하는 이벤트
      console.log(obj);
    },
    select: function(arg) { // 캘린더에서 드래그로 이벤트를 생성할 수 있다.
      var title = prompt('Event Title:');
      if (title) {
        calendar.addEvent({
          title: title,
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay
        })
      }
      calendar.unselect()
    },
    events: astroEventsParams
  });

  calendar.render();
}

//get API AS JSON
async function getAPI(host, path, headers = {}) {
  const url = `http://${host}/${path}`;
  console.log(url);
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

