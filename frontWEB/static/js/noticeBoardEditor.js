const pictureCommitBtn = document.getElementById('picture-commit');
const title = document.getElementById('title');
const content = document.getElementById('contentEditor');

var formdata = new FormData();

pictureCommitBtn.onclick = noticeCommit;

function previewImages() {

    var preview = document.querySelector('#preview');

    if (this.files) {
        [].forEach.call(this.files, readAndPreview);
    }

    function readAndPreview(file) {

    // Make sure `file.name` matches our extensions criteria
    if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
        return alert(file.name + " is not an image");
    } // else...
    
    var reader = new FileReader();
    
    reader.addEventListener("load", function() {
        var image = new Image();
        image.height = 100;
        image.title  = file.name;
        image.src    = this.result;
        preview.appendChild(image);
    });
    
    formdata.append("images", file);
    reader.readAsDataURL(file);
    }
}

async function noticeCommit(event){
    document.body.style.cursor='wait';

    var myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("accessJWT"));
    formdata.append("title",  title.value);
    formdata.append("content", content.value);
    formdata.append("type", "normal")
    formdata.append("x-access-token", localStorage.getItem("accessJWT"));

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };
    const insertPostRes = await postAPI(hostAddress, 'app/notice/upload', requestOptions)
    if(insertPostRes.result.mediaInptRes == "NULL BUT SUCCESS" && insertPostRes.result.titleInptRes == "SUCCESS"){
        location.href = "/notice";
    }
    else{
        alert("게시글을 다시 입력해주세요.");
        location.reload();
    }

}

document.querySelector('.file-input').addEventListener("change", previewImages);


//get API AS JSON
async function postAPI(host, path, options) {
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


  
  