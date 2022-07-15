const e = require("express");

//DB에 천문현상정보 저장
async function insertAstroEvent(connection, astroInfoParams, err){
    for(const property in astroInfoParams){
        // console.log(`${property}: ${astroInfoParams[property].content}`) 
        // console.log(`${property}: ${astroInfoParams[property].date}`) 
        // console.log(`${property}: ${astroInfoParams[property].time}`)  
        if(property == 0)
        {
            const content = astroInfoParams[property].content;
            const dateFormatter = astroInfoParams[property].date.substring(0,4)+'-'+astroInfoParams[property].date.substring(4,6)+'-00';
            const time = 'null';

            const insertAstroEventQuery=`insert into AstroEventCalender(content, date, time)
            SELECT * FROM (SELECT '${content}', '${dateFormatter}', '${time}') AS tmp
            WHERE NOT EXISTS (
                SELECT date FROM AstroEventCalender WHERE date = '${dateFormatter}' AND time = '${time}'
            ) LIMIT 1;`

            //console.log(insertAstroEventQuery)
            
            const insertAstroEventRow = await connection.query(insertAstroEventQuery);
            if(err) {
                console.log(err)
                return 0;
            }
            //console.log(insertAstroEventRow);
        }
        else{
            const content = astroInfoParams[property].content;
            const dateFormatter = astroInfoParams[property].date.substring(0,4)+'-'+astroInfoParams[property].date.substring(4,6)+'-'+astroInfoParams[property].date.substring(6, 8);
            const time = astroInfoParams[property].time;

            const insertAstroEventQuery=`insert into AstroEventCalender(content, date, time)
            SELECT * FROM (SELECT '${content}', '${dateFormatter}', '${time}') AS tmp
            WHERE NOT EXISTS (
                SELECT date FROM AstroEventCalender WHERE date = '${dateFormatter}' AND time = '${time}'
            ) LIMIT 1;`
            
            const insertAstroEventRow = await connection.query(insertAstroEventQuery);
            if(err) {
                console.log(err)
                return 0
            }
            //console.log(insertAstroEventRow);
        }
    }
    return 1;
}

async function getAstroInfo(connection, req){
    let getAstroEventInfoQuery = `select *
        from AstroEventCalender
        WHERE '${req.year}-01-00'<=date AND date < '${Number(req.year)+1}-01-00'`;

    //console.log(getAstroEventInfoQuery)
    const [getAstroEventInfoRow] = await connection.query(getAstroEventInfoQuery);

    return getAstroEventInfoRow;
}

module.exports ={
    insertAstroEvent,
    getAstroInfo
}