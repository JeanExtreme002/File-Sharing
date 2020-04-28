function formatSize(bytes) {

    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    var unit;

    for (unit = 0; unit < units.length; unit++) {
        if (bytes <= 1024) { break; }
        bytes /= 1024;
    }

    return `${parseInt(bytes)} ${units[unit]}`;
}

function main() {

    document.getElementById("fileUploaded").onchange = function() {
        document.getElementsByTagName("form")[0].requestSubmit();
    }

    setInterval(showInfo, 300);
}


function selectFile() {
    document.getElementById("fileUploaded").click();
}


function showInfo() {

    const download = document.getElementById("download");
    const element = document.getElementById("info");
    const defaultMsg = "No files available for download";

    fetch("/info").then((response) => {

        response.text().then((text) => {
            
            const info = JSON.parse(text);  

            if (info.filename) {
                download.href = "/download";
                element.innerText = `${info.filename} [${formatSize(info.size)}]`;

            } else {
                download.href = "#";
                element.innerText = defaultMsg;  
            }
        });

    }).catch((err) => {
        download.href = "#";
        element.innerText = defaultMsg;
    });
}