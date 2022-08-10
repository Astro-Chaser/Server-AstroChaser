const pictureCommitBtn = document.getElementById('picture-commit');
const title = document.getElementById('title');
const content = document.getElementById('contentEditor');

var formdata = new FormData();

pictureCommitBtn.onclick = pictureCommit;

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

async function pictureCommit(event){
    document.body.style.cursor='wait';
    formdata.append("writer",  localStorage.getItem("email"));
    formdata.append("content", content.value);
    var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    const insertPostRes = await postAPI(hostAddress, 'app/picture-board/upload', title.value, requestOptions)
    console.log(insertPostRes);
    if(insertPostRes.result.mediaInptRes == "SUCCESS" && insertPostRes.result.titleInptRes == "SUCCESS"){
        location.href = "/gallery";
    }
    else{
        alert("게시글을 다시 입력해주세요.");
        location.reload();
    }

    
    
    console.log()
}

document.querySelector('.file-input').addEventListener("change", previewImages);


//get API AS JSON
async function postAPI(host, path, params, options) {
    const url = `http://${host}/${path}?title=${params}`;
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


  
  